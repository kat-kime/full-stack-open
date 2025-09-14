import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const History = (props) => {
  console.log('props.allClicks.length', props.allClicks.length)

  if (props.allClicks.length === 0) {
    return (
      <div>the app works by pressing the buttons</div>
    )
  }

  return (
      <div>{props.allClicks.join('')}</div>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const incLeft = () => {
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setAllClicks(allClicks.concat('L'))
    console.log('left before:', left)
    console.log('right before:', right)
    setTotal(updatedLeft + right)
  }

  const incRight = () => {
    const updatedRight = right + 1
    setRight(updatedRight)
    setAllClicks(allClicks.concat('R'))
    console.log('left before:', left)
    console.log('right before:', right)
    setTotal(updatedRight + left)
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
      <History allClicks={allClicks} />
      <Display counter={total} />
    </div>
  )
}

export default App