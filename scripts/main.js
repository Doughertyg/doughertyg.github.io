const menuButton = document.getElementById('menu-btn');
const menuItemsWrapper = document.getElementsByClassName('--menu-items__wrapper');
const viewer = document.getElementsByClassName('main__viewer')[0];
const viewerBtns = document.getElementsByClassName('--viewer-btn');

function toggleMenu() {
  if ([...menuItemsWrapper[0].classList].includes('collapsed')) {
    menuItemsWrapper[0].classList.remove('collapsed');
  } else {
    menuItemsWrapper[0].classList.add('collapsed');
  }
}

var dataClosure;
function fetchData(fn) {
  const req = new XMLHttpRequest();
  req.open('GET', '/data/grahamdougherty.json', true);
  req.onload = function() {
    const data = JSON.parse(req.responseText);
    dataClosure = data;
    fn(data);
  }
  req.send();
}

function generateDataView(data) {
  data.forEach(function(entry, index) {
    const element = document.createElement('div');
    element.className = index === 0 ? "viewer__modal module --in-focus" : "viewer__modal module";
    element.id = `id-${index}`;
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

function debounce(fn, wait, maxWait, leading) {
  let timeout;
  let startTime;
  let currentTime;

  return function executedFunction() {
    const args = [].slice.call(arguments);
    const later = function() {
      clearTimeout(timeout);
      timeout = null;
      fn.apply(null, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    } else {
      startTime = Date.now();
      leading && fn.apply(null, args);
    }

    currentTime = Date.now();
    if (currentTime - startTime > maxWait) {
      startTime = Date.now();
      clearTimeout(timeout);
      return fn.apply(null, args);
    }

    timeout = setTimeout(later, wait);
  };
};

var index = 0;

function handleScroll(e) {
  
  let scrollingDown = e.deltaY > 0 ? true : false;

  if (scrollingDown && index < dataClosure.length - 1) {
    index++;
  } else if (!scrollingDown && index > 0) {
    index--;
  }

  const el = document.getElementById(`id-${index}`);
  const prevEl = document.getElementById(`id-${scrollingDown ? index - 1 : index + 1}`);
  el.classList.add('--in-focus');
  prevEl.classList.remove('--in-focus');
}

function handleClick(e) {
  let scrollingLeft = [].slice.call(e.target.classList).includes('--left') ? true : false;

  if (scrollingLeft && index > 0) {
    index--;
  }
  
  if (!scrollingLeft && index < dataClosure.length - 1) {
    index++;
  }

  const el = document.getElementById(`id-${index}`);
  const prevEl = document.getElementById(`id-${scrollingLeft ? index + 1 : index - 1}`);
  el.classList.add('--in-focus');
  prevEl.classList.remove('--in-focus');
}

fetchData(generateDataView);
menuButton.addEventListener('click', toggleMenu);
[].slice.call(viewerBtns).forEach(function(btn) { btn.addEventListener('click', handleClick)});
document.addEventListener('wheel', debounce(handleScroll, 250, 250));
