import { Note } from "./note.js";

export function addNote(callback) {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;

  let note = new Note(title, content);

  addNoteToLocalStorage(note);
  addNoteToList(note);
  callback();
}

export function removeNote(noteDiv, note) {
  removeNoteFromList(noteDiv);
  removeNoteFromLocalStorage(note.id);
}

export function loadNotesFromLocalStorage() {
  let list = document.getElementById('notes');
  list.innerHTML = '';
  let notes = JSON.parse(localStorage.getItem('notes'));
  if (notes) {
    notes.forEach(note => addNoteToList(note));
  }
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
  removeButton.addEventListener('click', removeNote.bind(this, noteDiv, note));

  noteDiv.appendChild(title);
  noteDiv.appendChild(content);
  noteDiv.appendChild(removeButton);
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