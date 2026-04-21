import sys

with open('c:/Users/ADMIN/Desktop/portfolio/style.css', 'r', encoding='utf-8') as f:
    text = f.read()

anchor = '    padding: 0.5rem 2.5rem;\n    border-radius: var(--radius-sm);'
idx = text.find(anchor)

if idx != -1:
    idx += len(anchor)
    new_tail = r'''
    width: 100%;
    text-align: center;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .nav-links .nav-link::after {
    display: none;
  }

  .nav-links .nav-link:hover,
  .nav-links .nav-link.active {
    background: var(--accent-glow);
    color: var(--accent);
  }

  /* ── Hamburger: subtle hover ring + ensure tappability ── */
  .hamburger {
    display: flex;
    padding: 6px;
    border-radius: var(--radius-sm);
    transition: background var(--t-fast);
    position: relative;
    z-index: 1001; /* sit above any z-index layer */
    -webkit-tap-highlight-color: transparent;
  }

  .hamburger:hover,
  .hamburger:focus-visible {
    background: var(--accent-glow);
  }
}

/* ── ≤ 420 px: ultra-compact pill for very narrow phones ── */
@media (max-width: 420px) {

  .logo-initials {
    font-size: 1.45rem;
  }

  .unified-action-pill {
    padding: 2px;
  }

  .unified-icon-btn {
    width: 30px;
    height: 30px;
  }

  .unified-icon-btn svg {
    width: 13px;
    height: 13px;
  }

  .lang-btn {
    min-width: 26px;
    padding: 0.22rem 0.28rem;
    font-size: 0.58rem;
  }

  /* Collapse dividers to save precious horizontal space */
  .pill-divider {
    margin: 0;
    width: 0;
    overflow: hidden;
  }

  /* Tighter dropdown padding on tiny screens */
  .nav-links {
    padding: 1.5rem 0;
    gap: 1.2rem;
  }
}

/* ============================================================
   HORIZONTAL SCROLL ELIMINATION — Mobile Overflow Fixes
   Targets every known element that bleeds beyond the viewport
   on narrow screens, causing an unwanted horizontal scrollbar.
   ============================================================ */

/* ─── 1. Hero section: clip glow & accent-bar pseudo-elements ─── */
#hero {
  overflow-x: hidden;
}

/* ─── 2. Experience mosaic: accent image at left:-8% overflows ─── */
.experience-showcase,
.exp-cinema,
.exp-cinema-mosaic {
  overflow: hidden;
}

/* ─── 3. All sections + key wrappers: hard clip ─── */
section,
.container,
main,
footer {
  overflow-x: clip; /* clip doesn't create a BFC unlike hidden */
  max-width: 100%;
}

/* ─── 4. Mobile-specific overflow fixes ─── */
@media (max-width: 768px) {

  /* Any flex/grid child that forgets its parent's width */
  .about-grid > *,
  .skills-grid > *,
  .edu-grid > *,
  .exp-cards-row > *,
  .stats-grid > * {
    min-width: 0;
    max-width: 100%;
  }

  /* Hero portrait & its decorative glows */
  .hero-image-wrap {
    overflow: hidden;
    max-width: 100%;
  }

  /* Clip any filter:blur bleed from glow pseudo-elements */
  .hero-image-wrap::before {
    max-width: 100%;
    overflow: hidden;
  }

  /* Contact pills: prevent long email / URL text from pushing width */
  .contact-icon-pill {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .contact-pill-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100vw - 110px);
  }

  /* Skill badges: ensure cloud doesn't grow wider than screen */
  .badge-cloud {
    max-width: 100%;
    overflow: hidden;
  }

  /* Languages grid: flags must not push width */
  .languages-grid-v2 {
    max-width: 100%;
    overflow: hidden;
  }

  /* Footer nav links: long URLs wrap instead of overflow */
  .footer-nav a {
    word-break: break-word;
  }
}

/* ─── 5. Ultra-small phones: extra safety ─── */
@media (max-width: 420px) {
  /* Make every direct child of body sections behave */
  header, main, footer {
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Exp mosaic accent image: tamed position at tiny widths */
  .exp-mosaic-accent {
    left: 0;
    width: 45%;
  }
}

/* ============================================================
   8. DIPLOMA VIEW BUTTON & MODAL / LIGHTBOX
   ============================================================ */
.btn-diploma {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .btn-diploma {
  background: #f8fafc;
  color: #0f172a;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.btn-diploma:hover {
  background: var(--bg-card-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  border-color: var(--border-subtle);
}

[data-theme="light"] .btn-diploma:hover {
  background: #ffffff;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  border-color: rgba(0, 0, 0, 0.1);
}

.diploma-icon {
  font-size: 1rem;
}

.diploma-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.diploma-modal.open {
  visibility: visible;
  opacity: 1;
}

.diploma-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.diploma-modal-content {
  position: relative;
  z-index: 10000;
  max-width: 90vw;
  max-height: 90vh;
  padding: 1rem;
  border-radius: var(--radius-md);
  transform: scale(0.95);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.diploma-modal.open .diploma-modal-content {
  transform: scale(1);
}

.diploma-modal-content img {
  display: block;
  max-width: 100%;
  max-height: calc(90vh - 2rem);
  object-fit: contain;
  border-radius: var(--radius-sm);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.diploma-modal-close {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  z-index: 10001;
}

[data-theme="light"] .diploma-modal-close {
  background: #fff;
  border-color: var(--border-subtle);
}

.diploma-modal-close:hover {
  background: var(--accent);
  color: #fff;
  transform: scale(1.1) rotate(90deg);
  border-color: var(--accent);
}

.diploma-modal-close svg {
  width: 20px;
  height: 20px;
}
'''
    final_text = text[:idx] + new_tail
    with open('c:/Users/ADMIN/Desktop/portfolio/style.css', 'w', encoding='utf-8') as fw:
        fw.write(final_text)
    print('SUCCESS')
else:
    print('FAILED TO FIND ANCHOR')
