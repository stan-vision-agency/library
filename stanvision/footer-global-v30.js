"use strict"; // Fix lenis in safari

// Play project embed video on hover
document.addEventListener("DOMContentLoaded", function () {
  const videoContainers = document.querySelectorAll(".autoplay-video");

  videoContainers.forEach(function (container) {
    const video = container.querySelector("video");

    if (!video) return;

    container.onmouseover = function () {
      video.play();
    };

    container.onmouseout = function () {
      video.pause();
    };
  });
});

// Lenis Smooth Scrolling
gsap.registerPlugin(ScrollTrigger);

if (Webflow.env("editor") === undefined) {
  function initLenis() {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $("[data-lenis-start]").on("click", function () {
      lenis.start();
    });
    $("[data-lenis-stop]").on("click", function () {
      lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function () {
      $(this).toggleClass("stop-scroll");
      if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    function connectToScrollTrigger() {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
    connectToScrollTrigger();
  }

  // Disable scrolling on the homepage for 2 seconds
  if (window.location.href === window.location.origin + "/") {
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
      initLenis(); // Initialize Lenis after 2 seconds
    }, 2000);
  } else {
    initLenis(); // Immediate initialization for other pages
  }
}

// Text Animation: This script animates text elements on the page as they scroll into view.
window.addEventListener("DOMContentLoaded", (event) => {
  // Check if the elements exist before initializing SplitType
  if (document.querySelector("[text-split]")) {
    new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span",
    });

    gsap.set("[text-split]", { opacity: 1 }); // Set initial opacity to avoid flash of unstyled content
  }

  // Function to link GSAP timelines to scroll position using ScrollTrigger
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play(),
    });
  }

  // Animation for words sliding up into view
  document.querySelectorAll("[words-slide-up]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(el.querySelectorAll(".word"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for words rotating into view
  document.querySelectorAll("[words-rotate-in]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.set(el.querySelectorAll(".word"), { transformPerspective: 1000 });
    tl.from(el.querySelectorAll(".word"), {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for words sliding from right
  document.querySelectorAll("[words-slide-from-right]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(el.querySelectorAll(".word"), {
      opacity: 0,
      x: "1em",
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.2 },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for letters sliding up
  document.querySelectorAll("[letters-slide-up]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(el.querySelectorAll(".char"), {
      yPercent: 100,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for letters sliding down
  document.querySelectorAll("[letters-slide-down]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(el.querySelectorAll(".char"), {
      yPercent: -120,
      duration: 0.5,
      ease: "power1.out",
      stagger: { amount: 0.3 },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for letters fading in randomly
  document.querySelectorAll("[letters-fade-in-random]").forEach((el) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(el.querySelectorAll(".char"), {
      opacity: 0,
      duration: 0.05,
      ease: "power1.out",
      stagger: { amount: 0.4, from: "random" },
    });
    createScrollTrigger(el, tl);
  });

  // Animation for scrubbing each word
  document.querySelectorAll("[scrub-each-word]").forEach((el) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top center",
        scrub: true,
      },
    });
    tl.from(el.querySelectorAll(".word"), {
      opacity: 0.2,
      duration: 0.2,
      ease: "power1.out",
      stagger: { each: 0.4 },
    });
  });
});

//Footer text animate
window.addEventListener("DOMContentLoaded", (event) => {
  // Check if the element exists before splitting
  if (document.querySelector("[text-split3]")) {
    // Split text into spans
    let typeSplit3 = new SplitType("[text-split3]", {
      types: "words, chars",
      tagName: "span",
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Play tl when scrolled into view (90% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 95%",
        onEnter: () => timeline.play(),
      });
    }

    // Check if elements for letters fade in exist
    if (document.querySelector("[letters-fade-in]")) {
      $("[letters-fade-in]").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.from($(this).find(".char"), {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
          stagger: { amount: 0.3 },
        });
        createScrollTrigger($(this), tl);
      });
    }

    // Set opacity for the split text to avoid flash of unstyled content
    gsap.set("[text-split3]", { opacity: 1 });
  }
});

//Animate button text
// Check if the elements for hover stagger exist
if (document.querySelector("[hoverstagger='text']")) {
  let splitType = new SplitType("[hoverstagger='text']", {
    types: "words, chars",
    tagName: "span",
  });

  $("[hoverstagger='link']").each(function (index) {
    // Check if the specific text elements exist
    if ($(this).find("[hoverstagger='text']").length > 0) {
      let text1 = $(this).find("[hoverstagger='text']").eq(0);
      let text2 = $(this).find("[hoverstagger='text']").eq(1);

      let tl = gsap.timeline({ paused: true });
      tl.to(text1.find(".char"), {
        yPercent: -120,
        duration: 0.3,
        stagger: { amount: 0.2 },
      });
      tl.from(
        text2.find(".char"),
        { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } },
        0,
      );

      $(this).on("mouseenter", function () {
        tl.restart();
      });
    }
  });
}

