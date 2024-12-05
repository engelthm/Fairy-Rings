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


// FEATURE PANELS
// Panel text
const oneText = gsap.utils.toArray([".one_text h2", ".one_text h4", ".one_text p"])
const twoText = gsap.utils.toArray([".two .panel_text h2", ".two .panel_text h4", ".two .panel_text p"])
const threeText = gsap.utils.toArray([".three .panel_text h2", ".three .panel_text h4", ".three .panel_text p"])

const panelText = gsap.utils.toArray([oneText, twoText, threeText]);
const panels = gsap.utils.toArray(".one", ".two", ".three");

var panelAnim = gsap.timeline({
  ease: "expo.inOut",
  scrollTrigger: {
    trigger: ".feature", 
    start: () => `bottom bottom`,
    end: "+=1000%",
    scrub: 2,
    pin: true, 
    toggleActions: "play reverse play reverse",
  }
});

// Mushroom ring
function mushRing(ring, rotateStart, rotateEnd) {
  panelAnim.fromTo(ring, {
    scale: 0, 
    rotation: rotateStart, 
    autoAlpha: 0
  }, {
    scale: 1,
    rotation: rotateEnd,
    autoAlpha: 1,
    stagger: {
      amount: 10
    }
  });
}
function mushRingReverse(ring, rotateStart, rotateEnd) {
  panelAnim.fromTo(ring, {
    scale: 1, 
    rotation: rotateStart, 
    autoAlpha: 1
  }, {
    scale: 0,
    rotation: rotateEnd,
    autoAlpha: 0,
    stagger: 5
  });
}

panelAnim.to(".one", {
  autoAlpha: 1, 
  y: 0, 
  duration: 2.5
});

mushRing(".ring.big", -36, 36)
mushRing(".ring.medium", 60, -60)
mushRing(".ring.small", -15, 15)

panelText.forEach(texts => {
  panelAnim.from(texts, {
    autoAlpha: 0, 
    y: 50,
    stagger: 0.0625
  });
}, 0);

panelText.forEach(texts => {
  panelAnim.from(texts, {
    autoAlpha: 1, 
    y: 0,
    stagger: 0.0625
  });
});

mushRingReverse(".ring.big", 36, -36)
mushRingReverse(".ring.medium", -60, 60)
mushRingReverse(".ring.small", 15, -15)

panelAnim.to(".one", {
  autoAlpha: 0, 
  y: 50,
  delay: 2.5
});

function panelWhole(panelName, mushStill) {
  panelAnim.to(panelName, {
    autoAlpha: 1, 
    y: 0,
    stagger: 5
  });
  panelAnim.to(mushStill, {
    clipPath: "circle(100% at 50% 100%)", 
    duration: 5
  }, 0);
  panelAnim.to(panelName, {
    autoAlpha: 0, 
    y: 50,
    stagger: 5
  });
  panelAnim.to(mushStill, {
    clipPath: "circle(0% at 50% 100%)", 
    duration: 5
  }, 0);
}

panelWhole(".two", ".two .panel_img")

panelWhole(".three", ".three .panel_img")

var moreAnim = gsap.timeline({
  ease: "expo.inOut",
  scrollTrigger: {
    trigger: ".more", 
    start: "top top",
    scrub: false,
    pin: true, 
    toggleActions: "play reverse play reverse",
  }
});

moreAnim.to(".more .panel_img img", {
  clipPath: "circle(200% at 50% 0%)", 
  duration: 1
});

moreAnim.from(".more .panel_text", {
  autoAlpha: 0, 
  y: 50,
  stagger: 0.0625
}, 0);


// BIOLUMINESCENCE
// const body = document.querySelector("body");
// const imgs = document.querySelector(".land_img img");
const shroom = document.querySelector("#glow");
const biolumPlay = gsap.timeline({paused:true});

const heroBiolum = gsap.utils.toArray("#hero_biolum");
const infoBiolum = gsap.utils.toArray("#info_biolum");
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

// const infoMove = gsap.timeline().from(infoBiolum, {
//   scrollTrigger: {
//     trigger: ".one_text", 
//     start: "center center+=25%",
//     end: "center top",
//     pin: false, 
//     scrub: false,
//     repeat: false,
//     toggleActions: "play reverse play reverse",
//     markers: "true", 
//     id: "biolum"
//   },
//   ease: "power4.inOut", 
//   drawSVG: 0,
//   stagger: true
// }, 0.125);
// biolumPlay.add(infoMove)

shroom.addEventListener("click", () => {
  if (!shroom.classList.contains("active")) {
    biolumPlay.play();
    shroom.classList.toggle("active");
    // body.classList.toggle("active");
    // imgs.classList.toggle("active");
  } else {
    biolumPlay.reverse();
    shroom.classList.toggle("active");
    // body.classList.toggle("active");
    // imgs.classList.toggle("active");
  }
});


// TS.PARTICLES
// tsParticles.load("tsparticles", {
//   fpsLimit: 60,
//   particles: {
//     color: {
//       value: "#94F8AF"
//     },
//     move: {
//       bounce: false,
//       direction: "none",
//       enable: true,
//       outModes: "out",
//       random: false,
//       speed: 2,
//       straight: false
//     },
//     number: { density: { enable: true, area: 800 }, value: 80 },
//     opacity: {
//       value: 0.5
//     },
//     shape: {
//       type: "circle"
//     },
//     size: {
//       value: { min: 1, max: 5 }
//     }
//   }
// });