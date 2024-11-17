const table = document.getElementById('matrixTable');

function createMatrix(rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellNumber = i * cols + j + 1; // Calculate cell number
      const cell = document.createElement('div');
      cell.id = `cell-${cellNumber}`; // Assign a unique id
      cell.className = 'cell black'; // Assign a CSS class
      cell.textContent = ` `; // Set the content
      cell.addEventListener('click', () => {
        if (cell.classList.contains('black')) {
          // If it has 'black', remove 'black' and add 'red'
          cell.classList.remove('black');
          cell.classList.add('red');
        } else if (cell.classList.contains('red')) {
          // If it has 'red', remove 'red' and add 'black'
          cell.classList.remove('red');
          cell.classList.add('black');
        }
      })
      table.appendChild(cell); // Append to grid container
    }
  }
}
// Create a 3x3 matrix dynamically
createMatrix(25, 25);

const Text_area = document.getElementById('input');

const total_cells = Math.sqrt(table.childElementCount);
const length= total_cells;
const breadth= total_cells;
let matrix= [];
function initialize() {
  for (let i = 0; i < length; i++) {
    const r = [];
    for (let j = 0; j < breadth; j++) {
      r.push(
        {
          value: j,
          status: false
        }
      );
    }
    matrix.push(r);
  }
}
function run_matrix(matrix, status) {
  if (status ===-1){
    initialize();
  }
}
function play(){
  alert("play Button clicked!"+total_cells);
}
function pause(){
  alert("pause Button clicked!" );
}
function stop(){
  alert("stop Button clicked!");
}
