// ===== THEME TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Make sure all buttons have visible text regardless of state
document.addEventListener('DOMContentLoaded', () => {
    // Fix for all button text visibility
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        // Force opacity to 1 for all button text
        if (button.classList.contains('secondary-btn')) {
            button.style.color = '#ff6b00'; // Primary color
        } else {
            button.style.color = 'white';
        }
    });
});

// ===== NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking nav links
navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link based on section in viewport
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get current scroll position
    let scrollPosition = window.scrollY;
    
    // Check which section is in view
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach((navLink) => {
                navLink.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollPosition > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== SCROLL ANIMATION =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .portfolio-item, .skill-item, .about-image, .about-text, .contact-content');
    
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Add animation class for CSS transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .portfolio-item, .skill-item, .about-image, .about-text, .contact-content');
    
    elementsToAnimate.forEach((element) => {
        element.classList.add('transition-element');
    });
    
    // Trigger animation on initial load
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                    
                    observer.disconnect();
                }
            });
        });
        
        io.observe(target);
    };
    
    if ('IntersectionObserver' in window) {
        lazyImages.forEach(lazyLoad);
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach((img) => {
            img.setAttribute('src', img.getAttribute('data-src'));
        });
    }
});

// ===== SKILLS SECTION =====
const skillCategories = document.querySelectorAll('.skill-category');
const skillGroups = document.querySelectorAll('.skill-group');

skillCategories.forEach((category) => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        skillCategories.forEach((item) => {
            item.classList.remove('active');
        });
        
        // Add active class to current category
        category.classList.add('active');
        
        // Show corresponding skill group
        const categoryName = category.getAttribute('data-category');
        
        skillGroups.forEach((group) => {
            group.classList.remove('active');
            
            if (group.getAttribute('data-category') === categoryName) {
                group.classList.add('active');
                
                // Animate progress bars
                const progressBars = group.querySelectorAll('.progress');
                progressBars.forEach((bar) => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 50);
                });
            }
        });
    });
});

