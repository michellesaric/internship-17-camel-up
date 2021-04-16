import { createContext, useState } from "react";

import { initializeRaceBets } from "../../utils/defaults";

const initialState = {
    raceBets: initializeRaceBets(),
  };

export const RaceBetsContext = createContext({
  state: { ...initialState },
  setState: () => {},
});

const RaceBetsProvider = ({ children }) => {
  const [raceBets, setRaceBets] = useState(initialState.raceBets);

  const value = {
    state: {raceBets},
    setRaceBets,
  };

  return (
    <RaceBetsContext.Provider value={value}>{children}</RaceBetsContext.Provider>
  );
};

export default RaceBetsProvider;