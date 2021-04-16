import { useLegBets } from "../../providers/LegBets/hooks";
import { usePlayers } from "../../providers/Players/hooks";
import {Players} from "../../constants/consts";
import CamelChoice from "../CamelChoice/CamelChoice";

const LegBet = ({setDecision}) => {
    const [legBets, setLegBet] = useLegBets();
    const [players, setPlayers] = usePlayers();


    const getUserBet = (camel) => {
        const currentPlayer = players.playerOne.current ? Players.playerOne : Players.playerTwo;
        setLegBet(prev => ({ ...prev, [camel]: currentPlayer }));

        setPlayers(prev => {
            return {
                ...prev,
                [Players.playerOne]: {
                    ...prev.playerOne,
                    current: !prev.playerOne.current,
                },
                [Players.playerTwo]: {
                    ...prev.playerTwo,
                    current: !prev.playerTwo.current,
                }
            }
        })

        setDecision(null);
    }


    return (
        <div>
            <p>Leg bet!</p>
            <CamelChoice camelBets={legBets} getUserBet={getUserBet} />
        </div>
    )
}

export default LegBet;