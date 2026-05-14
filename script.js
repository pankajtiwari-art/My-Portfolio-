// =============================================
// script.js — Ultra-Premium Portfolio
// Pankaj Tiwari | Luxury Black + Gold
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // ----- DOM Elements -----
    const loader = document.getElementById('loader');
    const body = document.body;
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');
    const typingText = document.getElementById('typingText');
    const heroTagline = document.getElementById('heroTagline');
    const orb1 = document.getElementById('orb1');
    const orb2 = document.getElementById('orb2');
    const orb3 = document.getElementById('orb3');
    const particleCanvas = document.getElementById('particleCanvas');
    const currentYearSpan = document.getElementById('currentYear');
    const skillsGrid = document.getElementById('skillsGrid');
    const ibmCerts = document.getElementById('ibmCerts');
    const saylorCerts = document.getElementById('saylorCerts');
    const googleCerts = document.getElementById('googleCerts');
    const certTabs = document.querySelectorAll('.cert-tab');
    const certContents = document.querySelectorAll('.cert-content');
    const statNumbers = document.querySelectorAll('.stat-number');
    const revealElements = document.querySelectorAll(
        '.about-card, .book-card, .skill-card, .cert-card, .belief-card, .social-card, .mythodia-content, .vision-content, .section-header, .connect-cta'
    );
    const tiltCards = document.querySelectorAll('[data-tilt]');

    // ----- Set Current Year -----
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // ----- Loader -----
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            body.classList.add('loaded');
            // Initialize cursor position
            document.addEventListener('mousemove', updateCursor);
            // Start stats counter
            animateStats();
            // Trigger initial reveal check
            checkReveal();
        }, 1800);
    });

    // ----- Custom Cursor -----
    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;
    let followerX = 0,
        followerY = 0;

    function updateCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorFollower) {
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    if (body.classList.contains('loaded')) {
        animateCursor();
    } else {
        requestAnimationFrame(animateCursor);
    }

    // Cursor hover effects
    const hoverTargets = document.querySelectorAll(
        'a, button, .book-card, .skill-card, .social-card, .cert-card, .belief-card, .btn-primary, .btn-secondary, .btn-mythodia, .cert-tab, [data-tilt]'
    );
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // ----- Scroll Progress Bar -----
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = progress + '%';

        // Navbar scrolled state
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        updateActiveNavLink();

        // Reveal elements
        checkReveal();

        // Parallax orbs
        updateOrbs();
    });

    // ----- Navbar Active State -----
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ----- Mobile Nav Toggle -----
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
        });
    });

    // ----- Typing Animation -----
    const roles = [
        'Author',
        'AI Enthusiast',
        'Psychology Writer',
        'Technology Enthusiast',
        'Independent Researcher',
        'Storyteller',
        'Creative Thinker',
        'Deep Thinker',
    ];
    const taglines = [
        'Where psychology meets technology.',
        'Exploring intelligence beyond machines.',
        'Because every thought shapes reality.',
        'Building ideas between logic and emotion.',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }
        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // Rotate taglines
    let taglineIndex = 0;
    function rotateTagline() {
        if (!heroTagline) return;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        heroTagline.style.opacity = '0';
        heroTagline.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            heroTagline.textContent = taglines[taglineIndex];
            heroTagline.style.opacity = '1';
        }, 500);
    }
    setInterval(rotateTagline, 5000);

    // ----- Floating Orbs Parallax -----
    function updateOrbs() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        if (orb1) orb1.style.transform = `translate(${scrollY * 0.02}px, ${scrollY * 0.04}px)`;
        if (orb2) orb2.style.transform = `translate(${-scrollY * 0.03}px, ${-scrollY * 0.02}px)`;
        if (orb3) orb3.style.transform = `translate(${scrollY * 0.015}px, ${-scrollY * 0.035}px)`;
    }

    // ----- Particle Canvas -----
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let canvasWidth, canvasHeight;

    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        particleCanvas.width = canvasWidth;
        particleCanvas.height = canvasHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.size = Math.random() * 1.5 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.15;
            this.life = Math.random() * 400 + 200;
            this.age = 0;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.age++;
            if (this.age > this.life || this.x < -20 || this.x > canvasWidth + 20 || this.y < -20 || this.y > canvasHeight + 20) {
                this.reset();
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.age = 0;
            }
        }
        draw(ctx) {
            const alpha = this.opacity * (1 - this.age / this.life);
            ctx.fillStyle = `rgba(200,165,75,${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles(80);

    function animateParticles() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Draw subtle grid
        ctx.strokeStyle = 'rgba(255,255,255,0.015)';
        ctx.lineWidth = 0.5;
        const gridSize = 60;
        for (let x = gridSize; x < canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
        }
        for (let y = gridSize; y < canvasHeight; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth, y);
            ctx.stroke();
        }
        // Draw particles
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(200,165,75,${0.04 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ----- Scroll Reveal (Intersection Observer) -----
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealElements.forEach(el => revealObserver.observe(el));

    function checkReveal() {
        // Fallback for elements not caught by observer
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88 && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }

    // ----- Animated Stats Counter -----
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!target) return;
            const duration = 2000;
            const startTime = performance.now();
            const startVal = 0;

            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(startVal + (target - startVal) * eased);
                stat.textContent = current;
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = target;
                }
            }
            requestAnimationFrame(update);
        });
        statsAnimated = true;
    }

    // Re-trigger stats on scroll into view
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 }
    );
    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) statsObserver.observe(statsContainer);

    // ----- Card Tilt Effect -----
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const inner = card.querySelector('.book-card-inner');
            if (!inner) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.book-card-inner');
            if (!inner) return;
            inner.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // ----- Cert Tabs -----
    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            certTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            certContents.forEach(c => c.classList.remove('active'));
            const targetContent = document.getElementById('cert-' + targetTab);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // ----- Populate Skills -----
    const skillsData = [
        { name: 'Artificial Intelligence', icon: '🧠', level: 88 },
        { name: 'Machine Learning', icon: '⚙️', level: 85 },
        { name: 'Deep Learning', icon: '🔬', level: 82 },
        { name: 'Python', icon: '🐍', level: 80 },
        { name: 'Data Science', icon: '📊', level: 78 },
        { name: 'Psychology', icon: '🧘', level: 92 },
        { name: 'Human Behavior Analysis', icon: '👁️', level: 90 },
        { name: 'Philosophy', icon: '📜', level: 95 },
        { name: 'Creative Writing', icon: '✍️', level: 93 },
        { name: 'Storytelling', icon: '📖', level: 91 },
        { name: 'Frontend Development', icon: '💻', level: 75 },
        { name: 'Prompt Engineering', icon: '💡', level: 87 },
        { name: 'Critical Thinking', icon: '🔍', level: 94 },
        { name: 'Communication Strategy', icon: '🎯', level: 86 },
        { name: 'Branding', icon: '🏷️', level: 79 },
        { name: 'UI Concepts', icon: '🎨', level: 77 },
    ];

    if (skillsGrid) {
        skillsGrid.innerHTML = skillsData
            .map(
                (skill, i) => `
            <div class="skill-card reveal">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">
                    <div class="skill-level-fill" data-level="${skill.level}" style="width:0%"></div>
                </div>
            </div>`
            )
            .join('');

        // Animate skill bars on scroll
        const skillObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fills = entry.target.querySelectorAll('.skill-level-fill');
                        fills.forEach(fill => {
                            const level = fill.getAttribute('data-level');
                            setTimeout(() => {
                                fill.style.width = level + '%';
                            }, 200);
                        });
                    }
                });
            }, { threshold: 0.2 }
        );
        const skillCards = skillsGrid.querySelectorAll('.skill-card');
        skillCards.forEach(card => skillObserver.observe(card));
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ----- Populate Certifications -----
    const ibmCertifications = [
        'Machine Learning with Python',
        'Deep Learning Fundamentals',
        'Data Visualization with Python',
        'Data Privacy Fundamentals',
        'Data Analysis with Python',
        'Big Data 101',
        'SQL and Relational Database 101',
        'Fundamentals of Encryption & Quantum-safe Techniques',
        'IBM Cloud Essential V3',
        'Machine Learning – Dimensionality Reduction',
        'Accelerating Deep Learning with GPUs',
        'Statistics 101',
        'Python 101 for Data Science',
        'Prompt Engineering',
    ];

    const saylorCertifications = [
        'Principles of Finance',
        'Advanced JavaScript',
        'Business Communication',
        'Organizational Behavior',
        'Introduction to Psychology',
        'Introduction to Critical Thinking and Logic',
        'Existentialism',
        'Crisis Communication',
        'Elements of Ethical Leadership',
        'Communicating with Data',
        'Principles of Human Communication',
        'Environmental Ethics, Justice, and World Views',
        'Professional Writing',
        'Moral and Political Philosophy',
        'Foundations of Human Communication',
        'Spreadsheet (Presenting Data)',
        'Spreadsheet (Formatting and Functions)',
        'Organization Structure, Change, and the Future of Management',
        'Leadership and Teams',
        'Customer Service',
        'Strategic Negotiations and Conflict Management',
        'Managerial Accounting',
        'Decision-Making',
        'Introduction to Business Planning and Strategy',
        'Brand Management',
        'Principles of Marketing',
        'Business Ethics',
        'Information Security',
    ];

    const googleCertifications = ['Google Analytics'];

    function renderCertCards(certs, container) {
        if (!container) return;
        container.innerHTML = certs.map(cert => `<div class="cert-card reveal">${cert}</div>`).join('');
        container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    renderCertCards(ibmCertifications, ibmCerts);
    renderCertCards(saylorCertifications, saylorCerts);
    renderCertCards(googleCertifications, googleCerts);

    // ----- Smooth Scroll for Anchor Links -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ----- Keyboard Navigation (Escape to close mobile menu) -----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
        }
    });

    // ----- Handle Resize -----
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles(Math.min(80, Math.floor(window.innerWidth / 15)));
    });

    // ----- Final initialization -----
    updateActiveNavLink();
    checkReveal();

    console.log('%c Pankaj Tiwari Portfolio %c Loaded ',
        'background:#c9a84c;color:#000;padding:6px 12px;font-weight:bold;border-radius:4px 0 0 4px;',
        'background:#0a0a0a;color:#c9a84c;padding:6px 12px;border-radius:0 4px 4px 0;');
});
