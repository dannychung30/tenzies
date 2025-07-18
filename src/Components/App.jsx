import Die from "./Die"
import RollCounter from "./RollCounter"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => { return generateAllNewDice() });
    const [rollCount, setRollCount] = useState(0);
    const gameBtnRef = useRef(null);
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
        incrementCounter();

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

    function incrementCounter() {
        setRollCount( prevRollCount => {
            return prevRollCount + 1
        });
    }

    function handleNewGame() {
        setDice( () => {
            return generateAllNewDice();
        });

        setRollCount(0);
    }

    useEffect( () => {
        if (gameWon) {
            gameBtnRef.current.focus();
        }
    }, [gameWon]);

    const randomDice = dice.map( die => {
        return <Die 
                    key={die.id}
                    value={die.value}
                    isHeld={die.isHeld}
                    holdFunction={() => { hold(die.id) }}
               />
    });

    return (
        <main>
            {
                gameWon ? 
                    <Confetti 
                        width={window.innerWidth} 
                        height={window.innerHeight} 
                        recycle={true}
                    /> 
                : null
            }
            <div className="game">
                <section className="game-intro">
                    <h1>Tenzi Game</h1>
                    <p>Roll until all dice are the same number. Click each die to hold it at its current number between rolls.</p>
                </section>
                <div className="extras">
                    <RollCounter count={rollCount} />
                </div>
                <div className="dice">
                    {randomDice}
                </div>
                <button ref={gameBtnRef} className="roll-dice" onClick={gameWon ? handleNewGame : handleRollDice}>
                    {gameWon ? "New Game" : "Roll"}
                </button>
            </div>
        </main>
    )
}