document.addEventListener('DOMContentLoaded', () => {
  if (!('IntersectionObserver' in window)) return;

  const headings = [...document.querySelectorAll('h1, h2, h3, h4')]
    .filter((heading) => !heading.closest('dialog'));
  const images = [...document.querySelectorAll(
    '.special-card-image img, .oat-bowls-banner img, .menu-gallery-card .menu-photo img'
  )];

  document.querySelectorAll('.menu-gallery-grid').forEach((grid) => {
    grid.querySelectorAll('.menu-gallery-card').forEach((card, index) => {
      card.style.setProperty('--reveal-delay', `${index % 3 * 110}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      observer.unobserve(target);

      if (target instanceof HTMLImageElement && !target.complete) {
        target.addEventListener('load', () => target.classList.add('is-visible'), { once: true });
        target.addEventListener('error', () => target.classList.add('is-visible'), { once: true });
      } else {
        target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  headings.forEach((heading) => {
    heading.classList.add('reveal-title');
    observer.observe(heading);
  });

  images.forEach((image) => {
    image.classList.add('reveal-image');
    observer.observe(image);
  });
});
