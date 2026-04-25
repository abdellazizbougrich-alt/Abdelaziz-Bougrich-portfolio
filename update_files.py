import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

navy_dark = """  /* Dark theme (Deep Navy & Gold) */
  --bg-primary:      #0A1128; /* Deep Navy */
  --bg-secondary:    #121F3D; /* Lighter Navy */
  --bg-card:         #1B2A4A; /* Card Navy */
  --bg-card-hover:   #24385E; /* Hover Navy */
  --accent:          #F5B700; /* Modern Gold */
  --accent-glow:     rgba(245, 183, 0, 0.15);
  --accent-secondary:#FFD700; /* Bright Gold */
  --text-primary:    #f8fafc; /* Off-white */
  --text-secondary:  #cbd5e1; /* Light gray */
  --text-muted:      #94a3b8; /* Muted gray */
  --border:          rgba(245, 183, 0, 0.12); /* Gold border subtle */
  --border-subtle:   rgba(255,255,255,0.06);
  --shadow-sm:       0 4px 20px rgba(0,0,0,0.3);
  --shadow-md:       0 8px 40px rgba(0,0,0,0.4);
  --shadow-lg:       0 20px 60px rgba(0,0,0,0.5);
  --shadow-glow:     0 0 30px rgba(245, 183, 0, 0.2);
  --gradient-hero:   linear-gradient(135deg, #0A1128, #1B2A4A, #121F3D, #050A1A);
  --gradient-accent: linear-gradient(135deg, #F5B700 0%, #D49A00 100%);"""

navy_light = """  --bg-primary:      #f8fafc; /* Slate 50 */
  --bg-secondary:    #f1f5f9; /* Slate 100 */
  --bg-card:         #ffffff;
  --bg-card-hover:   #e2e8f0; /* Slate 200 */
  --accent:          #D49A00; /* Darker Gold for contrast on light bg */
  --accent-glow:     rgba(212, 154, 0, 0.12);
  --accent-secondary:#F5B700; /* Modern Gold */
  --text-primary:    #0A1128; /* Deep Navy text */
  --text-secondary:  #1B2A4A; /* Card Navy text */
  --text-muted:      #64748b; /* Slate 500 */
  --border:          rgba(212, 154, 0, 0.15);
  --border-subtle:   rgba(0,0,0,0.07);
  --shadow-sm:       0 2px 12px rgba(0,0,0,0.05);
  --shadow-md:       0 4px 24px rgba(0,0,0,0.08);
  --shadow-lg:       0 12px 48px rgba(0,0,0,0.1);
  --shadow-glow:     0 0 20px rgba(212, 154, 0, 0.15);
  --gradient-hero:   linear-gradient(135deg, #f8fafc, #e2e8f0, #f1f5f9, #ffffff);
  --gradient-accent: linear-gradient(135deg, #F5B700 0%, #D49A00 100%);"""

css = re.sub(r'  /\* Dark theme.*?--gradient-accent:[^;]+;', navy_dark, css, flags=re.DOTALL)
css = re.sub(r'  --bg-primary:      #f8fafc;.*?--gradient-accent:[^;]+;', navy_light, css, flags=re.DOTALL)

scroll_css = """/* Scroll Progress Bar */
#scroll-progress { position: absolute; top: 0; left: 0; height: 3px; width: 0%; background: var(--gradient-accent); border-radius: 0 var(--radius-full) var(--radius-full) 0; box-shadow: 0 0 12px rgba(245, 183, 0, 0.6), 0 0 4px rgba(255, 215, 0, 0.4); transition: width 0.1s linear; z-index: 1001; pointer-events: none; }
#scroll-progress::after { content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; border-radius: 50%; background: #FFE87C; box-shadow: 0 0 10px 3px rgba(255, 232, 124, 0.8); opacity: 0; transition: opacity 0.2s ease; }
#scroll-progress.active::after { opacity: 1; }
[data-theme="light"] #scroll-progress { box-shadow: 0 0 10px rgba(212, 154, 0, 0.4), 0 0 3px rgba(245, 183, 0, 0.3); }
#header {"""
css = css.replace('#header {', scroll_css, 1)

dropdown_css = """/* Language Dropdown */
.lang-dropdown-wrapper { position: relative; display: flex; align-items: center; }
.lang-dropdown-menu { position: absolute; top: calc(100% + 15px); right: -5px; transform: translateY(10px); background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 8px; min-width: 140px; box-shadow: var(--shadow-lg); opacity: 0; visibility: hidden; pointer-events: none; transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1); z-index: 9999; }
[data-theme="light"] .lang-dropdown-menu { background: #ffffff; border-color: rgba(0, 0, 0, 0.08); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); }
.lang-dropdown-menu.open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); }
.lang-option { display: block; width: 100%; text-align: left; padding: 8px 12px; border: none; background: transparent; font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); border-radius: 6px; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
.lang-option:hover { background: var(--bg-card-hover); color: var(--text-primary); }
.lang-option.active { background: var(--accent-glow); color: var(--accent); font-weight: 700; }
[data-theme="light"] .lang-option:hover { background: #f1f5f9; }
[data-theme="light"] .lang-option.active { background: rgba(212, 154, 0, 0.08); color: var(--accent); }"""
css = re.sub(r'/\* Keeps JS slider.*?box-shadow: 0 4px 12px rgba.*?\}', dropdown_css, css, flags=re.DOTALL)

