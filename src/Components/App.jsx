import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

    function generateAllNewDice() {
        const newDice = [];
    
        for (let i = 0; i < 10; i++) {
            const randNum = Math.floor((Math.random() * 6) + 1);
            newDice.push(
                { 
                    id: nanoid(),
                    value: randNum,
                    isHeld: true
                } 
            );
        }

        return newDice
    }

    function handleRollDice() {
        setDice( () => {
            return generateAllNewDice();
        });
    }

    const randomDice = dice.map( die => {
        return <Die key={die.id} value={die.value} isHeld={die.isHeld} />
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