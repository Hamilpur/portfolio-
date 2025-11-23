// Theme toggle, smooth scroll and small microinteractions
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme){
  if(theme === 'dark'){
    root.setAttribute('data-theme', 'dark');
    if(themeToggle) {
      themeToggle.innerHTML = '<span class="theme-icon">☀</span>';
      themeToggle.setAttribute('aria-pressed','true');
      themeToggle.setAttribute('aria-label','Switch to light mode');
    }
  } else {
    root.removeAttribute('data-theme');
    if(themeToggle) {
      themeToggle.innerHTML = '<span class="theme-icon">◐</span>';
      themeToggle.setAttribute('aria-pressed','false');
      themeToggle.setAttribute('aria-label','Switch to dark mode');
    }
  }
}

const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href && href.length > 1){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        try{ history.replaceState(null, '', href); } catch(_){ }
      }
    }
  });
});

// Keep a small card lift microinteraction
document.addEventListener('click', function(e){
  const card = e.target.closest('.card');
  if(card){
    console.log('Viewed section:', card.querySelector('h2')?.innerText || 'section');
    card.style.transition = 'box-shadow 200ms ease, transform 200ms ease';
    card.style.transform = 'translateY(-6px)';
    setTimeout(()=>{card.style.transform='translateY(0)';},200);
  }
});
