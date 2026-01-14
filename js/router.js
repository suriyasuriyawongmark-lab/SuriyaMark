// SPA Router Implementation
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
    this.contentElement = document.querySelector('main');

    // Handle navigation events
    window.addEventListener('popstate', this.handleRoute.bind(this));

    // Handle initial route
    this.handleRoute();
  }

  // Add a new route
  addRoute(path, callback) {
    this.routes[path] = callback;
    return this;
  }

  // Navigate to a specific route
  navigateTo(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  // Handle the current route
  handleRoute() {
    const path = window.location.pathname || '/';

    // If route exists, call its callback
    if (this.routes[path]) {
      this.currentRoute = path;
      this.routes[path]();
    } else {
      // Default to home route if not found
      this.navigateTo('/');
    }
  }

  // Update content based on route
  updateContent(content) {
    this.contentElement.innerHTML = content;

    // Reinitialize components for the new content
    this.initComponents();
  }

  // Initialize components after content update
  initComponents() {
    // Re-initialize project filters
    if (document.querySelector('.projects-filter')) {
      initProjectFilters();
    }

    // Re-initialize contact form
    if (document.getElementById('contactForm')) {
      initContactForm();
    }

    // Set active navigation link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-path') === this.currentRoute) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create router instance
  const router = new Router();

  // Store content sections
  const sections = {};
  document.querySelectorAll('section').forEach(section => {
    sections[section.id] = section.outerHTML;
  });


});

router.addRoute('/about', () => {
  router.updateContent(sections.about);
});

router.addRoute('/skills', () => {
  router.updateContent(sections.skills);
});

router.addRoute('/showcase', () => {
  router.updateContent(sections.showcase);
});

router.addRoute('/projects', () => {
  router.updateContent(sections.projects);
});

router.addRoute('/contact', () => {
  router.updateContent(sections.contact);
});

// Update navigation links for SPA
document.querySelectorAll('nav ul li a').forEach(link => {
  const path = link.getAttribute('href').replace('#', '/');

  // Update href for SPA navigation
  link.setAttribute('data-path', path);

  // Add click event for SPA navigation
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Navigate to the specified route
    router.navigateTo(path);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    const nav = document.querySelector('nav');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      const menuToggleBtn = document.getElementById('menu-toggle-btn');
      menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});