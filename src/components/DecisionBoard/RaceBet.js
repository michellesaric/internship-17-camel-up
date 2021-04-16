import { Players } from "../../constants/consts";
import { usePlayers } from "../../providers/Players/hooks";
import { useRaceBets } from "../../providers/RaceBets/hooks";
import { initializeLegBets } from "../../utils/defaults";
import CamelChoice from "../CamelChoice/CamelChoice";


const RaceBet = ({setDecision}) => {
    const [raceBets, setRaceBets] = useRaceBets();
    const [players, setPlayers] = usePlayers(); 
    const currentPlayer = players.playerOne.current ? Players.playerOne : Players.playerTwo;

    const getUserBet = (camel) => {
        setRaceBets(prev => ({
            ...prev,
            [camel]: [...prev[camel], currentPlayer]
        }))

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
    };

    return (
        <div>
            <p>Race bet!</p>
            {!Object.values(raceBets).some(camel => camel.some(player => player === currentPlayer)) ?
                <CamelChoice camelBets={initializeLegBets()} getUserBet={getUserBet} />
                :
                "Bet already placed"
            }
        </div>
    )

}

export default RaceBet;