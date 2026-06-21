import { useState } from 'react'

const Button = ({ name, onClick }) => {

  return <button onClick={onClick}>{name}</button>


}
const StatisticLine = ({ name, count }) => {


  return <tr><td>{name}</td><td>{count}</td></tr>
}
const TotalCount = ({ good, neutral, bad }) => <StatisticLine>all {good + neutral + bad}</StatisticLine>
const AverageCount = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (good + neutral * 0 - bad) / total
  return <StatisticLine name="average" count={avg}></StatisticLine>

}
const PositivePercentage = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const positivepercent = good * 100 / total
  return <StatisticLine name="positive" count={positivepercent + '%'}></StatisticLine>

}
const Statistics = (props) => {
  console.log("good count ", props.goodCount)
  console.log("neutral count ", props.neutralCount)
  console.log("bad count ", props.badCount)
  if (props.goodCount == 0 && props.neutralCount == 0 && props.badCount == 0)
    return <p>No feedback given</p>
  return <div>
    <Header title="statistics"></Header>
    <table>
      <tbody>
        <StatisticLine name="good" count={props.goodCount}></StatisticLine>
        <StatisticLine name="neutral" count={props.neutralCount}></StatisticLine>
        <StatisticLine name="bad" count={props.badCount}></StatisticLine>
        <TotalCount good={props.goodCount} neutral={props.neutralCount}
          bad={props.badCount}></TotalCount>
        <AverageCount good={props.goodCount} neutral={props.neutralCount}
          bad={props.badCount}></AverageCount>
        <PositivePercentage good={props.goodCount} neutral={props.neutralCount}
          bad={props.badCount}></PositivePercentage>
      </tbody>
    </table>
  </div>
}
const Header = ({ title }) => <h3>{title}</h3>

const App = () => {
  const [goodCount, setGood] = useState(0)
  const [neutralCount, setNeutral] = useState(0)
  const [badCount, setBad] = useState(0)

  const handleGoodClick = () => {

    const newValue = goodCount + 1
    console.log("increasing the good click count by 1 to ", newValue)
    setGood(newValue)
  }
  const handleNeutralClick = () => {

    const newValue = neutralCount + 1
    console.log("increasing the neutral click count by 1 to ", newValue)
    setNeutral(newValue)
  }
  const handleBadClick = () => {

    const newValue = badCount + 1
    console.log("increasing the bad click count by 1 to ", newValue)
    setBad(newValue)
  }

  return <div><Header title="give feedback"></Header>
    <Button name="good" onClick={handleGoodClick}>

    </Button>
    <Button name="neutral" onClick={handleNeutralClick}></Button>
    <Button name="bad" onClick={handleBadClick}></Button>
    <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></Statistics>
  </div>

}

export default App
