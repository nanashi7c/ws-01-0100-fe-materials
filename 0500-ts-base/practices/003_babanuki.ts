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
      if (!pairCounterpartsIndex.includes(i)) {
        //ペアの基準にならない方のインデックスの配列にi番目が含まれていないなら。
        for (let j = i + 1; j < this.hands.length; j++) {
          if (card.equal(this.hands[j])) {
            pairBases.push(this.hands[i]); //this.hands[i]→cardの方が良さそう。後で修正予定。
            // pairBasesIndex.push(j);//多分ここ間違ってる。
            pairBasesIndex.push(i);
            pairCounterpartsIndex.push(j);
            break; //ペアになるカードが1枚見つかった時点でi番目のペア探しを終了。
          }
        }
      }
    }
    //handsのpairBasesIndex番目かpairCounterpartsIndex番目のカードを全て削除
    //
    this.hands = this.hands.filter((card, index) => {
      //手札をペアの基準になる1枚とペアの基準にならない方どちらにも含まれないカード全てを返す。
      return (
        // pairBasesIndex.includes(index) || pairCounterpartsIndex.includes(index)//多分間違ってる。
        !pairBasesIndex.includes(index) &&
        !pairCounterpartsIndex.includes(index)
      );
    });

    return pairBases; //ペアの基準になる1枚のカード全て
  }

  assign(card: Card): void {
    //引数に渡されたカードを自分の手札に加える処理
    this.hands.push(card);
  }
  draw(player: IPlayer): Card {
    //引数のプレイヤーインスタンスの手札からランダムに1枚カードを引く処理
    const drawIndex = getRandomIndex(player.hands.length); //手札からランダムに1枚選ぶ
    const drawedCard = player.hands[drawIndex]; //返却用に引いたカードをdrawedCardに一時退避。
    player.hands.splice(drawIndex, 1); //引かれたカードを手札から削除
    //引いたカードを返却する
    return drawedCard;
    // return player.hands[drawIndex];//ランダムに選んだカードを削除した後に、手札からdrawIndex番目のカードを参照してしまっているので、元配列のdrawIndex+1番目を返しているように見えるため、修正。
  }
}

export class GameMaster implements IGameMaster {
  logger: ILogger;
  players: IPlayer[];

  constructor(logger: ILogger, players: IPlayer[]) {
    this.logger = logger;
    this.players = players;
    this.activePlayers = players; //抜けていないプレイヤー
  }

  // TODO
  // cards, rank, turnメンバの実装
  cards: Card[] = [];
  rank: IPlayer[] = [];
  turn: number = 1; //初期値0のが良い可能性あり。一旦保留
  activePlayers: IPlayer[] = []; //constとletどっち？

