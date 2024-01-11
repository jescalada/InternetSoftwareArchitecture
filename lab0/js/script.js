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

function reset() {
  arrayButtons = [];
  currentOrder = 0;
  interval = null;
  document.getElementById('container').innerHTML = "";
  document.getElementById('submit').disabled = false;
}

function updateButtons() {
  for (let i = 0; i < arrayButtons.length; i++) {
    randomizeButtonPosition(i);
  }
  showButtons();
}

function showButtons() {
  /**
   * Displays all buttons on the page
   */
  let container = document.getElementById('container');
  container.innerHTML = "";
  arrayButtons.forEach(function (button) {
    container.appendChild(button.btn);
  });
}

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

function getCurrentWindowWidth() {
  return window.innerWidth;
}

function getCurrentWindowHeight() {
  return window.innerHeight;
}

/**
 * Submits the input to start the game
 */
function go() {
  let valid = validateInput();
  if (valid) {
    document.getElementById('submit').disabled = true;
    generateInitialButtons(document.getElementById('input').value);
    showButtons();
    startGame();
  }
}

/**
 * Starts the game. Sets a message after the interval is finished
 */
function startGame() {
  initialDelay();
}

function initialDelay() {
  setTimeout(function() {
    updateButtons();
    intervalDelay();
  }, arrayButtons.length * 1000);
}

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

function hideNumbers() {
  arrayButtons.forEach(function (button) {
    button.btn.textContent = "";
  });
}

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
      reset();
    }
  } else {
    setError("You lost!");
    reset();
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

reset();