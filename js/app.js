const table = document.getElementById('matrixTable');
let status = 0; // 0: paused, 1: running, -1: stopped

// Cache for cells to avoid repeated DOM queries
let cells = [];

function createMatrix(rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.id = `cell_${i}_${j}`;
      cell.className = 'cell black'; // Default state is black
      cell.textContent = ' ';
      cell.addEventListener('click', () => toggleCell(i, j));
      table.appendChild(cell);
      cells.push(cell); // Store the reference to each cell in the array
    }
  }
}

// Create a 25x25 matrix
createMatrix(25, 25);

const directions = [
  [-1, -1], [-1, 0], [-1, 1], // top-left, top, top-right
  [0, -1],          [0, 1],    // left, right
  [1, -1], [1, 0], [1, 1]      // bottom-left, bottom, bottom-right
];

// Toggle cell state between 'black' and 'red'
function toggleCell(i, j) {
  const cell = document.getElementById(`cell_${i}_${j}`);
  if (cell.classList.contains('black')) {
    cell.classList.remove('black');
    cell.classList.add('red');
  } else if (cell.classList.contains('red')) {
    cell.classList.remove('red');
    cell.classList.add('black');
  }
}

// Reset all cells to their initial state (black)
function initialize() {
  cells.forEach(cell => {
    if (cell.classList.contains('red')) {
      cell.classList.remove('red');
      cell.classList.add('black');
    }
  });
}
let generation =0;
// Run the matrix simulation
function run_matrix() {
  if (status === -1) {
    initialize();
    generation = 0; // Reset generations
    update_generation();
    return;
  }

  if (status === 0) {
    return; // Exit early if paused
  }

  const newState = [];
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      let redCount = 0;

      for (const [dx, dy] of directions) {
        const nx = i + dx, ny = j + dy;
        if (nx >= 0 && nx < 25 && ny >= 0 && ny < 25) {
          const neighbor = document.getElementById(`cell_${nx}_${ny}`);
          if (neighbor.classList.contains('red')) {
            redCount++;
          }
        }
      }

      const currentCell = document.getElementById(`cell_${i}_${j}`);
      if (currentCell.classList.contains('red')) {
        if (redCount < 2 || redCount > 3) {
          newState.push({ i, j, state: 'black' });
        } else {
          newState.push({ i, j, state: 'red' });
        }
      } else {
        if (redCount === 3) {
          newState.push({ i, j, state: 'red' });
        }
      }
    }
  }

  newState.forEach(({ i, j, state }) => {
    const cell = document.getElementById(`cell_${i}_${j}`);
    if (state === 'red') {
      cell.classList.remove('black');
      cell.classList.add('red');
    } else {
      cell.classList.remove('red');
      cell.classList.add('black');
    }
  });

  generation++; // Increment generation count
  update_generation();

  if (status === 1) {
    setTimeout(run_matrix, 100); // Continue the simulation
  }
}


// Start the simulation
function play() {
  if (status !== 1) {
    status = 1;
    run_matrix();
  }
}

// Pause the simulation
function pause() {
  status = 0;
}

// Stop the simulation and reset
function stop() {
  status = -1; // Mark the simulation as stopped
  initialize(); // Reset the grid
  generation = 0; // Reset generation count
  update_generation(); // Update display
}
function update_generation(){
  const generation_text=document.getElementById('input');
  generation_text.value = "Generation "+generation;
}
