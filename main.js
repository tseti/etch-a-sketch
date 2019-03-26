"use strict"

const html      = document.getElementsByTagName('html')[0];
const container = document.querySelector('.container');
const clearBtn  = document.querySelector('.clear');
const form      = document.querySelector('form');
const radioBtns = document.getElementsByTagName('input');

const BLACK  = 0;
const RANDOM = 1;

let sketchpad = document.querySelector('.sketchpad');
let gridSize  = 16;
let intensity = 1;
let color     = BLACK;

clearBtn.addEventListener('click', () => changeSize(prompt('Enter new size', 64)));

form.reset();
addDivsToContainer();
addRadioBtnListeners();

function changeSize(size) {
  gridSize = size;
  container.removeChild(sketchpad);
  sketchpad = document.createElement('div');
  sketchpad.classList.add('sketchpad');
  container.appendChild(sketchpad);
  addDivsToContainer();
}


function addDivsToContainer() {
  for (let i = 0; i < gridSize ** 2; i++) {
    let div = document.createElement('div');
    div.classList.add(`cell${i}`);
    addListener(div);
    sketchpad.appendChild(div);
    html.style.setProperty("--side-number", gridSize);
  }
}

function addListener(elem) {
  elem.addEventListener('mouseover', function(e) {
    let currentColor = e.target.style['background-color'];

    if (currentColor) {
      e.target.style['background-color'] = updateIntensity(currentColor);
    } else {
      e.target.style['background-color'] = color === BLACK ?
        `rgba(0, 0, 0, ${intensity}` : getRandomColor();
    }
  });
}

function updateIntensity(color) {
  const hasMaxIntensity = color.slice(0, 4) === 'rgb(';
  if (!hasMaxIntensity) {
    const newIntensity = +color.slice(-4, -1) + intensity;
     return `${color.slice(0, -4)} ${newIntensity})`;
  }
  return color;

}

function getRandomColor() {
  return `rgba(${getRandom256()}, ${getRandom256()}, ${getRandom256()}
      , ${intensity})`;
}

function getRandom256() {
  return Math.trunc(Math.random() * 256);
}

function addRadioBtnListeners() {
  Array.from(radioBtns).forEach(radioBtn => {
    radioBtn.addEventListener('click', function(e) {
      if (e.target.name === 'intensity') {
        intensity = +e.target.value;
      } else {
        color = +e.target.value;
      }
      changeSize(gridSize);
    });
  });
}