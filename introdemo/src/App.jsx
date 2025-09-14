import { useState } from "react"

const Button = (props) => {
  console.log("button props:", props)
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Result = (props) => {
  console.log("result props:", props)
  return (
    <div>
     {props.text}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  return (
    <div>
      <h1>University of Helinski Unicafe</h1>
      <h2>Submit Your Feedback</h2>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Button onClick={() => setNeutral(neutral+ 1)} text={"neutral"} />
      <h2>Results</h2>
      <Result text={"good: " + good} />
      <Result text={"bad: " + bad} />
      <Result text={"neutral: " + neutral} />
    </div>
  )
}

export default App