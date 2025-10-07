// ========================================
// Initialization - Ensure content is visible
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Fallback to ensure all sections and elements are visible
  document.querySelectorAll('section, .skill-category, .project-card, .timeline-item, .stat-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// ========================================
// Navigation Functionality
// ========================================
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');

// Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');

      // Animate stats counter
      if (entry.target.classList.contains('stat-item')) {
        animateCounter(entry.target);
      }

      // Stagger animation for children
      const children = entry.target.querySelectorAll('.skill-category, .project-card, .timeline-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe sections and elements for animation (disabled to prevent hiding content)
// const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-item');
// animatedElements.forEach(el => {
//   el.style.opacity = '0';
//   el.style.transform = 'translateY(30px)';
//   el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
//   observer.observe(el);
// });

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element) {
  const target = element.querySelector('h4');
  if (!target || target.dataset.animated) return;

  const value = parseInt(target.textContent);
  const duration = 2000;
  const increment = value / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= value) {
      target.textContent = value + '+';
      clearInterval(timer);
      target.dataset.animated = 'true';
    } else {
      target.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// ========================================
// EmailJS Configuration (Public Key Only - Restricted by Domain)
// ========================================
emailjs.init('u71fDZFQEuAakDQik');

// ========================================
// Form Handling with EmailJS
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.sendForm('service_ti5o3t9', 'template_xtty5i3', contactForm)
      .then(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        showNotification('Failed to send message. Please try again later.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${type === 'success' ? '#64FFDA' : '#FF6B6B'};
    color: #0A192F;
    border-radius: 5px;
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
    z-index: 10000;
    font-family: var(--font-mono);
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect (Disabled - can be enabled if needed)
// ========================================
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const parallaxElements = document.querySelectorAll('.hero-content');

//   parallaxElements.forEach(el => {
//     const speed = 0.5;
//     el.style.transform = `translateY(${scrolled * speed}px)`;
//   });
// });

// ========================================
// Typing Effect for Hero Section
// ========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Optional: Add typing effect to hero subtitle
window.addEventListener('load', () => {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    // Uncomment to enable typing effect
    // typeWriter(heroSubtitle, originalText, 50);
  }
});

// ========================================
// Cursor Animation (Optional Premium Effect)
// ========================================
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');

cursor.className = 'custom-cursor';
cursorFollower.className = 'cursor-follower';

cursor.style.cssText = `
  width: 10px;
  height: 10px;
  background-color: #64FFDA;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  display: none;
`;

cursorFollower.style.cssText = `
  width: 40px;
  height: 40px;
  border: 2px solid #64FFDA;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.3s ease;
  display: none;
`;

// Only enable on desktop
if (window.innerWidth > 968) {
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);
  cursor.style.display = 'block';
  cursorFollower.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
      cursorFollower.style.left = (e.clientX - 15) + 'px';
      cursorFollower.style.top = (e.clientY - 15) + 'px';
    }, 50);
  });

  // Expand cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
    });
  });
}

// ========================================
// Dark/Light Mode Toggle (Future Enhancement)
// ========================================
// Placeholder for theme toggle functionality
// Can be implemented by adding a toggle button and switching CSS variables

// ========================================
// Performance Optimization
// ========================================
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ========================================
// Console Easter Egg
// ========================================
console.log(
  '%c👋 Hey there, developer!',
  'color: #64FFDA; font-size: 20px; font-weight: bold;'
);
console.log(
  '%cLike what you see? Let\'s connect!',
  'color: #CCD6F6; font-size: 14px;'
);
console.log(
  '%c📧 leeleibrandt9@gmail.com',
  'color: #00D9FF; font-size: 14px;'
);

// ========================================
// Initialize on Page Load
// ========================================
window.addEventListener('load', () => {
  // Remove loading screen if present
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }

  // Set initial active nav
  setActiveNav();

  // Add loaded class to body for CSS transitions
  document.body.classList.add('loaded');
});

// ========================================
// Project Filter (Optional Enhancement)
// ========================================
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');

  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'block';
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
      }, 10);
    } else {
      project.style.opacity = '0';
      project.style.transform = 'scale(0.8)';
      setTimeout(() => {
        project.style.display = 'none';
      }, 300);
    }
  });
}

// ========================================
// Back to Top Button Visibility
// ========================================
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  });
}

// ========================================
// Scroll Progress Indicator
// ========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #64FFDA, #00D9FF);
  z-index: 10001;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});
