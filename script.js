// CUSTOM CURSOR
const ball = new Cotton("#ball", {
  speed: 1, 
  models: ["a", "label", "button", "#load_enter"]
});
const ballRing = new Cotton("#ball_ring", {
  speed: 0.25, 
  models: ["a", "label", "button", "#load_enter"]
});


// CUSTOM TOOLTIPS BY TIPPY.JS
tippy("[title]", {
  theme: "custom",
  duration: 0,
  arrow: false,
  animation: "shift-toward-subtle",
  followCursor: true,
  zIndex: 9999999999,
  content(reference) {
    const title = reference.getAttribute("title");
    reference.removeAttribute("title");
    return title;
  },
});


// HOWLER.JS 
const sound = new Howl({
  src: "Assets/Audio/Spring of Deception Density & Time.mp3",
  autoplay: true,
  loop: true,
  volume: 0.5, 
  onplayerror: function() {
    sound.once("unlock", function() {
      sound.play();
    });
  }
});

const playAudio = document.getElementById("play");
const pauseAudio = document.getElementById("pause");

playAudio.addEventListener("click", function() {
  sound.play();
  playAudio.style.display = "none";
  pauseAudio.style.display = "flex";
});
pauseAudio.addEventListener("click", function() {
  sound.stop();
  pauseAudio.style.display = "none";
  playAudio.style.display = "flex";
});


// PERCENTAGE LOADER
loading();

function loading(_success) {
  inner = document.querySelector("#load_text");
  var w = 0,
    t = setInterval(function() {
      w = w + 1;
      inner.textContent = w+"%";
      if (w === 100) {
        clearInterval(t);
        w = 0;
      }
    }, 50);
};


// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip);

// Smooth scroll
ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1
});


// ON LOAD
// Loading animations
let loader = gsap.timeline({
  ease: "power4.inOut"
});
loader.from(".load_ring", { 
  duration: 5,
  drawSVG: 0, 
})
loader.fromTo("#load_text", {
  autoAlpha: 1,
}, {
  autoAlpha: 0,
}, 5.5);
loader.fromTo("#load_enter", {
  autoAlpha: 0,
}, {
  autoAlpha: 1,
}, 5.75);

// Hero elements
let enter = gsap.timeline({
  ease: "expo.inOut",
});
function heroText(className, movement, timing) {
  enter.fromTo(className, {
    duration: 1.5,
    autoAlpha: 0, 
    y: movement
  }, {
    autoAlpha: 1, 
    y: 0
  }, timing);
};

// Loading into Hero transition
document.querySelector("#load_enter").addEventListener("click", e => { 
  enter.to("#load_enter h2", {
    duration: 0.25,
    autoAlpha: 0
  }, 0);
  enter.to(".load_progress #load_enter", {
    duration: 0.5,
    backgroundColor: "#2E1E19"
  }, 0.25);
  enter.to(".load_progress", {
    duration: 1,
    scale: 7.5
  }, 0.25);
  enter.to(".load_wrap", {
    duration: 1,
    autoAlpha: 0
  }, 1);

  heroText(".head", 25, 1.5);
  heroText(".land_banner span", "60px", 2);

  var split = new SplitText("#title", {type: "words"});
  enter.from(split.words, {
    y: "225px",
    autoAlpha: 0,
    stagger: 0.125
  }, 2.5);

  heroText("#subtitle span", "20px", 3.75);
});


// BIOLUMINESCENCE
const body = document.querySelector("body");
const particles = document.querySelector("#particles-js");
const shroom = document.querySelector("#glow");
const biolumPlay = gsap.timeline({paused:true});

const heroBiolum = gsap.utils.toArray("#hero_biolum");
const infoBiolum = gsap.utils.toArray("#info_biolum");
const twoBiolum = gsap.utils.toArray("#two_biolum");
const threeBiolum = gsap.utils.toArray("#three_biolum");
const moreBiolum = gsap.utils.toArray("#more_biolum");

const heroMove = gsap.timeline().from(heroBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: {
    amount: 1.25,
    from: "random",
  }
});
biolumPlay.add(heroMove)


// FEATURE PANELS
// Panel text
const oneText = gsap.utils.toArray([".one_text h2", ".one_text h4", ".one_text p"])
const twoText = gsap.utils.toArray([".two .panel_text h2", ".two .panel_text h4", ".two .panel_text p"])
const threeText = gsap.utils.toArray([".three .panel_text h2", ".three .panel_text h4", ".three .panel_text p"])
const moreText = gsap.utils.toArray([".four .panel_text h2", ".more .panel_text h4", ".four .panel_text p", ".four .panel_text button"])
const moreImg = gsap.utils.toArray(".four .panel_img img")

const panelText = gsap.utils.toArray([oneText, twoText, threeText]);
const panels = gsap.utils.toArray(".one", ".two", ".three");

// Panel scrolltriggers
ScrollTrigger.create({
  trigger: ".feature", 
  start: () => `bottom bottom`,
  end: "+=375%",
  scrub: true,
  pin: true
});

var panelAnim = gsap.timeline({
  ease: "power4.inOut",
  scrollTrigger: {
    pinnedContainer: ".feature",
    trigger: ".panel.one", 
    start: "top top+=70%",
    end: "+=500%",
    scrub: 0.2,
    toggleActions: "play reverse play reverse"
  }
})

// Panel content
panelAnim.fromTo(".one", {
  autoAlpha: 0,
  duration: 2.5
}, {
  autoAlpha: 1
});

oneText.forEach(texts => {
  panelAnim.fromTo(texts, {
    autoAlpha: 0, 
    y: 50,
    stagger: 0.125
  }, {
    autoAlpha: 1, 
    y: 0,
  });
}, 1);

