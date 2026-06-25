gsap.to(".word", {
  y: 0,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.15,
});

const btn = document.querySelector(".menu-btn");
const overlay = document.querySelector(".menu-overlay");

let isOpen = false;

gsap.set(overlay, {
  clipPath: "inset(0 0 100% 0)",
});

btn.addEventListener("click", () => {
  isOpen = !isOpen;

  gsap.to(overlay, {
    clipPath: isOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
    duration: 0.8,
    ease: "power4.inOut",
  });
});

// --- CURSOR GIF LOGIC ---
const hero = document.querySelector(".hero");
const cursor = document.querySelector(".cursor-mask");

const xTo = gsap.quickTo(cursor, "x", {
  duration: 0.35,
  ease: "power3.out",
});

const yTo = gsap.quickTo(cursor, "y", {
  duration: 0.35,
  ease: "power3.out",
});

hero.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

hero.addEventListener("mouseenter", () => {
  gsap.to(cursor, {
    opacity: 1,
    duration: 0, // РЕЗКОЕ появление
  });
});

hero.addEventListener("mouseleave", () => {
  gsap.to(cursor, {
    opacity: 0,
    duration: 0, // РЕЗКОЕ исчезновение
  });
});

/**3д */

const cards = document.querySelectorAll(".case-card");

cards.forEach((card) => {
  const maxRotate = 10;

  function handleMove(e) {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * (maxRotate * 2);
    const rotateX = (y / rect.height - 0.5) * (-maxRotate * 2);

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function reset() {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  card.addEventListener("mousemove", handleMove);
  card.addEventListener("mouseleave", reset);
});

/*index popup */

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-form");
  if (!popup) return;

  const closeBtn = popup.querySelector(".popup-close");
  const form = document.querySelector("form");

  const open = () => popup.classList.add("active");
  const close = () => popup.classList.remove("active");

  closeBtn?.addEventListener("click", close);

  popup.addEventListener("click", (e) => {
    if (e.target === popup) close();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    // простая валидация
    const inputs = form.querySelectorAll("input");
    let ok = true;

    inputs.forEach((i) => {
      if (!i.value.trim()) {
        ok = false;
        i.style.borderBottom = "1px solid red";
      }
    });

    if (!ok) return;

    open();
  });
});

/* law popup */

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-law");
  if (!popup) return;

  const titleEl = document.getElementById("popup-law-title");
  const textEl = document.getElementById("popup-law-text");
  const closeBtn = popup.querySelector(".popup-close");

  function openPopup(title, text) {
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;

    popup.classList.add("active");
  }

  function closePopup() {
    popup.classList.remove("active");
  }

  // открыть popup по кнопке
  document.querySelectorAll(".law-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      openPopup(btn.dataset.title || "", btn.dataset.text || "");
    });
  });

  // закрытие по кнопке
  closeBtn?.addEventListener("click", closePopup);

  // закрытие по фону
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
});

function add3D(cardSelector) {
  const card = document.querySelector(cardSelector);

  if (!card) return;

  const maxRotate = 10;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * (maxRotate * 2);
    const rotateX = (y / rect.height - 0.5) * (-maxRotate * 2);

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power3.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });
}

// применяем ко всем
add3D(".event1");
add3D(".event2");
add3D(".event3");
