let fs = require('fs');

//DAY 1
//SETUP
let { list1, list2 } = fs
  .readFileSync('./data/data01.txt', 'utf-8')
  .split('\n')
  .reduce(
    (acc, nums) => {
      let [first, second] = nums.split('   ');
      acc.list1.push(first);
      acc.list2.push(second);

      return acc;
    },
    { list1: [], list2: [] }
  );

function countTotalDiff(list1, list2) {
  let sortedList1 = [...list1].sort((a, b) => a - b);
  let sortedList2 = [...list2].sort((a, b) => a - b);

  return list1.reduce(
    (acc, _, i) => (acc += Math.abs(sortedList1[i] - sortedList2[i])),
    0
  );
}

function findSimilarityScore(list1, list2) {
  let repeatNonEx = {};

  let freq = list2.reduce((acc, num, idx) => {
    if (list1.indexOf(num) !== -1 && repeatNonEx[num] === undefined) {
      // found in second list
      if (acc[num]) {
        // is in second list and has been seen before
        acc[num] += 1;
      } else {
        // found in second and has NOT been seen before
        acc[num] = 1;
      }

      list2[idx] = null;
    } else {
      repeatNonEx[num] = true;
    }

    return acc;
  }, {});

  let total = 0;

  for (let num in freq) {
    total += Number(num) * freq[num];
  }

  return total;
}

console.log('total difference: ', countTotalDiff(list1, list2)); // answer correct 1834060
console.log('Similarity Score: ', findSimilarityScore(list1, list2)); // answer correct 21607792
