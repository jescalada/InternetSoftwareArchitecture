import { loadNotesFromLocalStorage } from './utils/note_utils.js';

function setup() {
  loadNotesFromLocalStorage();
  setInterval(refresh, 2000);
}

/**
 * Refreshes the notes on the page.
 */
function refresh() {
  loadNotesFromLocalStorage();
}

setup();