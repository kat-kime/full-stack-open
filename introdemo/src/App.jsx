import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAllClicks] = useState([])

  const incLeft = () => {
    setLeft(left + 1)
    setAllClicks(allClicks.concat('L'))
  }

  const incRight = () => {
    setRight(right + 1)
    setAllClicks(allClicks.concat('R'))
  }

  console.log("all clicks:", allClicks)

  return (
    <div>
      <Display counter={left} />
      <Button 
        onClick={incLeft}
        text='plus left' 
      />
      <Display counter={right} />
      <Button
        onClick={incRight}
        text='plus right'
      />
      <Display counter={allClicks.join('')} />
    </div>
  )
}

export default App