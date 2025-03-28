// Scroll animation logic
document.addEventListener('DOMContentLoaded', () => {
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
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe each element with animation
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // For elements already in view on page load
  setTimeout(() => {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});