const Header = ({header}) => {
  return (
    <>
    <h1>{header}</h1>
    </>
  )
}

const Section = ({name, exercises}) => {
  return (
    <>
    <p>{name} {exercises}</p>
    </>
  )
}

const Summary = ({courses}) => {
  return (
    <>
    <p>
      Number of exercises {courses.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, 0
      )}
    </p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name}/>
      {course.parts.map(c => 
        <Section key={c.id} name={c.name} exercises={c.exercises} />
      )}
      <Summary courses={course.parts}/>
    </div>
  )
}

export default Course