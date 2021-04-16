import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Players } from "../../constants/consts";
import { usePlayers } from "../../providers/Players/hooks";
import "./menu.css";

const Menu = () => {
  const [players, setPlayers] = usePlayers();
  const [gameStart, setGameStart] = useState();

  if (gameStart) {
    return <Redirect to="/camel-up" />;
  }

  const handlePlayerOneNameChange = (event) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [Players.playerOne]: {
          ...prev[Players.playerOne],
          name: event.target.value,
        },
      };
    });
  };

  const handlePlayerTwoNameChange = (event) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [Players.playerTwo]: {
          ...prev[Players.playerTwo],
          name: event.target.value,
        },
      };
    });
  };

  const handleSubmit = () => {
    setGameStart(true);
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <h3 className="menu__container-title">Camel Up</h3>
        <form className="menu__container-form" onSubmit={handleSubmit}>
          <label htmlFor="firstPlayer">Unesi ime prvog igrača</label>
          <input
            type="text"
            name="firstPlayer"
            placeholder="Player one..."
            value={players.playerOne.name}
            onChange={handlePlayerOneNameChange}
            required
          ></input>
          <label htmlFor="secondPlayer">
            Unesi ime drugog igrača
          </label>
          <input
            type="text"
            name="secondPlayer"
            placeholder="Player two..."
            value={players.playerTwo.name}
            onChange={handlePlayerTwoNameChange}
            required
          ></input>
          <button type="submit" className="submit-button">
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
