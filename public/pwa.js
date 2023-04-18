import {toElement} from './lib.js';

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

let prompt;

function showInstallPromotion() {
  prompt = toElement(`
    <div style="position: absolute; top: 0; right: 0; padding: 0.5rem 3rem; border: 2px solid grey; background-color: white">
      <p>PWA installeren?</p>
      <button>Install</button>
    </div>
  `);

  const button = prompt.querySelector('button');

  button.addEventListener('click', async () => {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  });

  document.body.appendChild(prompt);
}

function hideInstallPromotion() {
  prompt.remove();
}

window.addEventListener('beforeinstallprompt', e => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});
