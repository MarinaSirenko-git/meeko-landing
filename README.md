# Meeko Landing

EN | RU below

---

## EN

### Overview

Frontend implementation study based on a free Framer template.

This is a non-commercial learning project created to practice building an animated landing page with semantic HTML, CSS, JavaScript and GSAP.

The original visual reference is a free Framer template. The goal of this project is not to present the design as my own, but to recreate the frontend implementation from scratch and practice layout, responsive behavior and animation techniques.

### Live Demo

- Demo: not deployed yet
- Repository: current repository

### Design Source

Design reference: Free Framer template  
Original template author: https://dribbble.com/elemis 
Template URL: https://www.framer.com/marketplace/templates/meeko/

This project is used only for educational and portfolio purposes.

### Goals

- Practice semantic HTML structure.
- Rebuild a landing page layout from a visual reference.
- Organize CSS with variables and reusable components.
- Prepare and optimize local assets.
- Clean and adapt SVG illustrations from exported source.
- Learn basic GSAP animation patterns.
- Implement scroll-based and entrance animations.
- Improve responsive behavior across desktop, tablet and mobile.

### Tech Stack

- HTML
- CSS
- JavaScript
- GSAP
- ScrollTrigger
- Vite

### Features

- Responsive landing page layout.
- Semantic page structure.
- Local image and SVG assets.
- CSS variables for colors, spacing and typography.
- Inline and external SVG usage.
- Hero entrance animation.
- Scroll reveal animations.
- Staggered card animations.
- Decorative floating elements.
- Reduced motion support.

### Animations

This project uses both native CSS animations and GSAP.

CSS is used for lightweight effects:

- hover and focus states;
- small decorative floating icons;
- simple transitions.

GSAP is used for more controlled animations:

- hero entrance timeline;
- section reveal on scroll;

The project also respects `prefers-reduced-motion` where possible.

### Project Structure

```text
/
  index.html
  css/
    reset.css
    variables.css
    fonts.css
    base.css
    layout.css
    components.css
    styles.css
  js/
    main.js
    lib/
      gsap.js
      motion.js
    features/
      heroIntro.js
      heroCardsScroll.js
      processCardScroll.js
      workCardsScroll.js
      headerScroll.js
      mobileMenu.js
      testimonials.js
  public/
    assets/
      fonts/
      icons/
      images/
  agents/
    Agent.md
```

### What I Practiced

HTML:

- Semantic layout with `header`, `main`, `section`, `footer`, `nav`.
- Accessible navigation structure.
- Correct usage of links and buttons.
- Image attributes: `alt`, `width`, `height`, `loading`, `decoding`.
- SVG cleanup and preparation.

CSS:

- CSS custom properties.
- Responsive layout.
- BEM-style class naming.
- Typography setup.
- Decorative elements.
- Hover/focus states.
- Basic motion with transitions and keyframes.

JavaScript / GSAP:

- GSAP setup in a vanilla JavaScript project.
- Timeline animation.
- ScrollTrigger basics.
- Stagger animation.
- Animation hooks with reusable classes.
- Reduced motion handling.

### AI-Assisted Workflow

AI tools were used as development assistants during the project.

AI was used for:

- cleaning SVG markup exported from Framer;
- converting token-style colors into readable CSS variables;
- suggesting semantic HTML structure;
- reviewing naming and asset organization;
- improving documentation.

All final implementation decisions, code review, layout adjustments, responsive behavior and animation tuning were done manually.

More details are available in [Agent.md](./agents/Agent.md).

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Notes

This project is a frontend implementation study.
The original design belongs to its respective author.
The code, asset preparation, layout implementation and animations were rebuilt manually for learning and portfolio purposes.

### License / Credits

Design reference: Free Framer template by original author  
Implementation: Marina Sirenko

This project is not intended for commercial use as a standalone product.

---

## RU

### Обзор

Учебный фронтенд-проект, основанный на бесплатном шаблоне Framer.

Это некоммерческий проект для практики создания анимированного лендинга с использованием семантического HTML, CSS, JavaScript и GSAP.

Исходным визуальным референсом был бесплатный шаблон Framer. Цель проекта — не выдать дизайн за собственный, а воссоздать фронтенд-реализацию с нуля и отработать верстку, адаптив и анимационные техники.

