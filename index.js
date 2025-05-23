const Chatbot = require('./chatbot');

// Define the randomUUID() function if it doesn't exist.
function uuidPolyfill() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const randomNumber = Math.random() * 16 | 0;
    const result = char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
    return result.toString(16);
  });
}

// In the browser.
if (typeof window !== 'undefined') {
  // Create a fallback if window.crypto is undefined.
  if (typeof window.crypto === 'undefined') {
    try {
      window.crypto = {};
    } catch (e) {}
  }

  // Create a fallback if crypto.randomUUID() doesn't exist.
  if (window.crypto && typeof window.crypto.randomUUID !== 'function') {
    try {
      window.crypto.randomUUID = uuidPolyfill;
    } catch (e) {}
  }
}

module.exports = {
  Chatbot,
  chatbot: Chatbot
};