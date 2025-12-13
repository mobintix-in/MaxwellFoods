// Load external components
async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      console.warn(`Failed to load ${path}: ${res.status}`);
      return;
    }
    const html = await res.text();
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  } catch (e) {
    console.warn("Failed to load", path, e);
  }
}

// Initialize navbar and footer
async function initComponents() {
  await loadComponent("navbar", "../components/navbar.html");
  await loadComponent("footer", "../components/footer.html");

  // After navbar is loaded, attach mobile menu toggle
  initMobileMenu();
  initProductsDropdown();
}

// Mobile menu toggle functionality
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navIcon = document.getElementById("nav-toggle-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      // Toggle hamburger icon (bars to X)
      if (mobileMenu.classList.contains("hidden")) {
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      } else {
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      });
    });
  } else {
    console.warn("Mobile menu elements not found");
  }
}

// Products dropdown toggle for mobile
function initProductsDropdown() {
  const productsToggle = document.getElementById("products-toggle");
  const productsSubmenu = document.getElementById("products-submenu");
  const productsIcon = document.getElementById("products-icon");

  if (productsToggle && productsSubmenu) {
    productsToggle.addEventListener("click", () => {
      productsSubmenu.classList.toggle("hidden");
      
      // Rotate icon
      if (productsSubmenu.classList.contains("hidden")) {
        productsIcon.style.transform = "rotate(0deg)";
      } else {
        productsIcon.style.transform = "rotate(180deg)";
      }
    });
  }
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponents);
} else {
  initComponents();
}