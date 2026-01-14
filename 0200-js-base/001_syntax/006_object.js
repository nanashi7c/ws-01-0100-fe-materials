/**
 *  6.1 下記データを持ったオブジェクトを返す関数を実装してください。
 *
 *  name: 'Bob'
 *  age: 32
 *  gender: 'male'
 *
 */

function getPersonObject() {
  const obj = {
    name: 'Bob',
    age: 32,
    gender: 'male',
  }
  return obj;
}

/**
 *  6.2 与えられたオブジェクトのkeyを一つずつ表示する関数を実装してください。
 *
function keys(obj) {
  for (const key in obj) {
    console.log(key);
  }
  // Object.keys(obj).forEach(it => console.log(it));
}
 *
 */

function keys(obj) {
  for (const key in obj) {
    console.log(key);
  }
  // Object.keys(obj).forEach(it => console.log(it));
}

/**
 *  6.3 与えられたオブジェクトのvalueを一つずつ表示する関数を実装してください。
 *
 * input:
 *  name: 'Bob'
 *  age: 32
 *  gender: 'male'
 * output:
 *  Bob
 *  32
 *  male
 *
 */

function values(obj) {
  for (const key in obj) {
    console.log(obj[key]);
  }
}

/**
 *  6.4 下記オブジェクトが引数で与えられる場合に、
 *      オブジェクトの年齢を+1した値で書き換えそれを返却する関数を実装してください
 *
 *  {
 *    name: [任意の文字列]
 *    age: [任意の整数]
 *    gender: [任意の文字列]
 *  }
 *
 */

function doubleAge(person) {
  person.age += 1;
  return person;
}

/**
 *  6.5 ランダムなオブジェクトが引数で与えられる場合に、
 *      引数に変更を加えずに、processedというキーにtrueを追加したオブジェクトを返却する関数を実装してください。
 *
 *  example:
 *    { a: 1, b: 2 } => { a: 1, b: 2, processed: true }
 *    {} => { processed: true }
 *    { alpha: true, beta: true } => { alpha: true, beta: true, processed: true }
 *
 */

function setProcessedFlag(obj) {
  return {
    ...obj,
    processed: true,
  };
}

/**
 *  6.6 下記引数で渡される配列にランダムな1 ~ 10の数字を割り振り、オブジェクトとして返す
 *      関数を実装してください
 *
 *   input:
 *    [
 *      'Bob',
 *      'Mary',
 *      'Ann',
 *      'Mike'
 *    ]
 *
 *   output:
 *     {
 *       Bob: [Random Number],
 *       Mary: [Random Number],
 *       Ann: [Random Number],
 *       Mike: [Random Number]
 *     }
 *
 */


function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function assignNumber(persons) {
  const assignedNumber = {};
  for (const person of persons) {
    // assignedNumber[person] = Math.floor(Math.random() * 10) + 1;
    assignedNumber[person] = getRandomNumber();
  }
  return assignedNumber;
}


/**
 *  6.7 配列に重複した要素があれば、true、そうでなければfalseを返す関数を実装してください
 *      但し、オブジェクトを使って実装すること
 *
 *  example:
 *    [1, 2, 3], 1 => false
 *    [1, 2, 2, 3], 5 => true
 *    [] => false
 *
 */

function isDuplicate(array) {
  const seen = {};

  for (const value of array) {
    if (seen[value]) {
      return true;
    }
    seen[value] = true;
  }
  return false;
}

module.exports = {
  getPersonObject,
  keys,
  values,
  doubleAge,
  setProcessedFlag,
  assignNumber,
  isDuplicate
}
