export default function Die(props) {
    console.log(props);
    return (
        <button className={"die " + (props.isHeld ? "held" : "")}>
            {props.value}
        </button>
    )
}