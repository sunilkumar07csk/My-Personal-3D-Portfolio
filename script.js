const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let particles = [];

// Create particles
for (let i = 0; i < 1000; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    char: letters[Math.floor(Math.random() * letters.length)],
    size: 20 + Math.random() * 10
  });
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Bounce on edges
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.font = p.size + "px monospace";
    ctx.fillText(p.char, p.x, p.y);
  });

  requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// Typing effect
const roles = ["Software Developer","Python Developer","Full Stack Web Developer"];
let i=0, j=0;
const typingElement = document.getElementById("typing");

function typeRole() {
  if(j < roles[i].length) {
    typingElement.textContent += roles[i][j];
    j++;
    setTimeout(typeRole, 120);
  } else {
    setTimeout(eraseRole, 2000);
  }
}

function eraseRole() {
  if(j>0){
    typingElement.textContent = roles[i].substring(0,j-1);
    j--;
    setTimeout(eraseRole,5);
  } else {
    i = (i+1) % roles.length;
    setTimeout(typeRole,50);
  }
}

typeRole();
// Sections scroll reveal with smooth opacity & translate
const sections = document.querySelectorAll('.hero-container, .about-section, #skills, #projects, #contact');

function scrollReveal() {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const elementTop = section.getBoundingClientRect().top;
        const elementHeight = section.offsetHeight;

        // Calculate visibility progress (0 = hidden, 1 = fully visible)
        let progress = 1 - (elementTop / windowHeight);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Smooth opacity
        section.style.opacity = progress;

        // Smooth translateY effect (move up as it appears)
        section.style.transform = 'translateY(${50 * (1 - progress)}px)';
    });
}

// PROJECTS SCROLL REVEAL
function revealProjects() {
  const cards = document.querySelectorAll(".project-card");
  const trigger = window.innerHeight * 0.85;

  cards.forEach((card, index) => {
    const top = card.getBoundingClientRect().top;

    if (top < trigger) {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translate(0,0)";
      }, index * 200); // stagger animation
    }
  });
}

window.addEventListener("scroll", revealProjects);

// CONTACT SCROLL REVEAL (up & down)
function revealContact() {
  const section = document.querySelector(".contact-container");
  const trigger = window.innerHeight * 0.85;
  const top = section.getBoundingClientRect().top;

  if (top < trigger) {
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
  } else {
    section.style.opacity = "0";
    section.style.transform = "translateY(80px)";
  }
}

function revealContactOnScroll() {
  const contact = document.getElementById("contact");
  const windowHeight = window.innerHeight;
  const contactTop = contact.getBoundingClientRect().top;

  if (contactTop < windowHeight - 120) {
    contact.classList.add("show");
  } else {
    contact.classList.remove("show");
  }
}

window.addEventListener("scroll", revealContactOnScroll);

window.addEventListener("scroll", revealContact);
function goContact() {
  const contact = document.getElementById("contact");

  // Fast smooth scroll
  window.scrollTo({
    top: contact.offsetTop - 50,
    behavior: "smooth"
  });

  // Add rocket animation
  setTimeout(() => {
    contact.classList.add("show");
  }, 300);
}

// Listen to scroll
window.addEventListener('scroll', scrollReveal);

// Initial call in case page is mid-scroll
scrollReveal()