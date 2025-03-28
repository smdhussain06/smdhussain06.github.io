document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! I will get back to you soon.');
        contactForm.reset();
    });

    // Add animations using GSAP
    gsap.from('header', { duration: 1, y: -50, opacity: 0 });
    gsap.from('section', { duration: 1, y: 50, opacity: 0, stagger: 0.3 });
});