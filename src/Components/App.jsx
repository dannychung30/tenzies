import Die from "./Die"
import { useState } from "react"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

    function generateAllNewDice() {
        const newDice = [];
    
        for (let i = 0; i < 10; i++) {
            newDice.push(Math.floor((Math.random() * 6) + 1));
        }

        return newDice
    }

    function handleRollDice() {
        setDice( () => {
            return generateAllNewDice();
        });
    }

    const randomDice = dice.map( number => {
        return <Die value={number} />
    })

    return (
        <main>
            <div className="game">
                <div className="dice">
                    {randomDice}
                </div>

                <button className="roll-dice" onClick={handleRollDice}>Roll</button>
            </div>
        </main>
    )
}