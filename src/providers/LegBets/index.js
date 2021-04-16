import { createContext, useState } from "react";

import { initializeLegBets } from "../../utils/defaults";

const initialState = {
    legBets: initializeLegBets(),
  };

export const LegBetsContext = createContext({
  state: { ...initialState },
  setState: () => {},
});

const LegBetsProvider = ({ children }) => {
  const [legBets, setLegBets] = useState(initialState.legBets);

  const value = {
    state: {legBets},
    setLegBets,
  };

  return (
    <LegBetsContext.Provider value={value}>{children}</LegBetsContext.Provider>
  );
};

export default LegBetsProvider;