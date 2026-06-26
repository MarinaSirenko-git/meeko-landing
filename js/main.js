import { initI18n } from "./i18n/i18n.js";
import { initHeaderScroll } from "./features/headerScroll.js";
import { initHeroIntro } from "./features/heroIntro.js";
import { initHeroCardsScroll } from "./features/heroCardsScroll.js";
import { initMobileMenu } from "./features/mobileMenu.js";
import { loadDeferredFonts } from "./lib/loadDeferredFonts.js";
import { waitForCriticalFonts } from "./lib/waitForCriticalFonts.js";
import { ScrollTrigger } from "./lib/gsap.js";

async function whenLayoutReady() {
  if (document.readyState !== "complete") {
    await new Promise((resolve) => {
      window.addEventListener("load", resolve, { once: true });
    });
  }

  await waitForCriticalFonts();
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

async function initBelowFoldFeatures() {
  const [
    { initWorkCardsScroll },
    { initProcessCardScroll },
    { initTestimonials },
  ] = await Promise.all([
    import("./features/workCardsScroll.js"),
    import("./features/processCardScroll.js"),
    import("./features/testimonials.js"),
  ]);

  initWorkCardsScroll();
  initProcessCardScroll();
  initTestimonials();
  ScrollTrigger.refresh();
}

function scheduleBelowFoldFeatures() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(
      () => {
        void initBelowFoldFeatures();
      },
      { timeout: 3000 },
    );
    return;
  }

  window.setTimeout(() => {
    void initBelowFoldFeatures();
  }, 1);
}

async function bootstrap() {
  loadDeferredFonts();

  await initI18n();
  await whenLayoutReady();

  initHeroIntro();
  initHeroCardsScroll();
  initHeaderScroll();
  initMobileMenu();

  scheduleBelowFoldFeatures();
}

bootstrap();
