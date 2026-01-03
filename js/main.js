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

  // After navbar is loaded, attach event listeners
  initMobileMenu();
  initProductsDropdown();
  initDesktopDropdown(); // NEW
}

// Mobile menu toggle
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navIcon = document.getElementById("nav-toggle-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      if (mobileMenu.classList.contains("hidden")) {
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      } else {
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        navIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      });
    });
  }
}

// Mobile products dropdown
function initProductsDropdown() {
  const productsToggle = document.getElementById("products-toggle");
  const productsSubmenu = document.getElementById("products-submenu");
  const productsIcon = document.getElementById("products-icon");

  if (productsToggle && productsSubmenu) {
    productsToggle.addEventListener("click", () => {
      productsSubmenu.classList.toggle("hidden");
      
      if (productsSubmenu.classList.contains("hidden")) {
        productsIcon.style.transform = "rotate(0deg)";
      } else {
        productsIcon.style.transform = "rotate(180deg)";
      }
    });
  }
}

// Desktop products dropdown (NEW FUNCTION)
function initDesktopDropdown() {
  const dropdown = document.getElementById("products-dropdown");
  const menu = document.getElementById("products-menu-desktop");
  const arrow = document.getElementById("products-arrow");

  if (dropdown && menu) {
    // Show dropdown on mouse enter
    dropdown.addEventListener("mouseenter", () => {
      menu.classList.remove("hidden");
      if (arrow) arrow.style.transform = "rotate(180deg)";
    });

    // Hide dropdown on mouse leave
    dropdown.addEventListener("mouseleave", () => {
      menu.classList.add("hidden");
      if (arrow) arrow.style.transform = "rotate(0deg)";
    });
  }
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponents);
} else {
  initComponents();
}