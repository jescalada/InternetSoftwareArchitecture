import { loadNotesFromLocalStorage } from './utils/note_utils.js';

function setup() {
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