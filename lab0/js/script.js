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
  interval = null;
  document.getElementById('container').innerHTML = "";
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
  initialDelay(arrayButtons.length * 1000);
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
  interval = setInterval(function () {
    counter++;
    if (counter >= arrayButtons.length) {
      clearInterval(interval);
      setSuccess("Guess the order of the buttons!");
      hideNumbers();
    }
    updateButtons();
  }, 2000);
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
  } else if (input < 3 || input > 7) {
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
  console.log('This.order: ' + this.order);
  console.log('Current order: ' + currentOrder)
  console.log('Array length: ' + arrayButtons.length)
  if (this.order == currentOrder) {
    currentOrder++;
    // Hide the button once it is clicked
    this.btn.style.display = "none";
    if (currentOrder == arrayButtons.length) {
      setSuccess("You won!");
      showNumbers();
      showButtons();
      document.getElementById('submit').disabled = false;
    }
  } else {
    setError("You lost!");
    showNumbers();
    showButtons();
    document.getElementById('submit').disabled = false;
  }
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
      '10em',
      '5em',
      '15em',
       `${i * 10.2}em`,
      i
    );
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
