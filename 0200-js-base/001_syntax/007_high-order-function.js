
/**
 *  7.1 JSのfilter メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして filter メソッドは、使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 */

function filter(array, cb) {
  const result = [];

  for (const [i, value] of array.entries()) {
    if (cb(value, i)) {
      result.push(value);
    }
  }

  return result;
}

/**
 *  7.2 JSの find メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして find メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 */

function find(array, cb) {
  for (const [i, value] of array.entries()) {
    if (cb(value, i)) {
      return value;
    }
  }
}

/**
 *  7.3 JSの findIndex メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして findIndex メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 */

function findIndex(array, cb) {
  for (const [i, value] of array.entries()) {
    if (cb(value, i)) {
      return i;
    }
  }
  return -1;
}

/**
 *  7.4 JSの some メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして some メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 */

function some(array, cb) {
  for (const [i, value] of array.entries()) {
    if (cb(value, i)) {
      return true;
    }
  }
  return false;
}

/**
 *  7.5 JSの every メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして every メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 */

function every(array, cb) {
  for (const [i, value] of array.entries()) {
    if (!cb(value, i)) {
      return false;
    }
  }
  return true;
}

/**
 *  7.6 JSの map メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして every メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 *
 */

function map(array, cb) {
  const mappedArray = [];
  for (const [i, value] of array.entries()) {
    mappedArray.push(cb(value, i));
  }
  return mappedArray;
}

/**
 *  7.7 JSの forEach メソッドを自分で実装してみましょう。
 *      第一引数に配列、第二引数にコールバックが渡されるとして forEach メソッドは使わずに実装してください、
 *      また、コールバック関数の第一引数には、各要素とそのインデックスが渡されるように実装してください。
 *
 */

function forEach(array, cb) {
  for (const [i, value] of array.entries()) {
    cb(value, i);
    // cb(value, i, array);
  }
}

module.exports = {
  filter,
  find,
  findIndex,
  some,
  every,
  map,
  forEach
}
