import gsap from "gsap";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  gsap.from(".layout p", {
    opacity: 0,
    y: 12,
    duration: 0.6,
    ease: "power2.out",
  });
}
