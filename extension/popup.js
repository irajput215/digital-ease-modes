// Popup script for the extension
document.addEventListener('DOMContentLoaded', async () => {
  const dyslexiaToggle = document.getElementById('dyslexiaToggle');
  const adhdToggle = document.getElementById('adhdToggle');
  const lowVisionToggle = document.getElementById('lowVisionToggle');

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Load current settings
  const settings = await chrome.storage.sync.get(['dyslexiaMode', 'adhdMode', 'lowVisionMode']);
  
  // Set initial toggle states
  if (settings.dyslexiaMode) dyslexiaToggle.classList.add('active');
  if (settings.adhdMode) adhdToggle.classList.add('active');
  if (settings.lowVisionMode) lowVisionToggle.classList.add('active');

  // Toggle handlers
  dyslexiaToggle.addEventListener('click', async () => {
    const isActive = dyslexiaToggle.classList.toggle('active');
    await chrome.storage.sync.set({ dyslexiaMode: isActive });
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'toggleDyslexia', 
      enabled: isActive 
    });
  });

  adhdToggle.addEventListener('click', async () => {
    const isActive = adhdToggle.classList.toggle('active');
    await chrome.storage.sync.set({ adhdMode: isActive });
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'toggleADHD', 
      enabled: isActive 
    });
  });

  lowVisionToggle.addEventListener('click', async () => {
    const isActive = lowVisionToggle.classList.toggle('active');
    await chrome.storage.sync.set({ lowVisionMode: isActive });
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'toggleLowVision', 
      enabled: isActive 
    });
  });

  // Initialize modes on page load
  try {
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'initModes',
      settings: settings
    });
  } catch (error) {
    // Content script might not be loaded yet
    console.log('Content script not ready yet');
  }
});