### Демо

- Demo: пока не опубликовано
- Repository: текущий репозиторий

### Источник дизайна

Референс дизайна: бесплатный шаблон Framer  
Автор оригинального шаблона: https://dribbble.com/elemis  
Ссылка на шаблон: https://www.framer.com/marketplace/templates/meeko/

Проект используется только в учебных целях и для портфолио.

### Цели

- Практика семантической HTML-структуры.
- Воссоздание лендинга по визуальному референсу.
- Организация CSS через переменные и переиспользуемые компоненты.
- Подготовка и оптимизация локальных ассетов.
- Очистка и адаптация SVG из экспортированного исходника.
- Изучение базовых паттернов анимаций GSAP.
- Реализация entrance- и scroll-анимаций.
- Улучшение адаптивности для desktop, tablet и mobile.

### Технологии

- HTML
- CSS
- JavaScript
- GSAP
- ScrollTrigger
- Vite

### Функциональность

- Адаптивный layout лендинга.
- Семантическая структура страницы.
- Локальные изображения и SVG-ассеты.
- CSS-переменные для цветов, отступов и типографики.
- Использование inline и external SVG.
- Entrance-анимация hero-секции.
- Scroll reveal-анимации.
- Stagger-анимации карточек.
- Декоративные плавающие элементы.
- Поддержка reduced motion.

### Анимации

В проекте используются нативные CSS-анимации и GSAP.

CSS применяется для легких эффектов:

- состояния hover/focus;
- небольшие декоративные плавающие иконки;
- простые переходы.

GSAP применяется для более управляемых анимаций:

- timeline появления hero-секции;
- раскрытие секций при скролле;
- stagger-анимации элементов;

Там, где возможно, учитывается `prefers-reduced-motion`.

### Структура проекта

```text
/
  index.html
  css/
    reset.css
    variables.css
    fonts.css
    base.css
    layout.css
    components.css
    styles.css
  js/
    main.js
    lib/
      gsap.js
      motion.js
    features/
      heroIntro.js
      heroCardsScroll.js
      processCardScroll.js
      workCardsScroll.js
      headerScroll.js
      mobileMenu.js
      testimonials.js
  public/
    assets/
      fonts/
      icons/
      images/
  agents/
    Agent.md
```

### Что было отработано

HTML:

- Семантическая структура с `header`, `main`, `section`, `footer`, `nav`.
- Доступная структура навигации.
- Корректное использование ссылок и кнопок.
- Атрибуты изображений: `alt`, `width`, `height`, `loading`, `decoding`.
- Очистка и подготовка SVG.

CSS:

- CSS custom properties.
- Адаптивная верстка.
- Именование классов в стиле BEM.
- Настройка типографики.
- Декоративные элементы.
- Состояния hover/focus.
- Базовая анимация через transitions и keyframes.

JavaScript / GSAP:

- Подключение GSAP в vanilla JavaScript-проекте.
- Timeline-анимации.
- Базовый ScrollTrigger.
- Stagger-анимации.
- Animation hooks через переиспользуемые классы.
- Обработка reduced motion.

### AI-assisted Workflow

AI-инструменты использовались как помощники в процессе разработки.

AI применялся для:

- очистки SVG-разметки, экспортированной из Framer;
- преобразования token-цветов в читаемые CSS-переменные;
- подсказок по семантической HTML-структуре;
- ревью именования и организации ассетов;
- улучшения документации.

Все финальные решения по реализации, ревью кода, правки верстки, адаптив и анимационный тюнинг выполнялись вручную.

Подробнее — в [Agent.md](./agents/Agent.md).

### Установка

```bash
npm install
```

### Разработка

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

### Предпросмотр

```bash
npm run preview
```

### Примечания

Это учебный проект по фронтенд-реализации.
Оригинальный дизайн принадлежит его автору.
Код, подготовка ассетов, верстка и анимации были выполнены вручную для обучения и портфолио.

### Лицензия / Credits

Референс дизайна: бесплатный шаблон Framer от оригинального автора  
Реализация: Marina Sirenko

Проект не предназначен для коммерческого использования как самостоятельный продукт.
