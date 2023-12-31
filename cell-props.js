let sheetArray = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let rowId = String.fromCharCode(97 + j).toUpperCase();
    let cellProps = {
      bold: false,
      italic: false,
      underline: false,
      align: "left",
      fontfamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      bgcolor: "#FFFFFF",
    };
    sheetRow.push(cellProps);
  }
  sheetArray.push(sheetRow);
}

let bold = document.querySelector(".bold");

let italic = document.querySelector(".italic");

let underline = document.querySelector(".underline");

let alignment = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size-prop");
let fontfamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".color-picker");
let BGColor = document.querySelector(".bg-color-picker");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

bold.addEventListener("click", () => {
  let address = document.querySelector(".address-bar").value;
  let [selectedCell, cellProp] = activeCell(address);
  console.log(selectedCell);
  cellProp.bold = !cellProp.bold;
  selectedCell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? "#D3D3D3" : "";
});

italic.addEventListener("click", () => {
  let address = document.querySelector(".address-bar").value;
  let [selectedCell, cellProp] = activeCell(address);
  // console.log(selectedCell)
  cellProp.italic = !cellProp.italic;
  selectedCell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic ? "#D3D3D3" : "";
});

underline.addEventListener("click", () => {
  let address = document.querySelector(".address-bar").value;
  let [selectedCell, cellProp] = activeCell(address);
  // console.log(selectedCell)
  cellProp.underline = !cellProp.underline;
  selectedCell.style.textDecoration = cellProp.underline ? "underline" : "";
  underline.style.backgroundColor = cellProp.underline ? "#D3D3D3" : "";
});

fontSize.addEventListener("change",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.fontSize = fontSize.value;
    selectedCell.style.fontSize = `${cellProp.fontSize}px`
})

fontfamily.addEventListener("change",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.fontfamily = fontfamily.value;
    selectedCell.style.fontFamily = cellProp.fontfamily;
})

fontColor.addEventListener("change",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.fontColor = fontColor.value;
    selectedCell.style.color = cellProp.fontColor;
})

BGColor.addEventListener("change",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.bgcolor = BGColor.value;
    selectedCell.style.backgroundColor = cellProp.bgcolor;
})




//Redundant Code, Optimize before pushing to production
leftAlign.addEventListener("click",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.align = "left";
    selectedCell.style.textAlign = cellProp.align;
    leftAlign.style.backgroundColor = cellProp.align === "left" ? "#D3D3D3" : "";
    rightAlign.style.backgroundColor = "";
    centerAlign.style.backgroundColor = "";
}) 
rightAlign.addEventListener("click",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.align = "right";
    selectedCell.style.textAlign = cellProp.align;
    rightAlign.style.backgroundColor = cellProp.align === "right" ? "#D3D3D3" : "";
    leftAlign.style.backgroundColor = "";
    centerAlign.style.backgroundColor = "";
})
centerAlign.addEventListener("click",() => {
    let address = document.querySelector(".address-bar").value;
    let [selectedCell, cellProp] = activeCell(address);
    cellProp.align = "center";
    selectedCell.style.textAlign = cellProp.align;
    centerAlign.style.backgroundColor = cellProp.align === "center" ? "#D3D3D3" : "";
    rightAlign.style.backgroundColor = "";
    leftAlign.style.backgroundColor = "";

})


let allCells = document.querySelectorAll(".cell");
for (let index = 0; index < allCells.length; index++) {
    attachCellProperties(allCells[index]);
}


function attachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let address = e.target.id
        let [rid, cid] = decodeRidCidFromAddress(address);
        let cellProp = sheetArray[rid][cid]
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        bold.style.backgroundColor = cellProp.bold ? "#D3D3D3" : "";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        italic.style.backgroundColor = cellProp.italic ? "#D3D3D3" : "";
        cell.style.textDecoration = cellProp.underline ? "underline" : "";
        underline.style.backgroundColor = cellProp.underline ? "#D3D3D3" : "";
        cell.style.fontSize = `${cellProp.fontSize}px`
        fontSize.value = cellProp.fontSize
        cell.style.fontFamily = cellProp.fontfamily;
        fontfamily.value = cellProp.fontfamily
        cell.style.textAlign = cellProp.align;
        switch(cellProp.align){

            case "left":
                leftAlign.style.backgroundColor = "#D3D3D3";
                rightAlign.style.backgroundColor = "";
                centerAlign.style.backgroundColor = "";
                break;
            case "right":
                rightAlign.style.backgroundColor = "#D3D3D3";
                leftAlign.style.backgroundColor = "";
                centerAlign.style.backgroundColor = "";
                break;
            case "center":
                centerAlign.style.backgroundColor =  "#D3D3D3";
                rightAlign.style.backgroundColor = "";
                leftAlign.style.backgroundColor = "";
                break;
            default:
                centerAlign.style.backgroundColor =  "";
                rightAlign.style.backgroundColor = "";
                leftAlign.style.backgroundColor = "";

        }
        cell.style.color = cellProp.fontColor;
        fontColor.value = cellProp.fontColor;

        cell.style.backgroundColor = cellProp.bgcolor === "#FFFFFF" ? "transperent" : cellProp.bgcolor;
        fontColor.value = cellProp.fontColor;
        

    })
  
}
function activeCell(address) {
  let [rid, cid] = decodeRidCidFromAddress(address);
  let selectedCell = document.querySelector(
    `.cell[rid="${rid}"][cid="${cid}"]`
  );
  let cellProp = sheetArray[rid][cid];
  return [selectedCell, cellProp];
}

function decodeRidCidFromAddress(address) {
  let rid = Number(address.slice(1)) - 1;
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}
