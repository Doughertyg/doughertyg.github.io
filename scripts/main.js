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
    const html = `
      <h1 class="experience-modal__title">${entry.title}</h1>
      <h2 class="experience-modal__company">${entry.company}</h2>
      <p class="experience-modal__desc">${entry.description}</p>
      <p class="experience-modal__date">${entry.date}</p>
      <div class="experience-modal__work">${entry.work}</div>
    `
    element.onclick = function() {
      if ([...this.classList].includes('--flipped')) {
        this.classList.remove('--flipped');
        this.classList.add('--flipped-back');
      } else {
        this.classList.add('--flipped');
        this.classList.remove('--flipped-back');
      }
    };

    element.onanimationstart = function() {
      setTimeout(function() {
        if ([...element.classList].includes('--flipped')) {
          element.innerHTML = `<p class="work-desc"><ul><li>${entry.work.split('\u2022 ').slice(1).join('</li><li>')}</li></ul></p>`
        } else {
          element.innerHTML = html;
        }
      }, 250);
    };

    element.innerHTML = html;
    viewer.appendChild(element);
  });
}

fetchData(generateDataView);
menuButton.addEventListener('click', toggleMenu);
