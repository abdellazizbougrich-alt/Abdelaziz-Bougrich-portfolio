import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

blue_dark = """  /* Dark theme (default) */
  --bg-primary:      #080b12; /* Deep modern dark */
  --bg-secondary:    #0f172a; /* Slate 900 */
  --bg-card:         #1e293b; /* Slate 800 */
  --bg-card-hover:   #334155; /* Slate 700 */
  --accent:          #3b82f6; /* Elegant Blue */
  --accent-glow:     rgba(59, 130, 246, 0.15);
  --accent-secondary:#60a5fa; /* Lighter Blue */
  --text-primary:    #f8fafc; /* Slate 50 */
  --text-secondary:  #cbd5e1; /* Slate 300 */
  --text-muted:      #94a3b8; /* Slate 400 */
  --border:          rgba(59, 130, 246, 0.12);
  --border-subtle:   rgba(255,255,255,0.06);
  --shadow-sm:       0 4px 20px rgba(0,0,0,0.3);
  --shadow-md:       0 8px 40px rgba(0,0,0,0.4);
  --shadow-lg:       0 20px 60px rgba(0,0,0,0.5);
  --shadow-glow:     0 0 30px rgba(59, 130, 246, 0.2);
  --gradient-hero:   radial-gradient(ellipse at top right, rgba(30, 58, 138, 0.4) 0%, rgba(8, 11, 18, 1) 70%);
  --gradient-accent: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);"""

blue_light = """  --bg-primary:      #f8fafc; /* Slate 50 */
  --bg-secondary:    #f1f5f9; /* Slate 100 */
  --bg-card:         #ffffff;
  --bg-card-hover:   #e2e8f0; /* Slate 200 */
  --accent:          #2563eb; /* Blue 600 */
  --accent-glow:     rgba(37, 99, 235, 0.12);
  --accent-secondary:#1d4ed8; /* Blue 700 */
  --text-primary:    #0f172a; /* Slate 900 */
  --text-secondary:  #334155; /* Slate 700 */
  --text-muted:      #64748b; /* Slate 500 */
  --border:          rgba(37, 99, 235, 0.15);
  --border-subtle:   rgba(0,0,0,0.07);
  --shadow-sm:       0 2px 12px rgba(0,0,0,0.05);
  --shadow-md:       0 4px 24px rgba(0,0,0,0.08);
  --shadow-lg:       0 12px 48px rgba(0,0,0,0.1);
  --shadow-glow:     0 0 20px rgba(37,99,235,0.15);
  --gradient-hero:   radial-gradient(ellipse at top right, rgba(219, 234, 254, 0.8) 0%, rgba(248, 250, 252, 1) 70%);
  --gradient-accent: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);"""

css = re.sub(r'  /\* Dark theme.*?--gradient-accent:[^;]+;', blue_dark, css, flags=re.DOTALL)
css = re.sub(r'  --bg-primary:      #f8fafc;.*?--gradient-accent:[^;]+;', blue_light, css, flags=re.DOTALL)

# Hardcoded values replacement
css = css.replace('rgba(245, 183, 0, 0.1)', 'rgba(59, 130, 246, 0.1)')
css = css.replace('rgba(245, 183, 0, 0.15)', 'rgba(59, 130, 246, 0.15)')
css = css.replace('rgba(245, 183, 0, 0.2)', 'rgba(59, 130, 246, 0.2)')
css = css.replace('rgba(245, 183, 0, 0.3)', 'rgba(59, 130, 246, 0.3)')
css = css.replace('rgba(245, 183, 0, 0.4)', 'rgba(59, 130, 246, 0.4)')
css = css.replace('rgba(245, 183, 0, 0.6)', 'rgba(59, 130, 246, 0.6)')
css = css.replace('rgba(245, 183, 0, 0.12)', 'rgba(59, 130, 246, 0.12)')
css = css.replace('rgba(255, 215, 0, 0.4)', 'rgba(6, 182, 212, 0.4)')

css = css.replace('rgba(212, 154, 0, 0.08)', 'rgba(37, 99, 235, 0.08)')
css = css.replace('rgba(212, 154, 0, 0.1)', 'rgba(37, 99, 235, 0.1)')
css = css.replace('rgba(212, 154, 0, 0.12)', 'rgba(37, 99, 235, 0.12)')
css = css.replace('rgba(212, 154, 0, 0.15)', 'rgba(37, 99, 235, 0.15)')
css = css.replace('rgba(212, 154, 0, 0.3)', 'rgba(37, 99, 235, 0.3)')
css = css.replace('rgba(212, 154, 0, 0.4)', 'rgba(37, 99, 235, 0.4)')

css = css.replace('#FFE87C', '#60a5fa')
css = css.replace('rgba(255, 232, 124, 0.8)', 'rgba(96, 165, 250, 0.8)')
css = css.replace('#f59e0b', '#3b82f6')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('#f59e0b', '#3b82f6')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
