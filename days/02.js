let fs = require('fs');

// DAY 2
// SETUP
let listOfReportArrs = fs
  .readFileSync('./data/data2.txt', 'utf-8')
  .split('\n')
  .reduce((acc, report) => {
    acc.push(report.split(' '));

    return acc;
  }, []);

function testReport(report) {
  let state = {
    isInc: null,
  };

  for (let i = 0; i < report.length - 1; i++) {
    let str1 = Number(report[i]);
    let str2 = Number(report[i + 1]);
    let comp = compareLvls(str1, str2, state);

    if (!comp) {
      return false;
    }
  }

  return true;
}

function CountAllSafeReports(reportsArr, testingFunc) {
  return reportsArr.reduce((acc, report) => {
    if (testingFunc(report)) acc += 1;
    return acc;
  }, 0);
}

function compareLvls(lvl1, lvl2, state) {
  lvl1 = parseInt(lvl1, 10); // Ensure levels are numbers
  lvl2 = parseInt(lvl2, 10);

  if (lvl1 === lvl2) return false; // Consecutive levels cannot be the same
  if (Math.abs(lvl1 - lvl2) > 3) return false; // Levels differ by more than 3

  if (state.isInc === null) {
    state.isInc = lvl1 < lvl2; // Set direction on first comparison
  } else if (state.isInc && lvl2 < lvl1) {
    return false; // Sequence breaks upward trend
  } else if (!state.isInc && lvl2 > lvl1) {
    return false; // Sequence breaks downward trend
  }

  return true;
}

function testReportWithDampener(report) {
  let state = { isInc: null, stillGood: true };

  const isSafe = (arr) => {
    let p1 = 0,
      p2 = 1;
    state.isInc = null; // Reset for each check
    while (p2 < arr.length) {
      if (!compareLvls(arr[p1], arr[p2], state)) {
        return false;
      }
      p1++;
      p2++;
    }
    return true;
  };

  if (isSafe(report)) return true; // Safe without removing any level

  // Test removing one level at a time
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(modifiedReport)) {
      return true; // Safe after removing one level
    }
  }

  return false; // Unsafe even with the dampener
}

console.log(
  'amount of safe reports: ',
  CountAllSafeReports(listOfReportArrs, testReport)
); // 404
console.log(
  'amount of safe reports: ',
  CountAllSafeReports(listOfReportArrs, testReportWithDampener)
); // 341
