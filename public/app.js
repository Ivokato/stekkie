import {toElement} from './lib.js';

const MAX_FREE_STACKS = 2;
const stacks = localStorage.getItem('stacks') && JSON.parse(localStorage.getItem('stacks')) || [];
const cards = localStorage.getItem('cards') && JSON.parse(localStorage.getItem('cards')) || {};
const finishedCards = [];
const SKU_COLOR_PACK = 'sku_color_pack';

let updateUI;

let iOSPushCapability = false;
let iOSPrintCapability = false;
let iOSIAPCapability = false;

let pricePurchase = '11';
let productDescription = '';
let hasPurchasedColorUpdate = false;

if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.print) {
  iOSPrintCapability = true;
}

let lastId = Math.max(-1, ...Object.keys(cards).map(Number));

function createId() {
  return lastId = lastId + 1;
}

function getStack(stackName) {
  return stacks.find(({name}) => name === stackName);
}

// function purchaseRequest(){
//   alert("JS Purchase request");
//   window.webkit.messageHandlers['iap-purchase-request'].postMessage('demo_subscription_auto'); //window.products[1].attributes.offerName
// }

function transactionsRequest(){
  // TODO:
  // alert("JS: transaction request called")
  // window.webkit.messageHandlers['iap-transactions-request'].postMessage('request');
}

function productsRequest(){
  console.log("productsRequest called");
  // Oude voorbeeld code.



  // TODO
  // window.webkit.messageHandlers['iap-products-request'].postMessage(['demo_product_id', 'demo_product2_id', 'demo_subscription', 'demo_subscription_auto']);

}

window.loadProductInfo = () => {
  // TODO
  // window.webkit.messageHandlers['iap-products-request'].postMessage([SKU_COLOR_PACK]);
}

window.buyIAP = () => {
  // TODO

  // window.webkit.messageHandlers['iap-purchase-request'].postMessage([SKU_COLOR_PACK]);

  // EVEN HARDCODED ANDROID:
  const subscribePath = 'stekkie://subscribe';
  alert("hardcoded android redirect to: " + subscribePath);
  window.location.replace(subscribePath);
  alert("after redirect");

}

window.addEventListener('iap-products-request-result', (event) => {
  alert("terug van iap-products-request");
});

window.addEventListener('message', (event) => {
  // const data = JSON.stringify(JSON.parse(event.data));
  // alert("Message ontvangst vanuit Javascript: " + data);
  //
  // if (event && event.data) {
  //   // alert("DATA: " + event.data);
  //   // Presumably data for each product, so a list
  //   // alert("DATA[0]: " + JSON.parse(event.data)[0]);
  //
  //   // alert("Attributes: " + JSON.stringify(JSON.parse(event.data)[0].attributes));
  //   // alert("Description: " + JSON.parse(event.data)[0].attributes.description.standard);
  //
  //   pricePurchase = JSON.stringify(JSON.parse(event.data)[0].attributes.offers[0].priceFormatted);
  //   productDescription = JSON.parse(event.data)[0].attributes.description.standard;
  //   updateUI();
  // }
  alert('message received');
});


window.addEventListener('iap-transactions-result', (event) => {
  if (event && event.detail) {
    // We assume there is only 1 productId, so look at [0], and assume quantity of 1.
    const productId =  JSON.parse(event.detail)[0].productId;
    const transactionReason = JSON.parse(event.detail)[0].transactionReason;
    const timestamp = JSON.parse(event.detail)[0].signedDate ;
    const dateTransaction = new Date(timestamp).toLocaleDateString();
    if (transactionReason == "PURCHASE" && productId == SKU_COLOR_PACK) {
      hasPurchasedColorUpdate = true;
      updateUI();
    }
  }

  /*

  if (event && event.data) {
    // alert("DATA: " + event.data);
    // Presumably data for each product, so a list
    // alert("DATA[0]: " + JSON.parse(event.data)[0]);

    // alert("Attributes: " + JSON.stringify(JSON.parse(event.data)[0].attributes));
    // alert("Description: " + JSON.parse(event.data)[0].attributes.description.standard);

    pricePurchase = JSON.stringify(JSON.parse(event.data)[0].attributes.offers[0].priceFormatted);
    productDescription = JSON.parse(event.data)[0].attributes.description.standard;
    updateUI();
  }
   */

});


window.addEventListener('iap-products-result', (event) => {
  if (event && event.detail) {
    pricePurchase = JSON.stringify(JSON.parse(event.detail)[0].attributes.offers[0].priceFormatted);
    productDescription = JSON.stringify(JSON.parse(event.detail)[0].attributes.description.standard);
    updateUI();
  }
});

