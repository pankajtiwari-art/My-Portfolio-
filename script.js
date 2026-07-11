// =========================================
// COMPLETE JAVASCRIPT
// =========================================
(function() {
    // THEME TOGGLE
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') body.classList.add('light-mode');
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('portfolio-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // INTERACTIVE STARFIELD
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [], mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    const STAR_COUNT = 180;
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function createStars() {
        stars = [];
        for(let i=0; i<STAR_COUNT; i++) {
            stars.push({
                x: Math.random()*canvas.width, y: Math.random()*canvas.height,
                radius: Math.random()*2+0.3,
                opacity: Math.random()*0.7+0.2,
                speed: Math.random()*0.02+0.005
            });
        }
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        stars.forEach(s => {
            const dx = mouseX - s.x, dy = mouseY - s.y, dist = Math.sqrt(dx*dx+dy*dy);
            if(dist < 120) { s.x -= dx*0.02; s.y -= dy*0.02; }
            ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, 2*Math.PI);
            ctx.fillStyle = `rgba(201,169,110,${s.opacity})`; ctx.fill();
            s.y += s.speed; if(s.y > canvas.height) { s.y=0; s.x=Math.random()*canvas.width; }
            s.x += (Math.random()-0.5)*0.2;
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('resize', () => { resize(); createStars(); });
    resize(); createStars(); draw();

    // NAV TOGGLE
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); navToggle.classList.toggle('open'); });
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', ()=>{ navLinks.classList.remove('active'); navToggle.classList.remove('open'); }));
    window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY>50));

    // TYPING EFFECT
    const roles = ['Digital Products','Web Experiences','Philosophy Content','Educational Tools','Creative Code','Research Ideas'];
    const roleEl = document.getElementById('roleText');
    let idx=0, ch=0, del=false;
    function type() {
        const cur = roles[idx];
        roleEl.textContent = cur.substring(0, ch + (del?0:1));
        if(!del) { ch++; if(ch===cur.length) { del=true; setTimeout(type,1500); return; } }
        else { ch--; if(ch===0) { del=false; idx=(idx+1)%roles.length; } }
        setTimeout(type, del?40:120);
    }
    setTimeout(type, 500);

    // QUOTES
    const quotes = [
        {text:"The unexamined life is not worth living.", author:"Socrates"},
        {text:"We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author:"Aristotle"},
        {text:"The mind is everything. What you think you become.", author:"Buddha"},
        {text:"Knowing yourself is the beginning of all wisdom.", author:"Aristotle"},
        {text:"The only true wisdom is in knowing you know nothing.", author:"Socrates"},
        {text:"He who has a why to live can bear almost any how.", author:"Friedrich Nietzsche"},
        {text:"In the middle of difficulty lies opportunity.", author:"Albert Einstein"},
        {text:"The greatest discovery of my generation is that human beings can alter their lives by altering their attitudes.", author:"William James"}
    ];
    function setQuote() {
        const q = quotes[Math.floor(Math.random()*quotes.length)];
        document.getElementById('quoteText').textContent = `"${q.text}"`;
        document.getElementById('quoteAuthor').textContent = `— ${q.author}`;
    }
    setQuote();
    document.getElementById('refreshQuote').addEventListener('click', setQuote);

    // PROJECT MODAL
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalRepo = document.getElementById('modalRepo');
    const modalDemo = document.getElementById('modalDemo');
    const projects = {
        stegovault: { title:'StegoVault', desc:'A browser‑based steganography application that allows users to hide secret messages inside digital images. Uses modern JavaScript canvas manipulation and bit‑level encoding.', tech:['HTML','CSS','JavaScript','Canvas API'], repo:'https://github.com/pankajtiwari-art/StegoVault' },
        cinematic: { title:'Cinematic Hand Magic', desc:'An interactive visual experiment exploring cinematic hand animations and particle effects in the browser.', tech:['HTML','CSS','JavaScript','Animation'], repo:'https://github.com/pankajtiwari-art/Cinematic-Hand-Magic-' },
        galaxy: { title:'Galaxy Black Hole', desc:'Immersive simulation of a black hole and galaxy using canvas graphics and particle systems.', tech:['HTML','CSS','JavaScript','Canvas'], repo:'https://github.com/pankajtiwari-art/galaxy-Black-hole' }
    };
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.classList.contains('open-modal') || e.target.closest('.open-modal')) {
                const id = card.dataset.project;
                const d = projects[id];
                modalTitle.textContent = d.title;
                modalDesc.textContent = d.desc;
                modalTech.innerHTML = d.tech.map(t=>`<span>${t}</span>`).join('');
                modalRepo.href = d.repo;
                modalDemo.style.display = 'none';
                modal.classList.add('active');
            }
        });
    });
    document.getElementById('closeModal').addEventListener('click', ()=> modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });

    // SKILL BARS ANIMATION
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                observer.unobserve(bar);
            }
        });
    }, {threshold:0.5});
    document.querySelectorAll('.skill-fill').forEach(bar => observer.observe(bar));

    // BLOG FETCH
    async function fetchBlog(site, containerId) {
        const container = document.getElementById(containerId);
        try {
            const res = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts?number=3`);
            const data = await res.json();
            container.innerHTML = data.posts.map(p => `
                <div class="blog-post-card">
                    <h4><a href="${p.URL}" target="_blank">${p.title}</a></h4>
                    <p>${p.excerpt.replace(/<[^>]*>/g,'').substring(0,100)}...</p>
                </div>`).join('');
        } catch(e) { container.innerHTML = '<p>Unable to load posts.</p>'; }
    }
    fetchBlog('mythodia001.wordpress.com', 'mythodiaPosts');
    fetchBlog('goodknowledgeacademy.school.blog', 'gkaPosts');

    // CERTIFICATION FILTER
    document.querySelectorAll('.cert-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.cert-card').forEach(card => {
                card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
            });
        });
    });

    // CONTACT FORM
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.textContent = 'Sending...';
        try {
            const res = await fetch(form.action, { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} });
            feedback.textContent = res.ok ? 'Message sent successfully!' : 'Oops! Please email me directly.';
        } catch(err) { feedback.textContent = 'Network error. Please try again.'; }
    });

    // SCROLL REVEAL
    const revealEls = document.querySelectorAll('.section, .hero-content');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)'; }
        });
    }, {threshold:0.1});
    revealEls.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity 0.6s, transform 0.6s'; revealObs.observe(el); });
    document.querySelector('.hero-content').style.opacity='1';
    document.querySelector('.hero-content').style.transform='translateY(0)';
})();
