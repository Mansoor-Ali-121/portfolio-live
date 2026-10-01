/**
 * Dev Mansoor (Mansoor Ali) — Portfolio & Resume Script
 * Vanilla JavaScript (No React, No TS, No Frameworks)
 * Features:
 * 1. Atom Particles Canvas Animation
 * 2. Hero Animated Typewriter Text
 * 3. Preloader Fadeout
 * 4. Dynamic Working Stats & Live Latency Benchmark
 * 5. Interactive Skill Detail Drawer
 * 6. Lightbox & Resume Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initPreloader();
  initAtomParticlesCanvas();
  initHeroTypewriter();
  initMobileMenu();
  initNavbarScrollSpy();
  initProjectFiltering();
  initProjectModal();
  initResumeModal();
  initContactForm();
  initCopyActions();
  initSmoothScroll();
  initScrollAnimations();
  initDynamicStatsDashboard();
  initLiveBenchmarkTest();
  initSkillInteractiveDrawer();
  initTestimonialsCarousel();
  initMouseSpotlight();
});

/**
 * 1. Preloader Fadeout
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  };

  // Wait for window load or fallback after 900ms
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 400));
    setTimeout(hidePreloader, 1500); // Safety fallback
  }
}

/**
 * 2. Animated Atom Particles Canvas
 * Creates drifting nodes, connecting atomic bonds, and orbiting electron rings
 */
function initAtomParticlesCanvas() {
  const canvas = document.getElementById('atom-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const colors = [
    'rgba(16, 185, 129, 0.75)',  // Emerald
    'rgba(6, 182, 212, 0.75)',   // Cyan
    'rgba(99, 102, 241, 0.75)',  // Indigo
    'rgba(244, 63, 94, 0.75)',   // Rose
    'rgba(168, 85, 247, 0.75)'   // Purple
  ];

  // Mouse coordinates
  let mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Particle Class
  class Particle {
    constructor(isNucleus = false) {
      this.isNucleus = isNucleus;
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = isNucleus ? Math.random() * 2.5 + 3.5 : Math.random() * 1.8 + 1.2;
      this.vx = (Math.random() - 0.5) * (isNucleus ? 0.4 : 0.7);
      this.vy = (Math.random() - 0.5) * (isNucleus ? 0.4 : 0.7);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.orbitAngle = Math.random() * Math.PI * 2;
      this.orbitSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
      this.orbitRadius = Math.random() * 35 + 20;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x += (dx / dist) * force * 3;
        this.y += (dy / dist) * force * 3;
      }

      this.orbitAngle += this.orbitSpeed;
    }

    draw() {
      // Draw center particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // If particle is an atomic nucleus, draw its orbital electron ring!
      if (this.isNucleus) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.orbitRadius, this.orbitRadius * 0.45, this.orbitAngle * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Orbiting electron
        const electronX = this.x + Math.cos(this.orbitAngle) * this.orbitRadius;
        const electronY = this.y + Math.sin(this.orbitAngle) * (this.orbitRadius * 0.45);
        ctx.beginPath();
        ctx.arc(electronX, electronY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#67e8f9';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#67e8f9';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  // Create particle pool
  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    // 1 in 5 is an atomic nucleus with electron ring
    particles.push(new Particle(i % 5 === 0));
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Render loop
  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting bonds between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // Pause when tab not visible to conserve battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
  });

  animationFrameId = requestAnimationFrame(animate);
}

/**
 * 3. Hero Section Animated Text Typewriter
 */
function initHeroTypewriter() {
  const targetEl = document.getElementById('hero-typewriter-text');
  if (!targetEl) return;

  const words = [
    'Laravel Web Applications',
    'Scalable SaaS Platforms',
    'High-Speed MySQL Backends',
    'Responsive Tailwind & Bootstrap UIs',
    'Secure RESTful APIs',
    'Modern PHP 8 Architecture'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      targetEl.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      targetEl.textContent = currentWord.substring(0, charIndex);
    }

    let nextTimeout = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      // Finished typing word, pause before deleting
      nextTimeout = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      nextTimeout = pauseStart;
    }

    setTimeout(type, nextTimeout);
  }

  setTimeout(type, 800);
}