// ===== PORTFOLIO FILTERING =====
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach((item) => {
            item.classList.remove('active');
        });
        
        // Add active class to current filter
        filter.classList.add('active');
        
        // Filter portfolio items
        const filterValue = filter.getAttribute('data-filter');
        
        portfolioItems.forEach((item) => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                const itemCategories = item.getAttribute('data-category').split(' ');
                
                if (itemCategories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===== PORTFOLIO LIGHTBOX =====
const portfolioViews = document.querySelectorAll('.portfolio-view');
const lightbox = document.querySelector('.portfolio-lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');

// Project data
const projectData = {
    project1: {
        title: 'Edge AI Product Branding',
        category: 'Branding & AI',
        client: 'TechFuture',
        date: 'March 2025',
        description: `
            <p>A comprehensive brand identity for an Edge AI-powered smart device that processes data locally without relying on cloud connectivity. The branding needed to convey both technological sophistication and accessibility to non-tech-savvy users.</p>
            <p>The challenge was to create a visual language that communicates complex AI capabilities in an approachable way. I developed a color scheme, typography system, logo, and marketing materials that balance tech-forward aesthetics with friendly, intuitive design.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Logo & Visual Identity</li>
                <li>Packaging Design</li>
                <li>Product Interface Guidelines</li>
                <li>Marketing Collateral</li>
            </ul>
        `,
        images: ['portfolio-ai-branding-1.jpg', 'portfolio-ai-branding-2.jpg', 'portfolio-ai-branding-3.jpg']
    },
    project2: {
        title: '3D Character Design',
        category: '3D Modeling',
        client: 'GameDev Studios',
        date: 'January 2025',
        description: `
            <p>Character development for an upcoming video game featuring a futuristic cyberpunk universe. This project involved creating a detailed 3D character model with complete rigging for animation.</p>
            <p>Using Blender, I designed the character from concept sketches, through modeling, texturing, and rigging. Special attention was paid to creating a character that would maintain visual appeal from various camera angles and perform well within game engine constraints.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Character Concept Development</li>
                <li>3D Modeling & Sculpting</li>
                <li>UV Mapping & Texturing</li>
                <li>Rigging & Weight Painting</li>
                <li>Expression Controls</li>
            </ul>
        `,
        images: ['portfolio-3d-character-1.jpg', 'portfolio-3d-character-2.jpg', 'portfolio-3d-character-3.jpg']
    },
    project3: {
        title: 'Cinematic Trailer',
        category: 'Video Editing',
        client: 'Horizon Pictures',
        date: 'December 2024',
        description: `
            <p>A cinematic promotional trailer for an independent film festival that needed to capture the essence of indie filmmaking while exciting potential attendees about the upcoming event.</p>
            <p>Using Adobe Premiere Pro and After Effects, I created a dynamic trailer that showcases festival highlights, featured filmmakers, and the energy of the event. Custom motion graphics were designed to match the festival's branding, and careful color grading was applied to create a cohesive visual narrative.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Video Editing & Composition</li>
                <li>Custom Motion Graphics</li>
                <li>Color Grading</li>
                <li>Sound Design</li>
                <li>Title Sequences</li>
            </ul>
        `,
        images: ['portfolio-video-editing-1.jpg', 'portfolio-video-editing-2.jpg', 'portfolio-video-editing-3.jpg']
    },
    project4: {
        title: 'Interactive Data Visualizations',
        category: 'AI & Design',
        client: 'DataMetrics',
        date: 'February 2025',
        description: `
            <p>A series of interactive data visualizations for a financial technology company that needed to present complex market trends and user behavior patterns in an intuitive, accessible format.</p>
            <p>Combining design principles with AI-driven data analysis, I created a system of visualizations that adapt to user interactions and reveal deeper insights as users engage with them. The project utilized D3.js for front-end visualizations and Python with TensorFlow for the backend data processing.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Data Analysis & Pattern Recognition</li>
                <li>UX Research & Testing</li>
                <li>Interactive Dashboard Design</li>
                <li>Real-time Data Processing</li>
                <li>Responsive Visualization System</li>
            </ul>
        `,
        images: ['portfolio-data-viz-1.jpg', 'portfolio-data-viz-2.jpg', 'portfolio-data-viz-3.jpg']
    },
    project5: {
        title: 'Product Packaging',
        category: 'Graphic Design',
        client: 'EcoEssentials',
        date: 'November 2024',
        description: `
            <p>A complete packaging redesign for an eco-friendly consumer products company launching a new line of sustainable household items. The packaging needed to communicate the brand's environmental values while standing out on retail shelves.</p>
            <p>I developed a packaging system that uses recyclable materials, minimalist design, and vibrant accents to highlight the products' eco-credentials. Each package includes educational elements about sustainability incorporated into the design in a visually appealing way.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Packaging Structure Design</li>
                <li>Material Selection & Testing</li>
                <li>Label & Graphics Creation</li>
                <li>Brand Storytelling Elements</li>
                <li>Production Specifications</li>
            </ul>
        `,
        images: ['portfolio-packaging-1.jpg', 'portfolio-packaging-2.jpg', 'portfolio-packaging-3.jpg']
    },
    project6: {
        title: 'Futuristic Environment',
        category: '3D Modeling',
        client: 'VR Experiences Inc.',
        date: 'October 2024',
        description: `
            <p>A detailed 3D environment design for a virtual reality experience set in a futuristic cityscape. The environment needed to be visually striking while optimized for real-time rendering in VR.</p>
            <p>Using Blender and Substance Painter, I created a modular urban environment with atmospheric lighting, detailed textures, and interactive elements. Special attention was paid to creating immersive spatial audio zones and ensuring comfortable navigation for VR users.</p>
            <h4>Project Scope:</h4>
            <ul>
                <li>Concept Art & Environment Planning</li>
                <li>3D Modeling & Scene Assembly</li>
                <li>Texture Creation & PBR Materials</li>
                <li>Lighting & Atmospheric Effects</li>
                <li>Performance Optimization</li>
            </ul>
        `,
        images: ['portfolio-3d-environment-1.jpg', 'portfolio-3d-environment-2.jpg', 'portfolio-3d-environment-3.jpg']
    }
};

// Open lightbox with project details
let currentProject = '';
let currentIndex = 0;

const openLightbox = (projectId) => {
    currentProject = projectId;
    currentIndex = 0;
    
    const project = projectData[projectId];
    
    if (!project) return;
    
    let content = `
        <div class="project-details">
            <h2>${project.title}</h2>
            <div class="project-meta">
                <div class="meta-item">
                    <h4>Category</h4>
                    <p>${project.category}</p>
                </div>
                <div class="meta-item">
                    <h4>Client</h4>
                    <p>${project.client}</p>
                </div>
                <div class="meta-item">
                    <h4>Date</h4>
                    <p>${project.date}</p>
                </div>
            </div>
            <div class="project-description">
                ${project.description}
            </div>
            <div class="project-images">
                <img src="${project.images[0]}" alt="${project.title}" class="current-image">
                <div class="image-thumbnails">
                    ${project.images.map((img, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <img src="${img}" alt="Thumbnail ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    lightboxContent.innerHTML = content;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add click event to thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.getAttribute('data-index'));
            currentIndex = index;
            
            // Update main image
            const mainImage = document.querySelector('.current-image');
            mainImage.src = project.images[index];
            
            // Update active thumbnail
            thumbnails.forEach((t) => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
};

portfolioViews.forEach((view) => {
    view.addEventListener('click', () => {
        const projectId = view.getAttribute('data-id');
        openLightbox(projectId);
    });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Click outside to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navigate between projects
lightboxNext.addEventListener('click', () => {
    const projectIds = Object.keys(projectData);
    const currentProjectIndex = projectIds.indexOf(currentProject);
    const nextProjectIndex = (currentProjectIndex + 1) % projectIds.length;
    
    openLightbox(projectIds[nextProjectIndex]);
});

lightboxPrev.addEventListener('click', () => {
    const projectIds = Object.keys(projectData);
    const currentProjectIndex = projectIds.indexOf(currentProject);
    const prevProjectIndex = (currentProjectIndex - 1 + projectIds.length) % projectIds.length;
    
    openLightbox(projectIds[prevProjectIndex]);
});

// ===== TESTIMONIALS SLIDER =====
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

// Show testimonial based on index
const showTestimonial = (index) => {
    testimonialItems.forEach((item) => {
        item.classList.remove('active');
    });
    
    testimonialDots.forEach((dot) => {
        dot.classList.remove('active');
    });
    
    testimonialItems[index].classList.add('active');
    testimonialDots[index].classList.add('active');
};

// Initialize testimonial
showTestimonial(testimonialIndex);

// Next testimonial
testimonialNext.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
    showTestimonial(testimonialIndex);
});

// Previous testimonial
testimonialPrev.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(testimonialIndex);
});

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        testimonialIndex = index;
        showTestimonial(testimonialIndex);
    });
});

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
    showTestimonial(testimonialIndex);
}, 5000);

// Pause auto slide on hover
const testimonialContainer = document.querySelector('.testimonials-slider');
testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
        showTestimonial(testimonialIndex);
    }, 5000);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (name && email && subject && message) {
        // Form is valid, send data
        // In a real application, you would send this data to a server
        console.log('Form data:', { name, email, subject, message });
        
        // Show success message
        const formHTML = contactForm.innerHTML;
        contactForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting me. I'll get back to you as soon as possible.</p>
                <button class="btn primary-btn reset-form">Send Another Message</button>
            </div>
        `;
        
        // Reset form when clicking "Send Another Message"
        const resetButton = document.querySelector('.reset-form');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                contactForm.innerHTML = formHTML;
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';
            });
        }
    } else {
        // Form is invalid, show error
        const errorFields = [];
        
        if (!name) errorFields.push('name');
        if (!email) errorFields.push('email');
        if (!subject) errorFields.push('subject');
        if (!message) errorFields.push('message');
        
        errorFields.forEach((field) => {
            const input = document.getElementById(field);
            input.style.borderColor = 'red';
            
            input.addEventListener('focus', () => {
                input.style.borderColor = '';
            });
        });
    }
});