function persist() {
  localStorage.setItem('stacks', JSON.stringify(stacks));
  localStorage.setItem('cards', JSON.stringify(cards));
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
  delete: stack => {
    stacks.splice(stacks.indexOf(stack), 1);
  },
};

function drawUI() {

  // TODO: via check IAP
  const hasSubscription = false;

  // TODO: IVO, deze refreshen niet bij toevoegen nieuwe stack
  const hasMaxStacks = stacks.length >= MAX_FREE_STACKS;
  const canAddStack = hasSubscription || !hasMaxStacks;

  let ui = toElement(`
    <div>
      <div class="stackInput">
        <div class="form-group d-flex">
          <span class="d-flex align-self-center pe-3">📚</span>
          <input type="text" placeholder="${canAddStack ? `Add a new stek..` : 'Get a subscription to add more steks'}" class="form-control" autocapitalize="on" ${!canAddStack ? `disabled` : ``}/>
        </div>
      </div>
      <div>
        <div id="stacks"></div>
        <div id="promo"></div>
      </div>
    </div>
  `);

  document.body.querySelector('.container').appendChild(ui);

  const input = ui.querySelector('input');
  const stacksContainer = ui.querySelector('#stacks');
  const promoContainer = ui.querySelector('#promo');

  // Handle creating new cards
  stacksContainer.addEventListener('keyup', event => {
    if (event.target.matches('input[data-stack-name]') && event.keyCode === 13 && event.target.value) {
      const {
        value,
        dataset: {stackName}
      } = event.target;

      event.target.value = '';

      const card = {
      };

      cards[card.id] = card;

      getStack(stackName).cards.push(card.id);

      persist();
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
      persist();
      updateUI();
    }
  });

  // Handle creating new stacks
  input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value) {
      stacks.push({
        name: event.target.value,
        cards: [],
      });

      event.target.value = '';

      persist();
      updateUI();
    }
  });


  updateUI = () => {
    let str = '';

    for (const {name, cards: cardIds} of stacks) {
      const {length} = cardIds;
      const caption = length && cards[cardIds.at(-1)].caption;
      str += `<div data-stack-name="${name}" class="stack mb-3">
        <div class="d-flex justify-content-between mb-3">
          <h3>${name} ${length > 1 ? ` <span class="text-black-50 ps-1 pe-1">|</span> ${length}` : ``}</h3>
          <button data-stack-name="${name}" data-action="delete" class="btn btn-light">remove stack <span class="icon">×</span></button>
        </div>
        <div class="form-group mb-3">
          <input data-stack-name="${name}" placeholder="Write your task to form your stekkie.." class="form-control" autocapitalize="on"/>
        </div>
        ${length ? (`
        <div class="card row" style="padding-right: 16px;">
          <div class="col task-title">${caption}</div>
          <div class="buttons">
            ${length > 1 ? `<button data-stack-name="${name}" data-action="postpone" class="btn btn-light task-button">postpone <span class="icon">↧</span></button>` : ''}
            <button data-stack-name="${name}" data-action="finish" class="btn btn-success task-button">Done <span class="icon">✓</span></button>
          </div>
        </div>
        `) : '<div class="text-muted">No tasks on this stack..</div>'}
      </div>`;
    }
    stacksContainer.innerHTML = str || '<p class="text-muted">Stack underflow. Please add a stack.</p>';

    let promoStr = '';
    // if (hasSubscription) {
    //   promoStr = `<div class="small text-muted">Happy with your subscription? Send feedback to ivo+stekkie@fitchef.nl</div>`
    // } else {
    //   promoStr = `
    //     <div>
    //       <div>Get our product: ${productDescription}</div>
    //       <button onclick="buyIAP()" class="btn btn-success task-button mt-2">Buy it for ${pricePurchase}.</button>
    //     </div>
    //   `
    // }
    if (hasPurchasedColorUpdate) {
      promoStr = `<div class="small text-muted">Happy with your color pack update? Send feedback to ivo+stekkie@fitchef.nl</div>`
    } else {
      promoStr = `
        <div>
          <div>Get our product: ${productDescription}</div>
          <button onclick="buyIAP()" class="btn btn-success task-button mt-2">Buy it for ${pricePurchase}.</button>
        </div>
      `
    }
    promoContainer.innerHTML = promoStr;
  };

  updateUI();
}

loadProductInfo();
transactionsRequest();
drawUI();
