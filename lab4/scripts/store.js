import { user } from './lang/en/text.js';

function submitDef() {
    let display = ('./lang/en/text.js');
    const xhttp = new XMLHttpRequest();
    word = document.getElementById("word").value;
    definition = document.getElementById("definition").value;

    // Create FormData object with word and definition
    const formData = new FormData();
    formData.append("word", word);
    formData.append("definition", definition);

    xhttp.open("POST", "http://localhost:7777/api/definitions", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("word=" + word + "&definition=" + definition);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                console.log(response);

                if (response.error) {
                    document.getElementById("request-number").textContent = response.requestNumber;
                    document.getElementById("error").textContent = response.error;
                    document.getElementById("success").textContent = "";
                } else {
                    document.getElementById("definition").textContent = response.definition;
                    document.getElementById("request-number").textContent = response.requestNumber;
                    document.getElementById("error").textContent = "";
                    document.getElementById("success").textContent = response.success;
                }
            } else {
                document.getElementById("result").textContent = this.responseText;
            }
        }
    };
    // Set word and definition to req.body
    xhttp.send(JSON.stringify({ word: word, definition: definition }));
}


function loadText() {
    document.title = user["StoreANewWord"];
    document.querySelector("h1").textContent = user["AddAWord"];
    document.getElementById("totalRequestsText").textContent = user["TotalRequestsReceived"];
    document.getElementById("submit").textContent = user["Submit"];
}

function setListener() {
    document.getElementById("submit").addEventListener("click", submitDef);
}

loadText();
setListener();