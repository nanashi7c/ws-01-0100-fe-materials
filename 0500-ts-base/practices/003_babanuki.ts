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
  hands: Card[] = [];
  name: string;
  done: boolean = false;
  onlyJoker: boolean = false;
  constructor(name: string) {
    this.name = name;
  }

  discard(): Card[] {
    const pairBases: Card[] = [];
    const pairBasesIndexs: number[] = [];
    const pairCounterpartsIndex: number[] = [];
    for (const [i, card] of this.hands.entries()) {
      if (!pairCounterpartsIndex.includes(i)) {
        for (let j = i + 1; j < this.hands.length; j++) {
          if (card.equal(this.hands[j])) {
            pairBases.push(this.hands[i]);
            pairBasesIndexs.push(i);
            pairCounterpartsIndex.push(j);
            break;
          }
        }
      }
    }

    this.hands = this.hands.filter((card, index) => {
      return (
        !pairBasesIndexs.includes(index) &&
        !pairCounterpartsIndex.includes(index)
      );
    });

    return pairBases;
  }

  assign(card: Card): void {
    this.hands.push(card);
  }
  draw(player: IPlayer): Card {
    const drawIndex = getRandomIndex(player.hands.length);
    const drawnCard = player.hands[drawIndex];
    player.hands.splice(drawIndex, 1);
    return drawnCard;
  }
}

export class GameMaster implements IGameMaster {
  logger: ILogger;
  players: IPlayer[];

  constructor(logger: ILogger, players: IPlayer[]) {
    this.logger = logger;
    this.players = players;
    this.activePlayers = players;
  }

  cards: Card[] = [];
  rank: IPlayer[] = [];
  turn: number = 1;
  activePlayers: IPlayer[] = [];

  private getNextPlayerIndex(currentPlayerIndex: number): number {
    return currentPlayerIndex > this.activePlayers.length - 2
      ? 0
      : currentPlayerIndex + 1;
  }

  private markDoneIfEmptyHand(player: Player): void {
    if (player.hands.length === 0) {
      this.rank.push(player);
      this.logger.done(player);
      player.done = true;
    }
  }

  run(): void {
    const deck: Card[] = Card.prepare();

    while (deck.length > 0) {
      for (const player of this.players) {
        for (let i = 0; i < 2; i++) {
          const drawnCardIndex: number = getRandomIndex(deck.length);
          player.assign(deck[drawnCardIndex]);
          deck.splice(drawnCardIndex, 1);
          if (deck.length === 0) break;
        }
        if (deck.length === 0) break;
      }
    }

    this.logger.firstDiscard();

    for (const player of this.players) {
      this.logger.currentState(this.turn, player);
      const discarded: Card[] = player.discard();

      if (discarded.length !== 0) {
        this.logger.discard(player, discarded);
      }
      this.turn++;
    }

    this.logger.start();

    this.activePlayers = [...this.players];
    let currentPlayerIndex: number = 0;
    let nextPlayerIndex: number;

    while (this.activePlayers.length > 1) {
      const currentPlayer: Player = this.activePlayers[currentPlayerIndex];
      nextPlayerIndex = this.getNextPlayerIndex(currentPlayerIndex);

      this.logger.currentState(this.turn, currentPlayer);

      const drawnCard: Card = currentPlayer.draw(
        this.activePlayers[nextPlayerIndex],
      );
      currentPlayer.assign(drawnCard);
      this.logger.draw(
        this.activePlayers[currentPlayerIndex],
        this.activePlayers[nextPlayerIndex],
        drawnCard,
      );

      const discardedCards: Card[] = currentPlayer.discard();

      if (discardedCards.length !== 0) {
        this.logger.discard(currentPlayer, discardedCards);
      }

      this.markDoneIfEmptyHand(this.activePlayers[currentPlayerIndex]);

      this.markDoneIfEmptyHand(
        this.activePlayers[this.getNextPlayerIndex(currentPlayerIndex)],
      );

      if (this.activePlayers[currentPlayerIndex].hands.length === 0) {
        currentPlayerIndex -= 1;
      }

      this.activePlayers = this.activePlayers.filter((player) => {
        return !player.done;
      });

      for (const player of this.activePlayers) {
        if (player.hands.length === 1) {
          if (player.hands[0].isJoker) {
            player.onlyJoker = true;
          }
        }
      }

      if (this.rank.length === this.players.length - 1) {
        this.logger.end(this.activePlayers[0], this.rank);
        return;
      }
      for (const player of this.activePlayers) {
        if (player.onlyJoker) {
          this.logger.end(player, this.rank);
          return;
        }
      }

      currentPlayerIndex = this.getNextPlayerIndex(currentPlayerIndex);
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
