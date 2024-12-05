let fs = require('fs');
console.log('\n');

//DAY 4
//SETUP
let grid = fs.readFileSync('./data/data04.txt', 'utf-8').split('\n');

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.currCount = 0;
    this.w = grid[0].length;
    this.h = grid.length;
  }
  printGrid() {
    this.grid.forEach((row) => console.log(row));
  }
  findAllXMAS() {
    this.currCount += this.row();
    this.currCount += this.col();
    this.currCount += this.diagLtoR();
    this.currCount += this.diagRtoL();

    return this.currCount;
  }
  row() {
    let cnt = 0;

    this.grid.forEach((row) => {
      cnt += this.countInStr(row);
    });

    return cnt;
  }

  col() {
    let cols = [];
    let testStr = '';

    for (let col = 0; col < this.grid[0].length; col++) {
      for (let row = 0; row < this.grid.length; row++) {
        testStr += this.grid[row][col];
      }
      cols.push(testStr);
      testStr = '';
    }

    return cols.reduce((acc, str) => {
      acc += this.countInStr(str);
      return acc;
    }, 0);
  }

  diagLtoR() {
    let cnt = 0;

    // Top-left to bottom-right diagonals
    for (let startRow = 0; startRow < this.h; startRow++) {
      let diagStr = '';
      let r = startRow;
      let c = 0;

      // Collect the diagonal starting at (startRow, 0)
      while (r < this.h && c < this.w) {
        diagStr += this.grid[r][c];
        r++;
        c++;
      }

      cnt += this.countInStr(diagStr);
    }

    for (let startCol = 1; startCol < this.w; startCol++) {
      let diagStr = '';
      let r = 0;
      let c = startCol;

      // Collect the diagonal starting at (0, startCol)
      while (r < this.h && c < this.w) {
        diagStr += this.grid[r][c];
        r++;
        c++;
      }

      cnt += this.countInStr(diagStr);
    }

    return cnt;
  }

  diagRtoL() {
    let cnt = 0;

    for (let startRow = 0; startRow < this.h; startRow++) {
      let diagStr = '';
      let r = startRow;
      let c = this.w - 1;

      while (r < this.h && c >= 0) {
        diagStr += this.grid[r][c];
        r++;
        c--;
      }

      cnt += this.countInStr(diagStr);
    }

    for (let startCol = this.w - 2; startCol >= 0; startCol--) {
      let diagStr = '';
      let r = 0;
      let c = startCol;

      while (r < this.h && c >= 0) {
        diagStr += this.grid[r][c];
        r++;
        c--;
      }

      cnt += this.countInStr(diagStr);
    }

    return cnt;
  }

  searchForCrossMass() {
    let cnt = 0;

    for (let row = 1; row < this.grid.length - 1; row++) {
      for (let col = 1; col < this.grid[0].length - 1; col++) {
        if (this.grid[row][col] === 'A') {
          if (this.isCrossMas(row, col)) cnt++;
        }
      }
    }

    return cnt;
  }

  isCrossMas(r, c) {
    let tl = this.grid[r - 1][c - 1];
    let tr = this.grid[r - 1][c + 1];
    let bl = this.grid[r + 1][c - 1];
    let br = this.grid[r + 1][c + 1];

    let TLtoBR = (tl === 'M' && br === 'S') || (tl === 'S' && br === 'M');
    let TRtoBL = (tr === 'M' && bl === 'S') || (tr === 'S' && bl === 'M');

    return TLtoBR && TRtoBL;
  }

  countInStr(str) {
    let cnt = 0;
    const target = 'XMAS';
    const reversedTarget = 'SAMX';

    for (let i = 0; i <= str.length - 4; i++) {
      if (
        str.slice(i, i + 4) === target ||
        str.slice(i, i + 4) === reversedTarget
      ) {
        cnt++;
      }
    }

    return cnt;
  }
  printAnswers() {
    console.log("Instances of 'XMAS'", ws.findAllXMAS()); // 2297
    console.log("Instances of Crosses of 'MAS'", ws.searchForCrossMass()); // 1745
  }
}

let ws = new WordSearch(grid);
ws.printAnswers();