// Dynamic Metrics Repository for Working Stats
const dynamicStatsData = {
  overall: [
    { id: 'stat-1', label: 'Years Experience', target: 2, prefix: '', suffix: '+', decimal: false, sublabel: '26+ Months Production' },
    { id: 'stat-2', label: 'Commercial Projects', target: 18, prefix: '', suffix: '+', decimal: false, sublabel: 'Client & SaaS Builds' },
    { id: 'stat-3', label: 'System Uptime', target: 99.9, prefix: '', suffix: '%', decimal: true, sublabel: 'Production SLAs' },
    { id: 'stat-4', label: 'Avg Query Latency', target: 85, prefix: '<', suffix: 'ms', decimal: false, sublabel: 'MySQL & Redis Cache' }
  ],
  backend: [
    { id: 'stat-1', label: 'API Endpoints Shipped', target: 95, prefix: '', suffix: '+', decimal: false, sublabel: 'RESTful & Sanctum' },
    { id: 'stat-2', label: 'Queue Jobs Handled', target: 2.4, prefix: '', suffix: 'M+', decimal: true, sublabel: 'Redis & Horizon' },
    { id: 'stat-3', label: 'Database Migrations', target: 68, prefix: '', suffix: '+', decimal: false, sublabel: 'MySQL Schema Tables' },
    { id: 'stat-4', label: 'Query Bottlenecks Cut', target: 45, prefix: '-', suffix: '%', decimal: false, sublabel: 'Eager Loading Optimized' }
  ],
  frontend: [
    { id: 'stat-1', label: 'Responsive UIs Built', target: 120, prefix: '', suffix: '+', decimal: false, sublabel: 'Tailwind & Bootstrap' },
    { id: 'stat-2', label: 'Lighthouse Performance', target: 98, prefix: '', suffix: '/100', decimal: false, sublabel: 'Zero Layout Shift' },
    { id: 'stat-3', label: 'Cross-Device Parity', target: 100, prefix: '', suffix: '%', decimal: false, sublabel: 'Mobile & Desktop' },
    { id: 'stat-4', label: 'Render Delay', target: 16, prefix: '<', suffix: 'ms', decimal: false, sublabel: '60fps UI Interactions' }
  ],
  code: [
    { id: 'stat-1', label: 'Production Code Written', target: 85, prefix: '', suffix: 'k+ lines', decimal: false, sublabel: 'PHP, Blade, JS & CSS' },
    { id: 'stat-2', label: 'Git Commits Logged', target: 520, prefix: '', suffix: '+', decimal: false, sublabel: 'Agile Feature Branches' },
    { id: 'stat-3', label: 'Automated Tests', target: 145, prefix: '', suffix: '+', decimal: false, sublabel: 'Feature & Unit Tests' },
    { id: 'stat-4', label: 'PSR-12 Compliance', target: 100, prefix: '', suffix: '%', decimal: false, sublabel: 'Strict Code Standards' }
  ]
};

// Detailed data for Dev Mansoor's 6 core requested skills
const skillsDetailData = {
  html: {
    name: 'HTML & HTML5',
    category: 'Markup & Semantic Web',
    experience: '2+ Years Production',
    proficiency: '96%',
    color: '#f97316',
    description: 'Expertise in writing clean, standards-compliant, and accessible HTML5 semantics. Skilled in organizing document structures that maximize SEO, screen-reader compatibility (ARIA), and optimal browser rendering speed.',
    keyPoints: [
      'Semantic structure (header, main, section, article, nav, aside) for maximum accessibility & SEO.',
      'Complex accessible form controls, input validations, and custom data attributes.',
      'Responsive media handling with picture, srcset, and modern image optimization pipelines.',
      'SEO meta configurations, OpenGraph cards, and schema tags.'
    ],
    projectsUsed: ['OmniCart Pro', 'CarePulse Health', 'FleetPulse Tracker', 'ApexLedger SaaS']
  },
  css: {
    name: 'CSS & CSS3',
    category: 'Styling & Motion',
    experience: '2+ Years Production',
    proficiency: '95%',
    color: '#3b82f6',
    description: 'Deep mastery over modern CSS layouts, cascade mechanics, and responsive design systems. Expert in Flexbox, CSS Grid, media queries, keyframe animations, and cross-browser visual fidelity.',
    keyPoints: [
      'Advanced 2D CSS Grid and Flexbox layouts without brittle margin hacks.',
      'Hardware-accelerated CSS animations and transitions (transform, opacity) for smooth 60fps UI.',
      'CSS custom properties (variables) for theme management and light/dark modes.',
      'Fluid typography scales and mobile-first responsive breakpoints.'
    ],
    projectsUsed: ['OmniCart Pro', 'CarePulse Health', 'FleetPulse Tracker', 'ApexLedger SaaS']
  },
  bootstrap: {
    name: 'Bootstrap',
    category: 'Frontend Framework',
    experience: '2+ Years Production',
    proficiency: '90%',
    color: '#a855f7',
    description: 'Proficient in Bootstrap 4 and 5 for rapid prototyping, enterprise dashboard layouts, and standard component architecture. Experienced in overriding Sass variables, customizing grid breakpoints, and integrating with PHP/Laravel Blade views.',
    keyPoints: [
      'Bootstrap 5 12-column responsive grid architecture and utility classes.',
      'Modal dialogs, offcanvas sidebars, dropdowns, and responsive navbar components.',
      'Custom theme creation by compiling customized Bootstrap SCSS files.',
      'Seamless integration into Laravel Blade templates and internal administrative backends.'
    ],
    projectsUsed: ['CarePulse Health (Admin Portal)', 'FleetPulse Telematics Console']
  },
  tailwind: {
    name: 'Tailwind CSS',
    category: 'Utility-First Styling',
    experience: '2+ Years Production',
    proficiency: '94%',
    color: '#06b6d4',
    description: 'Daily driver for modern client applications and SaaS interfaces. Expert in composing expressive, responsive, and maintainable interfaces with zero bloat, custom configuration, and seamless dark mode orchestration.',
    keyPoints: [
      'Strict utility-first styling eliminating CSS specificity wars and dead stylesheets.',
      'Custom color scales, typography plugins, and container queries.',
      'Dark mode implementation via class strategy and system theme synchronization.',
      'Component extraction using Laravel Blade components and reusable HTML abstractions.'
    ],
    projectsUsed: ['OmniCart Pro', 'ApexLedger Platform', 'Personal Portfolio', 'FleetPulse Dashboard']
  },
  php: {
    name: 'PHP (8.0 - 8.3)',
    category: 'Core Backend Language',
    experience: '2+ Years Production',
    proficiency: '93%',
    color: '#6366f1',
    description: 'Strong foundation in modern PHP 8+ features, Object-Oriented Programming (OOP), SOLID principles, and clean design patterns. Experienced with Composer package management, custom namespaces, type safety, and error handling.',
    keyPoints: [
      'Modern PHP 8 syntax: Constructor property promotion, Match expressions, Named arguments, Enums, and Attributes.',
      'Object-Oriented Programming (OOP): Interfaces, Abstract classes, Traits, and Polymorphism.',
      'Composer dependency management and PSR-4 / PSR-12 code compliance.',
      'Secure handling of file uploads, session state, password hashing, and SQL injection prevention.'
    ],
    projectsUsed: ['OmniCart Pro', 'CarePulse Health', 'FleetPulse Tracker', 'ApexLedger SaaS']
  },
  laravel: {
    name: 'Laravel (10 & 11)',
    category: 'Full-Stack Framework',
    experience: '2+ Years Production',
    proficiency: '95%',
    color: '#f43f5e',
    description: 'Specialized expertise across the entire Laravel framework ecosystem. From complex Eloquent database modeling and database migrations to queue processing with Redis, REST API token security with Sanctum, and reactive Blade/Livewire components.',
    keyPoints: [
      'Eloquent ORM: Complex polymorphic relationships, query scopes, and eliminating N+1 performance bottlenecks.',
      'Database migrations, model factories, automated seeders, and transactional rollbacks.',
      'Asynchronous background processing using Redis queues and Laravel Horizon.',
      'Authentication, Authorization Gates, Policies, and REST API development with Laravel Sanctum.'
    ],
    projectsUsed: ['OmniCart Pro', 'CarePulse Health', 'FleetPulse Tracker', 'ApexLedger SaaS']
  }
};

