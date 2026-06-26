import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const getWorkElements = () => {
  const wrapper = document.querySelector(".works__wrapper");
  if (!wrapper) return null;

  const cards = gsap.utils.toArray(".works-card", wrapper);
  if (cards.length < 4) return null;

  const testimonials = document.querySelector(".testimonials");
  if (!testimonials) return null;

  return { wrapper, cards, testimonials };
};

export function initWorkCardsScroll() {
  if (prefersReducedMotion) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 1300px)", () => {
    const elements = getWorkElements();
    if (!elements) return;

    const { wrapper, cards, testimonials } = elements;
    const targetCard = cards[0];

    const setInitialState = () => {
      cards.forEach((card, index) => {
        gsap.set(card, {
          transformOrigin: "top center",
          zIndex: index + 1,
          y: 0,
          scale: 1,
        });
      });

      gsap.set(testimonials, { marginTop: 0 });
    };

    setInitialState();

    const updateWrapperPointerEvents = () => {
      const st = timeline?.scrollTrigger;
      if (!st) return;

      gsap.set(wrapper, {
        pointerEvents: st.progress >= 1 ? "none" : "auto",
      });
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: targetCard,
        start: "top top+=160",
        end: "+=1200",
        scrub: 1,
        pin: wrapper,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onRefreshInit: setInitialState,
        onUpdate: updateWrapperPointerEvents,
        onLeave: () => {
          gsap.set(wrapper, { pointerEvents: "none" });
        },
        onEnterBack: () => {
          gsap.set(wrapper, { pointerEvents: "auto" });
        },
      },
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateWrapperPointerEvents();
    });

    const getStackY = (stackIndex) => {
      const cardHeight = cards[0].offsetHeight || 560;
      return -cardHeight * stackIndex;
    };

    timeline
      .to(cards[1], { y: () => getStackY(1), scale: 0.98, ease: "power1.out" })
      .to(cards[0], { y: -10, scale: 0.94, ease: "power1.out" }, "<")
      .to(cards[2], { y: () => getStackY(1), ease: "power1.out" }, "<")
      .to(cards[3], { y: () => getStackY(1), ease: "power1.out" }, "<")
      .to(testimonials, { marginTop: () => -cards[0].offsetHeight, ease: "power1.out" }, "<")
      .to(cards[2], { y: () => getStackY(2), scale: 0.96, ease: "power1.out" })
      .to(cards[3], { y: () => getStackY(2), ease: "power1.out" }, "<")
      .to(cards[1], { y: () => getStackY(1) - 10, scale: 0.92, ease: "power1.out" }, "<")
      .to(cards[0], { y: -10, scale: 0.89, ease: "power1.out" }, "<")
      .to(testimonials, { marginTop: () => -cards[0].offsetHeight * 2, ease: "power1.out" }, "<")
      .to(cards[3], { y: () => getStackY(3), scale: 0.94, ease: "power1.out" })
      .to(cards[2], { y: () => getStackY(2) - 10, scale: 0.9, ease: "power1.out" }, "<")
      .to(cards[1], { y: () => getStackY(1) - 10, scale: 0.87, ease: "power1.out" }, "<")
      .to(cards[0], { y: -10, scale: 0.84, ease: "power1.out" }, "<")
      .to(testimonials, { marginTop: () => -cards[0].offsetHeight * 3, ease: "power1.out" }, "<");

    return timeline;
  });
}
