import {DEALER, getScore, PLAYER, scoreboardText} from "./index";

describe('#getScore', () => {
  it('returns the total score', () => {
    const nineteen = [{suit: "club", value: "9", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    const blackJack = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    expect(getScore(nineteen)).toEqual(19);
    expect(getScore(blackJack)).toEqual(21);
  })

  it('does not include the dealers hole card in the score, while face down in the score', () => {
    const dealerHand = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "5", isUp: false}]
    expect(getScore(dealerHand)).toEqual(11);
  })

  it('handles wild aces', () => {
    const aces = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "5", isUp: true},
      {suit: "club", value: "ace", isUp: true}, {suit: "club", value: "4", isUp: true}]
    expect(getScore(aces)).toEqual(21);
  })
})

describe('#scoreboardText', () => {
  it('it handles player winning', () => {
    const dealerHand = [{suit: "club", value: "9", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    const playerHand = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    expect(scoreboardText(getScore(dealerHand), getScore(playerHand), DEALER)).toEqual("player wins");
  });
  it('it handles drawer', () => {
    const dealerHand = [{suit: "diamond", value: "ace", isUp: true}, {suit: "diamond", value: "jack", isUp: true}]
    const playerHand = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    expect(scoreboardText(getScore(dealerHand), getScore(playerHand), DEALER)).toEqual("draw");
  });
  it('it handles player bust', () => {
    const dealerHand = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    const playerHand = [{suit: "diamond", value: "10", isUp: true}, {
      suit: "diamond",
      value: "10",
      isUp: true
    }, {suit: "diamond", value: "2", isUp: true}]
    expect(scoreboardText(getScore(dealerHand), getScore(playerHand), PLAYER)).toEqual("Bust! dealer wins");
  });
  it('it handles dealer bust', () => {
    const playerHand = [{suit: "club", value: "ace", isUp: true}, {suit: "club", value: "jack", isUp: true}]
    const dealerHand = [{suit: "diamond", value: "10", isUp: true}, {
      suit: "diamond",
      value: "10",
      isUp: true
    }, {suit: "diamond", value: "2", isUp: true}]
    expect(scoreboardText(getScore(dealerHand), getScore(playerHand), DEALER)).toEqual("dealer Bust!");
  });
  it('it handles dealer winning', () => {
    const playerHand = [{suit: "club", value: "6", isUp: true}, {suit: "club", value: "7", isUp: true}]
    const dealerHand = [{suit: "diamond", value: "10", isUp: true}, {
      suit: "diamond",
      value: "8",
      isUp: true
    }, {suit: "diamond", value: "2", isUp: true}]
    expect(scoreboardText(getScore(dealerHand), getScore(playerHand), DEALER)).toEqual("dealer wins");
  });
})