import React, { useState } from "react";
import ReactDOM from "react-dom";

enum CardSuit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

enum CardRank {
  Ace = "ace",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "jack",
  Queen = "queen",
  King = "king",
}

type Card = {
  suit: CardSuit;
  rank: CardRank;
};

type Deck = Array<Card>;
type Hand = Array<Card>;
type GameState = { deck: Deck; hand: Hand };

//UI Elements
const CardBackImage = () => (
  <img src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/back.png`} />
);

const CardImage = ({ suit, rank }: Card) => {
  const card = rank === CardRank.Ace ? 1 : rank;
  return (
    <img
      src={
        process.env.PUBLIC_URL +
        `/SVG-cards/png/1x/${suit.slice(0, -1)}_${card}.png`
      }
    />
  );
};

//Setup
const newDeck = (): Deck =>
  Object.values(CardSuit)
    .map((suit) =>
      Object.values(CardRank).map((rank) => ({
        suit,
        rank,
      }))
    )
    .reduce((a, v) => [...a, ...v]);

const initialState: GameState = {
  deck: newDeck(),
  hand: [],
};

//Actions
const dealCardToHand = (state: GameState): GameState => {
  const [card, ...remaining] = state.deck;
  return { ...state, deck: remaining, hand: [...state.hand, card] };
};

//Game Component
const Game = (): JSX.Element => {
  const [state, setState] = useState(initialState);
  return (
    <>
      <div>
        <p>There are {state.deck.length} cards left in deck</p>
        <button onClick={(): void => setState(dealCardToHand)}>Click Me</button>
      </div>
      <div>
        <p>Dealt Cards</p>
        {state.hand.map(CardImage)}
      </div>
    </>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
