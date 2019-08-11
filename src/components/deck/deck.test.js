import Deck from "./logic";

describe("modelling a deck of cards", () => {
  const deck = new Deck();

  test("build", () => {
    deck.build();
    expect(deck.cards.length).toBe(52);
  });

  test("peek", () => {
    expect(deck.peek()).toEqual({ card: "king", suit: "spade" });
    expect(deck.cards.length).toBe(52);
  });

  test("deal", () => {
    expect(deck.deal()).toEqual({ card: "king", suit: "spade" });
    expect(deck.cards.length).toBe(51);
  });
});
