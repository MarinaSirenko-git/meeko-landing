import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const getWorkCards = () => {
  const wrapper = document.querySelector(".works__wrapper");
  if (!wrapper) return null;

  const pin = wrapper.querySelector(".works__pin");
  if (!pin) return null;

  const stack = pin.querySelector(".works__stack");
  if (!stack) return null;

  const cards = gsap.utils.toArray(".works-card", stack);
  if (cards.length === 0) return null;

  return { pin, stack, cards };
};

export function initWorkCardsScroll() {
  if (prefersReducedMotion) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 1300px)", () => {
    const elements = getWorkCards();
    if (!elements || elements.cards.length < 4) return;

    const { pin, stack, cards } = elements;
    const stackedOffset = 20;

    const setInitialState = () => {
      const pinHeight = pin.offsetHeight;
      gsap.set(stack, { y: 0 });
      cards.forEach((card, index) => {
        gsap.set(card, {
          transformOrigin: "top center",
          zIndex: index + 1,
          y: index === 0 ? 0 : pinHeight,
          scale: 1,
        });
      });
    };

    setInitialState();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top 130px",
        end: "+=1200",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onRefreshInit: setInitialState,
      },
    });

    timeline
      .to(cards[1], { y: stackedOffset, ease: "power2.out" })
      .to(cards[0], { scale: 0.97, ease: "power2.out" }, "<");

    timeline
      .to(cards[2], { y: stackedOffset * 2, ease: "power2.out" })
      .to(cards[0], { scale: 0.94, ease: "power2.out" }, "<")
      .to(cards[1], { scale: 0.97, ease: "power2.out" }, "<");

    timeline
      .to(cards[3], { y: stackedOffset * 3, ease: "power2.out" })
      .to(cards[0], { scale: 0.91, ease: "power2.out" }, "<")
      .to(cards[1], { scale: 0.94, ease: "power2.out" }, "<")
      .to(cards[2], { scale: 0.97, ease: "power2.out" }, "<");

    timeline
      .to(cards[3], { y: 0, scale: 1, ease: "power2.out" })
      .to(cards[0], { scale: 0.86, ease: "power2.out" }, "<")
      .to(cards[1], { scale: 0.89, ease: "power2.out" }, "<")
      .to(cards[2], { scale: 0.92, ease: "power2.out" }, "<");

    return timeline;
  });
}
