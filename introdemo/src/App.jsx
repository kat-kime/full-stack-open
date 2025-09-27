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
        <tbody>
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
        </tbody>
      </table>
    </div>
  )

}

const RandomAnecdote = (props) => {
  const [anecdoteIndex, setAnecdoteIndex] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })

  const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
  ]

  const handleSelectAnecdote = () => {
    console.log("anecdotes length:", anecdotes.length)
    const updatedIndex = Math.floor(Math.random() * anecdotes.length)
    console.log("updated index:", updatedIndex)
    setAnecdoteIndex(updatedIndex) 
  }

  const handleAnecdoteVote = () => {
    const copy = { ...votes }
    copy[anecdoteIndex] += 1

    setVotes(copy)
  }

  return (
    <div>
      <Button onClick={handleAnecdoteVote} text={"vote"} />
      <Button onClick={handleSelectAnecdote} text={"next anecdote"}/>
      <br />
      {anecdotes[anecdoteIndex]}
      <br />
      {"has " + votes[anecdoteIndex] + " votes"}
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
      <br />
      <RandomAnecdote />
    </div>
  )
}

export default App