import { useContext } from "react";
import { LegBetsContext } from ".";

const useLegBetsContext = () => {
  return useContext(LegBetsContext);
};

export const useLegBets = () => {
  const {
    state: { legBets },
    setLegBets,
  } = useLegBetsContext();

  return [legBets, setLegBets];
};