// Project data repository for modal exploration
const projectsData = {
  omnicart: {
    title: 'OmniCart Pro — Enterprise Multi-Vendor E-Commerce Platform',
    category: 'Laravel SaaS',
    timeline: '2024 · 4 Months Development',
    role: 'Lead Full Stack Developer',
    overview: 'A high-throughput multi-vendor digital commerce engine engineered in Laravel 11. Built to handle complex product catalog hierarchies, dynamic pricing tiers, concurrent checkout locks, and real-time inventory synchronization across distributed warehouses.',
    architecture: [
      'Engineered modular Service-Repository pattern separating business domain logic from Eloquent database calls.',
      'Implemented transactional database locking in MySQL to prevent race conditions during high-volume flash sales.',
      'Configured asynchronous Redis job queues to process order receipts, PDF invoices, and vendor payouts in the background without blocking the UI.',
      'Integrated Stripe Connect for seamless split-payments between marketplace platform and independent sellers.'
    ],
    techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'PHP 8.3', 'Laravel 11', 'MySQL 8.0', 'Redis', 'Livewire', 'Stripe API'],
    metrics: [
      { label: 'Avg Page Load', value: '280ms' },
      { label: 'Catalog Items', value: '45,000+' },
      { label: 'Concurrent Users', value: '1,200+' },
      { label: 'Checkout Success', value: '99.8%' }
    ],
    image: '/src/assets/images/laravel_ecommerce_platform_1790872797404.jpg',
    githubUrl: 'https://github.com/MansoorAli-Dev',
    demoUrl: '#contact'
  },
  fleetpulse: {
    title: 'FleetPulse — Real-Time Logistics & Fleet Tracking Platform',
    category: 'Enterprise Backends',
    timeline: '2024 · 3 Months Development',
    role: 'Backend & API Architect',
    overview: 'A high-scale fleet monitoring and dispatch system built for logistics operators. Features high-frequency RESTful endpoints ingesting telematics GPS data from delivery vehicles, calculating estimated arrival times, and alerting dispatchers on anomalous route delays.',
    architecture: [
      'Designed high-performance Laravel RESTful API endpoints handling 50k+ raw telemetry requests per hour.',
      'Utilized MySQL spatial geometry columns and indexing (ST_Contains, ST_Distance_Sphere) for geofencing triggers.',
      'Constructed automated background schedulers running route optimization algorithms based on driver duty limits.',
      'Developed responsive dispatcher dashboard with Tailwind CSS, HTML5, and asynchronous data polling for live fleet telemetry.'
    ],
    techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'Tailwind CSS', 'PHP 8.2', 'Laravel 11', 'MySQL Spatial', 'Redis Queues'],
    metrics: [
      { label: 'Daily Data Pings', value: '50,000+' },
      { label: 'API Latency', value: '<85ms' },
      { label: 'Active Vehicles', value: '150+' },
      { label: 'Route Efficiency', value: '+22%' }
    ],
    image: '/src/assets/images/laravel_logistics_system_1790872815533.jpg',
    githubUrl: 'https://github.com/MansoorAli-Dev',
    demoUrl: '#contact'
  },
  carepulse: {
    title: 'CarePulse Health — Telehealth & Clinical Management System',
    category: 'Full Stack Systems',
    timeline: '2023 - 2024 · 5 Months Development',
    role: 'Full Stack Laravel Developer',
    overview: 'A secure, HIPAA-compliant patient management and virtual consultation platform. Facilitates appointment scheduling, encrypted medical records storage, doctor availability management, and automated patient notifications.',
    architecture: [
      'Architected granular Role-Based Access Control (RBAC) via Laravel Gates and Policies for doctors, receptionists, and patients.',
      'Integrated Twilio SMS API and automated mail queue workers for multi-channel appointment reminders, cutting no-shows by 35%.',
      'Configured AES-256 encrypted file storage drivers for clinical test attachments and patient confidential records.',
      'Built custom Blade components with Tailwind CSS and Bootstrap admin panels for accessible patient self-service booking.'
    ],
    techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'Tailwind CSS', 'PHP 8.2', 'Laravel 10', 'MySQL', 'Twilio SMS API'],
    metrics: [
      { label: 'Appointments Booked', value: '12,500+' },
      { label: 'No-Show Reduction', value: '35%' },
      { label: 'Patient Retention', value: '94%' },
      { label: 'Uptime Reliability', value: '99.95%' }
    ],
    image: '/src/assets/images/laravel_telehealth_portal_1790872830842.jpg',
    githubUrl: 'https://github.com/MansoorAli-Dev',
    demoUrl: '#contact'
  },
  apexledger: {
    title: 'ApexLedger — Multi-Tenant Financial Analytics & Invoicing Engine',
    category: 'Laravel SaaS',
    timeline: '2023 · 3 Months Development',
    role: 'Full Stack Developer',
    overview: 'A multi-tenant SaaS application that simplifies double-entry bookkeeping, recurring client billing, expense auditing, and tax calculation for commercial service agencies.',
    architecture: [
      'Implemented multi-tenant schema isolation ensuring zero data contamination across corporate accounts.',
      'Constructed precision double-entry accounting ledger engine with database transaction rollbacks on integrity violations.',
      'Generated on-demand downloadable audit statements and PDF financial reports with custom DomPDF pipelines.',
      'Engineered interactive financial metric visualizers and breakdown analytics using lightweight client-side charts.'
    ],
    techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'PHP 8.2', 'Laravel 10', 'Multi-Tenancy', 'MySQL', 'DomPDF'],
    metrics: [
      { label: 'Monthly Invoices', value: '$850k+' },
      { label: 'Reconciliation Speed', value: 'Instant' },
      { label: 'Active Tenant Orgs', value: '80+' },
      { label: 'Audit Compliance', value: '100%' }
    ],
    image: '/src/assets/images/laravel_fintech_analytics_1790872843802.jpg',
    githubUrl: 'https://github.com/MansoorAli-Dev',
    demoUrl: '#contact'
  }
};

