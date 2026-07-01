// script.js — comportamentos: menu mobile, animação de barras de progresso e slider de depoimentos

document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  // Barras de progresso animadas
  const progressEls = document.querySelectorAll('.progress');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target.querySelector('span');
          const value = Number(entry.target.getAttribute('data-value')) || 0;
          el.style.width = value + '%';
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  progressEls.forEach(p => observer.observe(p));

  // Animações discretas ao rolar a página
  const scrollItems = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  scrollItems.forEach(item => scrollObserver.observe(item));

  // Inicializa carrosséis (imagens e depoimentos)
  function initSlider(container, track, prev, next, interval = 4000) {
    if (!container || !track) return;
    
    let index = 0;
    const items = track.children;
    const total = items.length;
    let autoplay;

    function updateSlide() {
      const width = container.clientWidth;
      track.style.transform = `translateX(${-index * width}px)`;
    }

    function goTo(n) {
      index = ((n % total) + total) % total; // garante número positivo
      updateSlide();
    }

    // Controles
    prev?.addEventListener('click', () => goTo(index - 1));
    next?.addEventListener('click', () => goTo(index + 1));

    // Auto-play com pausa no hover
    function startAutoplay() {
      autoplay = setInterval(() => goTo(index + 1), interval);
    }

    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', startAutoplay);

    // Responsivo
    window.addEventListener('resize', updateSlide);

    // Inicia
    updateSlide();
    startAutoplay();
  }

  // Inicializa os carrosséis
  initSlider(
    document.querySelector('.carrossel'),
    document.querySelector('.slides'),
    document.getElementById('prev'),
    document.getElementById('next')
  );
  // Depoimentos agora são exibidos estaticamente (grid) — slider removido
});
