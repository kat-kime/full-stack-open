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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App