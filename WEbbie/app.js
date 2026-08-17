const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const projects = [
  {
    title: "Business Website",
    category: "web",
    description: "A modern company website with service sections and contact forms."
  },
  {
    title: "Hospital App UI",
    category: "app",
    description: "A medical app interface for viewing patients, doctors, and appointments."
  },
  {
    title: "Sales Dashboard",
    category: "dashboard",
    description: "An analytics dashboard showing revenue, users, and performance data."
  },
  {
    title: "Portfolio Website",
    category: "web",
    description: "A personal portfolio website for showcasing skills and projects."
  },
  {
    title: "Task Manager App",
    category: "app",
    description: "A productivity app for creating, updating, and tracking tasks."
  },
  {
    title: "Admin Dashboard",
    category: "dashboard",
    description: "A secure admin dashboard with charts, tables, and management tools."
  }
];

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙";
  }
});

function displayProjects(projectList) {
  projectGrid.innerHTML = "";

  if (projectList.length === 0) {
    projectGrid.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projectList.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p><strong>Category:</strong> ${project.category}</p>
      <p>${project.description}</p>
      <button class="primary-btn">View Details</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      openProjectModal(project);
    });

    projectGrid.appendChild(card);
  });

  revealElements();
}

function filterProjects() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProjects(filteredProjects);
}

searchInput.addEventListener("input", filterProjects);
categoryFilter.addEventListener("change", filterProjects);

function openProjectModal(project) {
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Please enter a valid email address.");
    return;
  }

  showToast("Message sent successfully!");
  contactForm.reset();
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth"
  });
}

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  reveals.forEach((element) => observer.observe(element));
}

loadTheme();
displayProjects(projects);