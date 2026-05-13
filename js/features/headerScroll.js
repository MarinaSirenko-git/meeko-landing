import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

export function initHeaderScroll() {
  const header = document.querySelector(".header");

  if (!header || prefersReducedMotion) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 1300px)", () => {
    return gsap.to(header, {
      top: 20,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "+=80",
        scrub: true,
      },
    });
  });
}
