import Title from './Title'
import Content from './Content'
import Total from './Total'
import Header from './Header'


const Course = ({ courses }) => {

  return courses.map(course => {
    return <div>
      <Header name="Web development curriculum"></Header>
      <Title course={course}></Title>
      <Content course={course}></Content>
      <Total course={course}></Total>

    </div>
  })



}


export default Course