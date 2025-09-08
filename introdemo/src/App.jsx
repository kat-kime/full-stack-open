import { useState } from "react"

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })

  const incLeft = () => setClicks({
    ...clicks,
    left: clicks.left + 1
  })

  const incRight = () => setClicks({
    ...clicks,
    right: clicks.right + 1
  })

  const reset = () => setClicks({
    left: 0,
    right: 0
  })

  return (
    <div>
      <Display counter={clicks.left} />
      <Display counter={clicks.right} />
      <Button 
        onClick={incLeft}
        text='plus left' 
      />
      <Button 
        onClick={reset}
        text='reset' 
      />
      <Button
        onClick={incRight}
        text='plus right'
      />
    </div>
  )
}

export default App