  run(): void {
    // Todo
    // loggerでゲームの進行を出力するアルゴリズム

    //53/nずつカードを配る
    const deck: Card[] = Card.prepare(); //deckを作る
    // console.log(deck); //デバッグ用

    //deckを2枚ずつ配る
    //deckにカードが残っている場合
    while (deck.length > 0) {
      for (const player of this.players) {
        for (let i = 0; i < 2; i++) {
          //2枚ずつ配る
          const drawnCardIndex: number = getRandomIndex(deck.length); //deckからランダムに1枚選んだカードのインデックス
          player.assign(deck[drawnCardIndex]); //deckから選んだカードをプレイヤーに配る
          deck.splice(drawnCardIndex, 1); //deckから引かれたカードを削除
          if (deck.length === 0) break; //deckが切れたら配るのを止める
        }
        if (deck.length === 0) break; //deckが切れたら配るのを止める
      }
    }

    //最初のdiscard
    this.logger.firstDiscard(); //firstDiscardの表示

    //プレイヤー全員分のdiscard処理
    for (const player of this.players) {
      //プレイヤーのstateの表示
      this.logger.currentState(this.turn, player);
      const discarded: Card[] = player.discard();
      //if(ペアになるカードがある場合)カードを捨てる処理と、捨てるカードのペアの1枚目の出力

      //カードを捨てた後の手札の出力
      if (discarded.length !== 0) {
        //捨てるカードがあるならば
        this.logger.discard(player, discarded); //カードを捨てる処理。捨てたカード一覧の表示
      }
      this.turn++;
    }

    //ゲームスタートの表示
    this.logger.start();

    //終了条件は誰かが勝つまで勝った時にifでreturnする。実装するまでは一旦数ターン分回す。

    this.activePlayers = [...this.players]; //残っているプレイヤーを宣言。
    let currentPlayerIndex: number = 0; //ドローするプレイヤーのインデックスの宣言。
    let nextPlayerIndex: number = 0; //ドローされるプレイヤーのインデックスの宣言。

    //一旦9ターン目まで。後でtrueに修正。
    // while (this.turn < 50) {
    while (this.activePlayers.length > 1) {
      //while(true){どちらかに変更。
      //======を出力するか迷う。→一旦保留。
      //この部分はメソッドに纏められそう。

      const currentPlayer: Player = this.activePlayers[currentPlayerIndex];
      nextPlayerIndex =
        currentPlayerIndex > this.activePlayers.length - 2
          ? 0
          : currentPlayerIndex + 1; //ドローされる残プレイヤーのインデックス。

      //draw前の手札の出力
      this.logger.currentState(this.turn, currentPlayer);

      //draw処理と、そのassin処理と、誰が誰から何のカードをドローしたのか出力。ドローカードはランダム。
      const drawedCard: Card = currentPlayer.draw(
        this.activePlayers[
          currentPlayerIndex > this.activePlayers.length - 2
            ? 0
            : currentPlayerIndex + 1
        ],
      ); //次の番の人からカードを引く。
      currentPlayer.assign(drawedCard); //引いたカードを自分の手札に加える。
      this.logger.draw(
        //複数回出てきてる部分を変数化する。
        this.activePlayers[currentPlayerIndex],
        this.activePlayers[
          currentPlayerIndex > this.activePlayers.length - 2
            ? 0
            : currentPlayerIndex + 1
        ], //nextPlayerIndexは2回出てくるので変数化する。
        drawedCard,
      );

      //discardするカードがあれば、discard処理をし、discardのログを出す。
      const discardedCard: Card[] = currentPlayer.discard(); //既に定義済みのdiscardedと役割が一部被っているため共通化する必要がありそう。

      //if(ペアになるカードがある場合)カードを捨てる処理と、捨てるカードのペアの1枚目の出力
      if (discardedCard.length !== 0) {
        //捨てたカードがある場合。カードを捨てた後の手札の出力。
        this.logger.discard(currentPlayer, discardedCard);
      }

      //if(ペアを捨てることで自分の手札が0枚になったら)Doneの出力。
      //カードを引いたプレイヤーが抜けるときの処理
      if (this.activePlayers[currentPlayerIndex].hands.length === 0) {
        //プレイヤーが抜ける条件。手札がなくなったら。
        this.rank.push(this.activePlayers[currentPlayerIndex]); //抜けた人を順位配列に格納。
        this.logger.done(this.activePlayers[currentPlayerIndex]); //抜けた人を出力
        this.activePlayers[currentPlayerIndex].done = true; //doneフラグを立てる。
        // this.activePlayers.splice(currentPlayerIndex, 1); //残ってるプレイヤーからcurrentPlayerIndex番目のプレイヤーを削除。フラグで判断するようにして、カードが引かれた側の抜ける処理も終わった後に行う。

        // console.log(
        //   "引いた側が抜けた",
        //   this.activePlayers,
        //   this.activePlayers[currentPlayerIndex],
        // ); //デバッグ用
      }

      //if(カードを引かれた側の手札が0枚になったら)Doneの出力。
      //カードを引かれたプレイヤーが抜けるときの処理。nextPlayerIndexの共通化。
      if (
        this.activePlayers[
          currentPlayerIndex > this.activePlayers.length - 2
            ? 0
            : currentPlayerIndex + 1
        ].hands.length === 0
      ) {
        //nextPlayerIndexなので後で共通化する。
        this.rank.push(
          this.activePlayers[
            currentPlayerIndex > this.activePlayers.length - 2
              ? 0
              : currentPlayerIndex + 1
          ],
        ); //抜けた人を順位配列に格納。
        this.logger.done(
          this.activePlayers[
            currentPlayerIndex > this.activePlayers.length - 2
              ? 0
              : currentPlayerIndex + 1
          ],
        ); //抜けた人を出力
        this.activePlayers[
          currentPlayerIndex > this.activePlayers.length - 2
            ? 0
            : currentPlayerIndex + 1
        ].done = true; //doneフラグを立てる。

        // console.log(
        //   "引かれた側が抜けた",
        //   this.activePlayers,
        //   this.activePlayers[currentPlayerIndex],
        // ); //デバッグ用
      }

      // console.log(this.activePlayers, "-------"); //デバッグ用
      this.activePlayers = this.activePlayers.filter((player) => {
        return !player.done; //残ってるプレイヤーからdoneフラグが立ってるプレイヤーを削除。
      });
      // console.log(this.activePlayers); //デバッグ用

      //Jokerしか手札に無い人がいればフラグを立てる。
      for (const player of this.activePlayers) {
        if (player.hands.length === 1) {
          if (player.hands[0].isJoker) {
            player.onlyJoker = true;
          }
        }
      }

      //endのrank出力時にplayerのdone,onlyJokerも出力されてしまっているが、編集不要のインターフェイスに基づいているので、このままにする。
      //if(抜けた人数が[全体の人数-1]になったら)gameEndと負けた人と順位を出力し、returnでrun()を抜ける。
      //ゲームの終了処理
      if (this.rank.length === this.players.length - 1) {
        //ゲームの終了条件。抜けたプレイヤーが参加者-1になるか、手札にジョーカーしかない人がいる場合。
        this.logger.end(this.activePlayers[0], this.rank);
        return; //run()の終了
      }
      for (const player of this.activePlayers) {
        if (player.onlyJoker) {
          this.logger.end(player, this.rank);
          return; //run()の終了
        } //onlyjokerを更新する処理が必要。
      }

      currentPlayerIndex =
        currentPlayerIndex > this.activePlayers.length - 2
          ? 0
          : currentPlayerIndex + 1; //現在のindexの位置のインクリメント
      this.turn++; //ターンのインクリメント処理。
      // }//不要なforループの閉じ括弧
    } //ゲーム継続のwhileループの閉じ括弧
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