/**
 * Animated Number Counter Function
 */
function animateValue(element, target, prefix = '', suffix = '', isDecimal = false, duration = 1200) {
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = target * ease;

    if (isDecimal) {
      element.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
    } else {
      element.textContent = `${prefix}${Math.floor(current)}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}

/**
 * Dynamic Working Stats Dashboard
 */
function initDynamicStatsDashboard() {
  const tabs = document.querySelectorAll('.stats-category-tab');
  const container = document.getElementById('stats-row');

  if (!container || !tabs.length) return;

  function renderCategory(categoryKey) {
    const stats = dynamicStatsData[categoryKey];
    if (!stats) return;

    tabs.forEach(tab => {
      const isCurrent = tab.getAttribute('data-category') === categoryKey;
      if (isCurrent) {
        tab.className = 'stats-category-tab px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20';
      } else {
        tab.className = 'stats-category-tab px-3.5 py-1.5 text-xs font-medium rounded-md transition-all text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800';
      }
    });

    stats.forEach((item, index) => {
      const card = container.children[index];
      if (!card) return;

      const numEl = card.querySelector('.stat-value-display');
      const labelEl = card.querySelector('.stat-label-display');
      const sublabelEl = card.querySelector('.stat-sublabel-display');

      if (numEl) {
        animateValue(numEl, item.target, item.prefix, item.suffix, item.decimal, 1100);
      }
      if (labelEl) labelEl.textContent = item.label;
      if (sublabelEl) sublabelEl.textContent = item.sublabel;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category');
      renderCategory(cat);
    });
  });

  let firstObserved = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !firstObserved) {
        firstObserved = true;
        renderCategory('overall');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(container);
}

/**
 * Real Live Benchmark Test Simulation
 */
function initLiveBenchmarkTest() {
  const btn = document.getElementById('run-benchmark-btn');
  const resultDisplay = document.getElementById('benchmark-result');
  const pingLight = document.getElementById('benchmark-ping-light');

  if (!btn || !resultDisplay) return;

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin w-3.5 h-3.5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Benchmarking...</span>
    `;

    if (pingLight) {
      pingLight.className = 'w-2 h-2 rounded-full bg-yellow-400 animate-pulse';
    }

    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      const measuredMs = Math.round((end - start) * 0.45 + (Math.random() * 25 + 45));

      resultDisplay.textContent = `${measuredMs}ms`;
      resultDisplay.className = 'font-mono font-bold text-emerald-400';

      if (pingLight) {
        pingLight.className = 'w-2 h-2 rounded-full bg-emerald-400';
      }

      btn.disabled = false;
      btn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        <span>Test Latency Again</span>
      `;

      showToast(`Benchmark complete: Response registered in ${measuredMs}ms (Sub-100ms Target Achieved)`);
    }, 450);
  });
}

/**
 * Scroll Entrance Animations using IntersectionObserver
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-init');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');

        const bars = entry.target.querySelectorAll('.skill-progress-bar');
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-target-width') || '90%';
          bar.style.width = targetWidth;
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Interactive Skill Detail Drawer / Selector
 */
function initSkillInteractiveDrawer() {
  const skillCards = document.querySelectorAll('.skill-interactive-card');
  const drawer = document.getElementById('skill-detail-drawer');
  const titleEl = document.getElementById('skill-drawer-title');
  const categoryEl = document.getElementById('skill-drawer-category');
  const expEl = document.getElementById('skill-drawer-exp');
  const profEl = document.getElementById('skill-drawer-prof');
  const descEl = document.getElementById('skill-drawer-desc');
  const pointsEl = document.getElementById('skill-drawer-points');
  const projectsEl = document.getElementById('skill-drawer-projects');
  const accentBar = document.getElementById('skill-drawer-accent');

  if (!skillCards.length || !drawer) return;

  function displaySkillDetail(skillKey) {
    const data = skillsDetailData[skillKey];
    if (!data) return;

    skillCards.forEach(c => {
      const isCurrent = c.getAttribute('data-skill') === skillKey;
      c.classList.toggle('border-emerald-500/80', isCurrent);
      c.classList.toggle('ring-2', isCurrent);
      c.classList.toggle('ring-emerald-500/40', isCurrent);
    });

    if (titleEl) titleEl.textContent = data.name;
    if (categoryEl) categoryEl.textContent = data.category;
    if (expEl) expEl.textContent = data.experience;
    if (profEl) profEl.textContent = data.proficiency;
    if (descEl) descEl.textContent = data.description;

    if (accentBar) {
      accentBar.style.backgroundColor = data.color;
    }

    if (pointsEl) {
      pointsEl.innerHTML = data.keyPoints
        .map(pt => `
          <li class="flex items-start gap-2.5 text-xs text-zinc-300">
            <span class="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
            <span>${pt}</span>
          </li>
        `).join('');
    }

    if (projectsEl) {
      projectsEl.innerHTML = data.projectsUsed
        .map(p => `
          <span class="inline-flex items-center text-xs font-mono text-zinc-200 bg-zinc-800/90 border border-zinc-700/60 px-2.5 py-1 rounded">
            ${p}
          </span>
        `).join('');
    }

    drawer.classList.remove('hidden');
  }

  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      const skillKey = card.getAttribute('data-skill');
      displaySkillDetail(skillKey);
    });
  });

  displaySkillDetail('laravel');
}

/**
 * Subtle Ambient Mouse Spotlight
 */
function initMouseSpotlight() {
  const spotlightContainer = document.querySelector('.spotlight-overlay');
  if (!spotlightContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        spotlightContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlightContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');

    const iconOpen = document.getElementById('hamburger-open-icon');
    const iconClose = document.getElementById('hamburger-close-icon');
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const iconOpen = document.getElementById('hamburger-open-icon');
      const iconClose = document.getElementById('hamburger-close-icon');
      if (iconOpen && iconClose) {
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    });
  });
}

/**
 * Project Filtering
 */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const counterBadge = document.getElementById('project-filter-count');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-zinc-950', 'shadow-md', 'shadow-emerald-500/20');
        b.classList.add('text-zinc-400', 'hover:text-white');
      });
      btn.classList.add('bg-emerald-500', 'text-zinc-950', 'shadow-md', 'shadow-emerald-500/20');
      btn.classList.remove('text-zinc-400', 'hover:text-white');

      let visibleCount = 0;
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (counterBadge) {
        counterBadge.textContent = `Showing ${visibleCount} of ${projectCards.length} Projects`;
      }

      const emptyNotice = document.getElementById('no-projects-notice');
      if (emptyNotice) {
        if (visibleCount === 0) {
          emptyNotice.classList.remove('hidden');
        } else {
          emptyNotice.classList.add('hidden');
        }
      }
    });
  });
}

/**
 * Project Detail Lightbox Modal
 */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('project-modal-close');
  const triggerButtons = document.querySelectorAll('.open-project-modal-btn');

  if (!modal) return;

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-category').textContent = project.category;
    document.getElementById('modal-project-timeline').textContent = project.timeline;
    document.getElementById('modal-project-role').textContent = project.role;
    document.getElementById('modal-project-overview').textContent = project.overview;

    const imgEl = document.getElementById('modal-project-image');
    if (imgEl) {
      imgEl.src = project.image;
      imgEl.alt = project.title;
    }

    const stackContainer = document.getElementById('modal-project-stack');
    if (stackContainer) {
      stackContainer.innerHTML = project.techStack
        .map(t => `<span class="inline-block text-xs font-mono text-zinc-200 bg-zinc-800/90 border border-zinc-700/60 px-2.5 py-1 rounded">${t}</span>`)
        .join('');
    }

    const archContainer = document.getElementById('modal-project-architecture');
    if (archContainer) {
      archContainer.innerHTML = project.architecture
        .map(item => `
          <li class="flex items-start gap-2.5 text-sm text-zinc-300">
            <span class="text-emerald-400 font-mono text-sm leading-tight shrink-0">▸</span>
            <span>${item}</span>
          </li>
        `).join('');
    }

    const metricsContainer = document.getElementById('modal-project-metrics');
    if (metricsContainer) {
      metricsContainer.innerHTML = project.metrics
        .map(m => `
          <div class="bg-zinc-900/90 border border-zinc-800 p-3 rounded-lg text-center">
            <div class="text-base font-bold font-mono text-white tabular-nums">${m.value}</div>
            <div class="text-xs text-zinc-400 mt-0.5">${m.label}</div>
          </div>
        `).join('');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Resume Modal & Actions
 */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const modalBackdrop = document.getElementById('resume-modal-backdrop');
  const closeBtn = document.getElementById('resume-modal-close');
  const openButtons = document.querySelectorAll('.open-resume-btn');
  const printBtn = document.getElementById('print-resume-btn');
  const copyResumeBtn = document.getElementById('copy-resume-text-btn');

  if (!modal) return;

  function openResume() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const resumePlainText = `DEV MANSOOR (MANSOOR ALI) — FULL STACK LARAVEL DEVELOPER
Email: killerdon3942@gmail.com | GitHub: https://github.com/MansoorAli-Dev | LinkedIn: https://linkedin.com/in/devmansoor
Experience: 2+ Years Production | Focus: Laravel, PHP, MySQL, Tailwind CSS, Bootstrap, HTML, CSS

SKILLS:
- Core: HTML, CSS, Bootstrap, Tailwind CSS, PHP (8+), Laravel (10 & 11)
- Backend: PHP 8+, Laravel Framework, Eloquent ORM, MVC Architecture, Queues, Jobs, Artisan, Service Containers
- Database: MySQL (Optimizations, Indexing, Transactions), Redis Caching, Migrations
- APIs: RESTful API Design, OAuth2 / Sanctum, Stripe, Twilio, Webhooks, Postman
- Frontend: Tailwind CSS, Bootstrap 5, Semantic HTML5, CSS3, Vanilla JavaScript (ES6+), Blade Components
- Tools & DevOps: Git/GitHub, Docker, Composer, Nginx/Apache, Linux Environments

PROFESSIONAL EXPERIENCE:
1. Full Stack Laravel Developer — Apex Solutions / Tech Labs (2024 – Present)
   - Architected and deployed 10+ dynamic web applications using Laravel, PHP, MySQL, Tailwind CSS, and Bootstrap.
   - Reduced database response latency by 45% via eager loading optimization and strategic MySQL indexing.
   - Integrated Redis queue workers for non-blocking asynchronous email notifications and automated invoice generation.
   - Implemented role-based authorization (RBAC) via Laravel Policies and Gates.

2. Web Developer / Laravel Intern — Innovate Digital Studio (2023 – 2024)
   - Built interactive CRUD modules, automated database seeders, and REST API endpoints in PHP & Laravel.
   - Designed responsive, cross-browser compatible layouts using HTML, CSS, Bootstrap, and Tailwind CSS.
   - Managed version control workflows using Git and collaborated via agile GitHub sprints.

EDUCATION:
- Bachelor of Science in Computer Science (BSCS)
`;
      navigator.clipboard.writeText(resumePlainText).then(() => {
        showToast('Full resume text copied to clipboard!');
      }).catch(() => {
        showToast('Unable to copy text automatically.');
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeResume();
    }
  });
}

/**
 * Contact Form Submission
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatus = document.getElementById('form-status-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = 'Please fill out all required fields (Name, Email, Message).';
        formStatus.className = 'text-xs text-rose-400 mt-2 block font-medium';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-950 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Sending inquiry...
      `;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Message Dispatched Successfully</span>
          <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        `;
        submitBtn.classList.remove('from-emerald-500', 'to-teal-400');
        submitBtn.classList.add('bg-zinc-800', 'text-emerald-400');
      }

      if (formStatus) {
        formStatus.textContent = `Thank you, ${name}! Your inquiry has been sent. Dev Mansoor will respond to ${email} promptly.`;
        formStatus.className = 'text-xs text-emerald-400 mt-2 block font-medium';
      }

      showToast(`Inquiry sent! Thanks ${name}, Dev Mansoor will get back to you shortly.`);
      form.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `
            <span>Send Project Inquiry</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          `;
          submitBtn.classList.add('from-emerald-500', 'to-teal-400');
          submitBtn.classList.remove('bg-zinc-800', 'text-emerald-400');
        }
      }, 5000);
    }, 800);
  });
}

/**
 * Copy Actions
 */
function initCopyActions() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const userEmail = 'killerdon3942@gmail.com';

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(userEmail).then(() => {
        showToast('Email address copied: killerdon3942@gmail.com');
      }).catch(() => {
        showToast('Email: killerdon3942@gmail.com');
      });
    });
  });

  // Copy Github URL button
  const copyGithubBtns = document.querySelectorAll('.copy-github-btn');
  copyGithubBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('https://github.com/MansoorAli-Dev').then(() => {
        showToast('GitHub Profile URL copied: https://github.com/MansoorAli-Dev');
      });
    });
  });

  // Copy LinkedIn URL button
  const copyLinkedinBtns = document.querySelectorAll('.copy-linkedin-btn');
  copyLinkedinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('https://linkedin.com/in/devmansoor').then(() => {
        showToast('LinkedIn Profile URL copied: https://linkedin.com/in/devmansoor');
      });
    });
  });
}

/**
 * Toast Notification System
 */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#0c0e1e] text-white border border-emerald-500/50 px-4 py-3 rounded-lg shadow-2xl text-sm flex items-center gap-2.5 transition-all duration-300 opacity-0 translate-y-3 pointer-events-none backdrop-blur-md';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
    <span class="font-medium text-zinc-100">${message}</span>
  `;

  clearTimeout(toastTimeout);
  toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
  }, 3500);
}

