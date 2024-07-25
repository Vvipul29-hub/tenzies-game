import React from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(() => {
    console.log("Inside 1st useEffect")
    const allDiceHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => firstValue === die.value)
    allDiceHeld && allSameValue ? setTenzies(true) : tenzies
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => (
      die.id === id ? {
        ...die,
        isHeld: !die.isHeld
      } : die
    )))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function onClickRollButton() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => (
        die.isHeld ? die : generateNewDie()
      )))
      setRolls(rolls + 1)
    } else {
      setDice(allNewDice())
      setRolls(0)
      setTenzies(false)
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="description">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={onClickRollButton}>{tenzies ? "New Game" : "Roll"}</button>
      <div className="stats-div">
        <p>No of Rolls: {rolls}</p>
        <p>Time taken: </p>
        <p>Your Best: rolls</p>
      </div>
    </main>
  )
}