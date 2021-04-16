import { useDice } from "../../providers/Dice/hooks";
import Die from "./Die";
import "./dice.css";

const Dice = () => {
    const [dice, setDice] = useDice();
    return (
        <div className="dice">
            {Object.keys(dice).map(die => <Die key={die} color={die} value={dice[die]} />)}
        </div>

    )
}

export default Dice;