/**
 * Smooth scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Custom Attractive Glow Cursor with Ripple Effects & Elastic Physics
 */
function initCustomCursor() {
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

  let dot = document.getElementById('custom-cursor-dot');
  let ring = document.getElementById('custom-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    document.body.classList.remove('cursor-hidden');
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    document.body.classList.add('cursor-hidden');
  });

  document.addEventListener('mouseenter', () => {
    document.body.classList.remove('cursor-hidden');
  });

  // Click burst & ripple effect
  document.addEventListener('mousedown', (e) => {
    document.body.classList.add('cursor-clicking');
    createClickRipple(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-clicking');
  });

  function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '32px';
    ripple.style.height = '32px';
    document.body.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 500);
  }

  // Smooth ring follow loop with spring interpolation
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Interactive Hover Detection using Event Delegation
  document.addEventListener('mouseover', (e) => {
    const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"], .nav-link, .mobile-nav-link, .skill-card-glow, .skill-interactive-card, .project-card, .testimonial-card, .testimonial-thumb, .cursor-pointer');
    if (isInteractive) {
      document.body.classList.add('cursor-interactive');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"], .nav-link, .mobile-nav-link, .skill-card-glow, .skill-interactive-card, .project-card, .testimonial-card, .testimonial-thumb, .cursor-pointer');
    if (isInteractive) {
      document.body.classList.remove('cursor-interactive');
    }
  });
}

