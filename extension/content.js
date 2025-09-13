// Content script that runs on all websites
class AccessibilityAI {
  constructor() {
    this.dyslexiaMode = false;
    this.adhdMode = false;
    this.lowVisionMode = false;
    this.speechSynthesis = window.speechSynthesis;
    this.currentUtterance = null;
    
    this.init();
  }

  async init() {
    // Load saved settings
    const settings = await chrome.storage.sync.get(['dyslexiaMode', 'adhdMode', 'lowVisionMode']);
    this.applySettings(settings);
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'toggleDyslexia':
          this.toggleDyslexiaMode(message.enabled);
          break;
        case 'toggleADHD':
          this.toggleADHDMode(message.enabled);
          break;
        case 'toggleLowVision':
          this.toggleLowVisionMode(message.enabled);
          break;
        case 'initModes':
          this.applySettings(message.settings);
          break;
      }
      sendResponse({ success: true });
    });
  }

  applySettings(settings) {
    if (settings.dyslexiaMode) this.toggleDyslexiaMode(true);
    if (settings.adhdMode) this.toggleADHDMode(true);
    if (settings.lowVisionMode) this.toggleLowVisionMode(true);
  }

  toggleDyslexiaMode(enabled) {
    this.dyslexiaMode = enabled;
    
    if (enabled) {
      this.injectDyslexiaFont();
      this.addTextToSpeech();
    } else {
      this.removeDyslexiaFont();
      this.removeTextToSpeech();
    }
  }

  toggleADHDMode(enabled) {
    this.adhdMode = enabled;
    
    if (enabled) {
      this.applyADHDStyles();
      this.addFocusHighlighting();
    } else {
      this.removeADHDStyles();
      this.removeFocusHighlighting();
    }
  }

  toggleLowVisionMode(enabled) {
    this.lowVisionMode = enabled;
    
    if (enabled) {
      this.applyLowVisionStyles();
    } else {
      this.removeLowVisionStyles();
    }
  }

  injectDyslexiaFont() {
    if (!document.getElementById('accessibility-ai-dyslexia-font')) {
      const link = document.createElement('link');
      link.id = 'accessibility-ai-dyslexia-font';
      link.href = 'https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    document.body.classList.add('accessibility-ai-dyslexia');
  }

  removeDyslexiaFont() {
    document.body.classList.remove('accessibility-ai-dyslexia');
    const fontLink = document.getElementById('accessibility-ai-dyslexia-font');
    if (fontLink) fontLink.remove();
  }

  addTextToSpeech() {
    // Add click listeners to text elements for TTS
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, li');
    textElements.forEach(element => {
      if (!element.hasAttribute('data-tts-enabled')) {
        element.setAttribute('data-tts-enabled', 'true');
        element.addEventListener('dblclick', (e) => {
          const text = element.textContent.trim();
          if (text) {
            this.speakText(text);
          }
        });
        element.style.cursor = 'pointer';
        element.title = 'Double-click to hear this text';
      }
    });
  }

  removeTextToSpeech() {
    const elements = document.querySelectorAll('[data-tts-enabled]');
    elements.forEach(element => {
      element.removeAttribute('data-tts-enabled');
      element.style.cursor = '';
      element.title = '';
    });
    
    if (this.currentUtterance) {
      this.speechSynthesis.cancel();
    }
  }

  speakText(text) {
    if (this.currentUtterance) {
      this.speechSynthesis.cancel();
    }
    
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.rate = 0.8;
    this.currentUtterance.pitch = 1;
    this.currentUtterance.volume = 0.8;
    
    this.speechSynthesis.speak(this.currentUtterance);
  }

  applyADHDStyles() {
    document.body.classList.add('accessibility-ai-adhd');
    
    // Hide distracting elements
    const distractingElements = document.querySelectorAll('[class*="ad"], [id*="ad"], .banner, .popup, .modal, [class*="sidebar"]');
    distractingElements.forEach(element => {
      if (!element.hasAttribute('data-adhd-hidden')) {
        element.setAttribute('data-adhd-hidden', 'true');
        element.style.opacity = '0.3';
        element.style.pointerEvents = 'none';
      }
    });
  }

  removeADHDStyles() {
    document.body.classList.remove('accessibility-ai-adhd');
    
    const hiddenElements = document.querySelectorAll('[data-adhd-hidden]');
    hiddenElements.forEach(element => {
      element.removeAttribute('data-adhd-hidden');
      element.style.opacity = '';
      element.style.pointerEvents = '';
    });
  }

  addFocusHighlighting() {
    // Add focus outline to interactive elements
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.style.outline = '3px solid #667eea';
        element.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
      });
    });
  }

  removeFocusHighlighting() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    focusableElements.forEach(element => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  }

  applyLowVisionStyles() {
    document.body.classList.add('accessibility-ai-low-vision');
  }

  removeLowVisionStyles() {
    document.body.classList.remove('accessibility-ai-low-vision');
  }
}

// Initialize the accessibility features
new AccessibilityAI();