const Note = ({text, id}) => {
  return (
    <li key={id}>{text}</li>
  )
}

export default Note