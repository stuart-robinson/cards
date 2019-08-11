import React from "react";

const CardPlaceholder = () => (
  <img src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/back.png`} />
);

const Card = ({ suit, card }) => {
  return (
    <img
      src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/${suit}_${card}.png`}
    />
  );
};

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck,
      dealt: []
    };
  }

  handleNew = () => {
    const { deck } = this.state;
    deck.build();
    this.setState({ deck: deck, dealt: [] });
  };

  handleDeal = () => {
    const { deck, dealt } = this.state;
    dealt.unshift(deck.deal());
    this.setState({ deck: deck, dealt: dealt });
  };

  handleShuffle = () => {
    console.log("shuffle not implemented");
  };
  render() {
    const { deck, dealt } = this.state;

    return (
      <>
        <div>
          <CardPlaceholder />
          {dealt.map(c => {
            return <Card suit={c.suit} card={c.card} />;
          })}
          <p>Cards left: {deck.cards.length}</p>
        </div>
        <div>
          <button onClick={this.handleNew}>New Deck</button>
          <button onClick={this.handleShuffle}>Shuffle</button>
          <button onClick={this.handleDeal}>Deal</button>
        </div>
      </>
    );
  }
}

export default View;
