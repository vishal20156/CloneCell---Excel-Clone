let rows = 100;
let cols = 26;

let addressColContainer = document.querySelector(".address-col-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellContainer = document.querySelector(".cell-container");
let addressBar = document.querySelector(".address-bar");
let closeButton = document.querySelector("#close-window");



function setClickedAddress(e) {
  addressBar.value = e.target.id;
}

closeButton.addEventListener("click",function(e) {
    if(confirm("Do you really want to close the window? you might have unsaved sheets")){
        window.location.href = "https://www.google.com";
    }
})

for (let i = 0; i < rows; i++) {
  let col = document.createElement("div");
  col.setAttribute("class", "address-col");
  col.innerText = i + 1;
  addressColContainer.appendChild(col);
}

for (let i = 0; i < cols; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "address-row");
  row.innerText = String.fromCharCode(97 + i).toUpperCase();
  addressRowContainer.appendChild(row);
}

for (let i = 0; i < rows; i++) {
  let rowSection = document.createElement("div");
  rowSection.setAttribute("class", "row");
  for (let j = 0; j < cols; j++) {
    let colSection = document.createElement("div");
    colSection.setAttribute("class", "cell");
    colSection.setAttribute("contenteditable", true);
    colSection.setAttribute("rid",i);
    colSection.setAttribute("cid",j);
    colSection.addEventListener("click", setClickedAddress);
    let rowId = String.fromCharCode(97 + j).toUpperCase();
    colSection.setAttribute("id", rowId + (i + 1));
    rowSection.appendChild(colSection);
  }
  cellContainer.appendChild(rowSection);
}


let firstCell = document.querySelector(".cell");
firstCell.click();