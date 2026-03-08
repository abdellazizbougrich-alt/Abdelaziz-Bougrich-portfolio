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

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
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
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      // HERO
      'hero.greeting': "Hello, I'm",
      'hero.role': 'Technical Sales Professional',
      'hero.tagline': '5+ years driving revenue through client relationships,<br />negotiation mastery &amp; CRM excellence.',
      'hero.cta_work': 'View My Work',
      'hero.cta_cv': 'Download CV',
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
      'exp.eglo_b1': 'Led sales management and client portfolio development across Morocco',
      'exp.eglo_b2': 'Conducted high-stakes negotiations and closed key commercial contracts',
      'exp.eglo_b3': 'Managed after-sales service, ensuring high customer satisfaction rates',
      'exp.eglo_b4': 'Maintained accurate CRM records and tracked order pipelines',
      'exp.eglo_b5': 'Inventory management and stock control optimization',
      'exp.bim_role': 'Store Associate / Cashier',
      'exp.bim_date': 'March 2018 — October 2018',
      'exp.bim_b1': 'Managed product receiving, display, and stock organization',
      'exp.bim_b2': 'Conducted cashiering operations with precision and speed',
      'exp.bim_b3': 'Delivered consistent customer support and issue resolution',
      'exp.bim_b4': 'Performed inventory management and warehouse tracking',
      'exp.onee_role': 'Intern — Final Year Project',
      'exp.onee_date': 'March 2017',
      'exp.onee_b1': 'Supported accounting management and budget tracking',
      'exp.onee_b2': 'Assisted purchasing department with supplier coordination',
      'exp.onee_b3': 'Managed inventory records and warehouse documentation',
      'exp.tf_role': 'Accounting Intern',
      'exp.tf_date': 'July 2016',
      'exp.tf_b1': 'Supported financial reporting and invoice registration',
      'exp.tf_b2': 'Handled administrative documentation and filings',
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
      'skills.hard_title': 'Hard Skills',
      'skills.soft_title': 'Soft Skills',
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
      'skills.driving': 'Driving Licence B',
      'skills.sales_mgmt': 'Sales Management',
      'skills.customer_svc': 'Customer Service Excellence',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Teamwork',
      'skills.problem_solving': 'Creative Problem Solving',
      'skills.persuasion': 'Persuasion',
      'skills.adaptability': 'Adaptability',
      // LANG CARDS
      'lang.arabic': 'Arabic',
      'lang.arabic_level': 'Native · C2',
      'lang.english': 'English',
      'lang.english_level': 'Professional · C1',
      'lang.french': 'French',
      'lang.french_level': 'Advanced · B2',
      'lang.italian': 'Italian',
      'lang.italian_level': 'Intermediate · B1',
      // CONTACT
      'contact.label': 'Get In Touch',
      'contact.title': 'Contact Me',
      'contact.subtitle': "I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open.",
      'contact.email_label': 'Email',
      'contact.phone_label': 'Phone',
      'contact.location_label': 'Location',
      'contact.location_value': 'Bologna, Italy',
      'contact.form_name': 'Full Name',
      'contact.form_name_ph': 'Your full name',
      'contact.form_email': 'Email Address',
      'contact.form_subject': 'Subject',
      'contact.form_subject_ph': "What's this about?",
      'contact.form_message': 'Message',
      'contact.form_message_ph': 'Tell me more...',
      'contact.form_send': 'Send Message',
      'contact.form_success': 'Thank you! Your message has been sent successfully.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. All rights reserved.',
      'footer.sub': 'Technical Sales Professional · Bologna, Italy',
    },

    fr: {
      // NAV
      'nav.about': 'À propos',
      'nav.experience': 'Expérience',
      'nav.education': 'Formation',
      'nav.skills': 'Compétences',
      'nav.contact': 'Contact',
      // HERO
      'hero.greeting': 'Bonjour, je suis',
      'hero.role': 'Commercial Technique',
      'hero.tagline': '5+ ans à générer du chiffre d\'affaires grâce aux relations clients,<br />à la maîtrise de la négociation &amp; à l\'excellence CRM.',
      'hero.cta_work': 'Voir mes réalisations',
      'hero.cta_cv': 'Télécharger le CV',
      // ABOUT
      'about.label': 'Qui je suis',
      'about.title': 'À propos de moi',
      'about.lead': 'Professionnel motivé et orienté résultats avec <strong>plus de cinq ans d\'expérience</strong> dans la vente technique et le service client. Je combine d\'excellentes compétences en communication et en négociation avec une solide expertise en gestion commerciale et en opérations de vente.',
      'about.body': 'Je m\'épanouis dans des environnements dynamiques, apportant constamment dévouement, résolution créative de problèmes et un excellent soutien client. Actuellement basé à <strong>Bologne, Italie</strong>, et ouvert aux nouvelles opportunités en Europe et au-delà.',
      'about.badge_available': '✦ Disponible immédiatement',
      'about.badge_open': 'Ouvert aux opportunités',
      'about.info_location_label': 'Localisation',
      'about.info_location_value': 'Bologne, Italie',
      'about.info_email_label': 'E-mail',
      'about.info_phone_label': 'Téléphone',
      'about.stat_exp': 'Ans d\'expérience',
      'about.stat_lang': 'Langues parlées',
      'about.stat_countries': 'Pays travaillés',
      'about.stat_commit': 'Engagement',
      // EXPERIENCE
      'exp.label': 'Parcours professionnel',
      'exp.title': 'Expériences professionnelles',
      'exp.eglo_role': 'Représentant commercial technique',
      'exp.eglo_date': 'Novembre 2019 — Avril 2025',
      'exp.eglo_b1': 'Dirigé la gestion commerciale et le développement du portefeuille clients au Maroc',
      'exp.eglo_b2': 'Conduit des négociations importantes et conclu des contrats commerciaux clés',
      'exp.eglo_b3': 'Géré le service après-vente, assurant des taux élevés de satisfaction client',
      'exp.eglo_b4': 'Maintenu des enregistrements CRM précis et suivi les pipelines de commandes',
      'exp.eglo_b5': 'Optimisation de la maîtrise des stocks et gestion des inventaires pour assurer une rotation efficace des produits',
      'exp.bim_role': 'Employé de magasin / Caissier',
      'exp.bim_date': 'Mars 2018 — Octobre 2018',
      'exp.bim_b1': 'Géré la réception, l\'exposition et l\'organisation des stocks de produits',
      'exp.bim_b2': 'Effectué les opérations de caisse avec précision et rapidité',
      'exp.bim_b3': 'Assuré un soutien client constant et la résolution des problèmes',
      'exp.bim_b4': 'Réalisé la gestion des stocks et le suivi des entrepôts',
      'exp.onee_role': 'Stagiaire — Projet de fin d\'études',
      'exp.onee_date': 'Mars 2017',
      'exp.onee_b1': 'Soutenu la gestion comptable et le suivi budgétaire',
      'exp.onee_b2': 'Assisté le département des achats dans la coordination des fournisseurs',
      'exp.onee_b3': 'Géré les enregistrements de stocks et la documentation d\'entrepôt',
      'exp.tf_role': 'Stagiaire en comptabilité',
      'exp.tf_date': 'Juillet 2016',
      'exp.tf_b1': 'Soutenu le reporting financier et l\'enregistrement des factures',
      'exp.tf_b2': 'Géré la documentation et les classements administratifs',
      // EDUCATION
      'edu.label': 'Parcours académique',
      'edu.title': 'Formation',
      'edu.ista_degree': 'Diplôme en Gestion des Entreprises',
      'edu.ista_level': 'Bac+2 (Diplôme Technique)',
      'edu.ista_school': 'ISTA — Institut Spécialisé de Technologie Appliquée',
      'edu.ibnzohr_degree': 'Licence en Études Anglaises',
      'edu.ibnzohr_level': 'Licence (Bac+3)',
      'edu.ibnzohr_school': 'Université Ibn Zohr',
      'edu.bac_degree': 'Baccalauréat',
      'edu.bac_level': 'Littérature Moderne',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'Mes atouts',
      'skills.title': 'Compétences &amp; Langues',
      'skills.hard_title': 'Compétences techniques',
      'skills.soft_title': 'Compétences relationnelles',
      'skills.lang_section_title': 'Langues',
      'skills.crm': 'Systèmes CRM',
      'skills.tech_sales': 'Vente technique',
      'skills.negotiation': 'Négociation',
      'skills.inventory': 'Gestion des stocks',
      'skills.warehouse': 'Gestion d\'entrepôt',
      'skills.accounting': 'Comptabilité &amp; Reporting',
      'skills.cashier': 'Opérations de caisse',
      'skills.order_tracking': 'Suivi des commandes',
      'skills.after_sales': 'Service après-vente',
      'skills.driving': 'Permis de conduire B',
      'skills.sales_mgmt': 'Management commercial',
      'skills.customer_svc': 'Excellence du service client',
      'skills.leadership': 'Leadership',
      'skills.teamwork': 'Travail en équipe',
      'skills.problem_solving': 'Résolution créative de problèmes',
      'skills.persuasion': 'Persuasion',
      'skills.adaptability': 'Adaptabilité',
      // LANG CARDS
      'lang.arabic': 'Arabe',
      'lang.arabic_level': 'Natif · C2',
      'lang.english': 'Anglais',
      'lang.english_level': 'Professionnel · C1',
      'lang.french': 'Français',
      'lang.french_level': 'Avancé · B2',
      'lang.italian': 'Italien',
      'lang.italian_level': 'Intermédiaire · B1',
      // CONTACT
      'contact.label': 'Me contacter',
      'contact.title': 'Contactez-moi',
      'contact.subtitle': 'Je suis actuellement ouvert à de nouvelles opportunités. Que vous ayez une question ou simplement envie de discuter, ma boîte mail est toujours ouverte.',
      'contact.email_label': 'E-mail',
      'contact.phone_label': 'Téléphone',
      'contact.location_label': 'Localisation',
      'contact.location_value': 'Bologne, Italie',
      'contact.form_name': 'Nom complet',
      'contact.form_name_ph': 'Votre nom complet',
      'contact.form_email': 'Adresse e-mail',
      'contact.form_subject': 'Sujet',
      'contact.form_subject_ph': 'De quoi s\'agit-il ?',
      'contact.form_message': 'Message',
      'contact.form_message_ph': 'Dites-m\'en plus...',
      'contact.form_send': 'Envoyer le message',
      'contact.form_success': 'Merci ! Votre message a été envoyé avec succès.',
      // FOOTER
      'footer.copy': '© 2025 Abdelaziz BOUGRICH. Tous droits réservés.',
      'footer.sub': 'Commercial Technique · Bologne, Italie',
    },

    it: {
      // NAV
      'nav.about': 'Chi sono',
      'nav.experience': 'Esperienza',
      'nav.education': 'Formazione',
      'nav.skills': 'Competenze',
      'nav.contact': 'Contatti',
      // HERO
      'hero.greeting': 'Ciao, sono',
      'hero.role': 'Tecnico Commerciale',
      'hero.tagline': 'Oltre 5 anni a generare fatturato grazie alle relazioni con i clienti,<br />alla padronanza della negoziazione &amp; all\'eccellenza CRM.',
      'hero.cta_work': 'Vedi i miei lavori',
      'hero.cta_cv': 'Scarica il CV',
      // ABOUT
      'about.label': 'Chi sono',
      'about.title': 'Su di me',
      'about.lead': 'Professionista motivato e orientato ai risultati con <strong>oltre cinque anni di esperienza</strong> nelle vendite tecniche e nel servizio clienti. Combino eccellenti capacità comunicative e di negoziazione con una solida esperienza nella gestione delle vendite e nelle operazioni di negozio.',
      'about.body': 'Prosperare in ambienti dinamici e frenetici, offrendo costantemente dedizione, risoluzione creativa dei problemi e un supporto clienti eccezionale. Attualmente basato a <strong>Bologna, Italia</strong>, e aperto a nuove opportunità in Europa e oltre.',
      'about.badge_available': '✦ Disponibile immediatamente',
      'about.badge_open': 'Aperto alle opportunità',
      'about.info_location_label': 'Posizione',
      'about.info_location_value': 'Bologna, Italia',
      'about.info_email_label': 'Email',
      'about.info_phone_label': 'Telefono',
      'about.stat_exp': 'Anni di esperienza',
      'about.stat_lang': 'Lingue parlate',
      'about.stat_countries': 'Paesi lavorati',
      'about.stat_commit': 'Impegno',
      // EXPERIENCE
      'exp.label': 'Percorso professionale',
      'exp.title': 'Esperienza lavorativa',
      'exp.eglo_role': 'Rappresentante vendite tecnico',
      'exp.eglo_date': 'Novembre 2019 — Aprile 2025',
      'exp.eglo_b1': 'Gestito le attività commerciali e sviluppato il portafoglio clienti in Marocco',
      'exp.eglo_b2': 'Condotto trattative complesse e concluso contratti commerciali chiave',
      'exp.eglo_b3': 'Gestito il servizio post-vendita, garantendo alti tassi di soddisfazione del cliente',
      'exp.eglo_b4': 'Mantenuto registrazioni CRM accurate e monitorato le pipeline degli ordini',
      'exp.eglo_b5': 'Ottimizzazione della gestione del magazzino e del controllo delle scorte per garantire una rotazione efficiente dei prodotti',
      'exp.bim_role': 'Addetto vendite / Cassiere',
      'exp.bim_date': 'Marzo 2018 — Ottobre 2018',
      'exp.bim_b1': 'Gestito il ricevimento, l\'esposizione e l\'organizzazione dei prodotti in stock',
      'exp.bim_b2': 'Effettuato operazioni di cassa con precisione e rapidità',
      'exp.bim_b3': 'Fornito supporto clienti costante e risoluzione dei problemi',
      'exp.bim_b4': 'Eseguito la gestione dell\'inventario e il monitoraggio del magazzino',
      'exp.onee_role': 'Stagista — Progetto di fine anno',
      'exp.onee_date': 'Marzo 2017',
      'exp.onee_b1': 'Supportato la gestione contabile e il monitoraggio del budget',
      'exp.onee_b2': 'Assistito il dipartimento acquisti nel coordinamento dei fornitori',
      'exp.onee_b3': 'Gestito i registri di inventario e la documentazione del magazzino',
      'exp.tf_role': 'Stagista in contabilità',
      'exp.tf_date': 'Luglio 2016',
      'exp.tf_b1': 'Supportato la reportistica finanziaria e la registrazione delle fatture',
      'exp.tf_b2': 'Gestito la documentazione e gli archivi amministrativi',
      // EDUCATION
      'edu.label': 'Percorso accademico',
      'edu.title': 'Formazione',
      'edu.ista_degree': 'Diploma in Gestione Aziendale',
      'edu.ista_level': 'Bac+2 (Diploma Tecnico)',
      'edu.ista_school': 'ISTA — Istituto Specializzato di Tecnologia Applicata',
      'edu.ibnzohr_degree': 'Laurea in Studi di Lingua Inglese',
      'edu.ibnzohr_level': 'Laurea triennale (Bac+3)',
      'edu.ibnzohr_school': 'Università Ibn Zohr',
      'edu.bac_degree': 'Diploma di Maturità',
      'edu.bac_level': 'Letteratura Moderna (Baccalauréat)',
      'edu.bac_school': 'Lycée Moulay Rachid',
      // SKILLS
      'skills.label': 'Cosa offro',
      'skills.title': 'Competenze &amp; Lingue',
      'skills.hard_title': 'Competenze tecniche',
      'skills.soft_title': 'Competenze trasversali',
      'skills.lang_section_title': 'Lingue',
      'skills.crm': 'Sistemi CRM',
      'skills.tech_sales': 'Vendite tecniche',
      'skills.negotiation': 'Negoziazione',
      'skills.inventory': 'Gestione dell\'inventario',
      'skills.warehouse': 'Gestione del magazzino',
      'skills.accounting': 'Contabilità &amp; Reporting',
      'skills.cashier': 'Operazioni di cassa',
      'skills.order_tracking': 'Monitoraggio ordini',
      'skills.after_sales': 'Servizio post-vendita',
      'skills.driving': 'Patente di guida B',
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
      'lang.english': 'Inglese',
      'lang.english_level': 'Professionale · C1',
      'lang.french': 'Francese',
      'lang.french_level': 'Avanzato · B2',
      'lang.italian': 'Italiano',
      'lang.italian_level': 'Intermedio · B1',
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

  const langBtns = document.querySelectorAll('.lang-btn');

  const applyTranslation = (lang) => {
    const dict = translations[lang] || translations['en'];

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
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

    // Store the success message for the contact form
    document.getElementById('contact-form')?.dataset && 
      (document.getElementById('contact-form').dataset.successMsg = dict['contact.form_success'] || '');
  };

  const setLanguage = (lang) => {
    localStorage.setItem('preferred_lang', lang);

    // Update active button style
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    applyTranslation(lang);
  };

  // Initialize on load
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

  // Listen for button clicks
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });

  // ==========================================================
  // 4. HEADER SCROLL STATE & SCROLL-TO-TOP BUTTON
  // ==========================================================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    // Header shrink
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================================
  // 5. ACTIVE NAV LINK ON SCROLL
  // ==========================================================
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavLink = () => {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ==========================================================
  // 6. INTERSECTION OBSERVER (Scroll Animations)
  // ==========================================================
  const revealElements = document.querySelectorAll('.reveal');
  const skillBadges = document.querySelectorAll('.skill-badge');
  const langBars = document.querySelectorAll('.lang-bar');

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

  // Staggered skill badges animation
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const badgeContainer = entry.target;
      const badges = badgeContainer.querySelectorAll('.skill-badge');
      
      badges.forEach((badge, index) => {
        setTimeout(() => {
          badge.classList.add('pop');
        }, index * 80); // 80ms stagger
      });
      
      observer.unobserve(badgeContainer);
    });
  }, { threshold: 0.2 });

  const badgeClouds = document.querySelectorAll('.badge-cloud');
  badgeClouds.forEach(cloud => skillsObserver.observe(cloud));

  // Language bars animation
  const langObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const barContainer = entry.target;
      const bars = barContainer.querySelectorAll('.lang-bar');
      
      bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add('animated');
        }, index * 200); // 200ms stagger
      });
      
      observer.unobserve(barContainer);
    });
  }, { threshold: 0.2 });

  const langSection = document.querySelector('.languages-section');
  if (langSection) {
    langObserver.observe(langSection);
  }

  // ==========================================================
  // 8. CONTACT MODAL (Task 2)
  // ==========================================================
  const modal          = document.getElementById('contact-modal');
  const emailTrigger   = document.getElementById('contact-icon-email');
  const modalClose     = document.getElementById('modal-close');
  const modalForm      = document.getElementById('modal-contact-form');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalSuccess   = document.getElementById('modal-form-success');

  const openModal = () => {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    // Focus the close button for accessibility
    setTimeout(() => modalClose?.focus(), 50);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    // Restore aria-hidden after transition
    setTimeout(() => modal.setAttribute('aria-hidden', 'true'), 300);
    // Return focus to trigger
    emailTrigger?.focus();
  };

  if (emailTrigger && modal) {
    emailTrigger.addEventListener('click', openModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on backdrop click (not panel)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Modal form submit
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!modalForm.checkValidity()) {
        modalForm.reportValidity();
        return;
      }

      modalSubmitBtn.classList.add('loading');
      modalSubmitBtn.disabled = true;

      // Reset any previous messages
      modalSuccess.classList.remove('show', 'error');
      modalSuccess.textContent = '';

      const formData = new FormData(modalForm);
      const dict = translations[localStorage.getItem('preferred_lang') || 'en'] || translations['en'];

      try {
        // REPLACE this string with your real Formspree endpoint URL (e.g., 'https://formspree.io/f/YOUR_FORM_ID')
        const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';
        
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          modalSuccess.textContent = dict['contact.form_success'] || 'Thank you! Your message has been sent successfully.';
          modalSuccess.classList.remove('error');
          modalSuccess.classList.add('show');
          modalForm.reset();

          setTimeout(() => {
            modalSuccess.classList.remove('show');
            closeModal();
          }, 3000);
        } else {
          // Attempt to extract specific error message from Formspree
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            modalSuccess.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            modalSuccess.textContent = 'Oops! There was a problem submitting your form.';
          }
          modalSuccess.classList.add('error', 'show');
        }
      } catch (error) {
        modalSuccess.textContent = 'Oops! There was a network problem submitting your form.';
        modalSuccess.classList.add('error', 'show');
      } finally {
        modalSubmitBtn.classList.remove('loading');
        modalSubmitBtn.disabled = false;
      }
    });
  }
});
