import { createContext, useState } from "react";

import { initializeDice } from "../../utils/defaults";

const initialState = {
    dice: initializeDice(),
  };

export const DiceContext = createContext({
  state: { ...initialState },
  setState: () => {},
});

const DiceProvider = ({ children }) => {
  const [dice, setDice] = useState(initialState.dice);

  const value = {
    state: {dice},
    setDice,
  };

  return (
    <DiceContext.Provider value={value}>{children}</DiceContext.Provider>
  );
};

export default DiceProvider;