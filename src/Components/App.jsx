import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

    function generateAllNewDice() {
        const newDice = [];
        const numOfDice = 10;
    
        for (let i = 0; i < numOfDice; i++) {
            const randNum = Math.floor((Math.random() * 6) + 1);
            newDice.push(
                { 
                    id: nanoid(),
                    value: randNum,
                    isHeld: false
                } 
            );
        }

        return newDice
    }

    function handleRollDice() {
        setDice( prevDice => {
            return (
                prevDice.map( die => {
                    return die.isHeld === false ? {...die, value: Math.floor((Math.random() * 6) + 1)} : {...die}
                })
            )
        })
    }

    function hold(id) {
        setDice( prevDice => {
            return (
                prevDice.map( die => {
                    return die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
                })
            )
        })
    }

    const randomDice = dice.map( die => {
        return <Die 
                    key={die.id}
                    value={die.value}
                    isHeld={die.isHeld}
                    holdFunction={() => { hold(die.id) }}
               />
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