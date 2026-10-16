// Systemets tema används som standard; besökaren kan välja ett eget tema.
(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'iris-theme';
  const getSaved = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = value => { try { localStorage.setItem(key, value); } catch {} };
  const current = () => {
    const saved = getSaved();
    return saved === 'dark' || saved === 'light' ? saved : (media.matches ? 'dark' : 'light');
  };
  const apply = () => {
    const theme = current();
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.style.colorScheme = theme;
    const button = document.getElementById('iris-theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '☀ Ljust läge' : '☾ Mörkt läge';
      button.setAttribute('aria-label', theme === 'dark' ? 'Aktivera ljust läge' : 'Aktivera mörkt läge');
    }
  };
  apply();
  if (media.addEventListener) media.addEventListener('change', apply);
  else if (media.addListener) media.addListener(apply);
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.createElement('button');
    button.id = 'iris-theme-toggle';
    button.type = 'button';
    button.className = 'iris-theme-toggle';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
      save(current() === 'dark' ? 'light' : 'dark');
      apply();
    });
    apply();
  });
})();
