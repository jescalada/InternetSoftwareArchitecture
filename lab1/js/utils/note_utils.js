// Utility functions for adding and removing notes

import { Note } from "./note.js";

/**
 * Adds a note to the list of notes
 * @param {*} callback a callback function to call after adding the note
 */
export function addNote(callback) {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;

  let note = new Note(title, content);

  addNoteToLocalStorage(note);
  addNoteToList(note);
  callback();
}

/**
 * Removes a note from the list of notes
 * @param {*} noteDiv the div containing the note
 * @param {*} note the note to remove
 */
export function removeNote(noteDiv, note) {
  removeNoteFromList(noteDiv);
  removeNoteFromLocalStorage(note.id);
}

/**
 * Loads the notes from local storage into the list of notes
 */
export function loadNotesFromLocalStorage() {
  let list = document.getElementById('notes');
  list.innerHTML = '';
  let notes = JSON.parse(localStorage.getItem('notes'));
  if (notes) {
    notes.forEach(note => addNoteToList(note));
  }
}

/**
 * Adds a note to the list of notes
 * @param {*} note the note to add
 */
function addNoteToList(note) {
  let list = document.getElementById('notes');
  let noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
 
  addNoteDetails(noteDiv, note);
  list.appendChild(noteDiv);
}

/**
 * Adds the note details to the note div
 * @param {*} noteDiv the div containing the note
 * @param {*} note the note to add
 */
function addNoteDetails(noteDiv, note) {
  let title = document.createElement('h2');
  title.textContent = note.title;
 
  let content = document.createElement('p');
  content.textContent = note.content;
 
  let removeButton = document.createElement('button');
  // Todo: Fix mimetype issue
  // removeButton.textContent = user["lab1"]["Remove"];
  removeButton.textContent = "Remove";
  
  removeButton.classList.add('remove');
  removeButton.addEventListener('click', removeNote.bind(this, noteDiv, note));

  noteDiv.appendChild(title);
  noteDiv.appendChild(content);
  noteDiv.appendChild(removeButton);
}

/**
 * Removes a note from the list of notes
 * @param {*} noteDiv the div containing the note
 */
function removeNoteFromList(noteDiv) {
  let list = document.getElementById('notes');
  list.removeChild(noteDiv);
}

/**
 * Adds a note to local storage
 * @param {*} note the note to add
 */
function addNoteToLocalStorage(note) {
  let notes = [];
  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

/**
 * Removes a note from local storage
 * @param {*} noteId the id of the note to remove
 */
function removeNoteFromLocalStorage(noteId) {
  let notes = JSON.parse(localStorage.getItem('notes'));
  notes = notes.filter(note => note.id != noteId);
  localStorage.setItem('notes', JSON.stringify(notes));
}