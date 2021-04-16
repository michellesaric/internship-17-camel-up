import { useEffect, useState } from "react";
import { getRandomNumber, getRandomRoll } from "../../utils/random";
import { useDice } from "../../providers/Dice/hooks";
import { usePlayers } from "../../providers/Players/hooks";
import { useCamels } from "../../providers/Camels/hooks";
import { Players } from "../../constants/consts";
import LegBet from "./LegBet";
import RaceBet from "./RaceBet";
import "./decisionBoard.css";

const DecisionBoard = () => {
  const [decision, setDecision] = useState(null);
  const [dice, setDice] = useDice();
  const [players, setPlayers] = usePlayers();
  const [camels, setCamels] = useCamels();

  const changeCurrentPlayer = () => {
    setPlayers((prev) => {
      return {
        ...prev,
        [Players.playerOne]: {
          ...prev.playerOne,
          current: !prev.playerOne.current,
          tempscore: prev.playerOne.tempscore + prev.playerOne.current,
        },
        [Players.playerTwo]: {
          ...prev.playerTwo,
          current: !prev.playerTwo.current,
          tempscore: prev.playerTwo.tempscore + prev.playerTwo.current,
        },
      };
    });
  };

  const moveCamels = (dieToRoll, rollSteps) => {
    const stackPosition = camels[dieToRoll].stackPosition;
    const position = camels[dieToRoll].position;
    const newPosition = rollSteps + position;

    let newStackPosition = -1;
    for (let camel of Object.values(camels)) {
      if (camel.position === newPosition) {
        newStackPosition = Math.max(newStackPosition, camel.stackPosition);
      }
    }

    const camelsCopy = JSON.parse(JSON.stringify(camels));

    for (let camel of Object.keys(camels)) {
      if (
        camels[camel].position === position &&
        camels[camel].stackPosition >= stackPosition
      ) {
        camelsCopy[camel].position = newPosition;
        camelsCopy[camel].stackPosition += newStackPosition + 1 - stackPosition;
      }
    }

    setCamels(camelsCopy);
  };

  const roll = () => {
    setDecision(null);

    const unrolledDice = Object.keys(dice).filter((die) => dice[die] === "x");
    const dieToRoll = unrolledDice[getRandomNumber(0, unrolledDice.length - 1)];
    const rollSteps = getRandomRoll();
    setDice((prev) => {
      return { ...prev, [dieToRoll]: rollSteps };
    });

    changeCurrentPlayer();
    moveCamels(dieToRoll, rollSteps);
  };

  return (
    <div className="decision-board">
      <div className="button-container">
        <button 
            onClick={roll} 
            className="button-container-button"
        >
          Roll
        </button>
        <button
          onClick={() => setDecision("legBet")}
          className="button-container-button"
        >
          Leg bet
        </button>
        <button
          onClick={() => setDecision("raceBet")}
          className="button-container-button"
        >
          Race bet
        </button>
      </div>
      <div className="decision-container">
        {decision === "legBet" && <LegBet setDecision={setDecision} />}
        {decision === "raceBet" && <RaceBet setDecision={setDecision} />}
      </div>
    </div>
  );
};

export default DecisionBoard;
