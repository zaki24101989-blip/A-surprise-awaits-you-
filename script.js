/* =========================================================================
   BIRTHDAY WISH — SCRIPT
   Everything you'd want to personalize lives in the CONFIG object below.
   Nothing else in this file needs to change for a normal edit.
   ========================================================================= */

const config = {
  // ---- Basics -------------------------------------------------------
  name: "Kawthar",
  age: "17",
  yourName: "zakaria",
  
  // ---- Greeting -------------------------------------------------------
  message: "Another year of your gentle laugh, your sweet ideas, and the graceful way you make ordinary days feel a little lighter. Today is entirely about celebrating you, darling.",
  
  // ---- Wishes section ---------------------------------------------------
  specialWishes: "May this year wrap you in beautiful moments, gentle happiness, and everything your soft heart deserves. May your smile stay bright as ever, your dreams bloom bigger, and your days be filled with memories as sweet as you are.",
  memories: "Memories",
  
  // ---- Closing ------------------------------------------------------
  closing: "Love you more than words could ever hold, sweetheart. Happy Birthday! ❤️",
  
  // ---- Letter (supports line breaks) ---------------------------------
  letter: "🤍 Happy Birthday, Kawthar 🤍\n\nSome people come into our lives so quietly, yet they end up making the sweetest, most unforgettable difference. You are one of those people for me.\n\nOn your birthday, I don't just want to wish you a wonderful day—I want to thank you for being the kind, gentle, and radiant soul you are. Your smile has a way of making ordinary moments feel special, and your presence brings a softness and happiness that is difficult to describe.\n\nI genuinely hope this new chapter of your life is filled with beautiful memories, endless laughter, good health, exciting opportunities, and every success you dream of. You deserve happiness not only today but every single day, habibti.\n\nI may not always find the perfect words, but I hope you know that you are truly special to me. Getting to know you has been one of the loveliest parts of my journey, and I feel grateful for every conversation, every smile, and every moment we've shared.\n\nIf life ever becomes difficult, I hope you remember how strong, talented, and incredible you are, in your own gentle way. Never stop believing in yourself, because I will always believe that you can achieve amazing things.\n\nOn your special day, my wish is simple: may your heart always be full of joy, your dreams continue to grow, and may you always have people around you who love and cherish you for exactly who you are.\n\nAnd if I could ask for one small gift today, it would be this—keep smiling, because your smile has a beautiful way of making the world softer and brighter.\n\nHappy Birthday, to the sweetest person 🤍\n\nMay this birthday be the beginning of your happiest, most memorable, and most beautiful year yet.\n\nWith all my warmest wishes,\n❤️ Someone who truly cares about you.",
  
  // ---- Gallery: empty (photos removed) --------------------------------
  gallery: [],
  
  // ---- 10 reasons: empty (section removed) ----------------------------
  reasons: [],
  
  // ---- Surprise popup ----------------------------------------------------
  surpriseMessage: "You bring such a gentle light to the world, just by being you. 🎉",
  
  // ---- Gift box reveal ----------------------------------------------------
  giftBoxMessage: "Surprise! A little something sweet is coming your way too 🎁✨",
  
  // ---- Rotating quotes shown in the closing section ----------------------
  quotes: [
    "\u201cAge is merely the number of years the world has been enjoying you.\u201d",
    "\u201cA birthday is nature's way of telling you to eat more cake.\u201d",
    "\u201cGrowing old is mandatory; growing joyful is a choice you keep making.\u201d",
  ],
};

/* ========================================================================
   INITIAL PAGE POPULATION
   ======================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  buildGallery();
  buildReasons();
  initEnvelope();
  initLightbox();
  initThemeSwitcher();
  initSurprise();
  initGiftBox();
  initVisitorCounter();
  initTypewriter();
  initCursorSparkles();
  initBgCanvas();
  initConfettiCanvas();
  initFullscreenToggle();
  
  document.getElementById("openSurpriseBtn").addEventListener("click", openSurprise);
});

function populateContent() {
  document.getElementById("landingName").textContent = config.name;
  document.title = `Happy Birthday, ${config.name}! 🎂`;
  
  document.getElementById("greetingAge").textContent = config.age ?
    `turning ${config.age} today` :
    "";
  document.getElementById("greetingMessage").textContent = config.message;
  
  document.getElementById("specialWishes").textContent = config.specialWishes;
  document.getElementById("memoriesText").textContent = config.memories;
  
  document.getElementById("letterText").textContent = config.letter;
  document.getElementById("closingMessage").textContent = config.closing;
  document.getElementById("footerSignature").textContent = `Made by ${config.yourName}`;
  
  document.getElementById("surpriseMessage").textContent = config.surpriseMessage;
  document.getElementById("giftMessage").textContent = config.giftBoxMessage;
  
  const quote = config.quotes[Math.floor(Math.random() * config.quotes.length)];
  document.getElementById("aiQuote").textContent = quote;
}

/* ========================================================================
   TYPEWRITER — greeting headline
   ======================================================================== */
