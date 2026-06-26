<p align="right" style="position: sticky; top: 0; z-index: 10; background-color: #ffffff; padding: 10px 0; margin: 0 0 8px; border-bottom: 1px solid #d0d7de;">
  <a href="#en"><strong>EN</strong></a>
  &nbsp;·&nbsp;
  <a href="#ru"><strong>RU</strong></a>
</p>

<h1 id="en" style="scroll-margin-top: 56px;">Meeko — Responsive Landing Page</h1>

> **Front-end portfolio case study.** Rebuilding a free Framer template from scratch — semantic markup, hand-tuned responsive layout, scroll-driven GSAP animation, and a custom i18n layer — deployed as a static site on Cloudflare Pages.

**Stack:** HTML · CSS · JavaScript · GSAP · Vite · Cloudflare Pages

🔗 **Live demo:** [https://meeko-landing.pages.dev](https://meeko-landing.pages.dev)  
🎨 **Design:** [Meeko template by elemis](https://www.framer.com/marketplace/templates/meeko/) · front-end implementation by me  
📦 **Repository:** [https://github.com/MarinaSirenko-git/meeko-landing](https://github.com/MarinaSirenko-git/meeko-landing)

---

## Context

The reference is a polished Framer portfolio template with rich motion. My job was not to export the template, but to **re-engineer it** — HTML, CSS, vanilla JS, and GSAP — while keeping the visual character and making it work across real devices.

This is a non-commercial portfolio project. The design belongs to the original author; the code, asset prep, responsive decisions, animation tuning, and deployment are mine.

## The challenge

The Framer reference is animation-heavy: entrance motion, scroll-driven scenes with cards, hover micro-interactions, and looping decorative effects. The goal — recreate the motion layer by hand in CSS and GSAP, preserving timing, easing, and scroll linkage; push the Lighthouse metrics higher; and make sure the layout holds up across all devices and when switching languages.

The hard parts:

- **Scroll-linked sequences** — hero cards unfolding on first scroll, works cards pinning and stacking with scrub, header position tied to scroll progress; each needs its own ScrollTrigger setup and refresh handling.
- **Layered motion** — CSS loops (photo carousel in the title, spinning badge text) running alongside one-shot GSAP timelines without fighting each other.
- **Interaction-safe pinning** — the works stack must pin and animate without blocking clicks on testimonials below (`pointer-events`, `z-index`, `ScrollTrigger.refresh()`).
- **Micro-interactions at scale** — roll-link label swaps on nav and CTAs, tilt on stats/capability chips, avatar lift, burger-to-X, social icon lift — all with `prefers-reduced-motion` fallbacks.
- **Boot order** — GSAP must not measure layout before fonts and styles load; i18n text changes must not break scroll trigger positions after refresh.

## What I built

- **Responsive layout** with breakpoints at **1300px** (layout / GSAP split) and **809px** (typography and grid reflow) — supporting the animation system, not the main engineering focus.
- **Custom i18n** — **EN · RU · TH · 中文 (zh-Hans)**, 126 keys, `npm run i18n:check`, desktop globe dropdown + mobile inline language row.
- **Accessibility & delivery:** skip link, semantic landmarks, reduced-motion bypass for GSAP, Vite → Cloudflare Pages.

## Lighthouse (production)

Audited on **[meeko-landing.pages.dev](https://meeko-landing.pages.dev)** with Google Lighthouse (June 2026), after responsive images, lazy i18n, and deferred font loading.

### Category scores


| Category       | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | **98** | **98**  |
| Accessibility  | **97** | **97**  |
| Best Practices | **100**| **100** |
| SEO            | **100**| **100** |


### Core metrics


| Metric                   | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| First Contentful Paint   | 1.8 s  | 0.6 s   |
| Largest Contentful Paint | 2.2 s  | 0.6 s   |
| Total Blocking Time      | 0 ms   | 0 ms    |
| Cumulative Layout Shift  | 0.002  | 0.088   |
| Speed Index              | 1.8 s  | 0.7 s   |


## Animations

### GSAP (7 modules)


| Module                 | Trigger               | What moves                                                                                                                                                             |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heroIntro.js`         | Page load             | Hero frame, three title lines, description, four floating decorations — fade/slide up with **stagger 0.12s**                                                           |
| `heroCardsScroll.js`   | Scroll, ≥1300px       | Three portfolio cards start collapsed on the centre card (offset **x/y**, rotation **−6° / 0° / 8°**), then unfold to grid on **scrub** over first **350px** of scroll |
| `workCardsScroll.js`   | Scroll + pin, ≥1300px | Four work cards **stack** with **y** + **scale** (down to **0.84**); testimonials block pulled up via **marginTop**; **pointer-events** toggled when pin completes     |
| `processCardScroll.js` | Scroll, all widths    | Process cards start at **opacity 0.6 / scale 0.96**; each card animates to full once when it enters the viewport — **one-way**, no revert on scroll back               |
| `headerScroll.js`      | Scroll, ≥1300px       | Fixed header **top 40px → 20px**, scrubbed over first **80px**                                                                                                         |
| `mobileMenu.js`        | Click                 | Drawer **y + fade** in/out; overlay **autoAlpha**; respects reduced motion (instant toggle)                                                                            |
| `testimonials.js`      | Click                 | Quote panel swap + active avatar state (JS-driven, no GSAP)                                                                                                            |


### CSS — looping & ambient


| Effect                  | Where                         | Mechanism                                                    |
| ----------------------- | ----------------------------- | ------------------------------------------------------------ |
| **Hero photo carousel** | Avatar in H1 (3 images)       | `@keyframes hero-frame-one/two/three` — **6s** opacity cycle |
| **Badge text spin**     | About + footer circular badge | `@keyframes badge-text-spin` — **20s** continuous rotation   |


### CSS — hover & focus micro-interactions


| Effect                               | Where                                                | Mechanism                                                                               |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Roll-link**                        | Header nav, “View project”, “Learn more”, footer CTA | Duplicate label track slides up **translateY(−50%)** on hover/focus                     |
| **Tilt**                             | Stats cards (×5), capability tags (×7)               | **±8°** rotate on hover                                                                 |
| **Social icon lift**                 | Header X / Dribbble / Instagram                      | **translateY(−2px)** + inset shadow                                                     |
| **Burger → X**                       | Mobile menu toggle                                   | Top/bottom lines rotate **±45°** into centre                                            |
| **Testimonial avatar lift**          | Avatar buttons                                       | **translateY(−2px)**; active avatar **64px → 80px**                                     |
| **Locale buttons**                   | Desktop dropdown + mobile row                        | Background highlight on hover/focus                                                     |
| **Button / card action transitions** | `.btn`, `.works-card__link`, `.hero-card__action`    | **transform** + **background-color** **0.25s** (paired with roll-link where applicable) |


### Global motion defaults

- `html { scroll-behavior: smooth }` with reduced-motion override.
- `.js .hero__cards { visibility: hidden }` until GSAP sets initial collapsed state (desktop).
- GSAP boot deferred until **`load` + `document.fonts.ready` + one rAF** before any ScrollTrigger layout reads.

## Engineering approach

Animation and layout are split by capability, not by page:

```text
js/features/
  heroIntro.js          — entrance timeline
  heroCardsScroll.js    — scroll-linked hero cards (≥1300px)
  workCardsScroll.js    — pinned work stack (≥1300px)
  processCardScroll.js  — one-way step activation (all breakpoints)
  mobileMenu.js         — drawer + overlay
  testimonials.js       — quote switcher
  headerScroll.js       — header behaviour on scroll
js/i18n/                — locale loader, switcher, applyTranslations()
```

GSAP initializes only after `window.load`, `document.fonts.ready`, and one animation frame — so ScrollTrigger does not measure DOM before styles apply. Fonts load via a dedicated `fonts.css` link before the main stylesheet to avoid preload warnings in production.

External placeholder links (social icons, “View project”) point to the [original Framer template](https://www.framer.com/marketplace/templates/meeko/) with `target="_blank"` and `rel="noopener noreferrer"`.

AI tools assisted with repetitive tasks (SVG cleanup, i18n wiring, docs). Layout decisions, animation timing, responsive behaviour, and final code review were done manually. See [Agent.md](./agents/Agent.md) for workflow notes.

## Tech stack


| Area             | Tools                                                    |
| ---------------- | -------------------------------------------------------- |
| Markup & styling | HTML, CSS (custom properties, desktop-first breakpoints) |
| Behaviour        | Vanilla JavaScript (ES modules)                          |
| Animation        | GSAP, ScrollTrigger                                      |
| i18n             | Custom JSON-based layer (`js/i18n/`)                     |
| Tooling          | Vite 6                                                   |
| Hosting          | Cloudflare Pages                                         |


## Local development

**Requirements:** Node.js 18+

```bash
git clone https://github.com/MarinaSirenko-git/meeko-landing.git
cd meeko-landing
npm install
npm run dev
```

Vite prints the local URL (default `http://localhost:5173`). Hot reload is enabled for HTML, CSS, and JS.

### Useful scripts


| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start dev server                             |
| `npm run build`      | Production build → `dist/`                   |
| `npm run preview`    | Serve `dist/` locally                        |
| `npm run i18n:check` | Verify translation key parity across locales |


## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this repository to GitHub.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repository and use these build settings:


| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | None (or Vite)  |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node.js version        | 18 or newer     |


1. Save and deploy. Cloudflare rebuilds on every push to the production branch.

### Option B — Manual deploy with Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name meeko-landing
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) installed and authenticated (`npx wrangler login`).

The live site is served from **[https://meeko-landing.pages.dev](https://meeko-landing.pages.dev)** (custom domain optional in Pages settings).

## Project structure

```text
/
  index.html
  css/                  # reset, variables, fonts, base, layout, components
  js/
    main.js             # bootstrap: i18n → layout ready → features
    i18n/               # locales + switcher
    features/           # scroll / menu / testimonials modules
    lib/                # gsap, motion helpers
  public/
    assets/             # fonts, icons, images
    favicon.svg
  agents/
    Agent.md
```

## Credits

- **Design:** [Meeko — free Framer template by elemis](https://www.framer.com/marketplace/templates/meeko/) ([Dribbble](https://dribbble.com/elemis)).
- **Front-end:** markup, responsive engineering, i18n, GSAP animation, optimization, and deployment by Marina Sirenko.
- Brand name and template content belong to the original author. This repo is for education and portfolio only — not for commercial resale as a standalone product.

---

<h1 id="ru" style="scroll-margin-top: 56px;">Meeko — адаптивный лендинг</h1>

> **Кейс для портфолио.** Пересборка бесплатного шаблона Framer с нуля — семантическая разметка, ручной адаптив, GSAP-анимации по скроллу и кастомный i18n — с деплоем статического сайта на Cloudflare Pages.

**Стек:** HTML · CSS · JavaScript · GSAP · Vite · Cloudflare Pages

🔗 **Демо:** [https://meeko-landing.pages.dev](https://meeko-landing.pages.dev)  
🎨 **Дизайн:** [шаблон Meeko от elemis](https://www.framer.com/marketplace/templates/meeko/) · фронтенд-реализация — моя  
📦 **Репозиторий:** [https://github.com/MarinaSirenko-git/meeko-landing](https://github.com/MarinaSirenko-git/meeko-landing)

---

## Контекст

Референс — Framer-шаблон портфолио, насыщенный анимациями. Задача была не экспортировать шаблон, а **пересобрать его** — HTML, CSS, vanilla JS и GSAP — сохранив визуальный характер и сделав страницу рабочей на реальных устройствах.

Это некоммерческий проект для портфолио. Дизайн принадлежит оригинальному автору; код, подготовка ассетов, адаптивные решения, настройка анимаций и деплой — мои.

## Задача

Framer-референс насыщен анимацией: entrance-motion, скролл-сцены с карточками, hover-микроинтеракции и зацикленные декоративные эффекты. Задача — воссоздать motion-слой вручную на CSS и GSAP, сохранив тайминг, easing и привязку к скроллу; поднять метрики Lighthouse; убедиться, что вёрстка не ломается на всех устройствах и при смене языка.

Сложные места:

- **Scroll-последовательности** — раскрытие hero-карточек при первом скролле, pin/stack в Works со scrub, смещение header по progress; у каждой свой ScrollTrigger и обработка refresh.
- **Наслоение motion** — CSS-циклы (карусель фото в заголовке, вращение текста на badge) параллельно с one-shot GSAP-таймлайнами.
- **Pin без поломки кликов** — стопка Works не должна перехватывать testimonials (`pointer-events`, `z-index`, `ScrollTrigger.refresh()`).
- **Микроинтеракции в масштабе** — roll-link на nav и CTA, tilt на stats/тегах, lift аватаров, burger→X, lift социконок — с fallback при `prefers-reduced-motion`.
- **Порядок загрузки** — GSAP не измеряет layout до шрифтов и стилей; смена языка не ломает позиции триггеров после refresh.

## Что сделано

- **Адаптивный layout** с брейкпоинтами **1300px** и **809px** — поддерживает анимации, но не был главным инженерным фокусом.
- **Кастомный i18n** — **EN · RU · TH · 中文**, 126 ключей, `npm run i18n:check`, globe на desktop + строка языков в mobile-меню.
- **Доступность и доставка:** skip link, landmarks, reduced motion для GSAP, Vite → Cloudflare Pages.

## Lighthouse (production)

Проверка **[meeko-landing.pages.dev](https://meeko-landing.pages.dev)** в Google Lighthouse (июнь 2026) после responsive images, lazy i18n и отложенной загрузки шрифтов.

### Оценки по категориям


| Категория          | Mobile | Desktop |
| ------------------ | ------ | ------- |
| Performance        | **98** | **98**  |
| Accessibility      | **97** | **97**  |
| Best Practices     | **100**| **100** |
| SEO                | **100**| **100** |


### Ключевые метрики


| Метрика                  | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| First Contentful Paint   | 1.8 s  | 0.6 s   |
| Largest Contentful Paint | 2.2 s  | 0.6 s   |
| Total Blocking Time      | 0 ms   | 0 ms    |
| Cumulative Layout Shift  | 0.002  | 0.088   |
| Speed Index              | 1.8 s  | 0.7 s   |


## Анимации

### GSAP (7 модулей)


| Модуль                 | Триггер               | Что двигается                                                                                                                                                |
| ---------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `heroIntro.js`         | Загрузка              | Frame, три строки заголовка, описание, четыре декорации — fade/slide вверх со **stagger 0.12s**                                                              |
| `heroCardsScroll.js`   | Скролл, ≥1300px       | Три hero-карточки стартуют схлопнутыми на центре (**x/y**, rotation **−6° / 0° / 8°**), раскрываются в сетку на **scrub** первых **350px**                   |
| `workCardsScroll.js`   | Скролл + pin, ≥1300px | Четыре карточки работ **стопкой** с **y** + **scale** (до **0.84**); testimonials подтягивается через **marginTop**; **pointer-events** после завершения pin |
| `processCardScroll.js` | Скролл, все ширины    | Карточки process стартуют **opacity 0.6 / scale 0.96**; при входе во viewport — полная яркость **один раз**, без отката при скролле назад                    |
| `headerScroll.js`      | Скролл, ≥1300px       | Header **top 40px → 20px**, scrub на первых **80px**                                                                                                         |
| `mobileMenu.js`        | Клик                  | Drawer **y + fade**; overlay **autoAlpha**; instant при reduced motion                                                                                       |
| `testimonials.js`      | Клик                  | Смена цитаты + active-состояние аватара (JS, без GSAP)                                                                                                       |


### CSS — циклы и фон


| Эффект                        | Где                  | Механизм                                                       |
| ----------------------------- | -------------------- | -------------------------------------------------------------- |
| **Карусель фото в заголовке** | Аватар в H1 (3 фото) | `@keyframes hero-frame-one/two/three` — цикл **6s** по opacity |
| **Вращение текста badge**     | About + footer       | `@keyframes badge-text-spin` — **20s** непрерывно              |


### CSS — hover и focus


| Эффект                     | Где                                               | Механизм                                            |
| -------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| **Roll-link**              | Nav, «View project», «Learn more», footer CTA     | Дублированный текст сдвигается **translateY(−50%)** |
| **Tilt**                   | Stats (×5), capability-теги (×7)                  | Поворот **±8°** при hover                           |
| **Lift социконок**         | X / Dribbble / Instagram в шапке                  | **translateY(−2px)**                                |
| **Burger → X**             | Кнопка меню                                       | Линии **±45°** в центр                              |
| **Lift аватаров**          | Testimonials                                      | **translateY(−2px)**; active **64px → 80px**        |
| **Кнопки языка**           | Dropdown + mobile row                             | Подсветка фона                                      |
| **Transitions на кнопках** | `.btn`, `.works-card__link`, `.hero-card__action` | **transform** + **background** **0.25s**            |


### Общие настройки motion

- `scroll-behavior: smooth` с отключением при reduced motion.
- `.js .hero__cards { visibility: hidden }` до GSAP initial state (desktop).
- GSAP стартует после **`load` + `document.fonts.ready` + один rAF** перед любыми layout-чтениями ScrollTrigger.

## Подход к реализации

Анимация и layout разделены по зонам ответственности, а не по страницам:

```text
js/features/
  heroIntro.js          — entrance timeline
  heroCardsScroll.js    — scroll-linked hero cards (≥1300px)
  workCardsScroll.js    — pinned work stack (≥1300px)
  processCardScroll.js  — one-way step activation (all breakpoints)
  mobileMenu.js         — drawer + overlay
  testimonials.js       — quote switcher
  headerScroll.js       — header behaviour on scroll
js/i18n/                — locale loader, switcher, applyTranslations()
```

GSAP инициализируется только после `window.load`, `document.fonts.ready` и одного animation frame — чтобы ScrollTrigger не измерял DOM до применения стилей. Шрифты подключаются отдельным `fonts.css` до основного stylesheet, чтобы избежать preload-предупреждений в production.

Внешние placeholder-ссылки (соцсети, «View project») ведут на [оригинальный Framer-шаблон](https://www.framer.com/marketplace/templates/meeko/) с `target="_blank"` и `rel="noopener noreferrer"`.

AI-инструменты помогали с рутиной (очистка SVG, i18n, документация). Решения по layout, таймингу анимаций, адаптиву и финальное ревью кода — вручную. Подробнее о workflow — в [Agent.md](./agents/Agent.md).

## Стек


| Область          | Инструменты                                              |
| ---------------- | -------------------------------------------------------- |
| Разметка и стили | HTML, CSS (custom properties, desktop-first breakpoints) |
| Поведение        | Vanilla JavaScript (ES modules)                          |
| Анимация         | GSAP, ScrollTrigger                                      |
| i18n             | Кастомный JSON-слой (`js/i18n/`)                         |
| Tooling          | Vite 6                                                   |
| Хостинг          | Cloudflare Pages                                         |


## Локальная разработка

**Требования:** Node.js 18+

```bash
git clone https://github.com/MarinaSirenko-git/meeko-landing.git
cd meeko-landing
npm install
npm run dev
```

Vite выведет локальный URL (по умолчанию `http://localhost:5173`). Hot reload включён для HTML, CSS и JS.

### Полезные команды


| Команда              | Описание                          |
| -------------------- | --------------------------------- |
| `npm run dev`        | Запуск dev-сервера                |
| `npm run build`      | Production-сборка → `dist/`       |
| `npm run preview`    | Локальный просмотр `dist/`        |
| `npm run i18n:check` | Проверка паритета ключей перевода |


## Деплой на Cloudflare Pages

### Вариант A — интеграция с Git (рекомендуется)

1. Запушьте репозиторий на GitHub.
2. В [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Выберите репозиторий и укажите настройки сборки:


| Параметр               | Значение        |
| ---------------------- | --------------- |
| Framework preset       | None (или Vite) |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node.js version        | 18 или новее    |


1. Сохраните и задеплойте. Cloudflare пересобирает сайт при каждом push в production-ветку.

### Вариант B — ручной деплой через Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name meeko-landing
```

Нужны установленный и авторизованный [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (`npx wrangler login`).

Живой сайт: **[https://meeko-landing.pages.dev](https://meeko-landing.pages.dev)** (кастомный домен — опционально в настройках Pages).

## Структура проекта

```text
/
  index.html
  css/                  # reset, variables, fonts, base, layout, components
  js/
    main.js             # bootstrap: i18n → layout ready → features
    i18n/               # locales + switcher
    features/           # scroll / menu / testimonials modules
    lib/                # gsap, motion helpers
  public/
    assets/             # fonts, icons, images
    favicon.svg
  agents/
    Agent.md
```

## Авторство

- **Дизайн:** [Meeko — бесплатный Framer-шаблон от elemis](https://www.framer.com/marketplace/templates/meeko/) ([Dribbble](https://dribbble.com/elemis)).
- **Фронтенд:** разметка, адаптив, i18n, GSAP-анимации, оптимизация и деплой — Marina Sirenko.
- Название бренда и контент шаблона принадлежат оригинальному автору. Репозиторий только для обучения и портфолио — не для коммерческой перепродажи как самостоятельного продукта.

