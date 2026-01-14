/**
 *  リストの実装
 *
 *  オブジェクト指向やJavaScriptの組み込みAPIの成り立ちを理解するためにも
 *  データ構造をクラスで実装してみましょう。
 *  実際に使われるリストは要素の型の縛りはありませんが、今回のリストは要素を数値に限定します。
 *
 *  TODO: のついているメソッドを実際に実装してください
 *
 */

class List {
  data = [];
  /**
   * Listクラスのインスタンスを作成する。
   * @constructor
   * @this {List}
   * @param {Number} array リストのデータ
   */
  constructor(array) {
    this.data = array;
  }

  /** リストの長さを返す
   *
   * @return {Number}
   */
  get size() {
    // TODO:
    return this.data.length;
  }

  /** 引数で渡された添字のデータを取得する
   *
   * @param {Number} index
   * @return {Number}
   */
  index(index) {
    // TODO:
    return this.data[index];
  }

  /** リストの 要素を追加する
   *
   * @param {Number} item
   * @return {Number}
   */
  push(item) {
    // TODO:
    this.data[this.data.length] = item;
    return this.data.length;
  }

  /** 与えられた引数により、リストの 要素を削除する
   *
   * @param {Number} targetIndex
   * @return {Number}
   */
  remove(targetIndex) {
    // TODO:
    if (targetIndex < 0 || targetIndex >= this.data.length) {
      return undefined;
    }

    const removed = this.data[targetIndex];

    for (let i = targetIndex; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.data.length -= 1;
    return removed;
  }

  /** リストの 末尾の要素を取得する
   *
   * @param {Number} targetIndex
   * @return {Number}
   */
  pop() {
    // TODO:
    if (this.data.length === 0) return undefined

    const last = this.data[this.data.length - 1];
    this.data.length -= 1;
    return last;
  }

  /** リストの 先頭の要素を取得する
   *
   * @return {Number}
   */
  shift() {
    // TODO:
    if (this.data.length === 0) return undefined;

    const first = this.data[0];

    for (let i = 0; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.data.length -= 1;
    return first;
  }

  /** リストの の中から引数に合致する値を取得する
   *
   * XXX: find関数は使わずにfor文、while文を活用して実装しましょう
   *
   * @param {Number} target
   * @return {Number | undefined}
   */
  find(target) {
    // TODO:
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === target) return this.data[i];
    }
    return undefined;
  }

  /** リストの の中から引数に合致する値のindexを取得する。見つからない場合は-1を返す
   *
   * XXX: findIndex関数は使わずにfor文、while文を活用して実装しましょう
   *
   * @param {Number} target
   * @return {Number}
   */
  findIndex(target) {
    // TODO:
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === target) return i;
    }
    return -1;
  }

  /** リストの の中から要素に合致する数を取り除く
   *
   * 実際のデータ(this.data)に変更を加えることなく、新しい配列を返す形で実装しましょう。
   *
   * XXX: filter関数は使わずにfor文、while文を活用して実装しましょう
   *
   * @param {Number} target
   * @return {List}
   */
  filter(target) {
    // TODO:
    const filteredData = [];

    for (const value of this.data) {
      if (value !== target) filteredData[filteredData.length] = value;
    }

    return new List(filteredData);
  }
}

/**
 *  スタックの実装
 *
 *  スタックの実装を理解して、要素の追加、取り出しのメソッドをそれぞれ実装しましょう。
 *  https://qiita.com/drken/items/6a95b57d2e374a3d3292
 *
 *  TODO: のついているメソッドを実際に実装してください
 *
 */

class Stack {
  data = [];

  /** スタックの長さを返す
   *
   * @return {Number}
   */
  get size() {
    return this.data.length;
  }

  /** スタックに要素を追加する
   *
   * @param {Number} item
   */
  push(item) {
    // TODO:
    this.data[this.data.length] = item;
    // return this.data.length;
  }

  /** スタックから要素を取得する
   *
   * @param {Number} item
   * @return {Number}
   */
  pop() {
    // TODO:
    if (this.data.length === 0) return undefined;

    const last = this.data[this.data.length - 1];
    this.data.length -= 1;
    return last;
  }

  /** スタックの末尾の要素を参照する
   *
   * @param {Number} item
   * @return {Number}
   */
  peek() {
    // TODO:
    if (this.data.length === 0) return undefined;

    return this.data[this.data.length - 1];
  }
}

/**
 *  キューの実装
 *
 *  キューの実装を理解して、要素の追加、取り出しのメソッドをそれぞれ実装しましょう。
 *  https://qiita.com/drken/items/6a95b57d2e374a3d3292
 *
 *  TODO: のついているメソッドを実際に実装してください
 *
 */

class Queue {
  data = [];

  /** キューの長さを返す
   *
   * @return {Number}
   */
  get size() {
    return this.data.length;
  }

  /** キューに要素を追加する
   *
   * @param {Number} item
   * @return {Number}
   */
  enqueue(item) {
    // TODO:
    this.data[this.data.length] = item;
    // return this.data.length;
  }

  /** キューから要素を取得する
   *
   * @return {Number}
   */
  dequeue() {
    // TODO:
    if (this.data.length === 0) return undefined;

    const first = this.data[0];

    for (let i = 0; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.data.length -= 1;
    return first;
  }

  /** キューの要素を参照する
   *
   * @return {Number}
   */
  peek() {
    // TODO:
    if (this.data.length === 0) return undefined;
    return this.data[0];
  }
}

module.exports = {
  List,
  Stack,
  Queue
};
