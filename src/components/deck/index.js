import React from "react";

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
  "king"
];
export const PLAYER = "player"
export const DEALER = "dealer"
export const BLACKJACK = 21

export const getScore = (cards) => {
  let aces = 0
  let score = 0
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].isUp) {
      if (cards[i].value === "ace") {
        aces++
        score += 11
      } else if (cards[i].value === "jack" || cards[i].value === "queen" || cards[i].value === "king") {
        score += 10
      } else {
        score += parseInt(cards[i].value)
      }
    }
  }
  for (let i = 0; i < aces; i++) {
    if (score > BLACKJACK) {
      score -= 10
      aces -= 1
    }
  }
  return score
}

export const scoreboardText = (dealerScore, playerScore, whoseTurn) => {
  if (whoseTurn === PLAYER && playerScore > BLACKJACK) {
    return `Bust! ${DEALER} wins`
  } else if (whoseTurn === DEALER && dealerScore > BLACKJACK) {
    return `${DEALER} Bust!`
  } else if (whoseTurn === DEALER && dealerScore === playerScore) {
    return "draw"
  } else if (whoseTurn === DEALER && playerScore > dealerScore) {
    return `${PLAYER} wins`
  } else if (whoseTurn === DEALER && playerScore < dealerScore) {
    return `${DEALER} wins`
  } else {
    return `${whoseTurn} to play`
  }
}

const Score = ({dealer, player, whoseTurn}) => {
  return (
    <div>
      <h1>{scoreboardText(dealer, player, whoseTurn)}</h1>
      <p> Dealer score {dealer} </p>
      <p> Player score {player} </p>
    </div>
  )
}


const CardPlaceholder = () => (
  <img src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/back.png`}/>
);

const Card = ({suit, value, isUp}) => {
  const card = value === "ace" ? 1 : value;
  if (isUp) {
    return (
      <img src={process.env.PUBLIC_URL + `/SVG-cards/png/1x/${suit}_${card}.png`}/>
    )
  } else {
    return (
      <CardPlaceholder></CardPlaceholder>
    );
  }
};

class Deck extends React.Component {
  constructor(props) {
    super(props);
    let cards = [];
    for (let s = 0; s < suits.length; s++) {
      for (let c = 0; c < cardValues.length; c++) {
        cards.push({suit: suits[s], value: cardValues[c], isUp: false});
      }
    }
    this.state = {
      deck: cards,
      playerHand: [],
      dealerHand: [],
      whoseTurn: PLAYER, // playerHand || dealerHand
    };
  }

  handleDeal = () => {
    const {playerHand} = this.state;
    this.handlePlayerInitialCard()
    this.handleDealerInitialCard()
  };
  handleStand = () => {
    const {dealerHand} = this.state;
    this.setState({whoseTurn: "dealer"});
    this.flipDealerHoleCard()
    while (getScore(dealerHand) < 17) {
      this.dealDealerCard()
    }
  };
  dealPlayerCard = () => {
    const {deck, playerHand} = this.state;
    const cardOne = deck.pop()
    cardOne.isUp = true;
    playerHand.push(cardOne);
    this.setState({player: playerHand});
  }
  dealDealerCard = () => {
    const {deck, dealerHand} = this.state;
    const cardOne = deck.pop()
    cardOne.isUp = true;
    dealerHand.push(cardOne);
    this.setState({dealerHand: dealerHand});
  }
  flipDealerHoleCard = () => {
    const {dealerHand} = this.state;
    dealerHand.map(card => card.isUp = true)
    this.setState({dealerHand: dealerHand});
  }
  handlePlayerInitialCard = () => {
    this.dealPlayerCard()
    this.dealPlayerCard()
  };
  handleDealerInitialCard = () => {
    const {deck, dealerHand} = this.state;
    dealerHand.push(deck.pop());
    this.dealDealerCard()
    this.setState({dealerHand: dealerHand});
  };
  handleShuffle = () => {

    const {deck} = this.state;
    let copy = [], n = deck.length, i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      copy.push(deck.splice(i, 1)[0]);
    }
    this.setState({deck: copy});

  };

  render() {
    const {deck, playerHand, dealerHand, whoseTurn} = this.state;
    const isDeckEmpty = deck.length === 0;
    return (
      <div>
        <div>
          <CardPlaceholder/>
          <Score dealer={getScore(dealerHand)} player={getScore(playerHand)}
                 whoseTurn={whoseTurn}/>
          <h1> dealer cards </h1>
          {dealerHand.map(c => {
            return <Card suit={c.suit} value={c.value} isUp={c.isUp} key={`${c.suit} ${c.value}`}/>;
          })}
          <h1> player cards </h1>
          {playerHand.map(c => {
            return <Card suit={c.suit} value={c.value} isUp={c.isUp} key={`${c.suit} ${c.value}`}/>;
          })}
          <p>Cards left: {deck.length}</p>
        </div>
        <div>
          <button onClick={this.handleShuffle} disabled={isDeckEmpty}>
            Shuffle
          </button>
          <button onClick={this.handleDeal} disabled={isDeckEmpty || playerHand.length > 1}>
            Deal
          </button>
          <button onClick={this.handleStand}>
            Stand
          </button>
          <button onClick={this.dealPlayerCard}>
            Hit
          </button>
        </div>
      </div>
    );
  }

}

export default Deck;