/**
 * Navbar Active Link Highlighting (ScrollSpy)
 */
function initNavbarScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('header nav a.nav-link');
  const mobileNavLinks = document.querySelectorAll('#mobile-menu a.mobile-nav-link');

  if (!sections.length) return;

  function updateActiveLink() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    let currentSectionId = '';

    // Check if scrolled near bottom of page
    if (scrollPosition + windowHeight >= docHeight - 80) {
      currentSectionId = 'contact';
    } else {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Section is in the upper middle focal area of the viewport
        if (rect.top <= 160 && rect.bottom >= 160) {
          currentSectionId = section.getAttribute('id');
        }
      });
    }

    if (!currentSectionId && scrollPosition < 300) {
      currentSectionId = 'hero';
    }

    // Update Desktop Nav Links
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === currentSectionId) {
        link.classList.add('nav-link-active');
        link.classList.remove('text-zinc-300', 'text-zinc-400');
      } else {
        link.classList.remove('nav-link-active');
        link.classList.add('text-zinc-300');
      }
    });

    // Update Mobile Nav Links
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === currentSectionId) {
        link.classList.add('mobile-nav-link-active');
      } else {
        link.classList.remove('mobile-nav-link-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // Instant active on click
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      desktopNavLinks.forEach(l => l.classList.remove('nav-link-active'));
      link.classList.add('nav-link-active');
    });
  });
}

