import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const getWorkCards = () => {
  const wrapper = document.querySelector(".works__wrapper");
  const stack = wrapper.querySelector(".works__stack");
  const cards = gsap.utils.toArray(".works-card", stack);

  return { wrapper, stack, cards };
};

export function initWorkCardsScroll() {
  if (prefersReducedMotion) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 1299px)", () => {
    const elements = getWorkCards();
    if (!elements) return;

    const { wrapper, stack, cards } = elements;
    const stackGap = 40;

    gsap.set(cards, {
      transformOrigin: "top center",
      zIndex: (index) => index + 1,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 130px",
        end: "+=1200",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(cards[1], { y: -cards[0].offsetHeight - 20, ease: "power2.out" })
      .to(
        stack,
        {
          y: 20,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[0],
        {
          scale: 0.97,
          ease: "power2.out",
        },
        "<",
      );
    timeline
      .to(cards[2], {
        y: -(cards[0].offsetHeight + cards[1].offsetHeight) - 40,
        ease: "power2.out",
      })
      .to(
        stack,
        {
          y: 40,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[0],
        {
          scale: 0.94,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[1],
        {
          scale: 0.97,
          ease: "power2.out",
        },
        "<",
      );
    timeline
      .to(cards[3], {
        y:
          -(
            cards[0].offsetHeight +
            cards[1].offsetHeight +
            cards[2].offsetHeight
          ) - 60,
        ease: "power2.out",
      })
      .to(
        stack,
        {
          y: 60,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[0],
        {
          scale: 0.91,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[1],
        {
          scale: 0.94,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[2],
        {
          scale: 0.97,
          ease: "power2.out",
        },
        "<",
      );
    timeline
      .to(cards[3], {
        y: -(
          cards[0].offsetHeight +
          cards[1].offsetHeight +
          cards[2].offsetHeight +
          stackGap * 3
        ),
        scale: 1,
        ease: "power2.out",
      })
      .to(
        cards[0],
        {
          scale: 0.86,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[1],
        {
          scale: 0.89,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        cards[2],
        {
          scale: 0.92,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        stack,
        {
          y: 0,
          ease: "power2.out",
        },
        "<",
      );

    return timeline;
  });
}
