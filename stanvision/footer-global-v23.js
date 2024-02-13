"use strict"; // Fix lenis in safari

// Play project embed video on hover
window.addEventListener("DOMContentLoaded", function() {
  onHoverPlayVideo();
});

function onHoverPlayVideo() {
  const videos = document.querySelectorAll(".autoplay-video");

  if (!videos.length) return;

  videos.forEach(function(video) {
    video.onmouseover = function() {
      if (this.classList.contains("autoplay-video")) {
        this.play();
      }
    };

    video.onmouseout = function() {
      if (this.classList.contains("autoplay-video")) {
        this.pause();
      }
    };
  });
}
  
// Lenis
gsap.registerPlugin(ScrollTrigger);

if (Webflow.env("editor") === undefined) {

    function initLenis() {
        const lenis = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.8,
            infinite: false,
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        $("[data-lenis-start]").on("click", function() {
            lenis.start();
        });
        $("[data-lenis-stop]").on("click", function() {
            lenis.stop();
        });
        $("[data-lenis-toggle]").on("click", function() {
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
  // Split text into words and characters, wrapping them in span tags
  new SplitType("[text-split]", {
    types: "words, chars", 
    tagName: "span"
  });

  // Function to link GSAP timelines to scroll position using ScrollTrigger
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play()
    });
  }

  // Animation for words sliding up into view
  $("[words-slide-up]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for words rotating into view
  $("[words-rotate-in]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), {
      rotationX: -90, duration: 0.6, ease: "power2.out", stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for words sliding from right
  $("[words-slide-from-right]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for letters sliding up
  $("[letters-slide-up]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for letters sliding down
  $("[letters-slide-down]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: -120, duration: 0.5, ease: "power1.out", stagger: { amount: 0.3 }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for letters fading in randomly
  $("[letters-fade-in-random]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" }
    });
    createScrollTrigger($(this), tl);
  });

  // Animation for scrubbing each word
  $("[scrub-each-word]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), {
      opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 }
    });
  });

  // Set initial opacity to avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

//Footer text animate
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit3 = new SplitType("[text-split3]", {
    types: "words, chars",
    tagName: "span"
  });
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Play tl when scrolled into view (90% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 95%",
      onEnter: () => timeline.play()
    });
  }
  
  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.3 } });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split3]", { opacity: 1 });
});

//Animate button text
let splitType = new SplitType("[hoverstagger='text']", {
  types: "words, chars",
  tagName: "span"
});

$("[hoverstagger='link']").each(function (index) {
  let text1 = $(this).find("[hoverstagger='text']").eq(0);
  let text2 = $(this).find("[hoverstagger='text']").eq(1);

  let tl = gsap.timeline({ paused: true });
  tl.to(text1.find(".char"), { yPercent: -100, duration: 0.3, stagger: { amount: 0.2 } });
  tl.from(text2.find(".char"), { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } }, 0);

  $(this).on("mouseenter", function () {
    tl.restart();
  });
  // $(this).on("mouseleave", function () {
  //   tl.reverse();
  // });
});

// Select custom cursor wrapper
var cursor = document.querySelector('.cursor-lines__wrapper');

// Fade-in cursor after 2 seconds
setTimeout(function() {
  cursor.style.opacity = '1';
}, 2000);

// Combined event handlers for cursor effects
var cursorSelectors = 'a, .swiper-pagination, .hamburger__menu, .home-showreel-wrapper-parent, .swiper-wrapper, .projects__item';

$(cursorSelectors).hover(
  function() { // mouseenter
    $('.cursor-line-one, .cursor-line-two').addClass('no-width-height');
  }, 
  function() { // mouseleave
    $('.cursor-line-one, .cursor-line-two').removeClass('no-width-height');
  }
);

// Cursor color change on hover based on background mode
$('[mode="light"], [mode="dark"]').hover(
  function() { // mouseenter
    var addClass = $(this).attr('mode') === "light" ? 'bg-black' : 'bg-white';
    $('.cursor-line-one, .cursor-line-two').addClass(addClass);
  }, 
  function() { // mouseleave
    var removeClass = $(this).attr('mode') === "light" ? 'bg-black' : 'bg-white';
    $('.cursor-line-one, .cursor-line-two').removeClass(removeClass);
  }
);

// Set Footer Copyright Year
Webflow.push(function() {
  $('.copyright-year').text(new Date().getFullYear());
});

// Cookie banner
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
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
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const cookieBanner = document.querySelector('#cookie-banner');
const hasCookieConsent = getCookie('cookies-consent');
if (!hasCookieConsent) {
    cookieBanner.classList.remove('cookie-message');
}
const consentCta = cookieBanner.querySelector('#consent-cookies');
consentCta.addEventListener('click', () => {
    cookieBanner.classList.add('cookie-message');
    setCookie('cookies-consent', 1, 365);
});

