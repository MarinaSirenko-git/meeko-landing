import { gsap } from "../lib/gsap.js";
import { prefersReducedMotion } from "../lib/motion.js";

const getProcessElements = () => {
    const section = document.querySelector(".process");
    if (!section) return null;

    const cards = gsap.utils.toArray(".process__card", section);
    if (cards.length < 4) return null;

    const stats = document.querySelector(".stats");
    if (!stats) return null;

    const about = document.querySelector(".about");
    if (!about) return null;

    return { section, cards, stats, about };
};

export function initProcessCardScroll() {
    if (prefersReducedMotion) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1300px)", () => {
        const elements = getProcessElements();
        if (!elements) return;

        const { section, cards, stats, about } = elements;
        const targetCard = cards[0];

        const setInitialState = () => {
            cards.forEach((card, index) => {
                gsap.set(card, {
                    transformOrigin: "top center",
                    zIndex: index + 1,
                });
            });

            gsap.set([stats, about, cards[2]], { marginTop: 0 });
        };

        setInitialState();

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: targetCard,
                start: "top top+=160",
                end: "+=1200",
                scrub: 1,
                pin: section,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onRefreshInit: setInitialState,
            },
        });

        const getStackY = (stackIndex) => {
            const cardHeight = cards[0].offsetHeight || 333;
            return -cardHeight * stackIndex;
        };

        timeline
            .to(cards[1], { y: () => getStackY(1), scale: 0.98, ease: "power1.out" })
            .to(cards[0], { y: -10, scale: 0.94, ease: "power1.out" }, "<")
            .to(cards[2], { y: () => getStackY(1), ease: "power1.out" }, "<")
            .to(cards[3], { y: () => getStackY(1), ease: "power1.out" }, "<")
            .to([stats, about], { marginTop: () => -cards[0].offsetHeight, ease: "power1.out" }, "<")
            .to(cards[2], { y: () => getStackY(2), scale: 0.96, ease: "power1.out" })
            .to(cards[3], { y: () => getStackY(2), ease: "power1.out" }, "<")
            .to(cards[1], { y: () => getStackY(1) - 10, scale: 0.92, ease: "power1.out" }, "<")
            .to(cards[0], { y: -10, scale: 0.89, ease: "power1.out" }, "<")
            .to([stats, about], { marginTop: () => -cards[0].offsetHeight * 2, ease: "power1.out" }, "<")
            .to(cards[3], { y: () => getStackY(3), scale: 0.94, ease: "power1.out" })
            .to(cards[2], { y: () => getStackY(2) - 10, scale: 0.9, ease: "power1.out" }, "<")
            .to(cards[1], { y: () => getStackY(1) - 10, scale: 0.87, ease: "power1.out" }, "<")
            .to(cards[0], { y: -10, scale: 0.84, ease: "power1.out" }, "<")
            .to([stats, about], { marginTop: () => -cards[0].offsetHeight * 3, ease: "power1.out" }, "<");

        return timeline;
    });
}
