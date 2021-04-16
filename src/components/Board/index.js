import Cell from "./Cell";
import "./board.css";

const Board = () => {
    
    return (
        <div className="board">
            {Array(16).fill(0).map((e, i) => <Cell key={i} cellNumber={i}/>)}
        </div>    
        )

}

export default Board;