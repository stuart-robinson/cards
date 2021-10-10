import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const suits = ["club", "heart", "diamond", "spade"];

const cardValues = [
  "ace",
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
  "king",
];

const CardPlaceholder = () => (
  <img src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/back.png`} />
);

const Card = ({ suit, value }) => {
  const card = value === "ace" ? 1 : value;
  return (
    <img
      src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/${suit}_${card}.png`}
    />
  );
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    let cards = [];
    for (let s = 0; s < suits.length; s++) {
      for (let c = 0; c < cardValues.length; c++) {
        cards.push({ suit: suits[s], value: cardValues[c] });
      }
    }

    this.state = {
      deck: cards,
      dealt: [],
    };
  }

  handleDeal = () => {
    const { deck, dealt } = this.state;
    dealt.push(deck.pop());
    this.setState({ deck: deck, dealt: dealt });
  };

  handleShuffle = () => {
    console.log("shuffle not implemented");
  };

  render() {
    const { deck, dealt } = this.state;
    const isDeckEmpty = deck.length === 0;
    return (
      <>
        <div>
          <CardPlaceholder />
          {dealt.map((c) => {
            return <Card suit={c.suit} value={c.value} />;
          })}
          <p>Cards left: {deck.length}</p>
        </div>
        <div>
          <button onClick={this.handleShuffle} disabled={isDeckEmpty}>
            Shuffle
          </button>
          <button onClick={this.handleDeal} disabled={isDeckEmpty}>
            Deal
          </button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
