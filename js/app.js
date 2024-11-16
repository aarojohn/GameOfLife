function createMatrix(rows, cols) {
  const table = document.getElementById('matrixTable');
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellNumber = i * cols + j + 1; // Calculate cell number
      const cell = document.createElement('div');
      cell.id = `cell-${cellNumber}`; // Assign a unique id
      cell.className = 'cell'; // Assign a CSS class
      cell.textContent = `${cellNumber}`; // Set the content
      table.appendChild(cell); // Append to grid container
    }
  }
}

// Create a 3x3 matrix dynamically
createMatrix(8, 8);
