import { initI18n } from "./i18n/i18n.js";
import { initHeaderScroll } from "./features/headerScroll.js";
import { initHeroIntro } from "./features/heroIntro.js";
import { initHeroCardsScroll } from "./features/heroCardsScroll.js";
import { initMobileMenu } from "./features/mobileMenu.js";
import { initProcessCardScroll } from "./features/processCardScroll.js";
import { initTestimonials } from "./features/testimonials.js";
import { initWorkCardsScroll } from "./features/workCardsScroll.js";
import { ScrollTrigger } from "./lib/gsap.js";

async function whenLayoutReady() {
  if (document.readyState !== "complete") {
    await new Promise((resolve) => {
      window.addEventListener("load", resolve, { once: true });
    });
  }

  await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

async function bootstrap() {
  await initI18n();
  await whenLayoutReady();

  initHeroIntro();
  initHeroCardsScroll();
  initWorkCardsScroll();
  initProcessCardScroll();
  initHeaderScroll();
  initMobileMenu();
  initTestimonials();

  ScrollTrigger.refresh();
}

bootstrap();
