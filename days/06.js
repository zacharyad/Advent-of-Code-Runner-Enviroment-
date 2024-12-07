let fs = require('fs');

//DAY 6
//SETUP

let matrix = fs
  .readFileSync('./data/data06.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    return line.split('');
  });

// Start of class based approach

class Area {
  constructor(matrix) {
    this.matrix = matrix;
    this.guardPos = undefined;
    this.dirIdx = undefined;
    this.spacesGuardTraveled = 2;
    this.seenBlockEdge = [{}, {}, {}, {}];
  }

  traceGuardsPath() {
    if (this.findGaurd()) {
      return this.moveGuard();
    }
  }

  findGaurd() {
    let guard = ['^', '>', 'v', '<'];
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[0].length; col++) {
        const element = matrix[row][col];

        if (guard.includes(element)) {
          const directionGaurdsIn = guard.indexOf(element);

          this.guardPos = [row, col];
          this.matrix[row][col] = 'X';
          console.log(row, col);
          this.dirIdx = directionGaurdsIn;
          return true;
        }
      }
    }
    throw new Error('no gaurd found. Paths traveled: ', 0);
  }

  moveGuard() {
    if (this.spacesGuardTraveled > this.matrix.length * this.matrix[0].length)
      return 'overdid it';
    switch (this.dirIdx) {
      case 0:
        if (!this.moveUp()) {
          // we have git the end of matrix, or  found cycle
          return this.spacesGuardTraveled;
        } else {
          break;
        }
      case 1:
        if (!this.moveRight()) {
          return this.spacesGuardTraveled;
        } else {
          break;
        }
      case 2:
        if (!this.moveDown()) {
          return this.spacesGuardTraveled;
        } else {
          break;
        }
      case 3:
        if (!this.moveLeft()) {
          return this.spacesGuardTraveled;
        } else {
          break;
        }
      default:
        throw new Error('direction not found');
    }

    return this.moveGuard();
  }

  moveUp() {
    let newRow = this.guardPos[0] - 1;
    let [row, col] = this.guardPos;

    if (newRow < 0) {
      console.log('outside of the grid at ', row, col);
      return false;
    }

    this.checkForInc(row, col);

    if (this.matrix[newRow][col] === '#') {
      if (this.seenBlockEdge[this.dirIdx][`${row}-${col}`]) {
        console.log('found a cycle at ', row, col, ' going up');
        return false;
      } else {
        this.seenBlockEdge[this.dirIdx][`${row}-${col}`] = true;
        this.iterateDir();
        this.matrix[row][col] = 'X';

        return true;
      }
    }

    if (this.matrix[newRow][col] === 'X' || this.matrix[newRow][col] === '.') {
      this.guardPos = [newRow, col];

      return this.moveUp();
    }
  }
  moveRight() {
    let newCol = this.guardPos[1] + 1;
    let [row, col] = this.guardPos;

    if (newCol > this.matrix[0].length - 1) {
      console.log('outside of the grid at ', row, col);
      return false;
    }

    this.checkForInc(row, col);

    if (this.matrix[row][newCol] === '#') {
      if (this.seenBlockEdge[this.dirIdx][`${row}-${col}`]) {
        console.log('found a cycle at ', row, col, ' going right');
        return false;
      } else {
        this.seenBlockEdge[this.dirIdx][`${row}-${col}`] = true;
        this.iterateDir();
        this.matrix[row][col] = 'X';

        return true;
      }
    }

    if (this.matrix[row][newCol] === 'X' || this.matrix[row][newCol] === '.') {
      this.guardPos = [row, newCol];

      return this.moveRight();
    }
  }
  moveDown() {
    let [row, col] = this.guardPos;
    let newRow = row + 1;

    if (newRow >= this.matrix.length) {
      console.log('outside of the grid at ', row, col);
      return false;
    }

    this.checkForInc(row, col);

    if (this.matrix[newRow][col] === '#') {
      if (this.seenBlockEdge[this.dirIdx][`${row}-${col}`]) {
        console.log('found a cycle at ', row, col, ' going down');
        return false;
      } else {
        this.seenBlockEdge[this.dirIdx][`${row}-${col}`] = true;
        this.iterateDir();
        this.matrix[row][col] = 'X';
        return true;
      }
    }

    if (this.matrix[newRow][col] === 'X' || this.matrix[newRow][col] === '.') {
      this.guardPos = [newRow, col];

      return this.moveDown();
    }
  }
  moveLeft() {
    let newCol = this.guardPos[1] - 1;
    let [row, col] = this.guardPos;

    if (newCol < 0) {
      console.log('outside of the grid at ', row, col);
      return false;
    }

    this.checkForInc(row, col);

    if (this.matrix[row][newCol] === '#') {
      if (this.seenBlockEdge[this.dirIdx][`${row}-${col}`]) {
        console.log('found a cycle at ', row, col, ' going left');
        return false;
      } else {
        this.seenBlockEdge[this.dirIdx][`${row}-${col}`] = true;
        this.iterateDir();
        this.matrix[row][col] = 'X';
        return true;
      }
    }

    if (this.matrix[row][newCol] === 'X' || this.matrix[row][newCol] === '.') {
      this.guardPos = [row, newCol];

      return this.moveLeft();
    }
  }
  checkForInc(row, col) {
    if (this.matrix[row][col] === '.') {
      this.spacesGuardTraveled++;
      this.matrix[row][col] = 'X';
    }
  }
  iterateDir() {
    this.dirIdx += 1;
    if (this.dirIdx > 3) {
      this.dirIdx = 0;
    }
  }
  printMatrix() {
    for (let row = 0; row < this.matrix.length; row++) {
      let line = '\r';
      for (let col = 0; col < this.matrix[0].length; col++) {
        let char = this.matrix[row][col];
        if (char === '.') {
          line += 'O';
        } else {
          line += this.matrix[row][col];
        }
      }
      console.log(line);
    }
    console.log(
      'Guard saw this many distinct spots: ',
      this.spacesGuardTraveled
    );
  }
}

let testM = [
  ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '^', '.', '.', '.', '.', '#'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
];

let grid = new Area(matrix);

grid.traceGuardsPath();
grid.printMatrix();
