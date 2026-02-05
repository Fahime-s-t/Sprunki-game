// ================================
// Sprunki Pattern Maker - script.js
// ================================

// Select elements
const sprunkiOptions = document.querySelectorAll('.sprunki-option');
const patternGrid = document.querySelector('.pattern-grid');
const resetButton = document.getElementById('reset-button');
const patternButton = document.getElementById('pattern-button');

// Settings
const GRID_SIZE = 5;
let selectedSprunki = 'blue';

// Store grid cells in a 2D array
const gridCells = [];

// ================================
// Sprunki selection
// ================================
sprunkiOptions.forEach(option => {
  option.addEventListener('click', () => {
    sprunkiOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selectedSprunki = option.dataset.sprunki;
  });
});

// ================================
// Create grid
// ================================
for (let row = 0; row < GRID_SIZE; row++) {
  gridCells[row] = [];

  for (let col = 0; col < GRID_SIZE; col++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell', 'empty');

    cell.addEventListener('click', () => {
      if (cell.classList.contains('empty')) {
        cell.classList.remove('empty');
        cell.style.backgroundImage = `url(${selectedSprunki}-sprunki.png)`;
      } else {
        cell.classList.add('empty');
        cell.style.backgroundImage = '';
      }
    });

    gridCells[row][col] = cell;
    patternGrid.appendChild(cell);
  }
}

// ================================
// Pattern detection
// ================================
function getFullRowPattern() {
  for (let row = 0; row < GRID_SIZE; row++) {
    let pattern = [];
    let full = true;

    for (let col = 0; col < GRID_SIZE; col++) {
      if (gridCells[row][col].classList.contains('empty')) {
        full = false;
        break;
      }
      pattern.push(gridCells[row][col].style.backgroundImage);
    }

    if (full) return pattern;
  }
  return null;
}

function getFullColumnPattern() {
  for (let col = 0; col < GRID_SIZE; col++) {
    let pattern = [];
    let full = true;

    for (let row = 0; row < GRID_SIZE; row++) {
      if (gridCells[row][col].classList.contains('empty')) {
        full = false;
        break;
      }
      pattern.push(gridCells[row][col].style.backgroundImage);
    }

    if (full) return pattern;
  }
  return null;
}

// ================================
// Apply patterns
// ================================
function applyRowPattern(pattern) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      gridCells[row][col].classList.remove('empty');
      gridCells[row][col].style.backgroundImage = pattern[col];
    }
  }
}

function applyColumnPattern(pattern) {
  for (let col = 0; col < GRID_SIZE; col++) {
    for (let row = 0; row < GRID_SIZE; row++) {
      gridCells[row][col].classList.remove('empty');
      gridCells[row][col].style.backgroundImage = pattern[row];
    }
  }
}

// ================================
// Create Pattern button
// ================================
patternButton.addEventListener('click', () => {
  const rowPattern = getFullRowPattern();
  const columnPattern = getFullColumnPattern();

  if (rowPattern) {
    applyRowPattern(rowPattern);
  } else if (columnPattern) {
    applyColumnPattern(columnPattern);
  } else {
    alert('Please fill one complete row or column first!');
  }
});

// ================================
// Reset button
// ================================
resetButton.addEventListener('click', () => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      gridCells[row][col].classList.add('empty');
      gridCells[row][col].style.backgroundImage = '';
    }
  }
});
