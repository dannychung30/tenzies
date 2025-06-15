export default function Die(props) {
    return (
        <button 
            className={"die " + (props.isHeld ? "held" : "")}
            onClick={props.holdFunction}
            aria-pressed={props.isHeld}
            aria-label={`Die is ${props.isHeld ? "held" : "not held"} with a value of ${props.value}`}
        >
            {props.value}
        </button>
    )
}