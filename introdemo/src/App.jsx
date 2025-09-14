import { useState } from "react"

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
       {props.text} 
      </button>
    </div>
  )
}

const App = (props) => {
  const [value, setValue] = useState(10)

  const handleOnClick = () => {
    setValue(0)
  }

  return (
    <div>
      {value}
    <Button 
      onClick={handleOnClick} 
      text={"reset this button to zero"}
    />
    <Button 
      onClick={() => setValue(value + 1)} 
      text={"increment"}
    />
    <Button 
      onClick={() => setValue(value - 1)} 
      text={"decrement"}
    />
    </div>
  )
}

export default App