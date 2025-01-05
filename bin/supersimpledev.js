#!/usr/bin/env node

const Chatbot = require('../chatbot');

const arguments = process.argv;

if (arguments.length === 2) {
  console.log('Hello! This is a command added by the supersimpledev package.');
  console.log();
  console.log('Features:');
  console.log('- npx supersimpledev chatbot "your message" = send a message to the Chatbot library and get a response.');
  process.exit(0);
}

const command = arguments[2];

if (command === 'chatbot') {
  const message = arguments[3];
  const response = Chatbot.getResponse(message);
  console.log(response);
  process.exit(0);

} else {
  console.log('Unknown command:', command);
  process.exit(1);
}
