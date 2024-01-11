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
