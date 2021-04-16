import "./board.css";
import camel from '../../assets/camel.png';

const Camel = ({color}) => {
    return <img className={`camel camel-${color}`} src={camel} alt="camel"/>
}

export default Camel;