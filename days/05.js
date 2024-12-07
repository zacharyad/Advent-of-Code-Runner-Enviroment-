let fs = require('fs');
console.log('\n');

//DAY 5
//SETUP
let isInst = true;
let inst = fs
  .readFileSync('./data/data05.txt', 'utf-8')
  .split('\n')
  .reduce(
    (acc, line) => {
      if (line === '' && isInst) {
        isInst = false;
      }

      if (isInst) {
        let [page1, page2] = line.split('|');
        if (acc.instructions[page1]) {
          acc.instructions[page1].push(page2);
        } else {
          acc.instructions[page1] = [page2];
        }
      } else {
        acc.orders.push(line.split(','));
      }

      return acc;
    },
    { instructions: {}, orders: [] }
  );

// Part ONE
function loopThroughInstuctions(ords, inst) {
  return ords.reduce((cnt, ord) => {
    if (testOrder(ord, inst)) {
      let midElem = getMiddle(ord);
      cnt += Number(midElem);
    }
    return cnt;
  }, 0);
}

function testOrder(order, instructions) {
  let l = 0;
  let r = 1;

  while (r < order.length) {
    if (instructions[order[r]].includes(order[l])) return false;
    else {
      l--;

      if (l < 0) {
        r++;
        l = r - 1;
      }
    }
  }

  return true;
}

function getMiddle(array) {
  return array[Math.floor(array.length / 2)];
}

// Part TWO
function loopThroughInstuctionsAndCorrect(ords, inst) {
  let cnt = 0;

  ords.forEach((ord) => {
    if (!testOrder(ord, inst)) {
      let correctedOrd = correctOrd(ord, inst);
      let midElem = getMiddle(correctedOrd);
      cnt += Number(midElem);
    }
  });

  return cnt;
}

function correctOrd(ord, inst) {
  let l = 0;
  let r = 1;

  while (r < ord.length) {
    if (inst[ord[r]].includes(ord[l])) {
      ord = swapElem(l, r, ord);
      l = 0;
      r = 1;
    } else {
      l--;

      if (l < 0) {
        r++;
        l = r - 1;
      }
    }
  }

  return ord;
}

function swapElem(i, j, array) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
  return array;
}

// OUTPUT CODE
function outputSolutions(...solutions) {
  solutions.forEach((sol) => console.log(sol.msg, sol.ans));
}

let solutionOneObj = {
  msg: "solution for valid orders' middle elem sum: ",
  ans: loopThroughInstuctions(inst.orders, inst.instructions),
};

let solutionTwoObj = {
  msg: "solution for INVALD orders' middle elem sum: ",
  ans: loopThroughInstuctionsAndCorrect(inst.orders, inst.instructions),
};

outputSolutions(solutionOneObj, solutionTwoObj);
