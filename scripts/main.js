const menuButton = document.getElementById('menu-btn');
const menuItemsWrapper = document.getElementsByClassName('--menu-items__wrapper');

function toggleMenu() {
  if ([...menuItemsWrapper[0].classList].includes('collapsed')) {
    menuItemsWrapper[0].classList.remove('collapsed');
  } else {
    menuItemsWrapper[0].classList.add('collapsed');
  }
}

function fetchData() {
  const req = new XMLHttpRequest();
  req.open('GET', '/Users/grambo/Documents/CODE/doughertyg.github.io/data/grahamdougherty.json', true);
  req.onload = function() {
    const data = JSON.parse(req.responseText);
    console.log('what is res? ', data);
  }
  req.send();
}

fetchData();
menuButton.addEventListener('click', toggleMenu);
