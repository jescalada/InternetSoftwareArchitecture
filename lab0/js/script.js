import { user } from '../lang/messages/en/user.js';
import { constants } from './constants.js';

let arrayButtons = [];
let currentOrder = 0;

/**
 * Creates a button with the given parameters
 * @param {*} color the background color of the button
 * @param {*} width the width of the button
 * @param {*} height the height of the button
 * @param {*} top the top position of the button
 * @param {*} left the left position of the button
 * @param {*} order the order of the button
 */
function Button(color, width, height, top, left, order) {
  this.order = order;
  this.btn = document.createElement('button');
  this.btn.style.backgroundColor = color;
  this.btn.style.width = width;
  this.btn.style.height = height;
  this.btn.style.position = "absolute";
  this.btn.textContent = order;
  this.btn.onclick = checkOrder.bind(this);
  this.btn.classList.add("game-button");

  this.setLocation = function (top, left) {
    this.btn.style.top = top;
    this.btn.style.left = left;
  }

  this.setLocation(top, left);
}

/**
 * Resets the game
 */
function reset() {
  arrayButtons = [];
  currentOrder = 0;
  document.getElementById('container').innerHTML = "";
}

/**
 * Resets the HTML of the page
 */
function setup() {
  document.getElementById('submit').addEventListener('click', go);
}

/**
 * Updates the position of all buttons on the page
 */
function updateButtons() {
  for (let i = 0; i < arrayButtons.length; i++) {
    randomizeButtonPosition(i);
  }
  appendButtons();
}

/**
 * Appends all buttons to the page
 */
function appendButtons() {
  let container = document.getElementById('container');
  container.innerHTML = "";
  arrayButtons.forEach(function (button) {
    container.appendChild(button.btn);
  });
}

/**
 * Shows all buttons on the page
 */
function showButtons() {
  arrayButtons.forEach(function (button) {
    button.btn.style.display = "block";
  });
}

/**
 * Randomizes the position of the button at the given index
 * @param {number} index 
 */
function randomizeButtonPosition(index) {
  let windowWidth = getCurrentWindowWidth();
  let windowHeight = getCurrentWindowHeight();
  let button = arrayButtons[index];
  let xLimit = windowWidth - parseInt(button.btn.style.width) * 16;
  let yLimit = windowHeight - parseInt(button.btn.style.height) * 16;
  
  arrayButtons[index].setLocation(
    Math.floor(Math.random() * yLimit) + "px",
    Math.floor(Math.random() * xLimit) + "px"
  );
}

/**
 * Gets the current width of the window
 * @return {number} the current width of the window
 */
function getCurrentWindowWidth() {
  return window.innerWidth;
}

/**
 * Gets the current height of the window
 * @returns {number} the current height of the window
 */
function getCurrentWindowHeight() {
  return window.innerHeight;
}

/**
 * Submits the input to start the game
 */
function go() {
  reset();
  let valid = validateInput();
  if (valid) {
    document.getElementById('submit').disabled = true;
    generateInitialButtons(document.getElementById('input').value);
    appendButtons();
    startGame();
  }
}

/**
 * Starts the game. Sets a message after the interval is finished
 */
function startGame() {
  initialDelay(arrayButtons.length * constants.VARIABLE_INTERVAL);
}

/**
 * Sets a delay before the interval starts
 * @param {number} delay the delay in milliseconds
 */
function initialDelay(delay) {
  setTimeout(function() {
    updateButtons();
    intervalDelay();
  }, delay);
}

/**
 * Sets the interval that randomizes the position of the buttons
 * and sets a message after the interval is finished
 */
function intervalDelay() {
  let counter = 1;
  let interval = setInterval(function () {
    counter++;
    if (counter >= arrayButtons.length) {
      clearInterval(interval);
      setSuccess(user["lab0"]["StartMessage"]);
      hideNumbers();
      enableGameButtons();
    }
    updateButtons();
  }, );
}

/**
 * Enables all buttons to be clicked
 */
function enableGameButtons() {
  arrayButtons.forEach(function (button) {
    button.btn.disabled = false;
  });
}

/**
 * Validates input by checking if it is non-empty and an integer between 3 and 7
 * @return {boolean} true if input is valid, false otherwise
 */
function validateInput() { 
  let input = document.getElementById('input').value;
  if (input == "") {
    setError("Input cannot be empty");
  } else if (parseInt(input) != input) {
    setError("Input must be a number");
  } else if (input < constants.MIN_BUTTONS || input > constants.MAX_BUTTONS) {
    setError("Input must be between 3 and 7");
  } else {
    setSuccess("Game started!");
    return true;
  }
  return false;
}

/**
 * Shows the numbers on the buttons
 */
function showNumbers() {
  arrayButtons.forEach(function (button) {
    button.btn.textContent = button.order;
  });
}

/**
 * Hides the numbers on the buttons
 */
function hideNumbers() {
  arrayButtons.forEach(function (button) {
    button.btn.textContent = "";
  });
}

/**
 * Checks if the order of the button pressed is correct
 */
function checkOrder() {
  if (this.order == currentOrder) {
    currentOrder++;
    onSuccessfulClick(this);
    if (currentOrder == arrayButtons.length) {
      setSuccess("You won!");
      onGameEnd();
    }
  } else {
    this.btn.classList.add("failure");
    setError("You lost!");
    onGameEnd();
  }
}

function onGameEnd() {
  showNumbers();
  showButtons();
  document.getElementById('submit').disabled = false;
}

/**
 * Sets the button to be green and displays the order
 * @param {Button} button the button to be set
 */
function onSuccessfulClick(button) {
  button.btn.classList.add("success");
  button.btn.textContent = button.order;
}

/**
 * Sets the message to be displayed on the page, with green font color
 */
function setSuccess(text) {
  document.getElementById('message').innerHTML = text;
  document.getElementById('message').style.color = "green";
}

/**
 * Sets the message to be displayed on the page, with red font color
 */
function setError(text) { 
  document.getElementById('message').innerHTML = text;
  document.getElementById('message').style.color = "red";
}

/**
 * Generates the initial buttons and stores them in an array
 */ 
function generateInitialButtons(quantity) {
  arrayButtons = [];
  for (let i = 0; i < quantity; i++) {
    let button = new Button(
      getRandomColor(),
      constants.DEFAULT_BUTTON_WIDTH,
      constants.DEFAULT_BUTTON_HEIGHT,
      constants.BUTTON_Y_POSITION,
       `${i * constants.BUTTON_X_SPACING}em`,
      i
    );
    button.btn.disabled = true;
    arrayButtons.push(button);
    console.log(arrayButtons)
  }
}

/**
 * Generates a random color in hexadecimal format
 * @return {string} color in hexadecimal format
 */
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
}

setup();