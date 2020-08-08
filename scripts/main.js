const menuButton = document.getElementById('menu-btn');
const menuItemsWrapper = document.getElementsByClassName('--menu-items__wrapper');
const viewer = document.getElementsByClassName('main__viewer')[0];

function toggleMenu() {
  if ([...menuItemsWrapper[0].classList].includes('collapsed')) {
    menuItemsWrapper[0].classList.remove('collapsed');
  } else {
    menuItemsWrapper[0].classList.add('collapsed');
  }
}

function fetchData(fn) {
  const req = new XMLHttpRequest();
  req.open('GET', '/data/grahamdougherty.json', true);
  req.onload = function() {
    const data = JSON.parse(req.responseText);
    fn(data);
  }
  req.send();
}

function generateDataView(data) {
  data.forEach(entry => {
    const element = document.createElement('div');
    element.className = "viewer__modal module";
    element.onclick = function() {
      if ([...this.classList].includes('--flipped')) {
        this.classList.remove('--flipped');
      } else {
        this.classList.add('--flipped');
      }
    };
    element.innerHTML = `
      <h1 class="experience-modal__title">${entry.title}</h1>
      <h2 class="experience-modal__company">${entry.company}</h2>
      <p class="experience-modal__desc">${entry.description}</p>
      <p class="experience-modal__date">${entry.date}</p>
      <div class="experience-modal__work">${entry.work}</div>
    `
    viewer.appendChild(element);
  });
}

fetchData(generateDataView);
menuButton.addEventListener('click', toggleMenu);
