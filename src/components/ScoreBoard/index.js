import { usePlayers } from "../../providers/Players/hooks";
import './scoreBoard.css';

const ScoreBoard = () => {
    const [players, setPlayers] = usePlayers();
    return (
        <section className = "score-board">
            <div className = "score-board-container">
                <span>Name: {players.playerOne.name}</span>
                <span>Score: {players.playerOne.score}</span>
                <span>Current: {players.playerOne.current ? "yes" : "no"}</span>
            </div>
            <div className = "score-board-container">
                <span>Name: {players.playerTwo.name}</span>
                <span>Score: {players.playerTwo.score}</span>
                <span>Current: {players.playerTwo.current ? "yes" : "no"}</span>
            </div>
        </section>
    )
}

export default ScoreBoard;