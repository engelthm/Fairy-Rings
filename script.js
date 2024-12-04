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


// MUSHROOM RINGS
// ScrollTrigger for the features panels
ScrollTrigger.create({
  trigger: ".feature", 
  start: () => `bottom bottom`,
  end: "+=300%",
  scrub: true,
  pin: true, 
  toggleActions: "play reverse play reverse",
  markers: true,
  id: "pin"
});
let mushroomRing = gsap.timeline({
  ease: "power4.inOut",
  scrollTrigger: {
    pinnedContainer: ".feature",
    trigger: ".one_text", 
    start: "top bottom-=12.5%",
    // end: "top top",
    scrub: false,
    toggleActions: "play reverse play reverse",
    markers: true,
    id: "mush"
  }
});

// Function for the text
function mushText(content) {
  mushroomRing.fromTo(content, {
    autoAlpha: 0, 
    y: 50
  }, {
    autoAlpha: 1, 
    y: 0, 
    stagger: 0.0625
  });
}

// Function for the ring of mushrooms
function mushRing(ring, rotateStart, rotateEnd) {
  mushroomRing.fromTo(ring, {
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

// Function for the still shrooms


// Functions in action
const oneText = gsap.utils.toArray([".one_text h4", ".one_text h2", ".one_text p"])

mushText(oneText)

mushRing(".ring.big", -36, 36)
mushRing(".ring.medium", 60, -60)
mushRing(".ring.small", -15, 15)

// mushStill(".two .panel_img")


// BIOLUMINESCENCE
// const body = document.querySelector("body");
// const imgs = document.querySelector(".land_img img");
const shroom = document.querySelector("#glow");
const biolumPlay = gsap.timeline({paused:true});

const heroBiolum = gsap.utils.toArray("#hero_biolum");
const infoBiolum = gsap.utils.toArray("#info_biolum");

const heroMove = gsap.timeline().from(heroBiolum, {
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: {
    amount: 1.25,
    from: "random",
  }
});
biolumPlay.add(heroMove)

const infoMove = gsap.timeline().from(infoBiolum, {
  scrollTrigger: {
    trigger: ".one_text", 
    start: "center center+=25%",
    end: "center top",
    pin: false, 
    scrub: false,
    repeat: false,
    toggleActions: "play reverse play reverse",
    markers: "true", 
    id: "biolum"
  },
  ease: "power4.inOut", 
  drawSVG: 0,
  stagger: true
}, 0.125);
biolumPlay.add(infoMove)

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