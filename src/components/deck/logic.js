const suits = ["club", "heart", "diamond", "spade"];

const cardValues = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king"
];

class Deck {
  constructor() {
    this.cards = [];
  }
  build() {
    let cards = [];
    for (var s = 0; s < suits.length; s++) {
      for (var c = 0; c < cardValues.length; c++) {
        cards.push({ suit: suits[s], card: cardValues[c] });
      }
    }
    this.cards = cards;
  }
  deal() {
    return this.cards.pop();
  }
  peek() {
    return this.cards.slice(-1)[0];
  }
}

export default Deck;