function mushRing(ring, rotateStart, rotateEnd) {
  panelAnim.fromTo(ring, {
    scale: 0, 
    rotation: rotateStart, 
    autoAlpha: 0
  }, {
    scale: 1,
    rotation: rotateEnd,
    autoAlpha: 1,
  });
}

mushRing(".ring.big", -72, 36)
mushRing(".ring.medium", 120, -60)
mushRing(".ring.small", -30, 15)

const infoMove = gsap.timeline().from(infoBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: true
}, 0.125);
biolumPlay.add(infoMove)

panelAnim.fromTo(".one", {
  autoAlpha: 1,
  y: 0,
  duration: 2.5
}, {
  autoAlpha: 0,
  y: 250
}, 5);

panelAnim.fromTo(".two", {
  autoAlpha: 0,
  y: 250,
  duration: 2.5
}, {
  autoAlpha: 1,
  y: 0
}, 5.5);

twoText.forEach(texts => {
  panelAnim.fromTo(texts, {
    autoAlpha: 0, 
    y: 50,
    stagger: 0.125
  }, {
    autoAlpha: 1, 
    y: 0,
  });
}, 6.5);

panelAnim.fromTo(".two .panel_img", {
  clipPath: "circle(0 at 50% 100%)", 
  duration: 5
}, {
  clipPath: "circle(100% at 50% 100%)"
}, 6.5);

const twoMove = gsap.timeline().from(twoBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: {
    amount: 1.25,
    from: "random",
  }, 
  scrollTrigger: {
    pinnedContainer: ".feature",
    trigger: ".panel.two", 
    start: "top top",
    scrub: 0.2
  }
}, 6.5);
biolumPlay.add(twoMove)

panelAnim.fromTo(".two", {
  autoAlpha: 1,
  y: 0,
  duration: 2.5
}, {
  autoAlpha: 0,
  y: 250
}, 11);

panelAnim.fromTo(".three", {
  autoAlpha: 0,
  y: 250,
  duration: 2.5
}, {
  autoAlpha: 1,
  y: 0
}, 11.5);

threeText.forEach(texts => {
  panelAnim.fromTo(texts, {
    autoAlpha: 0, 
    y: 50,
    stagger: 0.125
  }, {
    autoAlpha: 1, 
    y: 0,
  });
}, 12);

panelAnim.fromTo(".three .panel_img", {
  clipPath: "circle(0 at 50% 100%)", 
  duration: 5
}, {
  clipPath: "circle(100% at 50% 100%)"
}, 12);

const threeMove = gsap.timeline().from(threeBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: {
    amount: 1.25,
    from: "random",
  }, 
  scrollTrigger: {
    pinnedContainer: ".feature",
    trigger: ".panel.three", 
    start: "top top",
    scrub: 0.2
  }
}, 12);
biolumPlay.add(threeMove)

panelAnim.fromTo(".feature", {
  autoAlpha: 1,
  y: 0,
  duration: 2.5
}, {
  autoAlpha: 0,
  y: 250
}, 17);

// More panel
ScrollTrigger.create({
  trigger: ".more", 
  start: () => `top top`,
  end: "+=100%",
  scrub: true,
  pin: true
});

var moreAnim = gsap.timeline({
  ease: "power4.inOut",
  scrollTrigger: {
    pinnedContainer: ".more",
    trigger: ".panel.four", 
    start: "top bottom",
    scrub: 0.2,
    toggleActions: "play none none none"
  }
});

moreAnim.fromTo(".four", {
  autoAlpha: 0,
  y: 250,
  duration: 2.5
}, {
  autoAlpha: 1, 
  y: 0
});

moreAnim.fromTo(".four .panel_text", {
  autoAlpha: 0, 
  y: 50,
}, {
  autoAlpha: 1, 
  y: 0,
  stagger: 0.0625
}, 0.5);

moreText.forEach(texts => {
  moreAnim.fromTo(texts, {
    autoAlpha: 0, 
    y: 50,
    stagger: 0.125
  }, {
    autoAlpha: 1, 
    y: 0,
  });
}, 0.5);

moreImg.forEach(img => {
  gsap.fromTo(img, {
    clipPath: "circle(0 at 50% 0%)"
  }, {
    clipPath: "circle(200% at 50% 0%)", 
    duration: 2.5, 
    ease: "power4.inOut",
    scrollTrigger: {
      pinnedContainer: ".more",
      trigger: ".panel.four", 
      start: "top top+=25%",
      scrub: 0.2,
      toggleActions: "play none none none"
    }
  }, 0);
}, 5);

const moreMove = gsap.timeline().from(moreBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: {
    amount: 1.25,
    from: "random",
  }, 
  scrollTrigger: {
    pinnedContainer: ".more",
    trigger: ".panel.four", 
    start: "top top+=25%",
    scrub: 0.2
  }
}, 5);
biolumPlay.add(moreMove)


// PARTICLES.JS AND BIOLUM PLAY 
shroom.addEventListener("click", () => {
  if (!shroom.classList.contains("active")) {
    biolumPlay.play();
    particles.classList.toggle("active");
    shroom.classList.toggle("active");
    body.classList.toggle("active");
  } else {
    biolumPlay.reverse();
    particles.classList.toggle("active");
    shroom.classList.toggle("active");
    body.classList.toggle("active");
  }
});

particlesJS("particles-js", {
  particles: {
    number: { value: 250, density: { enable: true, value_area: 800 } },
    color: { value: "#94f8af" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#13E8E9" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.75,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 0, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 50, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: false
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
