const themeToggle = document.querySelector(".theme-toggle");

function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Theme switching should still work when file:// storage is unavailable.
  }
}

function applyTheme(theme) {
  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  saveTheme(isDark ? "dark" : "light");

  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

const savedTheme = getSavedTheme() === "dark" ? "dark" : "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
  });
}
