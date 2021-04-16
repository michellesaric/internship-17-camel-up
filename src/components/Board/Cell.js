import { useCamels } from "../../providers/Camels/hooks";
import Camel from "./Camel";
import './board.css';

const Cell = ({cellNumber}) => {
    const [camels, setCamels] = useCamels();

    let camelsCopy = []
    for (let camel in camels) {
        camelsCopy.push([camel, camels[camel]]);
    }

    camelsCopy.sort((a, b) => a[1].stackPosition - b[1].stackPosition);
    camelsCopy = camelsCopy.filter(camel => camel[1].position === cellNumber);

    return (
    <div className="cell">
        {camelsCopy.map(camel => <Camel key={camel} color={camel[0]}/>)}
    </div>
    )
}

export default Cell;