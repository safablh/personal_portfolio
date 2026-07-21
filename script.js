// Typing effect
const typingText = "AI Engineer";
const typingEl = document.getElementById("typing");
let i = 0;

function typeWriter() {
  if (i < typingText.length) {
    typingEl.textContent += typingText.charAt(i);
    i++;
    setTimeout(typeWriter, 30);
  }
}
typeWriter();

// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");

function checkReveal() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", checkReveal);
checkReveal();

// Project filters
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((p) => {
      const categories = p.dataset.category.split(" ");
      const isMatch = filter === "all" || categories.includes(filter);
      if (isMatch) {
        p.style.display = p.classList.contains("project-horizontal")
          ? "flex"
          : "block";
      } else {
        p.style.display = "none";
      }
    });
  });
});

// Bubble background animation
const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const bubbles = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvas.width,
  y: canvas.height + Math.random() * canvas.height,
  radius: Math.random() * 6 + 2,
  speed: Math.random() * 1 + 0.3,
  opacity: Math.random() * 0.4 + 0.1,
}));

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity})`;
    ctx.fill();

    b.y -= b.speed;
    if (b.y < -10) {
      b.y = canvas.height + 10;
      b.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateBubbles);
}
animateBubbles();

// Image sliders
function changeSlide(btn, direction) {
  const slider = btn.closest(".slider");
  const slides = slider.querySelectorAll(".slide");
  let activeIndex = [...slides].findIndex((s) =>
    s.classList.contains("active"),
  );

  slides[activeIndex].classList.remove("active");
  activeIndex = (activeIndex + direction + slides.length) % slides.length;
  slides[activeIndex].classList.add("active");

  updateDots(slider, activeIndex);
}

function updateDots(slider, activeIndex) {
  const dots = slider.querySelectorAll(".dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
}

document.querySelectorAll(".slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = slider.querySelector(".dots");

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      slides.forEach((s) => s.classList.remove("active"));
      slides[i].classList.add("active");
      updateDots(slider, i);
    });
    dotsContainer.appendChild(dot);
  });
});

// Lightbox
let currentSlider = null;
let currentIndex = 0;

function openLightbox(imgEl) {
  currentSlider = imgEl.closest(".slider");
  const slides = currentSlider.querySelectorAll(".slide");
  currentIndex = [...slides].indexOf(imgEl);

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = imgEl.src;
  lightbox.classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

function changeLightboxSlide(direction) {
  const slides = currentSlider.querySelectorAll(".slide");
  currentIndex = (currentIndex + direction + slides.length) % slides.length;

  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = slides[currentIndex].src;
}

document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
