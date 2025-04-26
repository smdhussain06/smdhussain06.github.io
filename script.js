// Performance optimizations for lower-end devices
const isLowEndDevice = () => {
    return (
        navigator.deviceMemory < 4 || // Less than 4GB RAM
        navigator.hardwareConcurrency <= 4 || // 4 or fewer CPU cores
        /Android [4-7]/.test(navigator.userAgent) // Older Android devices
    );
};

document.addEventListener('DOMContentLoaded', function() {
    // Check if it's a low-end device
    if (isLowEndDevice()) {
        // Disable 3D model on low-end devices
        const splineContainer = document.querySelector('.spline-container');
        if (splineContainer) {
            splineContainer.innerHTML = '<img src="images/fallback-image.jpg" alt="Profile Image" loading="lazy">';
        }

        // Reduce animation complexity
        document.body.classList.add('reduce-motion');

        // Optimize scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    // Your scroll handling code
                }, 150); // Increased throttle time for low-end devices
            }
        }, { passive: true });

        // Optimize intersection observer
        const observerOptions = {
            rootMargin: '50px',
            threshold: 0.1
        };

        // Reduce the frequency of progress bar updates
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            bar.style.transition = 'width 0.5s ease-out';
        });

        // Optimize image loading
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, observerOptions);

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Rest of your initialization code
    // Initialize lazy loading
    initLazyLoading();
    
    // Theme toggle functionality
    initThemeToggle();
    
    // Mobile navigation
    initMobileNav();
    
    // Scroll animations with performance optimizations
    initScrollEvents();
    
    // Initialize other components with appropriate throttling
    initSkillsTabs();
    initPortfolioFilters();
    initTestimonialSlider();
    
    // Initialize EmailJS
    initEmailJS();
    
    // Setup contact form with EmailJS
    initContactForm();
});

// Lazy load images for better performance
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        // Simple version that loads all images after page load
        setTimeout(() => {
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }, 1000);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Mobile navigation with content blur effect
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    navToggle.addEventListener('click', () => {
        // Toggle active class on nav
        navLinks.classList.toggle('active');
        
        // Add blur to main content when menu is open
        if (navLinks.classList.contains('active')) {
            mainContent.classList.add('content-blur');
            footer.classList.add('content-blur');
        } else {
            mainContent.classList.remove('content-blur');
            footer.classList.remove('content-blur');
        }
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        navToggle.classList.toggle('active');
        
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Remove blur when menu is closed
            mainContent.classList.remove('content-blur');
            footer.classList.remove('content-blur');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Optimized scroll event handling for performance
function initScrollEvents() {
    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;
      
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Show back to top button after 300px scroll
                if (lastKnownScrollPosition > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
                
                // Update active nav link based on scroll position
                updateActiveNavOnScroll();
                
                ticking = false;
            });
        
            ticking = true;
        }
    });
    
    // Smooth scroll to top when clicking back to top button
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Helper function to update active nav link
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Find the section that's most in view
    let currentSection = '';
    let minDistance = Number.MAX_VALUE;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const distance = Math.abs(lastKnownScrollPosition - (sectionTop - 100));
        
        if (distance < minDistance && lastKnownScrollPosition >= sectionTop - 200) {
            minDistance = distance;
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize skills tabs with minimal reflows
function initSkillsTabs() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillGroups = document.querySelectorAll('.skill-group');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all skill groups
            skillGroups.forEach(group => group.classList.remove('active'));
            
            // Show the matching skill group
            const targetCategory = category.dataset.category;
            const targetGroup = document.querySelector(`.skill-group[data-category="${targetCategory}"]`);
            targetGroup.classList.add('active');
            
            // Only animate progress bars in the active group
            const progressBars = targetGroup.querySelectorAll('.progress');
            progressBars.forEach((progress, index) => {
                const width = progress.parentElement.parentElement.querySelector('span').textContent;
                progress.style.animation = 'none';
                progress.offsetHeight; // Trigger reflow
                progress.style.animation = `progressAnimation 1s ease-out ${index * 0.1}s forwards`;
                progress.style.width = width;
            });
        });
    });
    
    // Trigger animation for the initially active skill group
    setTimeout(() => {
        const activeGroup = document.querySelector('.skill-group.active');
        const progressBars = activeGroup.querySelectorAll('.progress');
        progressBars.forEach((progress, index) => {
            const width = progress.parentElement.parentElement.querySelector('span').textContent;
            progress.style.width = width;
        });
    }, 300);
}

// Initialize portfolio filters with efficient DOM updates
function initPortfolioFilters() {
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            portfolioFilters.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get filter category
            const category = filter.dataset.filter;
            
            // Show/hide portfolio items based on category
            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category.includes(category)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize testimonial slider with performance in mind
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentIndex = 0;
    
    // Show testimonial at specific index
    function showTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Event listeners for prev/next buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Show first testimonial by default
    showTestimonial(currentIndex);
}

// Initialize EmailJS
function initEmailJS() {
    // Initialize EmailJS with your public key
    emailjs.init("gBM0W-G2RDT8Qw7vq");
}

// Setup contact form with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Change button text and disable it
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value; 
        const message = document.getElementById('message').value;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send email using EmailJS with your service ID and template ID
        emailjs.send('service_01cqpsn', 'template_bc8ul9k', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button text
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                showFormMessage('error', 'Sorry, something went wrong. Please try again later.');
                
                // Restore button text
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
    
    // Function to show form messages
    function showFormMessage(type, message) {
        // Create message element if it doesn't exist
        let messageElement = document.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Update message content and class
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}