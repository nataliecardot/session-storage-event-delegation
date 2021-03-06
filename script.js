const addItems = document.querySelector('.add-items'); // form
const itemsList = document.querySelector('.plates'); // ul
const items = JSON.parse(sessionStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  // this will be form element; looking for attribute of name with a value of item within it
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  sessionStorage.setItem('items', JSON.stringify(items));
  // Form elements have reset method - clears fields
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done && 'checked'
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  sessionStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
// Event delegation: listening on ul rather than input
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
