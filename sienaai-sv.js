// Hero
function HeroCircles() {
  this.circles = document.querySelectorAll(".circles path");
  this.circleBig = this.circles[0];
  this.shapes = document.querySelectorAll(".shapes img");
  this.tl = gsap.timeline({
    defaults: {
      duration: 180,
      repeat: -1,
      ease: Power0.easeNone,
    },
  });

  this.showCircles();
  onResize(this.moveShapes.bind(this));
}

HeroCircles.prototype.showCircles = function () {
  gsap.fromTo(
    this.circles,
    {
      autoAlpha: 0,
      scale: 0.5,
      transformOrigin: "center",
    },
    {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeInOut.config(1.7),
      duration: 0.8,
      stagger: {
        each: 0.15,
        from: "end",
      },
      onComplete: this.moveShapes.bind(this),
    }
  );
};

HeroCircles.prototype.moveShapes = function () {
  if (this.tl) this.tl = null;

  this.tl = gsap.timeline({
    defaults: {
      duration: 180,
      repeat: -1,
      ease: Power0.easeNone,
    },
  });

  this.tl.to(this.shapes, {
    motionPath: {
      path: this.circleBig,
      align: this.circleBig,
      alignOrigin: [0.5, 0.5],
      start: function (i) {
        if (!i) return 0.6;
        if (i === 1) return 0.1;
        if (i === 2) return 0.4;
      },
      end: function (i) {
        if (!i) return 1.6;
        if (i === 1) return 1.1;
        if (i === 2) return 1.4;
      },
      onEnter: this.showShapes.bind(this),
    },
  });
};

HeroCircles.prototype.showShapes = function () {
  gsap.fromTo(
    this.shapes,
    {
      rotate: 90,
      scale: 0,
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: Power0.easeNone,
      stagger: 0.05,
    }
  );
};

function HeroTypewriter(selector) {
  this.el =
    typeof selector !== "object" ? document.querySelector(selector) : selector;
  this.textOne = this.el.getAttribute("data-type-one");
  this.textTwo = this.el.getAttribute("data-type-two");
  this.textThree = this.el.getAttribute("data-type-three");
  this.textFour = this.el.getAttribute("data-type-four");
  this.typewriter = new Typewriter(this.el, {
    loop: true,
    delay: 75,
  });

  this.startTypewriter();
}

HeroTypewriter.prototype.startTypewriter = function () {
  this.typewriter
    .typeString(this.textOne)
    .pauseFor(2000)
    .deleteAll(2)
    .typeString(this.textTwo)
    .pauseFor(500)
    .deleteAll(2)
    .typeString(this.textThree)
    .pauseFor(500)
    .deleteAll(2)
    .typeString(this.textFour)
    .pauseFor(500)
    .deleteAll(2)
    .start();
};

// Moving Gradient
function CanvasGradient(section) {
  this.section =
    typeof section !== "object" ? document.querySelector(section) : section;

  this.section.insertAdjacentHTML(
    "afterbegin",
    `
  <canvas></canvas>
  <div class="blur"></div>
  `
  );
  //   this.section.appendChild(document.createElement("canvas"));

  this.canvas = this.section.querySelector("canvas");
  this.w = null;
  this.h = null;
  this.ctx = this.canvas.getContext("2d");
  this.animation = null;

  this.setSize();
}

CanvasGradient.prototype.setSize = function () {
  this.w = this.section.getBoundingClientRect().width;
  this.h = this.section.getBoundingClientRect().height;

  this.canvas.width = this.w;
  this.canvas.height = this.h;
};

CanvasGradient.prototype.animate = function (cb) {
  cb();
  this.animation = requestAnimationFrame(() => this.animate(cb));
};

CanvasGradient.prototype.resumeAnimation = this.animate;

CanvasGradient.prototype.stopAnimation = function () {
  cancelAnimationFrame(this.animation);
  this.animation = null;
};

function Circle(canvas, config) {
  this.canvas = canvas;
  this.rMax = !config.rMax ? 300 : config.rMax;
  this.rMin = !config.rMin ? 100 : config.rMin;
  this.minViewWidth = !config.minViewWidth ? 768 : config.minViewWidth;
  this.maxViewWidth = !config.maxViewWidth ? 2560 : config.maxViewWidth;
  this.mass = 1;

  this.fluid = () =>
    this.rMin +
    (window.innerWidth / 100 - this.minViewWidth / 100) *
      ((100 * (this.rMax - this.rMin)) /
        (this.maxViewWidth - this.minViewWidth));
  this.r = gsap.utils.clamp(this.fluid(), this.rMin, this.rMax);
  this.x = !config.x ? this.r : config.x - this.r;
  this.y = !config.y ? this.r : config.y - this.r;
  this.rot = 0;
  this.velocity = { x: 0.5, y: 0.5, rot: 0.005 };
  this.dRot = 0.005;
}

