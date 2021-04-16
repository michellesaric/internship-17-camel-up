import { useEffect } from "react";
import { Redirect } from "react-router";
import { Players } from "../../constants/consts";
import { useCamels } from "../../providers/Camels/hooks";
import { useDice } from "../../providers/Dice/hooks";
import { useLegBets } from "../../providers/LegBets/hooks";
import { usePlayers } from "../../providers/Players/hooks";
import { useRaceBets } from "../../providers/RaceBets/hooks";
import { initializeDice, initializeLegBets } from "../../utils/defaults";
import Board from "../Board";
import DecisionBoard from "../DecisionBoard";
import LegBet from "../DecisionBoard/LegBet";
import Dice from "../Dice";
import ScoreBoard from "../ScoreBoard";
import './game.css';

const Game = () => {
  const [players, setPlayers] = usePlayers();
  const [camels, setCamels] = useCamels();
  const [legBets, setLegBets] = useLegBets();
  const [raceBets, setRaceBets] = useRaceBets();
  const [dice, setDice] = useDice();

  if (!players.playerOne.name) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    let roundOver = true;
    for (let die in dice) {
      if (dice[die] === "x") {
        roundOver = false;
      }
    }
    const gameOver = Object.values(camels).some(
      (camel) => camel.position >= 15
    );
    if (roundOver || gameOver) {
      setDice(initializeDice());

      const camelsAfterLeg = Object.keys(camels)
        .sort(
          (a, b) =>
            camels[a].position * 6 +
            camels[a].stackPosition -
            (camels[b].position * 6 + camels[b].stackPosition)
        )
        .reverse();

      const legScore = {
        [Players.playerOne]: 0,
        [Players.playerTwo]: 0,
      };

      for (let camelIndex in camelsAfterLeg) {
        let camelScore;

        if (Number(camelIndex) === 0) camelScore = 5;
        else if (Number(camelIndex) === 1) camelScore = 1;
        else camelScore = -1;

        if (legBets[camelsAfterLeg[camelIndex]] === Players.playerOne) {
          legScore[Players.playerOne] += camelScore;
        }
        if (legBets[camelsAfterLeg[camelIndex]] === Players.playerTwo) {
          legScore[Players.playerTwo] += camelScore;
        }
      }

      alert(`
                PLAYER POINTS:
                PLAYER  ROLL    BET
                one     ${players.playerOne.tempscore}  ${legScore.playerOne}
                two     ${players.playerTwo.tempscore}  ${legScore.playerTwo}
            `);

      setPlayers((prev) => ({
        ...prev,
        [Players.playerOne]: {
          ...prev.playerOne,
          score:
            prev.playerOne.score +
            legScore.playerOne +
            prev.playerOne.tempscore,
          tempscore: 0,
        },
        [Players.playerTwo]: {
          ...prev.playerTwo,
          score:
            prev.playerTwo.score +
            legScore.playerTwo +
            prev.playerTwo.tempscore,
          tempscore: 0,
        },
      }));

      setLegBets(initializeLegBets());
    }
  }, [camels]);

  useEffect(() => {
    if (Object.values(camels).some((camel) => camel.position >= 15)) {
      const betScore = {
        [Players.playerOne]: 0,
        [Players.playerTwo]: 0,
      };

      const camelsAfterRace = Object.keys(camels)
        .sort(
          (a, b) =>
            camels[a].position * 6 +
            camels[a].stackPosition -
            camels[b].position * 6 +
            camels[b].stackPosition
        )
        .reverse();

      for (let camelIndex in camelsAfterRace) {
        if (Number(camelIndex) === 0) {
          if (raceBets[camelsAfterRace[camelIndex]][0]) {
            betScore[raceBets[camelsAfterRace[camelIndex]][0]] = 8;
          }
          if (raceBets[camelsAfterRace[camelIndex]][1]) {
            betScore[raceBets[camelsAfterRace[camelIndex]][1]] = 5;
          }
        } else {
          for (let player of raceBets[camelsAfterRace[camelIndex]]) {
            betScore[player] = -1;
          }
        }
      }

      alert(`
            PLAYER POINTS:
            PLAYER  RACE BET POINTS
            one     ${betScore.playerOne}
            two     ${betScore.playerTwo}
        `);

      setPlayers((prev) => ({
        ...prev,
        [Players.playerOne]: {
          ...prev.playerOne,
          score: prev.playerOne.score + betScore.playerOne,
        },
        [Players.playerTwo]: {
          ...prev.playerTwo,
          score: prev.playerTwo.score + betScore.playerTwo,
        },
      }));
    }
  }, [camels]);

  return (
    <div className="game">
      <div className="game__container">
        <ScoreBoard />
        <Board />
        <DecisionBoard />
        <Dice />
      </div>
    </div>
  );
};

export default Game;
