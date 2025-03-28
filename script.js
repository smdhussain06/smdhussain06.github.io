// Modern Portfolio JavaScript

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize all components
  initNavigation();
  initTypewriterEffect();
  initScrollAnimations();
  initFloatingElements();
  initProjectFilters();
  initSkillsHover();
  initSoundEffects();
  initThreeDimensions();
  initModal();
});

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
    
    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
  });
  
  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
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

// Typewriter effect for hero subtitle
function initTypewriterEffect() {
  const text = document.querySelector('.typewriter-text');
  if (!text) return;
  
  const textContent = text.textContent;
  text.textContent = '';
  
  let i = 0;
  const speed = 50; // typing speed in milliseconds
  
  function typeWriter() {
    if (i < textContent.length) {
      text.textContent += textContent.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Add blinking cursor effect after typing completes
      text.classList.add('typing-done');
    }
  }
  
  // Start the typewriter effect with a small delay
  setTimeout(typeWriter, 1000);
}

// Reveal animations on scroll
function initScrollAnimations() {
  // Get all elements with the scroll-animation class
  const animatedElements = document.querySelectorAll('.scroll-animation');
  
  // Create the intersection observer
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
    // Start animation when element is 20% visible
    threshold: 0.2,
    // Start slightly before element comes into view
    rootMargin: '0px 0px -100px 0px'
  });
  
  // GSAP animations for sections
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
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
    
    if (section.classList.contains('skills-section')) {
      tl.from(section.querySelectorAll('.skill-category'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.4');
    }
    
    if (section.classList.contains('timeline-section')) {
      tl.from(section.querySelectorAll('.timeline-item'), {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      }, '-=0.4');
    }
    
    if (section.classList.contains('projects-section')) {
      tl.from(section.querySelectorAll('.project-card'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.4');
    }
  });
  
  // Observe each element with animation
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Create floating elements in hero section
function initFloatingElements() {
  const floatingContainer = document.querySelector('.floating-elements');
  if (!floatingContainer) return;
  
  // Design and AI-related icons
  const icons = [
    { name: 'adobe', type: 'design', icon: 'fab fa-adobe' },
    { name: 'figma', type: 'design', icon: 'fab fa-figma' },
    { name: 'sketch', type: 'design', icon: 'fab fa-sketch' },
    { name: 'python', type: 'ai', icon: 'fab fa-python' },
    { name: 'brain', type: 'ai', icon: 'fas fa-brain' },
    { name: 'robot', type: 'ai', icon: 'fas fa-robot' },
    { name: 'network', type: 'ai', icon: 'fas fa-project-diagram' }
  ];
  
  // Create SVG neural network patterns
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.classList.add('neural-network');
  
  // Add neural network connections
  for (let i = 0; i < 15; i++) {
    const path = document.createElementNS(svgNS, "path");
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    const controlX1 = startX + (Math.random() * 30 - 15);
    const controlY1 = (startY + endY) / 2;
    const controlX2 = endX + (Math.random() * 30 - 15);
    const controlY2 = controlY1;
    
    path.setAttribute("d", `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`);
    path.classList.add('neural-path');
    svg.appendChild(path);
  }
  
  floatingContainer.appendChild(svg);
  
  // Add floating icons
  icons.forEach(iconInfo => {
    const iconElement = document.createElement('div');
    iconElement.classList.add('floating-icon', iconInfo.type);
    iconElement.innerHTML = `<i class="${iconInfo.icon}"></i>`;
    
    // Random position
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomY = Math.random() * 80 + 10; // 10% to 90%
    
    iconElement.style.left = `${randomX}%`;
    iconElement.style.top = `${randomY}%`;
    
    // Animation delay
    const delay = Math.random() * 5;
    iconElement.style.animationDelay = `${delay}s`;
    
    floatingContainer.appendChild(iconElement);
  });
  
  // Animate neural network paths with GSAP
  gsap.utils.toArray('.neural-path').forEach(path => {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  });
  
  // Animate floating icons
  gsap.utils.toArray('.floating-icon').forEach(icon => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    tl.to(icon, {
      y: `-=${Math.random() * 30 + 10}`,
      x: `+=${Math.random() * 20 - 10}`,
      duration: Math.random() * 3 + 2,
      ease: 'power1.inOut'
    });
  });
}

// Project filter functionality
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
      
      // Filter the projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          gsap.to(card, { 
            opacity: 1, 
            scale: 1, 
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'all'
          });
          card.style.display = 'block';
        } else {
          gsap.to(card, { 
            opacity: 0, 
            scale: 0.8, 
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

// Skills hover effects
function initSkillsHover() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    // Skip items that don't have experience data (like philosophy item)
    if (!item.dataset.experience) return;
    
    const experienceBar = document.createElement('div');
    experienceBar.classList.add('experience-bar');
    item.appendChild(experienceBar);
    
    // Set initial size of bar based on level
    let levelPercentage = 50;
    if (item.dataset.level === 'Advanced') levelPercentage = 90;
    if (item.dataset.level === 'Intermediate') levelPercentage = 70;
    if (item.dataset.level === 'Learning') levelPercentage = 40;
    
    experienceBar.style.width = `${levelPercentage}%`;
    
    // Micro-animation on hover
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('img, i'), {
        y: -5,
        rotation: 10,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('img, i'), {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
  });
}

// Sound effects for neumorphic buttons
function initSoundEffects() {
  const buttons = document.querySelectorAll('.neumorphic-button');
  
  // Create audio element
  const audio = new Audio();
  audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-2870.mp3';
  audio.volume = 0.2;
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const clone = audio.cloneNode();
      clone.play();
    });
    
    button.addEventListener('click', () => {
      const clone = audio.cloneNode();
      clone.volume = 0.3;
      clone.playbackRate = 1.2;
      clone.play();
    });
  });
}

// Three.js for 3D card effects
function initThreeDimensions() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      // Calculate mouse position relative to card center
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Calculate rotation angle (limited to ±15 degrees)
      const rotateY = 15 * mouseX / (cardRect.width / 2);
      const rotateX = -15 * mouseY / (cardRect.height / 2);
      
      // Apply transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Modal functionality
function initModal() {
  const modal = document.getElementById('collaborationModal');
  if (!modal) return;
  
  const openModalBtn = document.querySelector('.neumorphic-button.outline');
  const closeModalBtn = document.querySelector('.close-modal');
  
  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    
    // Animate modal content
    gsap.from('.modal-content', {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  
  closeModalBtn.addEventListener('click', () => {
    gsap.to('.modal-content', {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
        gsap.set('.modal-content', { y: 0, opacity: 1 });
      }
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      gsap.to('.modal-content', {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('active');
          gsap.set('.modal-content', { y: 0, opacity: 1 });
        }
      });
    }
  });
}

// Add CSS for floating elements and neural network
document.head.insertAdjacentHTML('beforeend', `
<style>
  .floating-icon {
    position: absolute;
    font-size: 1.8rem;
    opacity: 0.7;
    animation: float 5s ease-in-out infinite;
    z-index: 1;
  }
  
  .floating-icon.design {
    color: #06B6D4;
  }
  
  .floating-icon.ai {
    color: #D946EF;
  }
  
  .neural-network {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .neural-path {
    fill: none;
    stroke-width: 1;
    stroke: rgba(79, 70, 229, 0.3);
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
    100% {
      transform: translateY(0) rotate(0);
    }
  }
  
  .experience-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #06B6D4, #4F46E5);
    transition: width 0.3s ease;
  }
  
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .burger.toggle .line2 {
    opacity: 0;
  }
  
  .burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
  }
</style>
`);