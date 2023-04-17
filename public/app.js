import {toElement} from './lib.js';

const stacks = [];
const cards = {};
const finishedCards = [];

let updateUI;

let lastId = -1;

function createId() {
  return lastId = lastId + 1;
}

function getStack(stackName) {
  return stacks.find(({name}) => name === stackName);
}

const actions = {
  finish: stack => {
    const cardId = stack.cards.at(-1);
    finishedCards.push(cardId);
    stack.cards.pop();
  },
  postpone: stack => {
    stack.cards.unshift(stack.cards.pop());
  },
};

function drawUI() {
  let ui = toElement(`
    <div>
      <div class="stackInput">
        <h2>Add new Stack</p>
        <div class="form-group">
          <input type="text" placeholder="Add a name.." class="form-control"/>
        </div>
      </div>
      <div>
        <h2>📚 Stacks</h2>
        <div id="stacks"></div>
      </div>
    </div>
  `);

  document.body.querySelector('.container').appendChild(ui);

  const input = ui.querySelector('input');
  const stacksContainer = ui.querySelector('#stacks');

  // Handle creating new cards
  stacksContainer.addEventListener('keyup', event => {
    if (event.target.matches('input[data-stack-name]') && event.keyCode === 13) {
      const {
        value,
        dataset: {stackName}
      } = event.target;

      event.target.value = '';

      const card = {
        caption: value,
        id: createId(),
      };

      cards[card.id] = card;

      getStack(stackName).cards.push(card.id);

      updateUI();
    }
  });

  stacksContainer.addEventListener('click', event => {
    if (event.target.matches('[data-stack-name][data-action]')) {
      const {
        stackName,
        action,
      } = event.target.dataset;

      const stack = getStack(stackName);

      actions[action](stack);
      updateUI();
    }
  });

  // Handle creating new stacks
  input.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      stacks.push({
        name: input.value,
        cards: [],
      });

      event.target.value = '';

      updateUI();
    }
  });

  updateUI = () => {
    let str = '';

    for (const {name, cards: cardIds} of stacks) {
      const {length} = cardIds;
      const caption = length && cards[cardIds.at(-1)].caption;
      str += `<div data-stack-name="${name}" class="stack">
        <h2>${name} (${length})</h2>
        <button data-stack-name="${name}" data-action="delete" class="btn btn-secondary">Remove stack</button>
        <div class="form-group">
          <input data-stack-name="${name}" placeholder="New card.." class="form-control"/>
        </div>
        ${length ? (`
        <div class="card row">
          <h3>${caption}</h3>
          <div class="row buttons">
            <button data-stack-name="${name}" data-action="finish" class="btn btn-primary">Done ✅</button>
            <button data-stack-name="${name}" data-action="postpone" class="btn btn-secondary">Postpone 🔻</button>
          </div>
        </div>
        `) : '<p class="text-muted">Please add a card.</p>'}
      </div>`;
    }
    stacksContainer.innerHTML = str || '<p class="text-muted">Stack underflow. Please add a stack</p>';
  };

  updateUI();
}

drawUI();
