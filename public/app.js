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
      <p>🆕📚</p>
      <input type="text" placeholder="🆕📚"/>
      <h2>📚📚:</h2>
      <div id="stacks"></div>
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
      str += `<div data-stack-name="${name}">
        <h2>📚 ${name} (${length} 💳)</h2>
        <p>
          <input data-stack-name="${name}" placeholder="🆕💳"/>
        </p>
        ${length ? (`
          <h3>Current 💳:</h3>
          <p>${caption}</p>
          <h3>Actions</h3>
          <ul>
            <li><button data-stack-name="${name}" data-action="finish">✅</button></li>
            <li><button data-stack-name="${name}" data-action="postpone">🔻</button></li>
          </ul>
        `) : ''}
      </div>`;
    }

    stacksContainer.innerHTML = str;
  };
}

drawUI();
