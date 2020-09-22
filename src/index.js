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

const scoreMapping = {
  "ace": (points) => (points + 11 <= 21) ? 11 : 1,
  "2": () => 2,
  "3": () =>3,
  "4": () =>4,
  "5": () =>5,
  "6": () =>6,
  "7": () =>7,
  "8": () =>8,
  "9": () =>9,
  "10": () =>10,
  "jack": () =>10,
  "queen": () =>10,
  "king": () => 10
};

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
      status: "playing",
      deck: cards,
      dealtToPlayer: [],
      dealtToDealer: [],
      playerScore: 0,
      dealerScore: 0
    };
  }

  shouldEndGame = () => {
    //conditions for winning
    const { dealtToDealer, dealtToPlayer } = this.state;
    let currentDealerScore = 0;
    let currentPlayerScore = 0;

    if(this.hasBlackjack(dealtToPlayer)) {
      this.setState({status: "youre-winner"});
    }

  
    for(let i=0; i < dealtToDealer.length; i++) {
      currentDealerScore += scoreMapping[dealtToDealer[i].value](dealtToDealer[i].value)
    }

    for(let i=0; i < dealtToPlayer.length; i++) {
      currentPlayerScore += scoreMapping[dealtToPlayer[i].value](dealtToPlayer[i].value)
    }

    console.log({currentDealerScore, currentPlayerScore});

    if(currentDealerScore > 21) {
      this.setState({status: "youre-winner"});
    }

    if(currentPlayerScore > 21) {
      this.setState({status: "game-over"});
    }

  }


  hasBlackjack = (dealt) => {
    return ((dealt[0] === "ace" || dealt[0] === "10") && (dealt[1] === "ace" || dealt[1] === "10"))
  }

  handleDeal = () => {
    const { deck, dealtToPlayer, dealtToDealer } = this.state;
    dealtToPlayer.push(deck.pop());
    dealtToPlayer.push(deck.pop());
    dealtToDealer.push(deck.pop());
    dealtToDealer.push(deck.pop());
    this.setState({ deck: deck, dealtToPlayer: dealtToPlayer });
    this.shouldEndGame();
  };

  handleShuffle = () => {
    const { deck } = this.state;
    const shuffledArray = shuffle(deck);

    this.setState(shuffledArray);
  };

  dealToPlayer = () => {
    const { deck, dealtToPlayer } = this.state;
    dealtToPlayer.push(deck.pop());

    this.setState({ deck, dealtToPlayer });
    this.shouldEndGame();
  }

  playerStand = () => {
    console.log('Stands then pass the hand');
    this.shouldEndGame();
  }

  playerHit = () => {
    this.dealToPlayer();
    this.shouldEndGame();
  }

  render() {
    const { deck, dealtToPlayer, dealtToDealer, status } = this.state;
    const isDeckEmpty = deck.length === 0;
    console.log({status, dealtToPlayer});
  
    return (
      <>
        {this.state.status === 'game-over' && <div className="mask">
            GAME OVER
        </div>}

        {this.state.status === 'youre-winner' && <div className="mask-win">
            WIN
        </div>}
        <div>
          <CardPlaceholder />
          <div>
            <h3>Player</h3>
            {dealtToPlayer.map((c, i) => {
              return <Card suit={c.suit} key={i} value={c.value} />;
            })}
            <div>
              <button onClick={this.playerStand}>Stand</button>
              <button onClick={this.playerHit}>Hit</button>
            </div>
           
          </div>
          <hr />
          <div>
            <h3>Dealer</h3>
            {dealtToDealer.map((c, i) => {
              if(i === dealtToDealer.length -1) return <CardPlaceholder />
              return <Card suit={c.suit} key={i} value={c.value} />;
            })}
          </div>
          
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


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

ReactDOM.render(<Game />, document.getElementById("root"));
