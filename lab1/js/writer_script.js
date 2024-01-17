import { Note } from "./note.js";

function addNote() {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;

  let note = new Note(title, content);

  addNoteToLocalStorage(note);
  addNoteToList(note);
  console.log("Added: ", note.toString());
  hideCreateContainer();
}

function addNoteToList(note) {
  let list = document.getElementById('notes');
  let noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
 
  addNoteDetails(noteDiv, note);
  list.appendChild(noteDiv);
}

function addNoteDetails(noteDiv, note) {
  let title = document.createElement('h2');
  title.textContent = note.title;
 
  let content = document.createElement('p');
  content.textContent = note.content;
 
  let removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  removeButton.classList.add('remove');
  removeButton.addEventListener('click', removeNoteFromList.bind(this, noteDiv, note));

  noteDiv.appendChild(title);
  noteDiv.appendChild(content);
}

function removeNote(noteDiv, note) {
  removeNoteFromList(noteDiv);
  removeNoteFromLocalStorage(note.id);
}

function removeNoteFromList(noteDiv) {
  let list = document.getElementById('notes');
  list.removeChild(noteDiv);
}

function addNoteToLocalStorage(note) {
  let notes = [];
  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function removeNoteFromLocalStorage(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes'));
  notes = notes.filter(note => note.id != noteId);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function showCreateContainer() {
  document.getElementById('create-post-container').style.display = 'block';
}

function hideCreateContainer() {
  document.getElementById('create-post-container').style.display = 'none';
}

function setup() {
  document.getElementById('submit').addEventListener('click', addNote);
  document.getElementById('add').addEventListener('click', showCreateContainer);
  hideCreateContainer();
}

setup();