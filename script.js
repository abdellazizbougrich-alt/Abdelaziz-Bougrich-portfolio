/**
 * PORTFOLIO — script.js
 * Author: Abdelaziz BOUGRICH Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================
  // 1. THEME TOGGLE (Dark / Light Mode)
  // ==========================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Theme Toggle Button Text updater (depends on language & theme)
  const updateThemeToggleText = () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const currentLang = localStorage.getItem('preferred_lang') || 'en';
    const textEl = document.querySelector('.theme-btn-text');
    if (!textEl) return;
    
    const themeTexts = {
      en: { day: 'Day mode', night: 'Night mode' },
      fr: { day: 'Mode Jour', night: 'Mode Nuit' },
      it: { day: 'Modo Giorno', night: 'Modo Notte' }
    };
    
    const langTexts = themeTexts[currentLang] || themeTexts['en'];
    textEl.textContent = currentTheme === 'light' ? langTexts.night : langTexts.day;
  };

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Check system preference if no saved theme
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) {
      htmlElement.setAttribute('data-theme', 'light');
    }
  }
  
  // Initial call to set text correctly on load
  updateThemeToggleText();

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText();
  });

  // ==========================================================
  // 2. MOBILE NAVIGATION
  // ==========================================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  const toggleNav = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  };

  navToggle.addEventListener('click', toggleNav);

  // Close mobile menu when a link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleNav();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navToggle.contains(e.target) && 
        !navLinks.contains(e.target)) {
      toggleNav();
    }
  });

  // ==========================================================
  // 3. LANGUAGE SWITCHER & FULL i18n TRANSLATION ENGINE
  // ==========================================================
  const translations = {
    en: {
      // NAV
      'nav.about': 'About',
      'nav.experience': 'Work',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      // HERO
      'hero.greeting': "Hello, I'm",
      'hero.role': 'Technical Sales Professional',
      'hero.subtitle': 'Driving revenue through relationships &amp; CRM excellence',
      'hero.desc': '5+ years of experience in B2B technical sales, negotiation, and client relationship management — based in Bologna, Italy, open to opportunities across Europe.',
      'hero.tagline': '5+ years driving revenue through client relationships,<br />negotiation mastery &amp; CRM excellence.',
      'hero.cta_work': 'View My Work \u2192',
      'hero.cta_cv': '\u2193 Download CV',
      'hero.stat_exp': 'Years Exp.',
      'hero.stat_lang': 'Languages',
      'hero.stat_countries': 'Countries',
      'hero.stat_commit': 'Committed',
      // ABOUT
      'about.label': 'Who I Am',
      'about.title': 'About Me',
      'about.lead': 'Motivated and results-oriented professional with <strong>over five years of experience</strong> in technical sales and customer service. I combine excellent communication and negotiation skills with solid expertise in sales management and store operations.',
      'about.body': 'I thrive in dynamic, fast-paced environments, consistently delivering dedication, creative problem-solving, and outstanding client support. Currently based in <strong>Bologna, Italy</strong>, and open to new opportunities across Europe and beyond.',
      'about.badge_available': '✦ Available Immediately',
      'about.badge_open': 'Open to Work',
      'about.info_location_label': 'Location',
      'about.info_location_value': 'Bologna, Italy',
      'about.info_email_label': 'Email',
      'about.info_phone_label': 'Phone',
      'about.stat_exp': 'Years Experience',
      'about.stat_lang': 'Languages Spoken',
      'about.stat_countries': 'Countries Worked',
      'about.stat_commit': 'Commitment',
      // EXPERIENCE
      'exp.label': 'Career Path',
      'exp.title': 'Work Experience',
      'exp.eglo_role': 'Technical Sales Representative',
      'exp.eglo_date': 'November 2019 — April 2025',
      'exp.eglo_b1': 'Spearheaded comprehensive sales management strategies and successfully expanded the active client portfolio across the Moroccan region through targeted B2B initiatives.',
      'exp.eglo_b2': 'Orchestrated high-stakes negotiations with major stakeholders, successfully closing key commercial contracts and securing long-term partnerships.',
      'exp.eglo_b3': 'Directed end-to-end after-sales service operations, quickly resolving technical issues to maintain exceptional customer satisfaction and retention rates.',
      'exp.eglo_b4': 'Diligently managed CRM databases to maintain accurate client records, actively tracking order pipelines to forecast revenue and ensure timely deliveries.',
      'exp.eglo_b5': 'Optimized inventory management and stock control processes, reducing discrepancies and ensuring a highly efficient product turnover rate.',
      'exp.bim_role': 'Store Associate / Cashier',
      'exp.bim_date': 'March 2018 — October 2018',
      'exp.bim_b1': 'Coordinated daily product receiving, executed dynamic store displays, and organized stock to maximize accessibility and visual appeal for customers.',
      'exp.bim_b2': 'Executed fast and precise cashiering operations, handling daily transactions securely while minimizing wait times during peak hours.',
      'exp.bim_b3': 'Provided proactive and consistent support to store visitors, addressing inquiries and resolving issues to enhance the overall shopping experience.',
      'exp.bim_b4': 'Conducted regular inventory audits and warehouse tracking to maintain optimal stock levels and prevent product shortages.',
      'exp.onee_role': 'Intern — Final Year Project',
      'exp.onee_date': 'March 2017',
      'exp.onee_b1': 'Assisted the finance team with comprehensive accounting management, ensuring accurate budget tracking and financial data entry.',
      'exp.onee_b2': 'Supported the purchasing department by coordinating with external suppliers to verify orders, delivery schedules, and invoicing details.',
      'exp.onee_b3': 'Streamlined inventory records and maintained detailed warehouse documentation to support transparent and efficient logistical operations.',
      'exp.tf_role': 'Accounting Intern',
      'exp.tf_date': 'July 2016',
      'exp.tf_b1': 'Facilitated the preparation of monthly financial reports and ensured the accurate registration of incoming and outgoing invoices.',
      'exp.tf_b2': 'Managed essential administrative documentation, improving the organization of physical and digital filings for quick retrieval and compliance.',
      // EDUCATION
      'edu.label': 'Academic Background',
      'edu.title': 'Education',
      'edu.ista_degree': 'Diploma in Business Management',
      'edu.ista_level': 'Bac+2 (Technical Diploma)',
      'edu.ista_school': 'ISTA — Specialized Institute of Applied Technology',
      'edu.ibnzohr_degree': "Bachelor's in English Studies",
      'edu.ibnzohr_level': 'Licence (Bac+3)',
      'edu.ibnzohr_school': 'University Ibn Zohr',
      'edu.bac_degree': 'High School Diploma',
      'edu.bac_level': 'Modern Literature (Baccalauréat)',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'What I Bring',
      'skills.title': 'Skills &amp; Languages',
      'skills.tech_title': 'Technical Skills',
      'skills.hard_title': 'Hard Skills',
      'skills.soft_title': 'Soft Skills',
      'skills.cat_sales': 'Sales & Negotiation',
      'skills.cat_crm': 'CRM & Reporting',
      'skills.cat_tools': 'Office & Digital Tools',
      'skills.cat_ops': 'Operations & Logistics',
      'skills.lang_section_title': 'Languages',
      'skills.crm': 'CRM Systems',
      'skills.tech_sales': 'Technical Sales',
      'skills.negotiation': 'Negotiation',
      'skills.inventory': 'Inventory Management',
      'skills.warehouse': 'Warehouse Management',
      'skills.accounting': 'Accounting &amp; Reporting',
      'skills.cashier': 'Cashiering Operations',
      'skills.order_tracking': 'Order Tracking',
      'skills.after_sales': 'After-Sales Service',
      'skills.ms_office': 'Microsoft Office Suite',
            'hero.badge_open': 'Available for Opportunities',
      'hero.badge_location': 'Bologna, Italy',
      'hero.role': 'Technical Sales Professional',
      'hero.role_sub': 'B2B Sales · Negotiation · CRM Excellence',
      'hero.desc': '5+ years driving B2B revenue, client relationships, and commercial operations across industrial lighting and retail markets — based in Bologna, Italy.',
      'hero.stat_exp': 'Years Exp.',
      'hero.stat_exp_sub': 'B2B Sales & Negotiation',
      'hero.stat_lang': 'Languages',
      'hero.stat_lang_sub': 'Arabic, English, French, Italian',
      'hero.stat_skills': 'Key Accounts',
      'hero.stat_skills_sub': 'CRM & Client Retention',
      'hero.stat_lic': 'Fleet Licences',
      'hero.stat_lic_sub': 'Categories B, C, D, EB, EC, ED',
      'hero.cta_work': 'View My Work',
      'hero.cta_cv': 'Download CV / Résumé',
            'hero.badge_open': 'Disponible pour opportunités',
      'hero.badge_location': 'Bologne, Italie',
      'hero.role': 'Professionnel Technico-Commercial',
      'hero.role_sub': 'Ventes B2B · Négociation · Maîtrise CRM',
      'hero.desc': 'Plus de 5 ans d\'expérience dans le développement des ventes B2B, la négociation et la gestion commerciale dans l\'éclairage industriel et le commerce — basé à Bologne, Italie.',
      'hero.stat_exp': 'Années Exp.',
      'hero.stat_exp_sub': 'Vente B2B & Négociation',
      'hero.stat_lang': 'Langues',
      'hero.stat_lang_sub': 'Arabe, Anglais, Français, Italien',
      'hero.stat_skills': 'Comptes Clés',
      'hero.stat_skills_sub': 'CRM & Fidélisation Client',
      'hero.stat_lic': 'Permis Flotte',
      'hero.stat_lic_sub': 'Catégories B, C, D, EB, EC, ED',
      'hero.cta_work': 'Voir mes réalisations',
      'hero.cta_cv': 'Télécharger CV / Résumé',
            'hero.badge_open': 'Disponibile per Opportunità',
      'hero.badge_location': 'Bologna, Italia',
      'hero.role': 'Professionista Tecnico-Commerciale',
      'hero.role_sub': 'Vendite B2B · Negoziazione · Eccellenza CRM',
      'hero.desc': 'Oltre 5 anni di esperienza nello sviluppo vendite B2B, gestione relazioni con i clienti e negoziazione commerciale nel settore dell\'illuminazione industriale e retail — con sede a Bologna, Italia.',
      'hero.stat_exp': 'Anni Exp.',
      'hero.stat_exp_sub': 'Vendite B2B & Negoziazione',
      'hero.stat_lang': 'Lingue',
      'hero.stat_lang_sub': 'Arabo, Inglese, Francese, Italiano',
      'hero.stat_skills': 'Clienti Chiave',
      'hero.stat_skills_sub': 'CRM & Fidelizzazione Clientela',
      'hero.stat_lic': 'Patenti Flotta',
      'hero.stat_lic_sub': 'Categorie B, C, D, EB, EC, ED',
      'hero.cta_work': 'Scopri il mio lavoro',
      'hero.cta_cv': 'Scarica CV / Résumé',
      'skills.driving': 'Patente di guida: B, C, D, EB, EC, ED',
      'skills.driving_sub': 'Categorie: B · C · D · EB · EC · ED',
      'licence.b': 'Cat. B · Autovetture & Veicoli Commerciali Leggeri',
      'licence.c': 'Cat. C · Autocarri & Mezzi Pesanti (>3.5t)',
      'licence.d': 'Cat. D · Autobus & Trasporto Persone',
      'licence.eb': 'Cat. EB · Auto con Rimorchio Pesante',
      'licence.ec': 'Cat. EC · Autoarticolati & Mezzi Combinati Pesanti',
      'licence.ed': 'Cat. ED · Autosnodati & Autobus Doppi',
      'skills.sales_mgmt': 'Gestione commerciale',
      'skills.customer_svc': 'Eccellenza nel servizio clienti',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Lavoro di squadra',
      'skills.problem_solving': 'Risoluzione creativa dei problemi',
      'skills.persuasion': 'Persuasione',
      'skills.adaptability': 'Adattabilità',
      // LANG CARDS
      'lang.arabic': 'Arabo',
      'lang.arabic_level': 'Madrelingua · C2',
      'lang.arabic_desc': 'Madrelingua',
      'lang.english': 'Inglese',
      'lang.english_level': 'Professionale · C1',
      'lang.english_desc': 'Professionale',
      'lang.french': 'Francese',
      'lang.french_level': 'Avanzato · B2',
      'lang.french_desc': 'Avanzato',
      'lang.italian': 'Italiano',
      'lang.italian_level': 'Intermedio · B1',
      'lang.italian_desc': 'Intermedio',
      // CONTACT
      'contact.label': 'Contattami',
      'contact.title': 'Contattami',
      'contact.subtitle': 'Sono attualmente aperto a nuove opportunità. Che tu abbia una domanda o voglia semplicemente salutarmi, la mia casella di posta è sempre aperta.',
      'contact.email_label': 'Email',
      'contact.phone_label': 'Telefono',
      'contact.location_label': 'Posizione',
      'contact.location_value': 'Bologna, Italia',
      'contact.form_name': 'Nome completo',
      'contact.form_name_ph': 'Il tuo nome completo',
      'contact.form_email': 'Indirizzo email',
      'contact.form_subject': 'Oggetto',
      'contact.form_subject_ph': 'Di cosa si tratta?',
      'contact.form_message': 'Messaggio',
      'contact.form_message_ph': 'Dimmi di più...',
      'contact.form_send': 'Invia messaggio',
      'contact.form_success': 'Grazie! Il tuo messaggio è stato inviato con successo.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. Tutti i diritti riservati.',
      'footer.sub': 'Tecnico Commerciale · Bologna, Italia',
    }
  };

  const applyTranslation = (lang) => {
    const dict = translations[lang] || translations['en'];

    // Translate all [data-i18n] elements safely preserving SVG icons
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        const svgs = el.querySelectorAll('svg');
        if (svgs.length > 0) {
          const textSpan = el.querySelector('.badge-text, .pill-text, [data-i18n-text]');
          if (textSpan) {
            textSpan.innerHTML = dict[key];
          } else {
            // Find child text node to replace safely without blowing away SVGs
            let replaced = false;
            for (let node of el.childNodes) {
              if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                node.nodeValue = ' ' + dict[key].replace(/&amp;/g, '&') + ' ';
                replaced = true;
                break;
              }
            }
            if (!replaced) {
              el.innerHTML = dict[key];
            }
          }
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    // Translate all [data-i18n-placeholder] input/textarea elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update <html lang=""> attribute
    document.documentElement.setAttribute('lang', lang);

    // Also update theme toggle button text for language change
    updateThemeToggleText();
  };

  const setLanguage = (lang) => {
    localStorage.setItem('preferred_lang', lang);

    // Update active dropdown option style
    document.querySelectorAll('.lang-option').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
    });

    // Update the button text indicator
    const display = document.getElementById('current-lang-display');
    if (display) {
      display.textContent = lang;
    }

    applyTranslation(lang);
  };

  // Initialize on load
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

  // ── Language Dropdown: direct listeners (avoids conflict with nav's document handler) ──
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langDropdownMenu = document.getElementById('lang-dropdown-menu');

  // Helper: open/close the dropdown
  const openLangMenu = () => {
    langDropdownMenu.classList.add('open');
    langToggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeLangMenu = () => {
    langDropdownMenu.classList.remove('open');
    langToggleBtn.setAttribute('aria-expanded', 'false');
  };

  // Toggle on button click
  if (langToggleBtn && langDropdownMenu) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent this from immediately closing via the outside-click handler
      const isOpen = langDropdownMenu.classList.contains('open');
      isOpen ? closeLangMenu() : openLangMenu();
    });

    // Select a language option
    langDropdownMenu.addEventListener('click', (e) => {
      const option = e.target.closest('.lang-option');
      if (!option) return;
      e.stopPropagation();
      setLanguage(option.getAttribute('data-lang'));
      closeLangMenu();
    });

    // Close when clicking anywhere outside the wrapper
    document.addEventListener('click', (e) => {
      if (!langDropdownMenu.classList.contains('open')) return;
      const wrapper = document.getElementById('lang-dropdown-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        closeLangMenu();
      }
    });

    // Close on orientation change / resize
    window.addEventListener('resize', () => {
      if (langDropdownMenu.classList.contains('open')) { closeLangMenu(); }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langDropdownMenu.classList.contains('open')) {
        closeLangMenu();
        langToggleBtn.focus();
      }
    });
  }

  // ==========================================================
  // 4 & 5. SCROLL PERFORMANCE OPTIMIZATION (Header, To-Top, Nav)
  // ==========================================================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');
  const sections = document.querySelectorAll('section[id]');

  let isScrolling   = false;
  let lastScrollY   = window.scrollY;
  let scrollTicking = false;

  // Helper: close mobile nav cleanly
  const closeMobileNav = () => {
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  const handleScrollEvents = () => {
    const scrollY = window.scrollY;

    // 1. Header hide/show on scroll direction
    if (header) {
      const scrollingDown = scrollY > lastScrollY && scrollY > 200;

      if (scrollingDown) {
        header.classList.add('header--hidden');
        // Auto-close the mobile nav when header hides
        closeMobileNav();
      } else {
        header.classList.remove('header--hidden');
      }

      // Shrink effect
      header.classList.toggle('scrolled', scrollY > 50);
    }

    // 2. Auto-close mobile nav on ANY scroll (UX: prevents lost menu)
    if (Math.abs(scrollY - lastScrollY) > 8) {
      closeMobileNav();
    }

    lastScrollY   = scrollY;
    isScrolling   = false;
    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScrollEvents);
      isScrolling = true;
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================
  // 6. INTERSECTION OBSERVER (Scroll Animations)
  // ==========================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      
      // Standard reveal
      if (target.classList.contains('reveal')) {
        target.classList.add('is-visible');
        observer.unobserve(target); // Only animate once
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Redesigned Skill progress bar animation (sv2)
  // Inject one shared SVG gradient definition into <body> for ring fills
  const sv2Defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sv2Defs.setAttribute('class', 'sv2-ring-defs');
  sv2Defs.setAttribute('aria-hidden', 'true');
  sv2Defs.innerHTML = `<defs>
    <linearGradient id="sv2-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>`;
  document.body.appendChild(sv2Defs);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const getThreshold = (desktop, mobile) => window.innerWidth <= 768 ? mobile : desktop;
  const CIRCUMFERENCE = 2 * Math.PI * 58; // r=58 → ≈ 364.42

  // ── Animate progress bars ──
  const barsContainer = document.getElementById('sv2-bars');
  if (barsContainer) {
    const barsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fills = entry.target.querySelectorAll('.sv2-fill');
        fills.forEach((fill, i) => {
          const target = parseFloat(fill.dataset.target) || 0;
          if (prefersReducedMotion) {
            fill.style.width = target + '%';
          } else {
            const stagger = isTouch ? i * 55 : i * 80;
            setTimeout(() => { fill.style.width = target + '%'; }, stagger);
          }
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: getThreshold(0.15, 0.1) });
    barsObserver.observe(barsContainer);
  }

  // ── Language rings + drop-in animations + micro bars ──
  const langBlock = document.getElementById('sv2-lang-block');
  if (langBlock) {
    const langObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const cards   = entry.target.querySelectorAll('.sv2-lang-card');
        const rings   = entry.target.querySelectorAll('.sv2-ring-fill');
        const micros  = entry.target.querySelectorAll('.sv2-micro-fill');
        const legend  = entry.target.querySelector('.sv2-cefr-legend');

        // 1. Drop-in animation for each card
        cards.forEach(card => {
          card.classList.add('lang-animated');
        });
        if (legend) legend.classList.add('lang-animated');

        // 2. Animate ring fills
        rings.forEach((ring, i) => {
          const pct    = parseFloat(ring.dataset.pct) || 0;
          const filled = (pct / 100) * CIRCUMFERENCE;
          const gap    = CIRCUMFERENCE - filled;
          const animate = () => { ring.style.strokeDasharray = filled + ' ' + gap; };
          if (prefersReducedMotion) {
            animate();
          } else {
            // Delay ring fill to sync roughly with drop-in landing
            const stagger = isTouch ? (i * 105 + 280) : (i * 150 + 400);
            setTimeout(animate, stagger);
          }
        });

        // 3. Animate micro bars
        micros.forEach((micro, i) => {
          const pct = parseFloat(micro.dataset.microPct) || 0;
          const animate = () => { micro.style.width = pct + '%'; };
          if (prefersReducedMotion) {
            animate();
          } else {
            const stagger = isTouch ? (i * 105 + 350) : (i * 150 + 500);
            setTimeout(animate, stagger);
          }
        });

        obs.unobserve(entry.target);
      });
    }, { threshold: getThreshold(0.3, 0.2) });

    langObserver.observe(langBlock);
  }

  // ----------------------------------------------------------
  // Bullet slide-in animation for Work Experience (VTL + legacy)
  // ----------------------------------------------------------
  const bulletObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      // VTL bullets + legacy CVT selectors
      const bullets = card.querySelectorAll('.vtl-bullets li, .cvt-bullets li, .exp-cinema-bullets li, .exp-card-bullets li');
      bullets.forEach((li, i) => {
          const stagger = isTouch ? (i * 90 + 30) : (i * 120 + 50);
          setTimeout(() => {
            li.classList.remove('bullet-hidden');
            li.classList.add('bullet-visible');
          }, stagger);
      });
      observer.unobserve(card);
    });
  }, { threshold: getThreshold(0.12, 0.08) });

  // Target VTL cards + legacy CVT cards
  const expBlocks = document.querySelectorAll('.vtl-card, .cvt-card, .exp-cinema, .exp-card');
  expBlocks.forEach(card => {
    const bullets = card.querySelectorAll('.vtl-bullets li, .cvt-bullets li, .exp-cinema-bullets li, .exp-card-bullets li');
    bullets.forEach(li => li.classList.add('bullet-hidden'));
    bulletObserver.observe(card);
  });

  // ----------------------------------------------------------
  // CVT Parallax — shift .cvt-img on scroll for depth effect
  // ----------------------------------------------------------
  if (!isTouch && !prefersReducedMotion) {
    const cvtImgs = document.querySelectorAll('.cvt-img');
    if (cvtImgs.length) {
      let rafPending = false;
      const updateParallax = () => {
        cvtImgs.forEach(img => {
          const card = img.closest('.cvt-card');
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const vh = window.innerHeight;
          // Only move when card is in view
          if (rect.bottom < 0 || rect.top > vh) return;
          // Center-relative offset: 0 at center, ±1 at edges
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          // Parallax magnitude: ±40px max
          const shift = progress * 40;
          img.style.transform = `translateY(${shift}px)`;
        });
        rafPending = false;
      };

      window.addEventListener('scroll', () => {
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(updateParallax);
        }
      }, { passive: true });

      // Initial call so images are positioned correctly on load
      updateParallax();
    }
  }

  // ----------------------------------------------------------
  // Ghost Year Parallax — shift .vtl-ghost-year at 0.3x scroll
  // Disabled on touch devices and prefers-reduced-motion
  // ----------------------------------------------------------
  if (!isTouch && !prefersReducedMotion) {
    const ghostYears = document.querySelectorAll('.vtl-ghost-year');
    if (ghostYears.length) {
      let ghostRafPending = false;
      const updateGhostParallax = () => {
        const vh = window.innerHeight;
        ghostYears.forEach(ghost => {
          const card = ghost.closest('.vtl-card');
          if (!card) return;
          const rect = card.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > vh + 100) return;
          // Progress relative to viewport center; 0.3x speed = 60px max drift
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          ghost.style.transform = `translateY(${progress * 60}px)`;
        });
        ghostRafPending = false;
      };
      window.addEventListener('scroll', () => {
        if (!ghostRafPending) {
          ghostRafPending = true;
          requestAnimationFrame(updateGhostParallax);
        }
      }, { passive: true });
      updateGhostParallax();
    }
  }
  // ----------------------------------------------------------
  // Image Panel Scroll Reveal — .exp-image-panel
  // ----------------------------------------------------------
  const imagePanels = document.querySelectorAll('.exp-image-panel');
  if (imagePanels.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('img-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    imagePanels.forEach(panel => imageObserver.observe(panel));
  }

  // ==========================================================
  // EXPERIENCE ELEGANCE: Duration labels + Tenure progress bars
  // ==========================================================
  (function initExpElegance() {
    /** Parse "YYYY-MM" → { year, month }. Falls back to today if absent. */
    const parseDate = (str) => {
      if (!str) { const n = new Date(); return { year: n.getFullYear(), month: n.getMonth() + 1 }; }
      const [y, m] = str.split('-').map(Number);
      return { year: y || new Date().getFullYear(), month: m || 1 };
    };

    /** Inclusive month count between two dates */
    const monthsBetween = (s, e) => Math.max(1, (e.year - s.year) * 12 + (e.month - s.month) + 1);

    /** "X yr Y mo" formatter */
    const fmt = (total) => {
      const yrs = Math.floor(total / 12), mos = total % 12;
      if (yrs === 0) return `${mos} mo`;
      if (mos === 0) return `${yrs} yr`;
      return `${yrs} yr ${mos} mo`;
    };

    const blocks = Array.from(document.querySelectorAll('[data-start]'));
    if (!blocks.length) return;

    // Compute month counts for every block
    const counts = blocks.map(block => {
      const s = parseDate(block.dataset.start);
      const e = parseDate(block.dataset.end);
      return monthsBetween(s, e);
    });

    // Inject duration text & store relative % on fill elements
    const maxMonths = Math.max(...counts);
    blocks.forEach((block, i) => {
      const durEl = block.querySelector('.exp-duration');
      if (durEl) durEl.textContent = fmt(counts[i]);
      const fill = block.querySelector('.exp-tenure-fill');
      if (fill) fill.dataset.tenurePct = Math.round((counts[i] / maxMonths) * 100);
    });

    // Animate bars in on scroll
    const tenureObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fill = entry.target.querySelector('.exp-tenure-fill');
        if (fill) {
          const pct = fill.dataset.tenurePct || 0;
          const apply = () => { fill.style.width = pct + '%'; };
          prefersReducedMotion ? apply() : setTimeout(apply, 350);
        }
        obs.unobserve(entry.target);
      });
    }, { threshold: getThreshold(0.25, 0.15) });

    blocks.forEach(b => tenureObs.observe(b));
  })();

  // ==========================================================
  // 8. CONTACT EMAIL REDIRECT (Mobile/Desktop)

  // ==========================================================
  const contactEmailLink = document.getElementById('contact-icon-email');
  if (contactEmailLink) {
    // Use touch capability + small viewport for reliable mobile detection
  const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      // Changing the link to mailto: which triggers the default native mail app (e.g. Gmail) on mobile devices
      contactEmailLink.href = 'mailto:abdelaziz.bougrich@gmail.com';
      contactEmailLink.removeAttribute('target'); // Removing target="_blank" since it's unnecessary for app links
    }
  }

  // ==========================================================
  // 9. LOCAL FILE RENDER FIX (Hash Links Intercept)
  // ==========================================================
  // Fixes "Unsafe attempt to load URL... from frame" local security error
  // intercepting native hash-anchors to use smooth JS scrolling instead 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Prevent the browser's default exact URL navigation modification
      e.preventDefault(); 
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        // Find correct header offset for elegant visual positioning
        const headerOffset = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
        
        // Ensure mobile nav menu closes on selection automatically
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          const toggle = document.getElementById('nav-toggle');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ==========================================================
  // 10. DIPLOMA MODAL / LIGHTBOX
  // ==========================================================
  const diplomaBtns = document.querySelectorAll('.btn-diploma');
  const diplomaModal = document.getElementById('diploma-modal');
  const diplomaImg = document.getElementById('diploma-modal-img');
  const diplomaClose = document.getElementById('diploma-modal-close');

  if (diplomaModal) {
    const openModal = (src) => {
      diplomaImg.src = src;
      diplomaModal.classList.add('open');
      diplomaModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
      diplomaModal.classList.remove('open');
      diplomaModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!diplomaModal.classList.contains('open')) {
          diplomaImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; // Prevents local file frame error
        }
      }, 300);
    };

    diplomaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const src = btn.getAttribute('data-diploma');
        if (src) {
          openModal(src);
        }
      });
    });

    diplomaClose.addEventListener('click', closeModal);

    // Close on click outside
    diplomaModal.addEventListener('click', (e) => {
      if (e.target === diplomaModal || e.target.classList.contains('diploma-modal-overlay')) {
        closeModal();
      }
    });

    // Close on orientation change / resize
    window.addEventListener('resize', () => {
      if (diplomaModal.classList.contains('open')) { closeModal(); }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && diplomaModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ==========================================================
  // 11. EXPERIENCE IMAGE GALLERY — 3D Tilt + Cross-Fade Engine
  // ==========================================================
  const expGalleries = document.querySelectorAll('.exp-image-gallery');

  if (expGalleries.length) {

    // ── Preload secondary (popup) images for seamless cross-fade ──
    expGalleries.forEach(gallery => {
      const popupImg = gallery.querySelector('.exp-img-popup img');
      if (popupImg && popupImg.src && !popupImg.complete) {
        const preloader = new Image();
        preloader.src = popupImg.src;
      }
    });

    // ── 3D Tilt effect (desktop/pointer only) ──
    if (!isTouch && !prefersReducedMotion) {
      const TILT_AMOUNT = 7;   // max degrees of rotation
      const EASE_MS     = 80;  // ms for live tracking (fast, feels physical)

      expGalleries.forEach(gallery => {
        let rafId = null;
        let isHovering = false;

        // Cache rect on enter (avoids repeated getBoundingClientRect in mousemove)
        let rect = null;

        gallery.addEventListener('mouseenter', () => {
          isHovering = true;
          rect = gallery.getBoundingClientRect();
          gallery.classList.add('tilt-active');
        });

        gallery.addEventListener('mousemove', (e) => {
          if (!isHovering || !rect) return;

          // Cancel pending frame
          if (rafId) cancelAnimationFrame(rafId);

          rafId = requestAnimationFrame(() => {
            // Normalised offsets: -1 (left/top) to +1 (right/bottom)
            const dx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
            const dy = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

            // Tilt: rotateX is inverted (mouse up → top tilts toward viewer)
            const tiltX = -(dy * TILT_AMOUNT).toFixed(2);
            const tiltY =  (dx * TILT_AMOUNT).toFixed(2);

            // Mouse position as percentage (for glare radial-gradient)
            const pctX = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
            const pctY = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);

            gallery.style.setProperty('--tilt-x', `${tiltX}deg`);
            gallery.style.setProperty('--tilt-y', `${tiltY}deg`);
            gallery.style.setProperty('--mouse-x', `${pctX}%`);
            gallery.style.setProperty('--mouse-y', `${pctY}%`);
          });
        });

        gallery.addEventListener('mouseleave', () => {
          isHovering = false;
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

          // Animate back to flat using CSS transition (set in .tilt-active → removed)
          gallery.classList.remove('tilt-active');
          gallery.style.setProperty('--tilt-x', '0deg');
          gallery.style.setProperty('--tilt-y', '0deg');
          gallery.style.setProperty('--mouse-x', '50%');
          gallery.style.setProperty('--mouse-y', '50%');
        });

        // Re-measure rect on scroll/resize (debounced)
        window.addEventListener('resize', () => {
          if (isHovering) rect = gallery.getBoundingClientRect();
        }, { passive: true });
      });
    }
  }

  // ==========================================================
  // 12. ACTIVE NAV LINK — Intersection Observer highlight
  // ==========================================================
  const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionEls = document.querySelectorAll('section[id]');

  if (navLinkEls.length && sectionEls.length) {
    const activeLinkMap = new Map(
      Array.from(navLinkEls).map(link => [
        link.getAttribute('href').substring(1),
        link
      ])
    );

    const navHighlightObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinkEls.forEach(l => l.classList.remove('active'));
          const active = activeLinkMap.get(entry.target.id);
          if (active) active.classList.add('active');
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });

    sectionEls.forEach(sec => navHighlightObserver.observe(sec));
  }

  // ==========================================================
  // 13. EDUCATION TIMELINE ANIMATIONS
  // ==========================================================
  const eduSection = document.getElementById('education');
  if (eduSection) {
    // Split text for title
    const eduTitle = document.querySelector('.edu-split-text');
    if (eduTitle) {
      // Don't duplicate if already split
      if (!eduTitle.querySelector('.edu-char')) {
        const text = eduTitle.textContent;
        eduTitle.textContent = '';
        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = 'edu-char';
          span.style.transitionDelay = `${i * 0.05}s`;
          eduTitle.appendChild(span);
        });
        
        const titleObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            document.querySelectorAll('.edu-char').forEach(c => c.classList.add('is-visible'));
            titleObserver.disconnect();
          }
        }, { threshold: 0.5 });
        titleObserver.observe(eduTitle);
      }
    }

    // Mousemove tilt effect on grid cards
    if (!isTouch && !prefersReducedMotion) {
      const gridCards = document.querySelectorAll('.edu-grid-card');
      gridCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const dx = e.clientX - rect.left - rect.width / 2;
          const dy = e.clientY - rect.top - rect.height / 2;
          
          const maxTilt = 6;
          const tiltX = (dy / (rect.height / 2)) * -maxTilt;
          const tiltY = (dx / (rect.width / 2)) * maxTilt;
          
          card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg)`;
        });
      });
    }

    // Stat bar countUp
    const statTiles = document.querySelectorAll('.edu-stat-num');
    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-stat'), 10);
          let current = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));
          
          const timer = setInterval(() => {
            current++;
            el.textContent = current;
            if (current >= target) {
              clearInterval(timer);
              el.textContent = target;
            }
          }, stepTime);
          
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    statTiles.forEach(tile => statsObserver.observe(tile));
  }

});
