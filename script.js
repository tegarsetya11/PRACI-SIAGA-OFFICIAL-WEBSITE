const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Buka menu navigasi" : "Tutup menu navigasi");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
      siteNav.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
  document.querySelectorAll(".agency-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--agency-tilt-x", `${x * 8}deg`);
      card.style.setProperty("--agency-tilt-y", `${y * -8}deg`);
    });

    const resetTilt = () => {
      card.style.removeProperty("--agency-tilt-x");
      card.style.removeProperty("--agency-tilt-y");
    };

    card.addEventListener("pointerleave", resetTilt);
    card.addEventListener("pointercancel", resetTilt);
  });
}

const photoTrigger = document.querySelector(".developer-photo-trigger");
const photoDialog = document.querySelector(".developer-photo-dialog");
const photoClose = document.querySelector(".developer-photo-close");

if (photoTrigger instanceof HTMLButtonElement && photoDialog instanceof HTMLDialogElement && photoClose instanceof HTMLButtonElement) {
  photoTrigger.addEventListener("click", () => photoDialog.showModal());
  photoClose.addEventListener("click", () => photoDialog.close());
  photoDialog.addEventListener("click", (event) => {
    if (event.target === photoDialog) {
      photoDialog.close();
    }
  });
  photoDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      photoDialog.close();
    }
  });
}
