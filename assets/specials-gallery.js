document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.specials-grid');
  const section = gallery?.closest('section');
  const heading = section?.querySelector('h2');
  const cards = [...(gallery?.querySelectorAll('.special-card') || [])];
  if (!gallery || !section || !heading || !cards.length) return;

  section.classList.add('limited-specials-section');
  gallery.classList.add('limited-specials-gallery');
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', 'Limited time specials');
  gallery.tabIndex = 0;
  heading.textContent = 'Limited Time Specials';

  const header = document.createElement('div');
  header.className = 'limited-specials-header';
  heading.parentNode.insertBefore(header, heading);
  header.append(heading);

  const controls = document.createElement('div');
  controls.className = 'limited-specials-controls';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.setAttribute('aria-label', 'Previous special');
  previous.textContent = '\u2190';
  const next = document.createElement('button');
  next.type = 'button';
  next.setAttribute('aria-label', 'Next special');
  next.textContent = '\u2192';
  controls.append(previous, next);
  header.append(controls);

  const step = () => cards[0].getBoundingClientRect().width +
    parseFloat(getComputedStyle(gallery).columnGap || getComputedStyle(gallery).gap);
  const updateControls = () => {
    previous.disabled = gallery.scrollLeft <= 1;
    next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1;
  };
  previous.addEventListener('click', () => gallery.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => gallery.scrollBy({ left: step(), behavior: 'smooth' }));
  gallery.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  new ResizeObserver(updateControls).observe(gallery);
  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    gallery.scrollBy({ left: event.key === 'ArrowRight' ? step() : -step(), behavior: 'smooth' });
  });

  let drag = null;
  gallery.addEventListener('dragstart', (event) => event.preventDefault());
  gallery.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, left: gallery.scrollLeft };
    gallery.setPointerCapture(event.pointerId);
  });
  gallery.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (Math.abs(distance) > 4) gallery.classList.add('is-dragging');
    if (gallery.classList.contains('is-dragging')) {
      event.preventDefault();
      gallery.scrollLeft = drag.left - distance;
    }
  });
  const stopDragging = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag = null;
    gallery.classList.remove('is-dragging');
    if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
    updateControls();
  };
  gallery.addEventListener('pointerup', stopDragging);
  gallery.addEventListener('pointercancel', stopDragging);
  requestAnimationFrame(updateControls);
});
