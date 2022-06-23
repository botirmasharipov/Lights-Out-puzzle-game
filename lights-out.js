"use strict";

const WIDTH = 7;
const HEIGHT = 5;
const DIFFICULTY = 3;

// Toggle a single cell on <-> off

function toggleCell(y, x) {
  console.log("toggleCell", y, x);

  if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
    let id = "y-" + y + "-x-" + x;
    let cell = document.querySelector("#" + id);
    cell.classList.toggle("on");
  }
}

// toggle this cell and top/left/right/bottom neighbors

function toggleCellAndNeighbors(y, x) {
  console.log("toggleCellAndNeighbors", y, x);

  toggleCell(y - 1, x);
  toggleCell(y, x - 1);
  toggleCell(y, x);
  toggleCell(y, x + 1);
  toggleCell(y + 1, x);
}

// handle player clicking on cell:
//
// - find out where they clicked
// - toggle that cell and its neighbors
// - if they won, pop up winning message

function handleCellClick(event) {
  console.log("handleCellClick");

  let id = event.target.id; // like "y-3-x-2"
  let y = Number(id[2]);
  let x = Number(id[6]);

  toggleCellAndNeighbors(y, x);

  if (checkForWin()) {
    setTimeout(handleWin, 500); // 500ms = 1/2sec
  }
}

// Add "click listener" to each cell

function addClickListeners() {
  console.log("addClickListeners");

  for (let cell of document.querySelectorAll("td")) {
    cell.addEventListener("click", handleCellClick);
  }
}

// Look at all cells to see if won -- returns true/false

function checkForWin() {
  console.log("checkForWin");

  for (let cell of document.querySelectorAll("td")) {
    if (cell.classList.contains("on")) {
      return false;
    }
  }

  return true;
}

// pop up a winning message & reset

function handleWin() {
  console.log("handleWin");

  alert("Great job!");
  setupRandomBoard();
}

// Pick a random integer 0 ... upperRange-1

function randomNumber(upperRange) {
  console.log("randomNumber", upperRange);

  return Math.floor(Math.random() * upperRange);
}

// Setup random board

function setupRandomBoard() {
  console.log("setupRandomBoard");

  for (let i = 0; i < DIFFICULTY; i++) {
    let x = randomNumber(WIDTH);
    let y = randomNumber(HEIGHT);
    toggleCellAndNeighbors(y, x);
  }
}

// Code that runs when page first loads:

setupRandomBoard();
addClickListeners();
