const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Event handler for the install button click
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const result = await deferredPrompt.userChoice;

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';

    console.log(`User ${result.outcome} the install prompt`);
  }
});

// Handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed');
});