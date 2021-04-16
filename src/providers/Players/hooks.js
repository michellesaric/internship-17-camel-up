import { useContext } from "react";
import { PlayersContext } from ".";

const usePlayersContext = () => {
  return useContext(PlayersContext);
};

export const usePlayers = () => {
  const {
    state: { players },
    setPlayers,
  } = usePlayersContext();

  return [players, setPlayers];
};
