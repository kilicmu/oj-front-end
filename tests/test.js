function NumberOf1(n) {
  const arr = [];
  let isF = false;
  let num = n;

  if (num < 0) {
    num = Math.abs(num);
    isF = true;
  }
  let i = 0;
  while (num !== 0) {
    arr[i] = num % 2;
    num = Math.floor(num / 2);
    ++i;
  }
  if (isF) {
    for (const i in arr) {
      arr[i] = arr[i] === 1 ? 0 : 1;
    }
    // arr[i] = 1;
    let j = 0;
    arr[0] = arr[0] + 1;
    console.log(arr);
    while (arr[j] > 1) {
      arr[j] = 0;
      if (j + 1 === i) {
        break;
      }
      ++arr[j + 1];
      ++j;
    }
    console.log(arr);
  }
  let count = 0;
  for (const item of arr) {
    if (item === 1) {
      count = count + 1;
    }
  }
  return count;
}

function test(num) {
  let isf;
  if (num < 0) {
    isf = true;
    num = 0 - num;
  }
  const str = num.toString(2).split('').reverse().join('');
  let arr = [];
  for (let i = 0; i < 31; i++) {
    arr[i] = str[i] ? parseInt(str[i]) : 0;
  }
  console.log(arr);
  arr[31] = 0;
  if (isf) {
    arr[31] = 1;
    for (let i = 0; i < 31; i++) {
      arr[i] = arr[i] === 0 ? 1 : 0;
    }
    console.log(arr);

    let j = 0;
    arr[0] = arr[0] + 1;
    while (arr[j] > 1) {
      arr[j] = 0;
      if (j + 1 === 31) {
        break;
      }
      ++arr[j + 1];
      ++j;
    }
  }
  let count = 0;
  console.log(arr);
  for (const item of arr) {
    if (item === 1) {
      ++count;
    }
  }
  return count;
}

console.log(test(-2147483648));
