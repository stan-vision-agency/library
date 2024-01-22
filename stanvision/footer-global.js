"use strict"; // Fix lenis in safari

// Play project embed video on hover ***rewritten
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
  
// Lenis ***rewritten
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

    if (window.location.href === window.location.origin + "/") {
        setTimeout(initLenis, 2000); // Delayed initialization for homepage
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

/*
Use the following classes in your HTML to trigger animations:

- [text-split]: Splits text into words and chars.
- [words-slide-up]: Animates words sliding up into view.
- [words-rotate-in]: Animates words rotating into view.
- [words-slide-from-right]: Animates words sliding in from the right.
- [letters-slide-up]: Animates letters sliding up.
- [letters-slide-down]: Animates letters sliding down.
- [letters-fade-in-random]: Animates letters fading in at random.
- [scrub-each-word]: Animates each word with a scrub effect.
*/

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

// Combine mouseenter and mouseleave events for cursor scaling
$('a, .swiper-pagination, .hamburger__menu, .home-showreel-wrapper-parent, .swiper-wrapper, .projects__item').hover(
  function() { // mouseenter
    $('.cursor-line-one, .cursor-line-two').addClass('no-width-height');
  },
  function() { // mouseleave
    $('.cursor-line-one, .cursor-line-two').removeClass('no-width-height');
  }
);

// Combine mouseenter and mouseleave events for cursor color change
$('.is--bg-white, .is--bg-pale, .contacts__links-top-child').hover(
  function() { // mouseenter
    $('.cursor-line-one, .cursor-line-two').addClass('is--bg-black');
  },
  function() { // mouseleave
    $('.cursor-line-one, .cursor-line-two').removeClass('is--bg-black');
  }
);

//Set Footer Copyright Year
  Webflow.push(function() {
    $('.copyright-year').text(new Date().getFullYear());
  });

  
//Cookie banner
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



  navigation();
  function navigation() {
    const burger = document.querySelector(".hamburger__menu");
    const nav = document.querySelector(".section__navbar"); 

    burger.addEventListener("click", function() {
      nav.classList.toggle("open");
    })
  }

// Get the element with the class "element"
var cursor = document.querySelector('.cursor-lines__wrapper');

// Wait for 2 seconds
setTimeout(function() {
  // Change the opacity to 1 (100%)
  cursor.style.opacity = '1';
}, 2000);   
 