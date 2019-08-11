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
    this.setState({ deck: deck });
  };

  handleDeal = () => {
    const { deck } = this.state;
    deck.deal();
    this.setState({ deck: deck });
  };

  handleShuffle = () => {
    console.log("shuffle not implemented");
  };
  render() {
    const { deck } = this.state;
    const isDeckEmpty = deck.cards.length === 0;
    return (
      <>
        <div>
          <CardPlaceholder />
          {deck.dealt.map(c => {
            return <Card suit={c.suit} card={c.card} />;
          })}
          <p>Cards left: {deck.cards.length}</p>
        </div>
        <div>
          <button onClick={this.handleNew}>New Deck</button>
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

export default View;