Circle.prototype.draw = function () {
  this.r = gsap.utils.clamp(this.fluid(), this.rMin, this.rMax);
  const gradient = this.canvas.ctx.createConicGradient(
    this.rot,
    this.x,
    this.y
  );

  gradient.addColorStop(0.10875, "#DBFF1D");
  gradient.addColorStop(0.328125, "#FE7DC2");
  gradient.addColorStop(0.4875, "#FE7DC2");
  gradient.addColorStop(0.82292, "#FFA50E");

  this.canvas.ctx.beginPath();
  this.canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
  this.canvas.ctx.fillStyle = gradient;
  this.canvas.ctx.fill();
};

Circle.prototype.move = function () {
  if (this.x > window.innerWidth - this.r || this.x < this.r) {
    this.velocity.x = -this.velocity.x;
    this.velocity.rot = -this.velocity.rot;
  }
  if (this.y > window.innerHeight - this.r || this.y < this.r) {
    this.velocity.y = -this.velocity.y;
    this.velocity.rot = -this.velocity.rot;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.rot += this.velocity.rot;

  this.draw();
};

Circle.prototype.collide = function (circ) {
  const dx = this.x - circ.x;
  const dy = this.y - circ.y;

  const distance = Math.hypot(dx, dy);
  const sumRadius = this.r + circ.r;

  if (distance < sumRadius) return resolveCollision(this, circ);
};

// Collision Function -> https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

// Section 2
// -> Add additional container for (.product__chat-items) .product__chat-item
// -> Remove combo class .last on .product__chat-item

function TypeReply() {
  this.container = document.querySelector(".product-one__middle");
  this.input = document.querySelector(".product-one__bottom div");
  this.icon = document.querySelector(".product-one__bottom svg path");

  this.startingText = "I want a replacement for my bag and a refund on the boots.";
  this.thankYouText = "I'll have just the bag replaced as it arrived scratched. I will return the boots for a refund.";

  this.setSize();
}

TypeReply.prototype.setSize = function () {
  this.container.style.height = this.container.scrollHeight + "px";
  this.container.style.overflow = "hidden";
};

TypeReply.prototype.startTypewriter = function (text, cb) {
  new Typewriter(this.input, {
    delay: 45,
  })
    .typeString(text)
    .pauseFor(500)
    .callFunction(
      function () {
        this.sendMessage(text, function() {
            this.createPersonBubble(text);
            setTimeout(this.createNeilBubble.bind(this), 1500);
            setTimeout(function() {
                this.thankYouTipewriter(this.thankYouText);
            }.bind(this), 2500);
        }.bind(this));
      }.bind(this)
    )
    .start();
};

TypeReply.prototype.thankYouTipewriter = function (text, cb) {
    new Typewriter(this.input, {
        delay: 45,
    })
    .typeString(text)
    .pauseFor(500)
    .callFunction(
    function () {
        this.sendMessage(text, function() {
            this.createPersonBubble(text);
        }.bind(this));
    }.bind(this)
    )
    .start();
};

TypeReply.prototype.sendMessage = function (text, cb) {
  gsap.fromTo(
    this.icon,
    {
      scale: 1,
      transformOrigin: "50% 50%",
      fill: "#fff",
    },
    {
      scale: 0.9,
      fill: "#d9ff0f",
      ease: Power0.easeNone,
      duration: 0.15,
      onComplete: function () {
        gsap.to(this.icon, {
          scale: 1,
          fill: "#fff",
          duration: 0.15,
          ease: Power0.easeNone,
        });

        cb();
      }.bind(this),
    }
  );
};

TypeReply.prototype.createPersonBubble = function(text) {
    this.input.innerHTML = "Type a reply...";
    const clone = document.querySelector(".product__chat-item:nth-child(1)").cloneNode(true);
    clone.classList.add("clone");
    clone.querySelector(".chat p").textContent = text;
    this.container.firstElementChild.appendChild(clone);

    const y = clone.getBoundingClientRect().bottom - this.container.getBoundingClientRect().bottom  - gsap.getProperty(this.container.firstElementChild, "y");
    const mb = gsap.getProperty(clone, "margin-bottom");

    gsap.to(this.container.firstElementChild, {y: () => -y - mb})
}

TypeReply.prototype.createNeilBubble = function() {
    const clone = document.querySelector(".product__chat-item:nth-child(2)").cloneNode(true);
    clone.classList.add("clone");
    clone.querySelector(".chat p").textContent = "Hey Nora 👋 I got you! Do you want the same color for the bag? I can also exchange the boots. What do you think? 😊";
    this.container.firstElementChild.appendChild(clone);

    const y = clone.getBoundingClientRect().bottom - this.container.getBoundingClientRect().bottom - gsap.getProperty(this.container.firstElementChild, "y");
    const mb = gsap.getProperty(clone, "margin-bottom");

    gsap.to(this.container.firstElementChild, { y: () => -y - mb,})
}

// Tracking Animation

// -> Change position of icons in HTML
// -> Add attr data-tracking-icon on img containers
// -> Add attr data-tracking-icon on svg rects

function TrackingAnimation() {
  this.svg = document.querySelector(".tracking-svg");
  this.circles = this.svg.querySelectorAll("circle");
  this.endLines = this.svg.querySelectorAll(".lines .end");
  this.startLine = this.svg.querySelector(".lines .start");
  this.icons = document.querySelectorAll(".tracking-icons [data-tracking-icon]");
  this.start = false;
  this.tl = gsap.timeline({
    delay: 0.4,
    repeat: -1,
    paused: true,
  });

}

TrackingAnimation.prototype.animateCircles = function() {
  const wonderment = this.icons[1].firstElementChild;
  const aftership = this.icons[2].firstElementChild;

  this.setPosition(this.icons, this.svg);
  gsap.set(this.icons, {autoAlpha: 1});

  onResize(function() {
    this.setPosition(this.icons, this.svg);
  });

  this.tl
  .to(this.startLine,{
    strokeDashoffset: 0,
    strokeDasharray: (i, el) => {
      return el.getTotalLength();
    },
    autoAlpha: 0.45,
    duration: 0.25,
    ease: Power3.easeOut,
  })
  .to(this.startLine, {
    autoAlpha: 0,
      duration: 0.6,
      strokeDashoffset: "-16",
      strokeDasharray: (i, el) => {
        return "0 " +  el.getTotalLength();
      },
    }, ">25%")
    .to(
    this.circles,
    {
      delay: 0.1,
      duration: 1.5,
      ease: Power3.easeInOut,
      motionPath: {
        path: (i, circle) => {
          const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
          const line = document.querySelector(`[id="${id}"] path`);
          return line;
        },
        align: (i, circle) => {
          const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
          const line = document.querySelector(`[id="${id}"] path`);
          return line;
        },
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 1,
      },
    }, 0)
      .fromTo(
      this.circles,
      {
          autoAlpha: 0,
          attr: {
          cx: (i, circle) => Number(circle.getAttribute("cx"))
          },
      },
      {
          duration: 1,
          ease: Power1.easeOut,
          autoAlpha: 1,
          attr: {
          cx: (i, circle) => Number(circle.getAttribute("cx")) + (circle.getBoundingClientRect().width / 2)
          },
      }, "<")
      .fromTo(
      this.circles,
      {
          attr: {
          cx: (i, circle) => Number(circle.getAttribute("cx"))
          },
      },
      {
          duration: 1,
          ease: Power1.easeIn,
          attr: {
          cx: (i, circle) => Number(circle.getAttribute("cx")) + (circle.getBoundingClientRect().width / 2)
          },
      }, "<80%")
      .fromTo(this.endLines,{autoAlpha: 0}, {
        strokeDashoffset: 0,
        strokeDasharray: (i, el) => {
          return el.getTotalLength();
        },
        autoAlpha: 0.55,
        duration: 0.25,
        ease: Power3.easeOut,
        onStart: function() {
          gsap.to([wonderment, aftership], {
            repeat:1,
            yoyo: true,
            duration: 0.4,
            ease: Power2.easeOut,
            y: function(i) {
              if(!i) return 0.9;
              else return -0.9;
            },
          });
        },
      }, "<24%")
      .to(this.endLines, {
        autoAlpha: 0,
          duration: 0.6,
          strokeDashoffset: "-16",
          strokeDasharray: (i, el) => {
            return "0 " +  el.getTotalLength();
          },
        }, ">30%")

  return this.tl;
}

 TrackingAnimation.prototype.setPosition = function(imgs, svg) {
  imgs.forEach(img => {
    const rect = svg.querySelector(`[data-tracking-icon='${img.getAttribute("data-tracking-icon")}']`);

    img.style.position = "absolute";
    img.style.top = getRect(rect).top + "px";
    img.style.left = getRect(rect).left + "px";
    img.style.width = getRect(rect).width + "px";
    img.style.height = getRect(rect).height + "px";
    img.style.zIndex = 1;
  });
}
