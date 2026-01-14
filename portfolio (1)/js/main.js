// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the SPA
  initApp();
});

// Main application initialization
function initApp() {
  // Initialize theme mode
  initThemeMode();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize navigation
  initNavigation();

  // Initialize project filters
  initProjectFilters();

  // Initialize contact form
  initContactForm();

  // Initialize video player
  initVideoPlayer();
}

// Theme mode toggling functionality
function initThemeMode() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  // Check if user has a saved preference
  const savedTheme = localStorage.getItem('theme');

  // Check for saved theme or system preference
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
  } else {
    body.classList.add('light-mode');
  }

  // Add click event to theme toggle button
  themeToggleBtn.addEventListener('click', () => {
    // Toggle dark/light mode
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Save preference
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  // Toggle menu on button click
  menuToggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Change icon based on menu state
    if (nav.classList.contains('active')) {
      menuToggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Close menu on window resize (if in desktop mode)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Navigation functionality (smooth scrolling & active links)
function initNavigation() {
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section');

  // Function to set the active link
  function setActiveLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Set active link on scroll
  window.addEventListener('scroll', setActiveLink);

  // Set active link on page load
  setActiveLink();

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Project filters functionality
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Default show all projects
  filterProjects('all');

  // Add click events to filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Get filter value
      const filterValue = btn.getAttribute('data-filter');

      // Filter projects
      filterProjects(filterValue);
    });
  });

  // Filter projects function
  function filterProjects(filter) {
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';

        // Add animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Hide after animation completes
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Validate form (simple validation)
      if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
      }

      // In a real application, you would send this data to a server
      // For this demo, we'll just show a success message
      alert(`ขอบคุณ ${name} สำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด`);

      // Clear form
      contactForm.reset();
    });
  }
}

// Helper function to animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
}

// Call animate on scroll function on scroll
window.addEventListener('scroll', animateOnScroll);

// Video player functionality
function initVideoPlayer() {
  const videoElement = document.getElementById('showcase-video');

  if (videoElement) {
    // Add video play/pause functionality
    videoElement.addEventListener('click', () => {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });

    // Add keyboard controls for the video
    document.addEventListener('keydown', (e) => {
      if (videoElement) {
        // Only handle keyboard events when video is in viewport
        const rect = videoElement.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isInViewport) {
          // Space bar to play/pause
          if (e.code === 'Space') {
            e.preventDefault();
            if (videoElement.paused) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
          }

          // Arrow left/right to seek backward/forward
          if (e.code === 'ArrowLeft') {
            videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
          }

          if (e.code === 'ArrowRight') {
            videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
          }

          // M key to mute/unmute
          if (e.code === 'KeyM') {
            videoElement.muted = !videoElement.muted;
          }
        }
      }
    });

    // Pause video when it's not in viewport to save resources
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !videoElement.paused) {
          videoElement.pause();
        }
      });
    }, {threshold: 0.2});

    observer.observe(videoElement);
  }
}