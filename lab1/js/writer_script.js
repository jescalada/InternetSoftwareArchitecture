import { addNote, loadNotesFromLocalStorage } from "./utils/note_utils.js";


function showCreateContainer() {
  document.getElementById('create-post-container').style.display = 'block';
}

function hideCreateContainer() {
  document.getElementById('create-post-container').style.display = 'none';
}

function toggleCreateContainer() {
  let container = document.getElementById('create-post-container');
  if (container.style.display === 'none') {
    showCreateContainer();
  } else {
    hideCreateContainer();
  }
}

function setup() {
  loadNotesFromLocalStorage();
  document.getElementById('submit').addEventListener('click', addNote.bind(this, hideCreateContainer));
  document.getElementById('add').addEventListener('click', toggleCreateContainer);
  hideCreateContainer();
  setInterval(refresh, 2000);
}

/**
 * Refreshes the notes on the page.
 */
function refresh() {
  loadNotesFromLocalStorage();
}

setup();