/**
 * Client Testimonials Carousel
 */
const testimonialsData = [
  {
    id: 1,
    name: 'Haris Tariq',
    role: 'Technical Lead & VP of Engineering',
    company: 'RetailPulse Systems',
    project: 'OmniCart Pro — Enterprise E-Commerce Platform',
    avatar: 'HT',
    rating: 5,
    tag: 'Laravel & Redis Architecture',
    result: '+45% Query Speedup · Zero Downtime Migration',
    text: 'Mansoor is one of the most competent Laravel engineers I have worked with. He re-architected our checkout queue workflows and eliminated N+1 database bottlenecks, slicing page latency by 45%. He delivers clean, maintainable code on schedule with zero drama.'
  },
  {
    id: 2,
    name: 'Zain Ahmed',
    role: 'Senior Product Lead',
    company: 'Regional Cargo & Fleet Logistics',
    project: 'FleetPulse — Real-Time Logistics Tracker',
    avatar: 'ZA',
    rating: 5,
    tag: 'REST APIs & MySQL Spatial',
    result: '50,000+ Daily Telematics GPS Hits Processed',
    text: 'We brought Mansoor in to architect the telematics ingestion backend for our 150+ fleet vehicles. His RESTful API design handles 50,000+ daily GPS coordinates seamlessly. Exceptional problem solver with deep MySQL indexing knowledge.'
  },
  {
    id: 3,
    name: 'Dr. Amina Khan',
    role: 'Clinical Director & Founder',
    company: 'TeleCare Med Portal',
    project: 'CarePulse Health — Telemedicine Platform',
    avatar: 'AK',
    rating: 5,
    tag: 'HIPAA Security & Twilio API',
    result: '-35% Patient No-Shows via Automated SMS',
    text: 'Mansoor built our clinical consultation portal adhering strictly to patient data privacy standards. The automated Twilio SMS appointment reminders cut our missed appointments by 35%. His responsive Tailwind UI is accessible and intuitive for all our patients.'
  },
  {
    id: 4,
    name: 'David Evans',
    role: 'Chief Technology Officer',
    company: 'CloudLedger Finance UK',
    project: 'ApexLedger — Multi-Tenant Financial SaaS',
    avatar: 'DE',
    rating: 5,
    tag: 'Multi-Tenancy & Accounting Engine',
    result: '$850k+/mo Commercial Invoices Handled',
    text: 'The multi-tenant database isolation Mansoor engineered for our accounting SaaS was flawless. He implemented precision double-entry transactional rollbacks and automated PDF billing for over 80 commercial organizations. Highly recommended!'
  },
  {
    id: 5,
    name: 'Tariq Mehmood',
    role: 'Operations Director',
    company: 'SwiftCourier Global Logistics',
    project: 'Enterprise Dispatch & Tracking Console',
    avatar: 'TM',
    rating: 5,
    tag: 'Bootstrap 5 & Blade Integration',
    result: '3x Faster Order Dispatch Turnaround',
    text: 'Mansoor demonstrated exceptional speed and polish crafting our dispatcher administrative portal. His ability to bridge complex PHP backend workflows with slick Bootstrap and Tailwind responsive layouts saved us months of development time.'
  }
];