// Select custom cursor wrapper
var cursor = document.querySelector(".cursor-lines__wrapper");

// Fade-in cursor after 2 seconds
setTimeout(function () {
  cursor.style.opacity = "1";
}, 2000);

// Combined event handlers for cursor effects
var cursorSelectors =
  "a, .swiper-pagination, .hamburger__menu, .home-showreel-wrapper-parent, .swiper-wrapper, .projects__item";

$(cursorSelectors).hover(
  function () {
    // mouseenter
    $(".cursor-line-one, .cursor-line-two").addClass("no-width-height");
  },
  function () {
    // mouseleave
    $(".cursor-line-one, .cursor-line-two").removeClass("no-width-height");
  },
);

// Cursor color change on hover based on background mode
$('[mode="light"], [mode="dark"]').hover(
  function () {
    // mouseenter
    var addClass = $(this).attr("mode") === "light" ? "bg-black" : "bg-white";
    $(".cursor-line-one, .cursor-line-two").addClass(addClass);
  },
  function () {
    // mouseleave
    var removeClass =
      $(this).attr("mode") === "light" ? "bg-black" : "bg-white";
    $(".cursor-line-one, .cursor-line-two").removeClass(removeClass);
  },
);

// Set Footer Copyright Year
Webflow.push(function () {
  $(".copyright-year").text(new Date().getFullYear());
});

// Cookie banner
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const cookieBanner = document.querySelector("#cookie-banner");
const hasCookieConsent = getCookie("cookies-consent");
if (!hasCookieConsent) {
  cookieBanner.classList.remove("cookie-message");
}
const consentCta = cookieBanner.querySelector("#consent-cookies");
consentCta.addEventListener("click", () => {
  cookieBanner.classList.add("cookie-message");
  setCookie("cookies-consent", 1, 365);
});

// Toggle mobile navigation menu
document.addEventListener("DOMContentLoaded", function () {
  function navigation() {
    const burger = document.querySelector(".hamburger__menu");
    const nav = document.querySelector(".section__navbar");

    if (burger && nav) {
      burger.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
    }
  }

  navigation();
});

//Stagger cards
document.addEventListener("DOMContentLoaded", function () {
  // Set initial opacity for staggered elements
  gsap.set(".stagger-vertical, .stagger-horizontal, .grid-item", {
    opacity: 0,
  });
  setupStaggerAnimations();
});

function setupStaggerAnimations() {
  // Stagger animations for vertical and horizontal classes
  staggerAnimation(".stagger-vertical", "y", -40);
  staggerAnimation(".stagger-horizontal", "x", 40);

  // General stagger for grid items
  staggerGridAnimation(".grid-item");
}

function staggerAnimation(elementSelector, direction, distance) {
  const elements = gsap.utils.toArray(elementSelector);
  elements.forEach((element, index) => {
    // Initialize delay calculation for all elements, not just horizontal
    let delay = elements.length > 1 ? 0.1 * index : 0; // Apply delay if multiple elements

    // Define starting properties based on direction
    let startProperties = { opacity: 0 };
    startProperties[direction] = distance; // Move from right for x or from bottom for y

    gsap.fromTo(element, startProperties, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=100px",
        toggleActions: "play none none none",
      },
      opacity: 1,
      x: direction === "x" ? 0 : null, // Reset to original position if horizontal
      y: direction === "y" ? 0 : null, // Reset to original position if vertical
      delay: delay,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

function staggerGridAnimation(elementSelector) {
  const elements = gsap.utils.toArray(elementSelector);
  elements.forEach((element, index) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=100px",
        toggleActions: "play none none none",
      },
      opacity: 1, // Correctly animate to visible
      y: 0, // Reset to original position
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2 * (index % 3), // Apply a small delay based on column position for each row
    });
  });
}

// Animate header highlighted color only if the element exists
document.addEventListener("DOMContentLoaded", function () {
  const highlightedElements = document.querySelectorAll(".text-highlighted");
  if (highlightedElements.length > 0) {
    gsap.fromTo(
      ".text-highlighted",
      { backgroundColor: "rgba(0,0,0,0)" },
      {
        backgroundColor: "rgba(29,31,32,1)",
        delay: 1.5,
        duration: 0.2,
        ease: "Power2.easeOut",
      },
    );
  }
});

