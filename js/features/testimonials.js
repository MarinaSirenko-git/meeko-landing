export function initTestimonials() {
  const testimonials = document.querySelector(".testimonials");

  if (!testimonials) return;

  const panels = Array.from(
    testimonials.querySelectorAll("[data-testimonial-panel]"),
  );
  const avatarButtons = Array.from(
    testimonials.querySelectorAll("[data-testimonial-target]"),
  );

  if (panels.length === 0 || avatarButtons.length === 0) return;

  const setActiveTestimonial = (targetId) => {
    panels.forEach((panel) => {
      const isActive = panel.id === targetId;

      panel.hidden = !isActive;
      panel.classList.toggle("testimonials__panel--active", isActive);
    });

    avatarButtons.forEach((button) => {
      const isActive = button.dataset.testimonialTarget === targetId;

      button.classList.toggle("testimonials__avatar--active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  avatarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTestimonial(button.dataset.testimonialTarget);
    });
  });
}
