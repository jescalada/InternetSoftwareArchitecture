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
  document.getElementById('submit').addEventListener('click', addNote.bind(this, hideCreateContainer));
  document.getElementById('add').addEventListener('click', toggleCreateContainer);
  hideCreateContainer();
  refresh();
  setInterval(refresh, 1000);
}

/**
 * Refreshes the notes on the page.
 */
function refresh() {
  loadNotesFromLocalStorage();
  showLastUpdated();
}

/**
 * Shows the last updated time in HH:MM:SS format.
 */
function showLastUpdated() {
  let lastUpdated = document.getElementById('last-updated');
  let date = new Date();
  let time = date.toLocaleTimeString();
  lastUpdated.textContent = `Last Updated: ${time}`;
}

setup();