const fs = require("fs");
const path = require("path");

const resumePath = path.join(
  process.cwd(),
  "resume",
  "Amith-Rajolkar-Resume.pdf"
);

function page(message = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Protected CV - Amith Rajolkar</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f8f5f0;
      --card: #ffffff;
      --ink: #1c1c1e;
      --muted: #6b6b6b;
      --accent: #8b7355;
      --border: #ede8e0;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #151514;
        --card: #1f1e1c;
        --ink: #f8f5f0;
        --muted: #b9b1a6;
        --accent: #c4a882;
        --border: #39342d;
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      background: var(--bg);
      color: var(--ink);
      font-family: Arial, sans-serif;
      line-height: 1.5;
    }

    main {
      width: min(100%, 420px);
      padding: 32px;
      background: var(--card);
      border: 1px solid var(--border);
    }

    h1 {
      margin: 0 0 12px;
      font-size: 28px;
      font-weight: 400;
    }

    p {
      margin: 0 0 24px;
      color: var(--muted);
      font-size: 15px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--muted);
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    input {
      width: 100%;
      min-height: 46px;
      padding: 10px 12px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--ink);
      font: inherit;
    }

    button {
      width: 100%;
      min-height: 46px;
      margin-top: 14px;
      border: 0;
      background: var(--ink);
      color: var(--bg);
      cursor: pointer;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    button:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    .message {
      margin-bottom: 18px;
      color: #a33b2f;
    }

    .back-link {
      display: inline-block;
      margin-top: 18px;
      color: var(--muted);
      font-size: 14px;
      text-decoration: none;
    }

    .back-link:hover {
      color: var(--accent);
    }
  </style>
</head>
<body>
  <main>
    <h1>Protected CV</h1>
    <p>Enter the password to download Amith Rajolkar's CV.</p>
    <p class="message" data-cv-message>${message}</p>
    <form method="post" action="/api/cv" data-cv-form>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required>
      <button type="submit">Download CV</button>
    </form>
    <a class="back-link" href="/portfolio.html">Back to portfolio</a>
  </main>
  <script>
    const form = document.querySelector("[data-cv-form]");
    const messageBox = document.querySelector("[data-cv-message]");
    const button = form.querySelector("button");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = "Downloading...";
      messageBox.textContent = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new URLSearchParams(new FormData(form))
        });

        if (!response.ok) {
          messageBox.textContent = response.status === 401
            ? "Incorrect password. Please try again."
            : "CV download is unavailable right now.";
          return;
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = "Amith-Rajolkar-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);

        window.setTimeout(() => {
          window.location.href = "/portfolio.html";
        }, 800);
      } catch (error) {
        messageBox.textContent = "CV download is unavailable right now.";
      } finally {
        button.disabled = false;
        button.textContent = "Download CV";
      }
    });
  </script>
</body>
</html>`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  const password = process.env.CV_PASSWORD;

  if (!password) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(page("CV access is not configured yet."));
    return;
  }

  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(page());
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST");
    res.end("Method not allowed");
    return;
  }

  const body = await readBody(req);
  const submittedPassword = new URLSearchParams(body).get("password");

  if (submittedPassword !== password) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(page("Incorrect password. Please try again."));
    return;
  }

  const resume = fs.readFileSync(resumePath);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=Amith-Rajolkar-Resume.pdf");
  res.setHeader("Cache-Control", "private, no-store");
  res.end(resume);
};
