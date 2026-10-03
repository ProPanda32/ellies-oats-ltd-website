document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const container = menu?.querySelector('.container');
  const columns = menu?.querySelectorAll('.menu-column');
  if (!container || columns.length !== 2) return;

  const oatPhotos = [
    'oat-blueberry-cheesecake.jpg',
    'oat-sticky-toffee.jpg',
    'oat-apple-of-my-eye.jpg',
    'oat-jam-dodger.jpg',
    'oat-lemon-white-chocolate.jpg',
    'oat-nutty-one.jpg',
    'oat-eton-mess.jpg',
    'oat-sticky-mango.jpg',
    'oat-speckled-egg.jpg',
    'oat-raspberry-white-chocolate.jpg',
  ];
  const matchaPhotos = [
    'matcha-blueberry-muffin.jpg',
    'matcha-classic.jpg',
    'matcha-vanilla.jpg',
    'matcha-strawberry.jpg',
    'matcha-banana-cream.jpg',
    'matcha-cotton-cloud.jpg',
    'matcha-vanilla-protein.jpg',
  ];

  const readItems = (column, photos, category) =>
    [...column.querySelectorAll('.menu-item')].map((node, index) => {
      const details = node.querySelectorAll('p');
      return {
        name: node.querySelector('h4')?.textContent.trim() || '',
        description: details[0]?.textContent.trim() || '',
        nutrition: details[1]?.textContent.trim() || '',
        image: photos[index]
          ? `./assets/menu/${photos[index]}`
          : node.querySelector('img')?.getAttribute('src') || '',
        category,
      };
    }).filter((item) => item.name && item.image);

  const oatItems = readItems(columns[0], oatPhotos, 'Oat bowl');
  const matchaItems = readItems(columns[1], matchaPhotos, 'Matcha');

  const dialog = document.createElement('dialog');
  dialog.className = 'menu-detail-dialog';
  dialog.setAttribute('aria-labelledby', 'menu-detail-title');
  dialog.innerHTML = `
    <div class="menu-detail-layout">
      <img class="menu-detail-image" alt="">
      <div class="menu-detail-content">
        <button class="menu-detail-close" type="button" aria-label="Close details">&times;</button>
        <p class="menu-detail-category"></p>
        <h3 id="menu-detail-title"></h3>
        <p class="menu-detail-description"></p>
        <p class="menu-detail-nutrition"></p>
        <a class="menu-detail-order" href="order.html">Order online</a>
      </div>
    </div>`;
  const detailImage = dialog.querySelector('.menu-detail-image');
  const detailCategory = dialog.querySelector('.menu-detail-category');
  const detailTitle = dialog.querySelector('#menu-detail-title');
  const detailDescription = dialog.querySelector('.menu-detail-description');
  const detailNutrition = dialog.querySelector('.menu-detail-nutrition');
  let opener;

  function showDetails(item, button) {
    opener = button;
    detailImage.src = item.image;
    detailImage.alt = item.name;
    detailCategory.textContent = item.category;
    detailTitle.textContent = item.name;
    detailDescription.textContent = item.description;
    detailDescription.hidden = !item.description;
    detailNutrition.textContent = item.nutrition;
    detailNutrition.hidden = !item.nutrition;
    dialog.showModal();
  }

  function makeGrid(items) {
    const grid = document.createElement('div');
    grid.className = 'menu-gallery-grid';

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'menu-gallery-card';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-photo';
      button.setAttribute('aria-label', `More details: ${item.name}`);
      const photo = document.createElement('img');
      photo.src = item.image;
      photo.alt = '';
      photo.loading = 'lazy';
      photo.decoding = 'async';
      const icon = document.createElement('span');
      icon.className = 'menu-photo-open';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '+';
      button.append(photo, icon);
      button.addEventListener('click', () => showDetails(item, button));
      const name = document.createElement('h3');
      name.className = 'menu-gallery-name';
      name.textContent = item.name;
      card.append(button, name);
      grid.append(card);
    });

    return grid;
  }

  function makeCategoryNav(current) {
    const nav = document.createElement('nav');
    nav.className = 'menu-category-nav';
    nav.setAttribute('aria-label', 'Menu categories');
    [['Oat bowls', '#menu'], ['Matcha', '#matcha-menu']].forEach(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (label === current) link.setAttribute('aria-current', 'location');
      nav.append(link);
    });
    return nav;
  }

  const title = container.querySelector('h2');
  title.className = 'menu-gallery-title';
  title.textContent = 'Oat bowls';
  container.replaceChildren(makeCategoryNav('Oat bowls'), title, makeGrid(oatItems));
  menu.classList.add('menu-gallery-ready');

  const matcha = document.createElement('section');
  matcha.id = 'matcha-menu';
  matcha.className = 'menu-section menu-gallery-ready menu-matcha-section';
  const matchaContainer = document.createElement('div');
  matchaContainer.className = container.className;
  const matchaTitle = document.createElement('h2');
  matchaTitle.className = 'menu-gallery-title';
  matchaTitle.textContent = 'Matcha';
  matchaContainer.append(makeCategoryNav('Matcha'), matchaTitle, makeGrid(matchaItems));
  matcha.append(matchaContainer);
  menu.insertAdjacentElement('afterend', matcha);
  document.body.append(dialog);

  const mainMenuLink = document.querySelector('header nav a[href="index.html#menu"]');
  if (mainMenuLink) {
    const matchaLink = document.createElement('a');
    matchaLink.href = 'index.html#matcha-menu';
    matchaLink.className = mainMenuLink.className;
    matchaLink.textContent = 'Matcha';
    const item = document.createElement('li');
    item.append(matchaLink);
    mainMenuLink.closest('li')?.insertAdjacentElement('afterend', item);
  }

  dialog.querySelector('.menu-detail-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
});

