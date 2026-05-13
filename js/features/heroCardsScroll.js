import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const getHeroCards = () => {
  const cardsWrap = document.querySelector(".hero__cards");
  if (!cardsWrap) return null;

  const cards = gsap.utils.toArray(".hero-card", cardsWrap);
  if (cards.length === 0) return null;

  return { cardsWrap, cards };
};

const getCollapsedCardState = (card, centerCard) => {
  const cardRect = card.getBoundingClientRect();
  const centerRect = centerCard.getBoundingClientRect();

  return {
    x: centerRect.left - cardRect.left,
    y: centerRect.top - cardRect.top,
  };
};

export function initHeroCardsScroll() {
  if (prefersReducedMotion) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 1300px)", () => {
    const elements = getHeroCards();
    if (!elements || elements.cards.length < 3) return;

    const { cards } = elements;
    const centerCard = cards[1];

    gsap.set(cards, {
      transformOrigin: "center center",
    });

    const collapsedRotations = [-6, 0, 8];

    cards.forEach((card, index) => {
      const collapsedState = getCollapsedCardState(card, centerCard);

      gsap.set(card, {
        ...collapsedState,
        rotation: collapsedRotations[index] ?? 0,
        zIndex: index + 1,
      });
    });

    gsap.set(elements.cardsWrap, {
      autoAlpha: 1,
    });

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=350",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "none",
        stagger: 0.04,
      });
  });
}
