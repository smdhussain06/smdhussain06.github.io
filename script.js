// Modern Portfolio JavaScript - Minimalist version

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize all components
  initNavigation();
  initTypewriterEffect();
  initScrollAnimations();
  initProjectFilters();
  initProjectHover();
  hidePreloader();
});

// Preloader hiding function
function hidePreloader() {
  // Add a short delay to ensure smooth transition
  setTimeout(() => {
    const body = document.body;
    body.classList.add('loaded');
  }, 500);
}

// Navigation functionality
function initNavigation() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  const header = document.querySelector('.header');
  
  // Toggle navigation on mobile
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animate burger to X
    burger.classList.toggle('toggle');
    
    // Animate links with a cleaner fade
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 0.2}s`;
      }
    });
  });
  
  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
      }
      
      const target = document.querySelector(this.getAttribute('href'));
      
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
}

// Typewriter effect for hero subtitle - simplified
function initTypewriterEffect() {
  const text = document.querySelector('.typewriter-text');
  if (!text) return;
  
  const textContent = text.textContent;
  text.textContent = '';
  
  let i = 0;
  const speed = 70; // typing speed in milliseconds
  
  function typeWriter() {
    if (i < textContent.length) {
      text.textContent += textContent.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  
  // Start the typewriter effect with a small delay
  setTimeout(typeWriter, 1000);
}

// Clean reveal animations on scroll
function initScrollAnimations() {
  // Get all elements with the scroll-animation class
  const animatedElements = document.querySelectorAll('.scroll-animation');
  
  // Create the intersection observer with smoother animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add the visible class when the element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once the animation has played, we don't need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Start animation when element is 15% visible
    threshold: 0.15,
    // Start slightly before element comes into view
    rootMargin: '0px 0px -100px 0px'
  });
  
  // GSAP animations for sections - simplified for a cleaner aesthetic
  gsap.utils.toArray('section').forEach(section => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
    
    tl.from(section.querySelectorAll('h2, h3'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out'
    });
    
    if (section.classList.contains('skills-section')) {
      tl.from(section.querySelectorAll('.skill-category'), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
    }
    
    if (section.classList.contains('projects-section')) {
      tl.from(section.querySelectorAll('.project-card'), {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
    }
  });
  
  // Observe each element with animation
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Project filter functionality - simplified
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the filter value
      const filter = this.getAttribute('data-filter');
      
      // Filter the projects with cleaner animations
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          gsap.to(card, { 
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => {
              card.style.display = 'block';
            }
          });
        } else {
          gsap.to(card, { 
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// Simple hover effects for projects
function initProjectHover() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('img'), {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('img'), {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });
}

// Add CSS for cursor and animations
document.head.insertAdjacentHTML('beforeend', `
<style>
  /* Custom cursor styles */
  body {
    cursor: default;
  }
  
  a, button {
    cursor: pointer;
  }
  
  /* Simple fade animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Navigation animations */
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Burger menu animation */
  .burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .burger.toggle .line2 {
    opacity: 0;
  }
  
  .burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
  }
  
  /* Page transition */
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
</style>
`);