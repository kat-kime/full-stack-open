import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={() => setCounter(counter + 1)} 
        text='plus' 
      />
      <Button 
        onClick={() => setCounter(0)} 
        text='reset' 
      />
      <Button
        onClick={() => setCounter(counter - 1)}
        text='minus'
      />
    </div>
  )
}

export default App