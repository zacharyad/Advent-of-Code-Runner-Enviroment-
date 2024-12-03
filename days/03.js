let fs = require('fs');

// DAY 3

//SETUP
let inst = fs.readFileSync('./data/data03.txt', 'utf-8').split('');

function sumOfMults(input) {
  return input.reduce((acc, _, i, arr) => {
    if (arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3] === 'mul(') {
      let p1 = i + 4;
      let numIdx = 0;
      let numCheck = '0123456789';
      let nums = ['', ''];

      // get the first num when arr[p1] hits "," and then the second num finished at ")" idealy
      while (true) {
        let currChar = arr[p1];
        if (currChar === ',') {
          numIdx = 1;
          p1++;
          continue;
        }

        if (numCheck.includes(currChar)) nums[numIdx] += currChar;
        else {
          numIdx = -1;
          break;
        }

        p1++;
        if (arr[p1] === ')') break;
      }

      i = p1;
      if (numIdx !== -1) acc += parseInt(nums[0], 10) * parseInt(nums[1], 10);
    }

    return acc;
  }, 0);
}

function testWithConditionals(input) {
  let doNext = true;
  return input.reduce((acc, _, i, arr) => {
    if (arr[i] === '(' && arr[i + 1] === ')') {
      if (arr.slice(i - 5, i).join('') === "don't") doNext = false;
      if (arr.slice(i - 2, i).join('') === 'do') doNext = true;
    }

    if (arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3] === 'mul(') {
      if (!doNext) {
        i += 3;
        return acc;
      }

      let p1 = i + 4;
      let numIdx = 0;
      let numCheck = '0123456789';
      let nums = ['', ''];

      // get the first num when arr[p1] hits "," and then the second num finished at ")" idealy
      while (true) {
        let currChar = arr[p1];
        if (currChar === ',') {
          numIdx = 1;
          p1++;
          continue;
        }

        if (numCheck.includes(currChar)) nums[numIdx] += currChar;
        else {
          numIdx = -1;
          break;
        }

        p1++;
        if (arr[p1] === ')') break;
      }

      i = p1;
      if (numIdx !== -1) acc += parseInt(nums[0], 10) * parseInt(nums[1], 10);
    }

    return acc;
  }, 0);
}

let test =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))".split(
    ''
  ); // Correct Answer: 48

console.log('Sum of Mul(a,b) vals: ', sumOfMults(inst)); // Correct Answer: 184122457
console.log(
  'Sum of Mul(a,b) vals using linear conditional-flags: ',
  testWithConditionals(inst)
); // Correct Answer: 107862689
