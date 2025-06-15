export default function Die(props) {
    return (
        <button 
            className={"die " + (props.isHeld ? "held" : "")}
            onClick={props.holdFunction}
        >
            {props.value}
        </button>
    )
}