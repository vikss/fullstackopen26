import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from '../components/Countries'

const App = () => {
  const [keyword, setKeyword] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [matchedCountries, setMatchedCountries] = useState([])
  const handleKeywordChange = (event) => {
    const searchKeyword = event.target.value
    console.log("search keyword is ", searchKeyword)
    setKeyword(searchKeyword)
    const countries = allCountries.filter(country => {
      return country.name.common.toLowerCase().includes(searchKeyword.toLowerCase())
    })
    console.log("Matched countries are ", countries)
    if (countries.length > 10) {
      setMatchedCountries("Too many matches, specify another filter")

    }
    else {
      setMatchedCountries(countries)
    }



  }
  const handleShowCountry = (event) => {

    let countryToShow = event.currentTarget.dataset.value
    console.log("User chose to show this country ", countryToShow)
    countryToShow = allCountries.find(country => country.name.common.toLowerCase() === countryToShow.toLowerCase())
    console.log("Rendering this country ", countryToShow)
    setMatchedCountries([countryToShow])

  }
  useEffect(() => {
    console.log("here")
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {

      console.log("All the countries fetched are ", response.data)
      console.log("Setting the state allCountries")
      setAllCountries(response.data)
    })


  }, [])

  return <div>
    <div>find countries <input value={keyword} onChange={handleKeywordChange}></input></div>

    <Countries searchkeyword={keyword} matchedCountries={matchedCountries} handleShowCountry={handleShowCountry}></Countries>
  </div>
}

export default App
