const sprunkiOptions = document.querySelectorAll('.sprunki-option');
const patternGrid = document.querySelector('.pattern-grid');
const resetButton = document.getElementById('reset-button');
let selectedSprunki = 'blue'; // Default selected Sprunki

// Add event listeners to Sprunki options
sprunkiOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Remove 'selected' class from all options
    sprunkiOptions.forEach(o => o.classList.remove('selected'));

    // Add 'selected' class to the clicked option
    option.classList.add('selected');

    // Update selected Sprunki
    selectedSprunki = option.dataset.sprunki;
  });
});

// Create grid cells
for (let i = 0; i < 25; i++) {
  const gridCell = document.createElement('div');
  gridCell.classList.add('grid-cell', 'empty');
  gridCell.addEventListener('click', () => {
    if (gridCell.classList.contains('empty')) {
      gridCell.classList.remove('empty');
      gridCell.style.backgroundImage = `url(${selectedSprunki}-sprunki.png)`;
    } else {
      gridCell.classList.add('empty');
      gridCell.style.backgroundImage = '';
    }
  });
  patternGrid.appendChild(gridCell);
}

// Reset button functionality
resetButton.addEventListener('click', () => {
  const gridCells = document.querySelectorAll('.grid-cell');
  gridCells.forEach(cell => {
    cell.classList.add('empty');
    cell.style.backgroundImage = '';
  });
});
