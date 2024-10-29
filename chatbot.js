// This is a simple chatbot used for SuperSimpleDev
// coding tutorials: https://youtube.com/@SuperSimpleDev

const Chatbot = {
  defaultResponses: {
    'hello hi': `Hello! How can I help you?`,
    'how are you': `I'm doing great! How can I help you?`,
    'flip a coin': function () {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return 'Sure! You got heads';
      } else {
        return 'Sure! You got tails';
      }
    },
    'roll a dice': function() {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      return `Sure! You got ${diceResult}`;
    },
    'what is the date today': function () {
      const now = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = months[now.getMonth()];
      const day = now.getDate();

      return `Today is ${month} ${day}`;
    },
    'thank': 'No problem! Let me know if you need help with anything else!',
  },

  additionalResponses: {},

  unsuccessfulResponse: `Sorry, I didn't quite understand that. Currently, I only know how to flip a coin, roll a dice, or get today's date. Let me know how I can help!`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  getResponse: function (message) {
    // This spread operator (...) combines the 2 objects.
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const {
      ratings,
      bestMatchIndex,
    } = this.stringSimilarity(message, Object.keys(responses));

    const bestResponseRating = ratings[bestMatchIndex].rating;
    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === 'function') {
      return response();
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      // Pretend it takes some time for the chatbot to response.
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, '')
    second = second.replace(/\s+/g, '')

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;

      firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(mainString, currentTargetString)
      ratings.push({target: currentTargetString, rating: currentRating})
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i
      }
    }

    const bestMatch = ratings[bestMatchIndex]

    return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
  },
};

window.Chatbot = Chatbot;
window.chatbot = Chatbot;