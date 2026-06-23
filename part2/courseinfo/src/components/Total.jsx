const Total = (props) => {
    const parts = props.course.parts
    const sumExercies = parts.reduce((accumulator, part) => {
        console.log("part ", part)
        console.log("accumulator ", accumulator)

        return accumulator + part.exercises
    }, 0)
    console.log("sum is ", sumExercies)
    return <p>total of {sumExercies} exercises</p>
}

export default Total