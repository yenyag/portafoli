// =========================================================
// Efecto de escritura en el rol del héroe
// =========================================================
const roles = [
  "Estudiante de Ingeniería en Informática",
  "Backend Developer en formación",
  "Java · Spring Boot · SQL",
];

const typeTarget = document.getElementById("typeTarget");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typeTarget) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typeTarget.textContent = currentRole.slice(0, charIndex);

  let delay = isDeleting ? 35 : 65;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1800; // pausa al terminar de escribir
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

if (typeTarget) {
  if (prefersReducedMotion) {
    typeTarget.textContent = roles[0];
  } else {
    typeLoop();
  }
}

// =========================================================
// Revelado de secciones al hacer scroll
// =========================================================
const sections = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  sections.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((el) => observer.observe(el));
}

// =========================================================
// Año dinámico en el footer
// =========================================================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