// ===== FETCH BLOG POSTS =====
const fetchBlogPosts = async () => {
    try {
        // In a real application, you would fetch data from an API
        // For demo purposes, we'll use dummy data
        const blogPosts = [
            {
                title: 'Integrating AI into Design Workflows',
                excerpt: 'Exploring how artificial intelligence can enhance creative processes without replacing the human touch.',
                date: 'March 15, 2025',
                image: 'blog-post-1.jpg',
                url: '#'
            },
            {
                title: 'The Future of Edge Computing in Creative Industries',
                excerpt: 'How edge AI is changing the way we create and consume digital content in real-time environments.',
                date: 'February 28, 2025',
                image: 'blog-post-2.jpg',
                url: '#'
            },
            {
                title: 'Blender 3D: From Beginner to Pro',
                excerpt: 'My journey learning Blender and how it transformed my approach to digital art and visualization.',
                date: 'January 20, 2025',
                image: 'blog-post-3.jpg',
                url: '#'
            }
        ];
        
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = '';
        
        blogPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            
            postElement.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="post-content">
                    <span class="post-date">${post.date}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.url}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogGrid.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = `
            <div class="error-message">
                <p>Failed to load blog posts. Please try again later.</p>
            </div>
        `;
    }
};

// Load blog posts when the blog section is in view
const blogSection = document.getElementById('blog');
const loadBlogPostsOnScroll = () => {
    const blogRect = blogSection.getBoundingClientRect();
    
    if (blogRect.top < window.innerHeight && blogRect.bottom > 0) {
        // Blog section is in viewport
        const blogPlaceholder = document.querySelector('.blog-placeholder');
        
        if (blogPlaceholder) {
            fetchBlogPosts();
            // Remove scroll event after loading
            window.removeEventListener('scroll', loadBlogPostsOnScroll);
        }
    }
};

window.addEventListener('scroll', loadBlogPostsOnScroll);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS class for initial animation
    document.querySelector('.home-content').classList.add('animate');
    
    // Check if blog section is already in view on page load
    loadBlogPostsOnScroll();
});