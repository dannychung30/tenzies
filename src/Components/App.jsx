import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());
    const gameWon = dice.every( die => {
        return (die.value === dice[0].value && die.isHeld)
    });
    
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
                <section className="game-intro">
                    <h1>Tenzies</h1>
                    <p>Roll until all dice are the same number. Click each die to hold it at its current number between rolls.</p>
                </section>
                <div className="dice">
                    {randomDice}
                </div>
                <button className="roll-dice" onClick={handleRollDice}>
                    {gameWon ? "New Game" : "Roll"}
                </button>
            </div>
        </main>
    )
}