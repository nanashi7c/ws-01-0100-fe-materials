
/**
 *  文字列の長さ
 *
 *  lengthをも使わずに引数で渡された文字列の長さを求める関数を定義してください
 *
 *  example:
 *    [1, 3, 7, 9] => output: 20
 *    [2, 5, 3] => output: 10
 *    [1] => output: 1
 *
 */

function length(str) {
  let len = 0;

  for (const _ of str) {
    len++;
  }

  return len;
}

/**
 *  文字列の反転
 *
 *  文字列を反転させる関数を実装してください
 *
 *  example:
 *    'library' => 'yrarbil'
 *    'krow' => 'work'
 *    'fizzbuzz' => 'zzubzzif'
 *
 */
function reverse(str) {
  let reversedString = '';

  for (let i = str.length - 1; i >= 0; i--) {
    reversedString += str[i];
  }

  return reversedString;
}

/**
 *  指定された文字列の位置を返却
 *
 *  指定された文字列の位置を返却する関数を定義してください
 *
 *  example:
 *    'library', a => output: 4
 *    'work', w => output: 0
 *    'bicycle', a => output: -1
 *
 */

function findIndex(str, char) {

  for (i = 0; i < str.length; i++) {
    if (str[i] === char) return i;
  }

  return -1;
}

/**
 *  指定された文字列を指定された文字で分割
 *
 *  指定された文字列aを指令された一文字bで分割して配列を返却する関数を定義してください
 *
 *  example:
 *    'library', a => output: ['libr', 'ry']
 *    'apple,banana,pineapple', w => output: ['apple', 'banana', 'pineapple']
 *    'bicycle', a => output: ['bicycle']
 *
 */

function split(a, b) {
  let splitedArray = [];
  let currentChunk = '';

  for (const char of a) {
    if (char === b) {
      splitedArray.push(currentChunk);
      currentChunk = '';
    } else {
      currentChunk += char;
    }
  }

  splitedArray.push(currentChunk);
  return splitedArray;
}

/**
 *  配列の合計
 *
 *  渡された配列の合計を返す関数を実装してください。
 *
 *  example:
 *    [1, 3, 7, 9] => output: 20
 *    [2, 5, 3] => output: 10
 *    [1] => output: 1
 *
 */

function sum(array) {
  let total = 0;

  for (const value of array) {
    total += value;
  }

  return total;
}

/**
 *  配列の平均
 *
 *  渡された配列の合計を整数(小数切り捨て)で返す関数を実装してください。
 *
 *  example:
 *    [1, 3, 7, 9] => output: 5
 *    [2, 5, 3] => output: 3
 *    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] => output: 5
 *    [1] => output: 1
 *    [] => output: 1
 *
 */

function average(array) {
  if (array.length === 0) return 0;

  return Math.floor(sum(array) / array.length);
}

/**
 *  配列の結合
 *
 *  渡された二つの配列を連結する関数を実装してください。
 *
 *  example:
 *    [1, 3, 7, 9], [3, 4] => output: [1, 3, 7, 9, 3, 4]
 *    ['h', 'o', 'm', 'e'], ['w', 'o', 'r', 'k'] => output: ['h', 'o', 'm', 'e', 'w', 'o', 'r', 'k']
 *    [], [] => output: []
 *
 */

function concat(a, b) {
  let concutedArray = [];

  for (const value of a) {
    concutedArray.push(value);
  }

  for (const value of b) {
    concutedArray.push(value);
  }
  return concutedArray;
}

/**
 *  2.1.2 配列の個数
 *
 *  渡された配列の要素数を返す関数をlength を使わずに実装してください。
 *
 *  example:
 *    [1, 3, 7, 9] => output: 4
 *    [2, 5, 3] => output: 3
 *    [1] => output: 1
 *
 */

function size(array) {
  let count = 0;

  for (const _ of array) {
    count++;
  }

  return count;
}

/**
 *  2.1.3 配列の最大値と最小値
 *
 *  配列の最大値と最小値を出力する関数を実装してください。
 *
 *  example:
 *    [1, 3, 7, 9] => max: 20, min: 1
 *    [2, 5, 3, 6, 10, -1] => max: 10, min: -1
 *    [1] => max: 1, min: 1
 *    [] => 表示しない
 *
 */

function minMax(array) {
  if (array.length === 0) return;

  let
    currentMax = array[0],
    currentMin = array[0];

  for (const value of array) {
    if (currentMax < value) {
      currentMax = value;
    } else if (currentMin > value) {
      currentMin = value;
    }
  }

  console.log(`max: ${currentMax}, min: ${currentMin}`);
}

/**
 *  連番
 *
 *  指定された数字までの連番の配列を生成する関数を定義してください
 *
 *  example:
 *    5 => [0, 1, 2, 3, 4]
 *    0 => []
 *
 */

function seq(num) {
  let sequentialArray = [];

  for (let i = 0; i < num; i++) {
    sequentialArray.push(i);
  }

  return sequentialArray;
}

/**
 *  奇数の連番
 *
 *  指定された数字までの奇数の連番の配列を生成する関数を定義してください
 *
 *  example:
 *    5 => [1, 3, 5]
 *    10 => [1, 3, 5, 7, 9]
 *    0 => []
 *
 */

function omitSeq(num) {
  let omitSequentialArray = [];

  for (let i = 1; i <= num; i++) {
    if (i % 2 === 1) omitSequentialArray.push(i);
  }

  return omitSequentialArray;
}

/**
 *  指定された数値以下の配列
 *
 *  指定された数字以下を抜き出した配列を返す関数を定義してください
 *
 *  example:
 *    [1, 7, 5, 4], 3 => [1]
 *    [1, 7, 5, 4], 7 => [1, 7, 5, 4]
 *    [], 7 => []
 *
 */

function filter(array, num) {
  let filteredArray = [];

  for (const value of array) {
    if (value <= num) filteredArray.push(value);
  }

  return filteredArray;
}

/**
 *  Fizz Buzz
 *
 *  1から100の数字までをカウントして、数字が3の倍数の場合にFizz
 *  5の倍数の場合にBuzz、3と5の倍数の時にFizzBuzzと表示する関数を実装してください。
 *
 *  example:
 *    1
 *    2
 *    3 Fizz
 *    4
 *    5 Buzz
 *    6
 *    7
 *    ..
 *    15 FizzBuzz
 *    ..
 *    18 Fizz
 *    ...
 *    30 FizzBuzz
 *    ...
 */

function fizzBuzz() {
  for (let number = 1; number <= 100; number++) {
    let fizzBuzzText = '';
    if (number % 3 === 0) fizzBuzzText += 'Fizz';
    if (number % 5 === 0) fizzBuzzText += 'Buzz';

    const outputText = fizzBuzzText ? `${number} ${fizzBuzzText}` : `${number}`;
    console.log(outputText);
  }


  // for (i = 1; i <= 100; i++) {
  //   if (i % 3 === 0 && i % 5 === 0) console.log(`${i} FizzBuzz`);
  //   else if (i % 3 === 0) {
  //     console.log(`${i} Fizz`);
  //   } else if (i % 5 === 0) {
  //     console.log(`${i} Buzz`);
  //   } else {
  //     console.log(i);
  //   }
  // }
}

module.exports = {
  length,
  reverse,
  findIndex,
  split,
  sum,
  average,
  size,
  minMax,
  concat,
  seq,
  filter,
  omitSeq,
  fizzBuzz
}