// Nest paragraph into H1
$(".span-wrapper").each(function (index) {
  // Find the corresponding '.span-element' for this index
  let relatedElement = $(".span-element").eq(index);

  // Append the found element to the current '.span-wrapper'
  relatedElement.appendTo($(this));
});

//Add cursor style changes based on mouse hover events (change to DRAG)
function setupCursorHoverEffects() {
  $(".swiper, .projects__item").each(function () {
    const cursorWrapper = $(".cursor-lines__wrapper");
    const isSwiper = $(this).hasClass("swiper");
    const addClass = isSwiper ? "drag" : "view-project";
    const removeClass = isSwiper ? "drag" : "view-project";

    $(this).hover(
      () => cursorWrapper.addClass(addClass),
      () => cursorWrapper.removeClass(removeClass),
    );
  });
}
document.addEventListener("DOMContentLoaded", setupCursorHoverEffects);

// Swiper
document.addEventListener("DOMContentLoaded", function () {
  initializeSlider(".slider-main_component", getGeneralSliderConfig);
  initializeSlider(".slider-main_component-awards", getAwardsSliderConfig);
  initializeSlider(".slider-main_component-products", getProductsSliderConfig);
});

function initializeSlider(selector, configFunction) {
  $(selector).each(function () {
    new Swiper($(this).find(".swiper")[0], configFunction(this));
  });
}

function getGeneralSliderConfig(element) {
  return {
    slidesPerView: 1.1,
    speed: 700,
    keyboard: true,
    spaceBetween: 16,
    loop: false,
    slideActiveClass: "is-active",
    slideDuplicateClass: "is-active",
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 1.5, spaceBetween: 16 },
      992: { slidesPerView: 2.5, spaceBetween: 16, simulateTouch: false },
    },
    navigation: {
      nextEl: $(element).find(".swiper-next")[0],
      prevEl: $(element).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
  };
}
function getAwardsSliderConfig(element) {
  return {
    slidesPerView: 1.1,
    speed: 700,
    keyboard: true,
    spaceBetween: 16,
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 1.5, spaceBetween: 16 },
      992: { slidesPerView: 3.5, spaceBetween: 16, simulateTouch: false },
    },
    navigation: {
      nextEl: $(element).find(".swiper-next")[0],
      prevEl: $(element).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
  };
}
function getProductsSliderConfig(element) {
  return {
    slidesPerView: 1,
    speed: 700,
    keyboard: true,
    spaceBetween: 32,
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 1, spaceBetween: 16 },
      992: { slidesPerView: 1, spaceBetween: 16, simulateTouch: false },
    },
  };
}

// Accordion
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length === 0) return;
  gsap.set(accordionItems, { opacity: 0, y: 50 });

  const allContents = document.querySelectorAll(".accordion-content");
  const allIcons = document.querySelectorAll(".accordion-title .icon");
  if (allContents.length > 0) {
    gsap.set(allContents, { height: 0, opacity: 0, display: "none" });
    gsap.set(allContents[0], { height: "auto", opacity: 1, display: "block" });
  }
  if (allIcons.length > 0) {
    gsap.set(allIcons[0], { rotation: 45 });
  }

  document.querySelectorAll(".accordion-title").forEach((title, index) => {
    title.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".icon");
      const isOpen = content.style.display === "block";

      if (!isOpen) {
        content.style.display = "block";
        content.style.height = "auto";
        const fullHeight = content.offsetHeight;
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: fullHeight,
            opacity: 1,
            duration: 0.3, // Reduced duration for faster animation
            ease: "power1.inOut",
            onComplete: () => (content.style.height = "auto"),
          },
        );
        gsap.to(icon, { rotation: 45, duration: 0.3 }); // Reduced duration for faster animation
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3, // Reduced duration for faster animation
          ease: "power1.inOut",
          onComplete: () => (content.style.display = "none"),
        });
        gsap.to(icon, { rotation: 0, duration: 0.3 }); // Reduced duration for faster animation
      }

      // Close other accordion contents
      allContents.forEach((otherContent, otherIndex) => {
        if (otherIndex !== index) {
          gsap.to(otherContent, {
            height: 0,
            opacity: 0,
            duration: 0.3, // Reduced duration for faster animation
            ease: "power1.inOut",
            onComplete: () => (otherContent.style.display = "none"),
          });
          gsap.to(allIcons[otherIndex], { rotation: 0, duration: 0.3 }); // Reduced duration for faster animation
        }
      });
    });
  });

  // Staggered animation for accordion items when they come into the viewport
  ScrollTrigger.batch(accordionItems, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.3,
        ease: "power1.out",
        overwrite: true,
      }),
    start: "top bottom-=100px",
  });
});