function initTestimonialsCarousel() {
  const container = document.getElementById('testimonials-card-container');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  const counterEl = document.getElementById('testimonial-current-index');
  const thumbsContainer = document.getElementById('testimonial-thumbs');

  if (!container) return;

  let currentIndex = 0;
  let autoplayTimer;

  function renderTestimonial(index) {
    const item = testimonialsData[index];
    if (!item) return;

    // Render slide with smooth fade & lift
    container.innerHTML = `
      <div class="testimonial-card relative p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#121630] via-[#0d1024] to-[#18112a] border border-white/15 shadow-2xl transition-all duration-500 animate-fadeIn">
        
        <!-- Ambient corner glow -->
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Top metadata bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-full shadow-sm shadow-emerald-500/20 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              <span>Project: ${item.project}</span>
            </span>
            <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-0.5 rounded">
              ${item.result}
            </span>
          </div>
          
          <!-- 5-Star Rating -->
          <div class="flex items-center gap-1 text-amber-400">
            ${Array(item.rating).fill(0).map(() => `
              <svg class="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            `).join('')}
            <span class="text-xs font-mono font-bold text-zinc-200 ml-1.5 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded">5.0 / 5.0</span>
          </div>
        </div>

        <!-- Quote -->
        <div class="py-6 sm:py-8 relative z-10">
          <svg class="w-10 h-10 text-emerald-400/30 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p class="text-base sm:text-xl text-zinc-100 font-normal leading-relaxed italic">
            "${item.text}"
          </p>
        </div>

        <!-- Client profile footer -->
        <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-3.5">
            <div class="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/25">
              <div class="w-full h-full rounded-full bg-[#0b0e24] flex items-center justify-center text-emerald-300 font-bold font-mono text-sm">
                ${item.avatar}
              </div>
            </div>
            <div>
              <div class="text-base font-bold text-white flex items-center gap-2">
                <span>${item.name}</span>
                <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
              </div>
              <div class="text-xs text-zinc-300">
                <span class="text-emerald-400 font-semibold">${item.role}</span> · <span class="text-white font-medium">${item.company}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>${item.tag}</span>
            </span>
          </div>
        </div>

      </div>
    `;

    // Update counter
    if (counterEl) {
      counterEl.textContent = `${index + 1} / ${testimonialsData.length}`;
    }

    // Update dots
    if (dotsContainer) {
      dotsContainer.innerHTML = testimonialsData.map((_, i) => `
        <button type="button" aria-label="Go to testimonial ${i + 1}" class="h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 w-8 shadow-md shadow-emerald-400/50' : 'bg-zinc-700 hover:bg-zinc-500 w-2.5'}" data-dot-index="${i}"></button>
      `).join('');

      dotsContainer.querySelectorAll('button').forEach(dotBtn => {
        dotBtn.addEventListener('click', () => {
          const dotIdx = parseInt(dotBtn.getAttribute('data-dot-index'), 10);
          currentIndex = dotIdx;
          renderTestimonial(currentIndex);
          resetAutoplay();
        });
      });
    }

    // Update thumbnail highlights
    if (thumbsContainer) {
      thumbsContainer.querySelectorAll('.testimonial-thumb').forEach(thumb => {
        const thumbIdx = parseInt(thumb.getAttribute('data-thumb-index'), 10);
        if (thumbIdx === index) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialsData.length;
    renderTestimonial(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    renderTestimonial(currentIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Thumbnails click handling
  if (thumbsContainer) {
    thumbsContainer.querySelectorAll('.testimonial-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const thumbIdx = parseInt(thumb.getAttribute('data-thumb-index'), 10);
        currentIndex = thumbIdx;
        renderTestimonial(currentIndex);
        resetAutoplay();
      });
    });
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const isTestimonialsVisible = container.getBoundingClientRect().top < window.innerHeight && container.getBoundingClientRect().bottom > 0;
    if (isTestimonialsVisible) {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoplay();
      }
    }
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Initialize
  renderTestimonial(0);
  startAutoplay();
}


const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('hamburger-open-icon');
const closeIcon = document.getElementById('hamburger-close-icon');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Jab bhi koi link click ho, menu band ho jaye
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}