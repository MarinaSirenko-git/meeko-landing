import gsap from "gsap";
import { t } from "../i18n/i18n.js";
import { prefersReducedMotion } from "../lib/motion.js";

/** Mobile drawer + overlay open/close with GSAP */
export function initMobileMenu() {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");
  const menuDesktopMq = window.matchMedia("(min-width: 1299px)");

  if (!menuToggle || !mobileMenu || !mobileMenuOverlay) return;

  const getOpenLabel = () => t("common.openMenu");
  const getCloseLabel = () => t("common.closeMenu");
  const menuTweenDuration = 0.35;
  const menuTweenEase = "power2.out";

  const tweenTargets = [mobileMenu, mobileMenuOverlay];

  let menuTimeline = null;

  // Stop current timeline
  const killMenuAnimation = () => {
    if (menuTimeline) {
      menuTimeline.kill();
      menuTimeline = null;
    }
    gsap.killTweensOf(tweenTargets);
  };

  // Clear inline styles from GSAP
  const clearMenuGsapProps = () => {
    gsap.set(tweenTargets, { clearProps: true });
  };

  // Actions if user close menu
  const syncClosed = () => {
    mobileMenu.hidden = true;
    mobileMenuOverlay.hidden = true;
    mobileMenuOverlay.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", getOpenLabel());
    document.body.classList.remove("mobile-menu-open");
    clearMenuGsapProps();
  };

  // Actions if user open menu
  const syncOpenDom = () => {
    mobileMenu.hidden = false;
    mobileMenuOverlay.hidden = false;
    mobileMenuOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("mobile-menu-open");
  };

  // final state if user reduce animation
  const openInstant = () => {
    killMenuAnimation();
    syncOpenDom();
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", getCloseLabel());
    gsap.set(mobileMenu, {
      left: "50%",
      xPercent: -50,
      y: 0,
      autoAlpha: 1,
    });
    gsap.set(mobileMenuOverlay, { autoAlpha: 1 });
  };

  const closeInstant = () => {
    killMenuAnimation();
    syncClosed();
  };

  // start state before animation by open
  const animateOpen = () => {
    killMenuAnimation();
    syncOpenDom();
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", getCloseLabel());

    gsap.set(mobileMenu, {
      left: "50%",
      xPercent: -50,
      y: 20,
      autoAlpha: 0,
    });
    gsap.set(mobileMenuOverlay, { autoAlpha: 0 });

    menuTimeline = gsap.timeline({
      onComplete: () => {
        menuTimeline = null;
      },
    });
    menuTimeline.to(mobileMenu, {
      y: 0,
      autoAlpha: 1,
      duration: menuTweenDuration,
      ease: menuTweenEase,
    });
    menuTimeline.to(
      mobileMenuOverlay,
      {
        autoAlpha: 1,
        duration: menuTweenDuration,
        ease: menuTweenEase,
      },
      0,
    );
  };

  // start state before animation by close
  const animateClose = () => {
    killMenuAnimation();
    syncOpenDom();
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", getCloseLabel());

    gsap.set(mobileMenu, {
      left: "50%",
      xPercent: -50,
      y: 0,
      autoAlpha: 1,
    });
    gsap.set(mobileMenuOverlay, { autoAlpha: 1 });

    menuTimeline = gsap.timeline({
      onComplete: () => {
        menuTimeline = null;
        syncClosed();
      },
    });
    menuTimeline.to(mobileMenu, {
      y: 20,
      autoAlpha: 0,
      duration: menuTweenDuration,
      ease: menuTweenEase,
    });
    menuTimeline.to(
      mobileMenuOverlay,
      {
        autoAlpha: 0,
        duration: menuTweenDuration,
        ease: menuTweenEase,
      },
      0,
    );
  };

  const isDesktopLayout = () => menuDesktopMq.matches;

  const setMenuOpen = (open) => {
    if (isDesktopLayout()) {
      closeInstant();
      return;
    }
    if (prefersReducedMotion) {
      if (open) {
        openInstant();
      } else {
        closeInstant();
      }
      return;
    }
    if (open) {
      animateOpen();
    } else {
      animateClose();
    }
  };

  const forceCloseForDesktop = () => {
    if (!menuDesktopMq.matches) return;
    closeInstant();
  };

  menuDesktopMq.addEventListener("change", forceCloseForDesktop);
  forceCloseForDesktop();

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  mobileMenuOverlay.addEventListener("click", () => {
    setMenuOpen(false);
  });

  mobileMenu.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  mobileMenu.querySelectorAll("[data-locale-option]").forEach((button) => {
    button.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("localechange", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", isOpen ? getCloseLabel() : getOpenLabel());
  });
}
