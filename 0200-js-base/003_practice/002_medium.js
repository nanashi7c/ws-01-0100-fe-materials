/**
 *  文字列のローテート
 *
 *  文字列を入力された数だけローテートさせる関数を実装してください
 *
 *  example:
 *    'library',  1 => 'ylibrar'
 *    'library',  3 => 'arylibr'
 *    'library', -1 => 'ibraryl'
 *
 */
function rotate(str, num) {
  let shift = num % str.length; //余剰な回転を削る
  if (shift < 0) shift += str.length; //負数を正に変換

  const rotatedHead = str.slice(str.length - shift);
  const rotatedTail = str.slice(0, str.length - shift);

  return rotatedHead + rotatedTail;

}

/**
 *  母音を除いた文字列
 *
 *  与えられた文字列から母音を除いた関数を実装してください
 *
 *  example:
 *    'library' => 'lbrry'
 *    'apple' => 'ppl'
 *    'banana' => 'bnn'
 *
 */
function removeVowels(str) {
  // ---answer3---
  return str.replace(/[aeiou]/g, '');


  // ---answer2---
  // const vowels = ['a', 'e', 'i', 'o', 'u'];

  // let consonantString = '';

  // for (const char of str) {
  //   if (!vowels.includes(char)) {
  //     consonantString += char;
  //   }
  // }

  // return consonantString;

  //---asnwer1---
  // const vowels = ['a', 'e', 'i', 'o', 'u'];

  // const consonantChar = [...str].filter(
  //   (char) => !vowels.includes(char)
  // );

  // return consonantChar.join('');

}

/**
 *  文字列のカウント
 *
 *  ある文字列の中に特定の文字列がいくつ含まれるかカウントする関数を実装してください。
 *
 *  example:
 *    'abcdabeabc',  'abc' => 2
 *    'abc',  'abc' => 1
 *    'hogehoage',  'hoge' => 1
 *
 */
function countStr(s1, s2) {
  let count = 0;
  let searchIndex = 0;

  while (true) {
    const foundIndex = s1.indexOf(s2, searchIndex);
    if (foundIndex === -1) break;

    count++;
    searchIndex += foundIndex + s2.length;
  }

  return count;

  // ---anwer1---
  // return s1.split(s2).length - 1;
}

/**
 *  引数に与えられたアルファベットの文字列が回文であること
 *  を確認するメソッドを実装してください
 *
 *  example:
 *      work => false
 *      anna => true
 *      madam => true
 *      level => true
 *
 */

function isPalindrome(str) {
  // ---answer2---
  return str === str.split('').reverse().join('');

  // ---answer1---
  // let reversedStr = '';
  // for (i = str.length - 1; i >= 0; i--) {
  //   reversedStr += str[i];
  // }

  // return str === reversedStr;
}

/**
 *  素数
 *
 *  入力された数字が素数であるか確認する関数を実装してください
 *
 *  example:
 *    1 => False
 *    2 => True
 *    3 => True
 *    6 => False
 *    9 => False
 *    11 => True
 *
 */
function isPrime(num) {
  if (num === 1) return false;

  for (let devisor = 2; devisor < num; devisor++) {
    if (num % devisor === 0) {
      return false;
    }
  }
  return true;
}

/**
 *  配列の4と次の数字を抜いた合計
 *
 *  与えらた配列の合計を返す関数を実装してください。
 *  ただし、配列の中に4がある場合は、4とその次の数字を合計に含めないでください。
 *
 *  example:
 *    [1, 2, 3, 4] => 6
 *    [1, 2, 3, 4, 5] => 6
 *    [1, 4, 3, 4, 5] => 1
 *    [4, 3, 3, 5] => 8
 *    [4, 3, 3, 4] => 3
 *    [4] => 0
 *
 */
function sumWithout4andNext(array) {
  // ---answer2---
  let sum = 0;
  let shouldSkip = false;

  for (const value of array) {
    if (shouldSkip) {
      shouldSkip = (value === 4)
      continue;
    }

    if (value === 4) {
      shouldSkip = true;
      continue;
    }

    sum += value;
  }
  return sum;


  // ---answer1---
  // let sum = 0;

  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] === 4) {
  //     i++; // 次の要素をスキップ
  //     while (array[i] === 4) {
  //       i++;
  //     }
  //     continue;
  //   }

  //   sum += array[i];
  // }

  // return sum;
}

module.exports = {
  rotate,
  removeVowels,
  countStr,
  isPalindrome,
  isPrime,
  sumWithout4andNext
}