function initTypewriter() {
  const el = document.getElementById("greetingTitle");
  const text = `🎉 Happy Birthday, ${config.name}! 🎂`;
  let i = 0;
  const type = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    } else {
      el.classList.remove("typewriter");
    }
  };
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        type();
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  obs.observe(document.getElementById("greeting"));
}

/* ========================================================================
   GALLERY + LIGHTBOX
   ======================================================================== */
function buildGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = config.gallery
    .map(
      (item, i) => `
      <div class="gallery-item" data-index="${i}">
        <img src="${item.src}" alt="${item.alt || "Memories"}" loading="lazy">
        <div class="gallery-caption">Memories</div>
      </div>`
    )
    .join("");
  
  grid.querySelectorAll(".gallery-item").forEach((el) => {
    el.addEventListener("click", () => openLightbox(Number(el.dataset.index)));
  });
}

let lightboxIndex = 0;

function initLightbox() {
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
}

function stepLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + config.gallery.length) % config.gallery.length;
  renderLightbox();
}

function renderLightbox() {
  const item = config.gallery[lightboxIndex];
  const img = document.getElementById("lightboxImg");
  img.src = item.src;
  img.alt = item.alt || "Gallery photo";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

/* ========================================================================
   REASONS
   ======================================================================== */
function buildReasons() {
  const grid = document.getElementById("reasonsGrid");
  grid.innerHTML = config.reasons
    .map(
      (reason, i) => `
      <div class="reason-card">
        <div class="reason-num">${String(i + 1).padStart(2, "0")}</div>
        <p>${reason}</p>
      </div>`
    )
    .join("");
}


/* ========================================================================
   ENVELOPE / LETTER
   ======================================================================== */
function initEnvelope() {
  const envelope = document.getElementById("envelope");
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}

/* ========================================================================
   THEME SWITCHER
   ======================================================================== */
function initThemeSwitcher() {
  const buttons = document.querySelectorAll(".theme-dot");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.setAttribute("data-theme", btn.dataset.theme);
      localStorage.setItem("bday-theme", btn.dataset.theme);
    });
  });
  const saved = localStorage.getItem("bday-theme");
  if (saved) document.body.setAttribute("data-theme", saved);
}

/* ========================================================================
   SURPRISE BUTTON + MODAL + FLOATING HEARTS
   ======================================================================== */
function initSurprise() {
  document.getElementById("oneMoreSurpriseBtn").addEventListener("click", () => {
    document.getElementById("surpriseModal").classList.add("open");
    spawnFloatingHearts(24);
    launchConfettiBurst();
  });
  document.getElementById("surpriseModalClose").addEventListener("click", () => {
    document.getElementById("surpriseModal").classList.remove("open");
  });
  document.getElementById("surpriseModal").addEventListener("click", (e) => {
    if (e.target.id === "surpriseModal") {
      document.getElementById("surpriseModal").classList.remove("open");
    }
  });
}

function openSurprise() {
  document.getElementById("landing").scrollIntoView({ behavior: "smooth" });
  document.getElementById("greeting").scrollIntoView({ behavior: "smooth" });
  launchConfettiBurst();
  spawnFloatingHearts(14);
}

function spawnFloatingHearts(count = 16) {
  const hearts = ["❤️", "💕", "💖", "💗", "💘"];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      heart.style.animationDuration = 3 + Math.random() * 2 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, i * 80);
  }
}

/* ========================================================================
   GIFT BOX REVEAL
   ======================================================================== */
function initGiftBox() {
  const box = document.getElementById("giftBox");
  box.addEventListener("click", () => {
    document.getElementById("giftMessage").classList.remove("hidden");
    box.textContent = "🎉";
    launchConfettiBurst();
    spawnEmojiRain(["🎈", "🎉", "✨", "🎂", "💛"], 20);
  }, { once: false });
}


/* ========================================================================
   VISITOR COUNTER (local, per-browser — swap for a real backend if desired)
   ======================================================================== */
function initVisitorCounter() {
  const key = "bday-visits";
  const count = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, count);
  document.getElementById("visitorCount").textContent = count;
}

/* ========================================================================
   CURSOR SPARKLES
   ======================================================================== */
