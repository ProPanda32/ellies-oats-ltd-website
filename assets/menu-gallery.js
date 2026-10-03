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

  const groups = [
    { title: 'Oat bowls', items: readItems(columns[0], oatPhotos, 'Oat bowl') },
    { title: 'Matcha', items: readItems(columns[1], matchaPhotos, 'Matcha') },
  ];

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

  function makeGroup(group) {
    const section = document.createElement('section');
    section.className = 'menu-gallery-group';
    const heading = document.createElement('h3');
    heading.className = 'menu-gallery-heading';
    heading.textContent = group.title;
    const grid = document.createElement('div');
    grid.className = 'menu-gallery-grid';

    group.items.forEach((item) => {
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
      grid.append(button);
    });

    section.append(heading, grid);
    return section;
  }

  const title = container.querySelector('h2');
  title.className = 'menu-gallery-title';
  container.replaceChildren(title, ...groups.map(makeGroup));
  menu.classList.add('menu-gallery-ready');
  menu.append(dialog);

  dialog.querySelector('.menu-detail-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
});

