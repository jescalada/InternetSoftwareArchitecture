import { user } from '../lang/messages/en/user.js';

function setup() {
  addLocalization();
}

function addLocalization() {
  let title = user["lab1"]["PageTitle"] + " - " + user["StudentName"] + " - " + user["StudentID"];
  document.title = title;

  document.getElementById('page-title').innerHTML = user["lab1"]["PageTitle"] + " - " + user["StudentName"] + " - " + user["StudentID"];
  document.getElementById('reader').innerHTML = user["lab1"]["Reader"];
  document.getElementById('writer').innerHTML = user["lab1"]["Writer"];
}

setup();