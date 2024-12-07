// *count three sums

let nums = [10, 10, 20, 30, 40]; // 3
let nums2 = [1, 1, 1, 2, 2, 3, 4, 5]; // 5
//          ^   ^   ^
// k = 60
// answer 3, e.g. [10, 10, 20], [10, 20, 30], and the other [10, 20, 30]

function countThrees(arr, target) {
  let cnt = 0;

  let p1 = 0;
  let p2 = 1;
  let p3 = 2;

  while (p1 < arr.length - 2) {
    let currTotal = arr[p1] + arr[p2] + arr[p3];
    if (currTotal === target) {
      cnt++;
    }

    p3++;

    if (p3 > arr.length - 1) {
      p2++;
      p3 = p2 + 1;
    }

    if (p2 > arr.length - 2) {
      p1++;
      p2 = p1 + 1;
      p3 = p2;
    }
  }

  return cnt;
}

function optCountThree(arr, target) {
  let cnt = 0;

  for (let p1 = 0; p1 < arr.length - 2; p1++) {
    let seen = new Set(); // To track elements for p2 + p3 pair

    for (let p2 = p1 + 1; p2 < arr.length; p2++) {
      let needed = target - arr[p1] - arr[p2]; // What we need for p3 to complete the triplet

      if (seen.has(needed)) {
        cnt++; // If needed value is in the set, count the triplet
      }

      seen.add(arr[p2]); // Add the current element for the next iteration
    }
  }

  return cnt;
}

console.log(optCountThree(nums2, 6));

// *fib recursively, iteratively, and with memoization

// effiecient because of memo
function fib(num, memo = {}) {
  if (num === 0) return 0;
  if (num === 1) return 1;

  if (memo[num] !== undefined) return memo[num];

  memo[num] = fib(num - 1, memo) + fib(num - 2, memo);

  return memo[num];
}

// quick without memo
function fibIt(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;

  let prev1 = 0;
  let prev2 = 1;
  let current;

  for (let i = 2; i <= num; i++) {
    current = prev1 + prev2;

    prev1 = prev2;
    prev2 = current;
  }

  return current;
}

//console.log(fib(500));

// *flatten a mulit dem array to a 1D array
let arrayInput = [1, [2, 3, 4, [5], 6], 7, [8], 9, [10, 11]];

function flattenMultArr(arr, result = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattenMultArr(arr[i], result);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

//console.log(flattenMultArr(arrayInput));
