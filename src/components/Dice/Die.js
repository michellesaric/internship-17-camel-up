import "./style.css";

const Die = ({color, value}) => {
    return (
        <div className={`die die-${color}`}>{value}</div>
    )
}

export default Die;