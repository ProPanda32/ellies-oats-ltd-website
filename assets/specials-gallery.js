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
});
