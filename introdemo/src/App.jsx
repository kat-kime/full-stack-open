import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
     {props.text}
    </div>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        use the voting system to provide feedback
      </div>
    )
  }

  return (
    <div>
      <table>
        <tr>
          <td>good</td>
          <td><StatisticsLine text={props.good} />
          </td>
        </tr>
        <tr>
          <td>bad</td>
          <td><StatisticsLine text={props.bad} /></td>
        </tr>
        <tr>
          <td>neutral</td>
          <td><StatisticsLine text={props.neutral} /></td>
        </tr>
        <tr>
          <td>average</td>
          <td><StatisticsLine text={props.score/props.total} /></td>
        </tr>
        <tr>
          <td>total</td>
          <td><StatisticsLine text={props.total} /></td>
        </tr>
        <tr>
          <td>percent good</td>
          <td><StatisticsLine text={((props.good / props.total) * 100) + "%"} /></td>
        </tr>
      </table>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleVoteGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setScore(score + 1)
    setTotal(updatedGood + bad + neutral)
    console.log("updated total: " + total)
  }

  const handleVoteBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setScore(score - 1)
    setTotal(updatedBad + good + neutral)
    console.log("updated total: " + total)
  }

  const handleVoteNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    console.log("updated total: " + total)
  }

  return (
    <div>
      <h1>University of Helinski Unicafe</h1>
      <h2>Submit Your Feedback</h2>
      <Button onClick={handleVoteGood} text={"good"} />
      <Button onClick={handleVoteBad} text={"bad"} />
      <Button onClick={handleVoteNeutral} text={"neutral"} />

      <h2>Results</h2>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        score={score}
      />
    </div>
  )
}

export default App