import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const incByOne = () => {
    setCounter(counter + 1)
  }

  const resetToZero = () => {
    setCounter(0)
  }

  const decByOne = () => {
    setCounter(counter - 1)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={incByOne} 
        text='plus' 
      />
      <Button 
        onClick={resetToZero} 
        text='reset' 
      />
      <Button
        onClick={decByOne}
        text='minus'
      />
    </div>
  )
}

export default App