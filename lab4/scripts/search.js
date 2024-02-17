import { user } from "./lang/en/text.js";

function searchDef() {
  const xhttp = new XMLHttpRequest();
  const word = document.getElementById("query").value;
  xhttp.open("GET", "http://localhost:7777/api/definitions?word=" + word, true);
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              const response = JSON.parse(this.responseText);
              console.log(response);

              if (response.error) {
                  document.getElementById("definition").textContent = response.error;
                  document.getElementById("request-number").textContent = response.requestNumber;
                  return;
              } else {
                  document.getElementById("definition").textContent = response.definition;
                  document.getElementById("request-number").textContent = response.requestNumber;
              }
          } else {
              console.log(this.responseText);
              document.getElementById("definition").textContent = this.responseText;
          }
      }
  };
  xhttp.send();
}

function loadText() {
  document.title = user["SearchAWord"];
  document.querySelector("h1").textContent = user["QueryAWord"];
  document.getElementById("totalRequestsText").textContent = user["TotalRequestsReceived"];
  document.getElementById("search").textContent = user["Submit"];
}

function setListener() {
  document.getElementById("search").addEventListener("click", searchDef);
}

loadText();
setListener();