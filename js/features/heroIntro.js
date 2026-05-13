import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion.js";

const getHeroIntroElements = () => {
  const hero = document.querySelector(".hero");
  if (!hero) return null;

  const frame = hero.querySelector(".hero__frame");
  const hello = hero.querySelector(".hero__title-part--hello");
  const intro = hero.querySelector(".hero__title-part--intro");
  const role = hero.querySelector(".hero__title-part--role");
  const description = hero.querySelector(".hero__description");
  const decorations = [
    hero.querySelector(".hero__decoration--web"),
    hero.querySelector(".hero__decoration--no-code"),
    hero.querySelector(".hero__decoration--pen"),
    hero.querySelector(".hero__decoration--drink"),
  ];

  return {
    hero,
    frame,
    hello,
    intro,
    role,
    description,
    decorations,
  };
};

const getHeroIntroTargets = ({
  frame,
  hello,
  intro,
  role,
  description,
  decorations,
}) => [
  frame,
  hello,
  intro,
  role,
  description,
  ...decorations,
].filter((element) => element && element.offsetParent !== null);

const setupHeroIntro = (elements) => {
  if (prefersReducedMotion || !elements) return [];

  const targets = getHeroIntroTargets(elements);

  gsap.set(targets, {
    y: 20,
    autoAlpha: 0,
  });

  return targets;
};

const playHeroIntro = (targets) => {
  if (prefersReducedMotion || targets.length === 0) return;

  gsap.timeline().to(targets, {
    y: 0,
    autoAlpha: 1,
    duration: 0.55,
    ease: "power2.out",
    stagger: 0.12,
  });
};

export function initHeroIntro() {
  const elements = getHeroIntroElements();
  const targets = setupHeroIntro(elements);

  if (document.readyState === "complete") {
    playHeroIntro(targets);
    return;
  }

  window.addEventListener("load", () => playHeroIntro(targets), {
    once: true,
  });
}
