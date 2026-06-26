import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const ACTIVE_PROPS = {
  scale: 1,
  duration: 0.4,
  ease: "power2.out",
  overwrite: "auto",
};

const INACTIVE_SCALE = 0.97;

export function initProcessCardScroll() {
  if (prefersReducedMotion) return;

  const section = document.querySelector(".process");
  if (!section) return;

  const cards = gsap.utils.toArray(".process__card", section);
  if (cards.length === 0) return;

  const activated = new WeakSet();

  const activateCard = (card) => {
    if (activated.has(card)) return;

    activated.add(card);
    gsap.to(card, ACTIVE_PROPS);
    card.classList.add("process__card--active");
  };

  gsap.set(cards, {
    transformOrigin: "center center",
    scale: INACTIVE_SCALE,
  });

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 60%",
      end: "bottom 40%",
      invalidateOnRefresh: true,
      onEnter: () => activateCard(card),
      onEnterBack: () => activateCard(card),
      onRefresh: (self) => {
        if (self.isActive) {
          activateCard(card);
        }
      },
    });
  });
}
