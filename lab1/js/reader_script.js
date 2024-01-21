import { loadNotesFromLocalStorage } from './utils/note_utils.js';
import { user } from '../lang/messages/en/user.js';

/**
 * Sets up the page.
 */
function setup() {
  refresh();
  addLocalization();
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
  lastUpdated.textContent = `${user["lab1"]["LastUpdated"]}${time}`;
}

/**
 * Set the content for the page based on the language.
 */
function addLocalization() {
  let title = user["lab1"]["PageTitle"] + " - " + user["StudentName"] + " - " + user["StudentID"];
  document.title = title;

  document.getElementById('page-title').innerHTML = user["lab1"]["Reader"];
  document.getElementById('back').innerHTML = user["lab1"]["Back"];
}

setup();