// Toggle mobile navigation menu
document.addEventListener("DOMContentLoaded", function() {
  function navigation() {
    const burger = document.querySelector(".hamburger__menu");
    const nav = document.querySelector(".section__navbar");

    if (burger && nav) {
      burger.addEventListener("click", function() {
        nav.classList.toggle("open");
      });
    }
  }

  navigation();
});

//Stagger cards
document.addEventListener("DOMContentLoaded", function() {
    staggerAnimation(".home-services__item", ".home-services__item", "y", 40);
    staggerAnimation(".awards__tab-link", ".swiper-slide", "x", 40);
    staggerAnimation(".swiper-slide", ".swiper-slide", "x", 40);
    staggerAnimation(".blog__col-item", ".blog__col-item", "x", 40);
    staggerAnimation(".related-projects-slide", ".related-projects-slide", "x", 40);
    staggerAnimation(".projects__col-item", ".projects__col-item", "y", -40);
    staggerAnimation(".journals__col-item", ".journals__col-item", "y", -40);
    staggerAnimation(".journal__tab-link", ".journal__tab-link", "x", 40);
});

function staggerAnimation(elementSelector, triggerSelector, direction, distance) {
    // Check if the element and trigger exist on the page
    if (document.querySelector(elementSelector) && document.querySelector(triggerSelector)) {
        staggerAnimation(elementSelector, triggerSelector, direction, distance);
    }
}

function staggerAnimation(elementSelector, triggerSelector, direction, distance) {
    const animationProperties = {
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top bottom"
        },
        duration: 0.6,
        stagger: 0.1,
        ease: "Power2.easeOut",
        delay: 0.4
    };

    animationProperties[direction] = distance;
    gsap.fromTo(elementSelector, {opacity: 0}, {...animationProperties, opacity: 1});
}

// Animate header highlitex color
gsap.fromTo(
  ".text-highlighted", 
  { backgroundColor: "rgba(0,0,0,0)" }, 
  { backgroundColor: "rgba(29,31,32,1)", delay: 1.5, duration: 0.2, ease: "Power2.easeOut" }
);

// Nest paragraph into H1
$(".span-wrapper").each(function(index) {
  // Find the corresponding '.span-element' for this index
  let relatedElement = $(".span-element").eq(index);

  // Append the found element to the current '.span-wrapper'
  relatedElement.appendTo($(this));
});

//Add cursor style changes based on mouse hover events (change to DRAG)
function setupCursorHoverEffects() {
  $('.swiper, .projects__item').each(function() {
    const cursorWrapper = $('.cursor-lines__wrapper');
    const isSwiper = $(this).hasClass('swiper');
    const addClass = isSwiper ? 'drag' : 'view-project';
    const removeClass = isSwiper ? 'drag' : 'view-project';

    $(this).hover(
      () => cursorWrapper.addClass(addClass),
      () => cursorWrapper.removeClass(removeClass)
    );
  });
}
document.addEventListener("DOMContentLoaded", setupCursorHoverEffects);

// Swiper
document.addEventListener("DOMContentLoaded", function() {
    initializeSlider(".slider-main_component", getGeneralSliderConfig);
    initializeSlider(".slider-main_component-awards", getAwardsSliderConfig);
    initializeSlider(".slider-main_component-products", getProductsSliderConfig);
});

function initializeSlider(selector, configFunction) {
    $(selector).each(function() {
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
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        slideActiveClass: "is-active",
        slideDuplicateClass: "is-active",
        breakpoints: {
            480: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 1.5, spaceBetween: 16 },
            992: { slidesPerView: 2.5, spaceBetween: 16, simulateTouch: false }
        },
        navigation: {
            nextEl: $(element).find(".swiper-next")[0],
            prevEl: $(element).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        }
    };
}
function getAwardsSliderConfig(element) {
    return {
        slidesPerView: 1.1,
        speed: 700,
        keyboard: true,
        spaceBetween: 16,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        breakpoints: {
            480: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 1.5, spaceBetween: 16 },
            992: { slidesPerView: 3.5, spaceBetween: 16, simulateTouch: false }
        },
        navigation: {
            nextEl: $(element).find(".swiper-next")[0],
            prevEl: $(element).find(".swiper-prev")[0],
            disabledClass: "is-disabled"
        }
    };
}
function getProductsSliderConfig(element) {
    return {
        slidesPerView: 1,
        speed: 700,
        keyboard: true,
        spaceBetween: 32,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        breakpoints: {
            480: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 1, spaceBetween: 16 },
            992: { slidesPerView: 1, spaceBetween: 16, simulateTouch: false }
        }
    };
}
