import "./style.css";

const CamelChoice = ({camelBets, getUserBet}) => {
    return (
        <div className="camelChoice">
            {Object.keys(camelBets).map(camelBet =>
                <button 
                onClick={() => getUserBet(camelBet)}
                key={camelBet}
                disabled={camelBets[camelBet]}
                className={`camelButton camelButton-${
                    camelBets[camelBet] ? "grey" : camelBet
                }`}>
                </button>
                )}
        </div>
    )
}

export default CamelChoice;