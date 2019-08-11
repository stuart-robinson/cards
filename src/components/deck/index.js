import React from "react";
import Logic from "./logic";
import View from "./view";

const Deck = () => {
  let deck = new Logic();
  return <View deck={deck} />;
};

export default Deck;
