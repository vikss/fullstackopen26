import { useState } from 'react'


const Button = (props) => {

  return <button text={props.text} onClick={props.onClick}>{props.text}</button>
}
const Header = ({ text }) => {
  return <h2>{text}</h2>

}
const DisplayAnecdote = (props) => {
  return <div>
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const size = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(size).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  const handleNextButtonClick = () => {

    const random = Math.floor(Math.random() * size)
    setSelected(random)
  }
  const handleVoteButtonClick = () => {

    const copyVotes = [...votes]
    console.log("increasing the vote of number ", selected, "  anecdote by 1")
    copyVotes[selected] += 1
    setVotes(copyVotes)
    console.log(copyVotes)
    const maxVoted = copyVotes.indexOf(Math.max(...copyVotes))
    console.log("most voted anecdote is at number ", maxVoted)
    setMostVoted(maxVoted)

  }

  return (
    <div>
      <Header text="Anecdote of the day"></Header>
      <DisplayAnecdote text={anecdotes[selected]} votes={votes[selected]}></DisplayAnecdote>
      <Button text="vote" onClick={handleVoteButtonClick}></Button>
      <Button text="next anecdote" onClick={handleNextButtonClick}></Button>
      <Header text="Anecdote with most votes"></Header>
      <DisplayAnecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]}></DisplayAnecdote>
    </div>
  )
}

export default App