function initCursorSparkles() {
  let last = 0;
  window.addEventListener("pointermove", (e) => {
    const now = Date.now();
    if (now - last < 60) return; // throttle
    last = now;
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.style.position = "fixed";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.fontSize = "0.8rem";
    sparkle.style.zIndex = 999;
    sparkle.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    sparkle.style.opacity = "0.9";
    document.body.appendChild(sparkle);
    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, -${20 + Math.random() * 20}px)`;
      sparkle.style.opacity = "0";
    });
    setTimeout(() => sparkle.remove(), 650);
  });
}

/* ========================================================================
   EMOJI RAIN (used by gift box + can be called any time)
   ======================================================================== */
function spawnEmojiRain(emojis, count = 20) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const drop = document.createElement("div");
      drop.className = "emoji-drop";
      drop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = 2.5 + Math.random() * 2 + "s";
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 5000);
    }, i * 60);
  }
}

/* ========================================================================
   FULLSCREEN TOGGLE
   ======================================================================== */
function initFullscreenToggle() {
  const btn = document.getElementById("fullscreenToggle");
  if (!btn) return;
  
  btn.addEventListener("click", () => {
    const doc = document;
    const isFullscreen = doc.fullscreenElement || doc.webkitFullscreenElement;
    
    if (!isFullscreen) {
      const el = doc.documentElement;
      const request =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen;
      if (request) request.call(el).catch(() => {});
    } else {
      const exit =
        doc.exitFullscreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;
      if (exit) exit.call(doc).catch(() => {});
    }
  });
  
  const syncIcon = () => {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    btn.textContent = isFullscreen ? "✕" : "⛶";
    btn.classList.toggle("is-fullscreen", !!isFullscreen);
    btn.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
  };
  document.addEventListener("fullscreenchange", syncIcon);
  document.addEventListener("webkitfullscreenchange", syncIcon);
}

/* ========================================================================
   BACKGROUND CANVAS — stars + gentle sparkle field (ambient, always on)
   ======================================================================== */
function initBgCanvas() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }
  window.addEventListener("resize", resize);
  resize();
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.twinkle += 0.02;
      const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ========================================================================
   CONFETTI + FIREWORKS CANVAS
   ======================================================================== */
let fxCtx, fxCanvas;
let confettiParticles = [];
let fireworkParticles = [];

function initConfettiCanvas() {
  fxCanvas = document.getElementById("fx-canvas");
  fxCtx = fxCanvas.getContext("2d");
  
  function resize() {
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
  
  function loop() {
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    updateConfetti();
    updateFireworks();
    requestAnimationFrame(loop);
  }
  loop();
  
  // A gentle confetti burst on load to welcome the visitor.
  launchConfettiBurst(30);
}

function launchConfettiBurst(count = 60) {
  const colors = ["#e8b86d", "#f2a9bd", "#cfa1e0", "#7fb0e8", "#ffffff"];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * fxCanvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: 2 + Math.random() * 3,
      vx: -1.5 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotSpeed: -6 + Math.random() * 12,
      life: 0,
    });
  }
}

function updateConfetti() {
  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    p.life++;
    fxCtx.save();
    fxCtx.translate(p.x, p.y);
    fxCtx.rotate((p.rotation * Math.PI) / 180);
    fxCtx.fillStyle = p.color;
    fxCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    fxCtx.restore();
  });
  confettiParticles = confettiParticles.filter((p) => p.y < fxCanvas.height + 40 && p.life < 500);
}

function launchFireworks() {
  const bursts = 6;
  for (let b = 0; b < bursts; b++) {
    setTimeout(() => {
      const cx = Math.random() * fxCanvas.width * 0.8 + fxCanvas.width * 0.1;
      const cy = Math.random() * fxCanvas.height * 0.4 + fxCanvas.height * 0.1;
      const color = `hsl(${Math.random() * 360}, 90%, 65%)`;
      const particles = 40;
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        fireworkParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          maxLife: 60 + Math.random() * 20,
        });
      }
    }, b * 400);
  }
  // Also drop confetti to layer the celebration
  launchConfettiBurst(80);
}

function updateFireworks() {
  fireworkParticles.forEach((p) => {
    p.vy += 0.03; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.life++;
    const alpha = Math.max(0, 1 - p.life / p.maxLife);
    fxCtx.beginPath();
    fxCtx.fillStyle = p.color.replace(")", `,${alpha})`).replace("hsl", "hsla");
    fxCtx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    fxCtx.fill();
  });
  fireworkParticles = fireworkParticles.filter((p) => p.life < p.maxLife);
}