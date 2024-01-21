import { addNote, loadNotesFromLocalStorage } from "./utils/note_utils.js";
import { user } from "../lang/messages/en/user.js";


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
  lastUpdated.textContent = `Last Updated: ${time}`;
}

function addLocalization() {
  let title = user["lab1"]["PageTitle"] + " - " + user["StudentName"] + " - " + user["StudentID"];
  document.title = title;

  document.getElementById('page-title').innerHTML = user["lab1"]["Writer"];
  document.getElementById('add').innerHTML = user["lab1"]["Add"];
  document.getElementById('submit').innerHTML = user["lab1"]["Submit"];
  document.getElementById('back').innerHTML = user["lab1"]["Back"];

  document.getElementById('title-label').innerHTML = user["lab1"]["NoteTitle"];
  document.getElementById('content-label').innerHTML = user["lab1"]["NoteContent"];
}

setup();