// =======================================
// TECHNOVA FULL WEBSITE JAVASCRIPT
// =======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const projectGrid = document.getElementById("projectGrid");
const projectSearch = document.getElementById("projectSearch");
const projectFilter = document.getElementById("projectFilter");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const backToTop = document.getElementById("backToTop");

const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");

const projects = [
  {
    title: "Business Landing Page",
    category: "web",
    icon: "WEB",
    description:
      "A clean landing page for a company with modern sections, call-to-action buttons, and responsive design."
  },
  {
    title: "Hospital Patient UI",
    category: "app",
    icon: "APP",
    description:
      "A healthcare-style interface for viewing patients, appointments, and records in a simple layout."
  },
  {
    title: "Sales Analytics Dashboard",
    category: "dashboard",
    icon: "DATA",
    description:
      "A dashboard interface for tracking revenue, orders, users, and monthly performance."
  },
  {
    title: "Portfolio Website",
    category: "web",
    icon: "PORT",
    description:
      "A personal portfolio design for showing skills, projects, experience, and contact details."
  },
  {
    title: "Task Manager App",
    category: "app",
    icon: "TASK",
    description:
      "A productivity app interface for adding, viewing, filtering, and managing tasks."
  },
  {
    title: "Admin Control Panel",
    category: "dashboard",
    icon: "ADMIN",
    description:
      "An admin dashboard layout with cards, tables, quick actions, and management sections."
  }
];

const testimonials = [
  {
    text: "TechNova created a professional website that looked modern and worked perfectly on mobile devices.",
    name: "Lerato M.",
    role: "Small Business Owner"
  },
  {
    text: "The design was clean, fast, and easy to understand. The project was exactly what I needed.",
    name: "Daniel K.",
    role: "Startup Founder"
  },
  {
    text: "I liked how the website had real JavaScript features like filtering, modals, and form validation.",
    name: "Aisha P.",
    role: "Student Developer"
  }
];

let currentTestimonial = 0;

// Mobile menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Dark mode
function loadTheme() {
  const savedTheme = localStorage.getItem("technova-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("technova-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("technova-theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// Project cards
function displayProjects(projectList) {
  projectGrid.innerHTML = "";

  if (projectList.length === 0) {
    projectGrid.innerHTML = `<p class="empty-message">No projects found.</p>`;
    return;
  }

  projectList.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    card.innerHTML = `
      <div class="project-image">${project.icon}</div>
      <div class="project-body">
        <span>${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="btn secondary-btn view-project">View Details</button>
      </div>
    `;

    card.querySelector(".view-project").addEventListener("click", () => {
      openProjectModal(project);
    });

    projectGrid.appendChild(card);
  });

  observeRevealElements();
}

function filterProjects() {
  const searchValue = projectSearch.value.toLowerCase().trim();
  const selectedCategory = projectFilter.value;

  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchValue) ||
      project.description.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProjects(filtered);
}

projectSearch.addEventListener("input", filterProjects);
projectFilter.addEventListener("change", filterProjects);

// Project modal
function openProjectModal(project) {
  modalTitle.textContent = project.title;
  modalCategory.textContent = `Category: ${project.category}`;
  modalDescription.textContent = project.description;
  modal.classList.add("show");
}

function closeProjectModal() {
  modal.classList.remove("show");
}

modalClose.addEventListener("click", closeProjectModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

// Testimonials
function displayTestimonial(index) {
  const testimonial = testimonials[index];
  testimonialText.textContent = `"${testimonial.text}"`;
  testimonialName.textContent = testimonial.name;
  testimonialRole.textContent = testimonial.role;
}

nextTestimonial.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  displayTestimonial(currentTestimonial);
});

prevTestimonial.addEventListener("click", () => {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  displayTestimonial(currentTestimonial);
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const faqAnswer = faqItem.querySelector(".faq-answer");

    faqItem.classList.toggle("active");

    if (faqItem.classList.contains("active")) {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
    } else {
      faqAnswer.style.maxHeight = null;
    }
  });
});

// Contact form validation
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const service = document.getElementById("service");
  const message = document.getElementById("message");

  let isValid = true;

  clearErrors();

  if (name.value.trim().length < 2) {
    showError(name, "Please enter your full name.");
    isValid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (service.value === "") {
    showError(service, "Please select a service.");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters.");
    isValid = false;
  }

  if (!isValid) {
    showToast("Please fix the form errors.");
    return;
  }

  showToast("Message sent successfully!");
  contactForm.reset();
});

function showError(input, message) {
  const inputGroup = input.closest(".input-group");
  const small = inputGroup.querySelector("small");
  small.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".input-group small").forEach((small) => {
    small.textContent = "";
  });
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Toast message
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Reveal animation
function observeRevealElements() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      observer.observe(element);
    }
  });
}

// Active navigation link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll("main section[id]");
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Back to top button
window.addEventListener("scroll", () => {
  updateActiveNavLink();

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Start website
loadTheme();
displayProjects(projects);
displayTestimonial(currentTestimonial);
observeRevealElements();
