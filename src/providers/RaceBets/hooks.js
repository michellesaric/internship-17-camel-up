import { useContext } from "react";
import { RaceBetsContext } from ".";

const useRaceBetsContext = () => {
  return useContext(RaceBetsContext);
};

export const useRaceBets = () => {
  const {
    state: { raceBets },
    setRaceBets,
  } = useRaceBetsContext();

  return [raceBets, setRaceBets];
};