hero_css = """#hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; background: var(--gradient-hero); background-size: 400% 400%; animation: gradientFlow 15s ease infinite; overflow: hidden; }
@keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }"""
css = re.sub(r'#hero \{.*?overflow: hidden;\n\}', hero_css, css, flags=re.DOTALL)

skills_grid_css = """.skills-grid-new { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
.skill-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem; transition: all var(--t-base); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; position: relative; overflow: hidden; }
.skill-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--gradient-accent); opacity: 0; transition: opacity var(--t-base); }
.skill-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--border); background: var(--bg-card-hover); }
.skill-card:hover::before { opacity: 1; }
.skill-card-icon { width: 48px; height: 48px; background: rgba(245, 183, 0, 0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--accent); transition: all var(--t-base); }
.skill-card-icon svg { width: 24px; height: 24px; }
.skill-card:hover .skill-card-icon { background: var(--accent); color: #0A1128; transform: scale(1.1); }
.skill-card-title { font-size: var(--text-lg); font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; }
.skill-cat-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skill-tag { display: inline-flex; align-items: center; padding: 0.4rem 0.8rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 500; color: var(--text-secondary); transition: all var(--t-fast); opacity: 0; transform: translateY(10px); }
.skill-tag.pop { opacity: 1; transform: translateY(0); }
.skill-tag:hover { background: rgba(245, 183, 0, 0.15); border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
[data-theme="light"] .skill-tag { background: rgba(0, 0, 0, 0.04); border-color: rgba(0, 0, 0, 0.08); color: var(--text-secondary); }
[data-theme="light"] .skill-tag:hover { background: rgba(212, 154, 0, 0.1); border-color: var(--accent); }
/* Circular Progress */
.skill-circles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; width: 100%; margin-top: 0.5rem; }
.skill-circle-item { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.circular-chart { display: block; margin: 0 auto; max-width: 80%; max-height: 250px; }
.circle-bg { fill: none; stroke: rgba(255, 255, 255, 0.05); stroke-width: 3.8; }
[data-theme="light"] .circle-bg { stroke: rgba(0,0,0,0.06); }
.circle { fill: none; stroke-width: 2.8; stroke-linecap: round; stroke: var(--accent); transition: stroke-dasharray 1.5s cubic-bezier(0.22, 1, 0.36, 1); }
.circle-percentage { fill: var(--text-primary); font-family: var(--font-main); font-size: 0.5em; font-weight: 700; text-anchor: middle; }
.skill-circle-title { font-size: 0.8rem; font-weight: 500; color: var(--text-secondary); text-align: center; }"""
css = re.sub(r'\.skills-grid \{.*?\n\[data-theme="light"\] \.skill-badge:hover \{.*?\}', skills_grid_css, css, flags=re.DOTALL)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

dropdown_js = """  const applyTranslation = (lang) => {
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });
    document.documentElement.setAttribute('lang', lang);
  };
  const setLanguage = (lang) => {
    localStorage.setItem('preferred_lang', lang);
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    applyTranslation(lang);
  };
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);

  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#lang-toggle-btn');
    const langOption = e.target.closest('.lang-option');
    const menu = document.getElementById('lang-dropdown-menu');
    if (!menu) return;
    if (langOption) {
      e.preventDefault(); e.stopPropagation();
      setLanguage(langOption.getAttribute('data-lang'));
      menu.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      return;
    }
    if (toggleBtn) {
      e.preventDefault(); e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open');
      if(toggleBtn) toggleBtn.setAttribute('aria-expanded', !isOpen);
    } else if (!menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });"""
js = re.sub(r'  const langBtns = document\.querySelectorAll\(\'\.lang-btn\'\);.*?    \}\);\n  \}\);', dropdown_js, js, flags=re.DOTALL)

observer_js = """  // Staggered skill tags and circular progress animation
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const container = entry.target;
      const tags = container.querySelectorAll('.skill-tag');
      tags.forEach((tag, index) => { setTimeout(() => { tag.classList.add('pop'); }, index * 80); });

      const circles = container.querySelectorAll('.reveal-circle');
      circles.forEach((circle, index) => {
        setTimeout(() => {
          const dash = circle.getAttribute('style').match(/--target-dash:\s*([^;]+);/)[1] || '0';
          circle.setAttribute('stroke-dasharray', `${dash}, 100`);
        }, index * 150);
      });
      observer.unobserve(container);
    });
  }, { threshold: 0.1 });
  const skillContainers = document.querySelectorAll('.skill-card');
  skillContainers.forEach(container => skillsObserver.observe(container));"""
js = re.sub(r'  // Staggered skill badges animation.*?badgeClouds\.forEach\(cloud => skillsObserver\.observe\(cloud\)\);', observer_js, js, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
