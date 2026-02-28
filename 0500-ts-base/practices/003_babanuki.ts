/* 下記に指定した仕様のばば抜きアプリを作成して下さい。
 *
 *  参加プレイヤーは4名: Alice, Bob, Charlie, David
 *
 *  1. ジョーカーを含む52+1枚のトランプを用意し、プレイヤーに2枚ずつ配る
 *  2. プレイヤーは手札から同じ数字のカードを捨てることができる
 *  3. 手札のが配られた場合、全部のプレイヤーが手札から全てのペアのカードを捨てる。
 *  4. プレイヤーはAlice => Bob => Charlie => David の順番でカードを引く
 *  5. プレイヤーはカードを引いた後に、手札にペアがあるか確認し、あれば捨てる
 *
 *  [勝利条件]
 *  1. 手札がなくなったプレイヤーが勝利。最後の1人が残るまで続ける。
 *
 *  [敗北条件]
 *  1. 自分以外のプレイヤーが全て抜けた場合。
 *  2. ジョーカーのみの手札を持っている場合。その人を負けとして即時にゲームを終了する。
 *
 *  [実行例]
 *  - ./docs/003_babanuki_example.md を参照してください。
 *
 *  [出力内容]
 *  - 実行例を参考に、ゲームの進行状況を Logger クラスを使って出力してください。
 *  - 出力はテストコードでも検証するので例にならって出力を行ってください。
 *
 *  [そのほか]
 *  - ロジックの実装の際は、IPlayer と IGameMaster のインターフェースを実装して仕様を満たす Player, GameMaster クラスを実装して下さい。
 *  - Card クラスなどすでに実装済みの部分もあるので、lib/babanuki.ts のコードも活用しながら実装してください。
 *  - GameMaster クラスの run メソッドが実行されるとゲームが実行できるようにしてください。
 */

import {
  Card,
  getRandomIndex,
  IPlayer,
  IGameMaster,
  ILogger,
  Logger,
} from "../lib/babanuki";

export class Player implements IPlayer {
  // TODO
  // hands, name, done, onlyJoker, discard, assign, drawメンバの実装
  hands: Card[] = [];
  name: string;
  done: boolean = false;
  onlyJoker: boolean = false;
  constructor(name: string) {
    this.name = name;
  }

  discard(): Card[] {
    //数字が同じカードを捨てる処理
    //捨てたペアの最初のカード群を返却する
    const pairBases: Card[] = []; //ペアの基準になる1枚のカードの配列。返却用。
    const pairBasesIndex: number[] = []; //ペアの基準になる1枚のインデックスの配列。
    const pairCounterpartsIndex: number[] = []; //ペアの基準にならない方のインデックスの配列。
    // const usedIndex:number[] = []; //
    for (const [i, card] of this.hands.entries()) {
      if (!pairCounterpartsIndex.includes(this.hands[i].value)) {
        //i番目が含まれていないなら。usedはindexの配列にすれば十分かもしれないが、一旦保留。
        for (let j = i + 1; j < this.hands.length; j++) {
          if (card.value === this.hands[j].value) {
            //cardの方もthis.hands[i].valueって書いた方が分かり易そうだけど一旦保留。
            pairBases.push(this.hands[i]);
            used.push(this.hands[j]);
          }
        }
      }
    }
    this.hands.pop(pairsIndex);

    return pairBases;
  }

  assign(card: Card): void {
    //引数に渡されたカードを自分の手札に加える処理
    this.hands.push(card);
  }
  draw(player: IPlayer): Card {
    //引数のプレイヤーインスタンスの手札からランダムに1枚カードを引く処理
    const drawIndex = getRandomIndex(player.hands.length);
    //引いたカードを返却する
    return player.hands[drawIndex];
  }
}

export class GameMaster implements IGameMaster {
  logger: ILogger;
  players: IPlayer[];

  constructor(logger: ILogger, players: IPlayer[]) {
    this.logger = logger;
    this.players = players;
  }

  // TODO
  // cards, rank, turnメンバの実装
  cards: Card[] = [];
  rank: IPlayer[] = [];
  turn: number = 1; //初期値0のが良い可能性あり

  run(): void {
    // Todo
    // loggerでゲームの進行を出力するアルゴリズム

    //53/nずつカードを配る

    this.logger.firstDiscard();

    //最初のdiscard
    while (true) {
      if (this.cards.length === 0) break;
      //discardする前の手札の出力
      this.logger.currentState(
        this.turn,
        this.players[this.turn % this.players.length],
      );

      //if(ペアになるカードがある場合)カードを捨てる処理と、捨てるカードのペアの1枚目の出力

      //カードを捨てた後の手札の出力
    }

    //ゲームスタート
    this.logger.start();

    //終了条件は誰かが勝つまで勝った時にifでreturnする。実装するまでは一旦数ターン分回す。
    while (this.turn < 6) {
      //======を出力するか迷う。→一旦保留。
      //この部分はメソッドに纏められそう。
      //draw前の手札の出力
      this.logger.currentState(
        this.turn,
        this.players[this.turn % this.players.length],
      );

      //draw処理と、そのassin処理と、誰が誰から何のカードをドローしたのか出力。ドローカードはランダム。

      //if(ペアになるカードがある場合)カードを捨てる処理と、捨てるカードのペアの1枚目の出力

      //カードを捨てた後の手札の出力

      //if(ペアを捨てることで自分の手札が0枚になったら)Doneの出力

      //if(カードを引かれた側の手札が0枚になったら)Doneの出力

      //if(抜けた人数が[全体の人数-1]になったら)gameEndと負けた人と順位を出力し、returnでrun()を抜ける。

      //if(手札が1枚で且つジョーカーのみ)gameEndと負けた人と順位を出力し、returnでrun()を抜ける。

      this.turn++;
    }
  }
}

// [編集不要] ターミナルでの実行用の関数。
export function run() {
  const gameMaster = new GameMaster(new Logger(), [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
    new Player("David"),
  ]);
  gameMaster.run();
}
