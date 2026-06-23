import Part from './Part'

const Content = (props) => {
  const parts = props.course.parts

  return parts.map(part => {
    return <Part name={part.name} exercises={part.exercises}></Part>
  }

  )



}


export default Content