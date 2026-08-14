import Country from "./Country"
const Countries = ({ searchkeyword, matchedCountries, handleShowCountry }) => {
    if (searchkeyword.length == 0) {
        return
    }
    else if (matchedCountries.length == 1) {
        return <Country country={matchedCountries[0]}></Country>
    }
    else if (matchedCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else {
        return matchedCountries.map(country => {
            return <div><li key={country.name.common}>{country.name.common} <button onClick={handleShowCountry} data-value={country.name.common}>Show</button></li></div>
        }
        )
    }

}

export default Countries