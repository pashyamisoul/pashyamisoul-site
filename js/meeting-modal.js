const meetingModal = document.getElementById("meeting-modal");
const meetingOpen = document.querySelector("[data-meeting-open]");
const meetingCloseButtons = document.querySelectorAll("[data-meeting-close]");

function openMeetingModal(event) {
  event.preventDefault();
  meetingModal.classList.add("is-open");
  meetingModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeMeetingModal() {
  meetingModal.classList.remove("is-open");
  meetingModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  meetingOpen.focus();
}

if (meetingModal && meetingOpen) {
  meetingOpen.addEventListener("click", openMeetingModal);

  meetingCloseButtons.forEach((button) => {
    button.addEventListener("click", closeMeetingModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && meetingModal.classList.contains("is-open")) {
      closeMeetingModal();
    }
  });
}
