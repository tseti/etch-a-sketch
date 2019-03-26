"use strict"

const html      = document.getElementsByTagName('html')[0];
const container = document.querySelector('.container');
const clearBtn  = document.querySelector('.clear');

let sketchpad = document.querySelector('.sketchpad');
let gridSize = 32;

clearBtn.addEventListener('click', () => changeSize(prompt('Enter new size', 64)));


addDivsToContainer();

function addDivsToContainer() {
  for (let i = 0; i < gridSize**2; i++) {
    let div = document.createElement('div');
    div.classList.add(`cell${i}`);
    div.classList.add('color-cell');
    sketchpad.appendChild(div);
    html.style.setProperty("--side-number", gridSize);
  }
}

function changeSize(size) {
  gridSize = size;
  container.removeChild(sketchpad);
  sketchpad = document.createElement('div');
  sketchpad.classList.add('sketchpad');
  container.appendChild(sketchpad);
  addDivsToContainer();
}
