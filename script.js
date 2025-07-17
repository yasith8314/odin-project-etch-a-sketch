let size = 16;
let height = window.innerHeight;
let width = window.innerWidth;
let x = Math.min(height, width) * 0.8;

let percentage = 0;
let currentMode = 'black';

document.querySelector(".container").style = `width: ${x}px; height: ${x}px; border: 2px solid #ccc; margin: 10px;`;

document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('gridSize');
    size = parseInt(input.value);
    percentage = 0;

    if (size >= 1 && size <= 100) {
        gridSize = size;
        renderGrid();
    } else {
        alert('Please enter a number between 1 and 100.');
    }  
});



function renderGrid() {
let container = document.querySelector('.container');
    container.innerHTML = '';


    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('grid');

        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${x / size}px`;
            cell.style.height = `${x / size}px`;

            cell.addEventListener('pointerenter', () => {
                if (currentMode === 'black') {
                    cell.style.backgroundColor = 'black';
                } else if (currentMode === 'color') {
                    cell.style.backgroundColor = getRandomColor();
                } else if (currentMode === 'eraser') {
                    cell.style.backgroundColor = 'white';
                }
                else if (currentMode === 'trial') {
                    cell.style.backgroundColor = `rgba(0, 0, 0, ${Math.min(percentage, 1)})`;
                    percentage += Math.max(1 / (size * size), 0.001); ;
                }
            });

            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

document.getElementById("blackM").addEventListener('click', () => {
    currentMode = 'black';
});

document.getElementById("colorM").addEventListener('click', () => {
    currentMode = 'color';
});

document.getElementById("eraser").addEventListener('click', () => {
    currentMode = 'eraser';
});

document.getElementById("trialM").addEventListener('click', () => {
    currentMode = 'trial';
    percentage = 0; // Reset percentage for trial mode
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById('submit').click();
    
document.getElementById("clear").addEventListener('click', () => {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});




