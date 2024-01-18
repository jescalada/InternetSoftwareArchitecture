import { addNote, loadNotesFromLocalStorage } from "./utils/note_utils.js";


function showCreateContainer() {
  document.getElementById('create-post-container').style.display = 'block';
}

function hideCreateContainer() {
  document.getElementById('create-post-container').style.display = 'none';
}

function setup() {
  loadNotesFromLocalStorage();
  document.getElementById('submit').addEventListener('click', addNote.bind(this, hideCreateContainer));
  document.getElementById('add').addEventListener('click', showCreateContainer);
  hideCreateContainer();
}

setup();