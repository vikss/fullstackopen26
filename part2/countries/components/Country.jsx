import axios from 'axios'
import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY


const Country = ({ country }) => {
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')
    console.log("api key is ", API_KEY)
    console.log(import.meta.env)
    console.log("In the country component. Country is ", country)
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`
    const languages = []
    for (let language in country.languages) {
        languages.push(country.languages[language])

    }
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            console.log("response data is ", response.data)
            setTemperature(response.data.main.temp)
            setWind(response.data.wind.speed)
            let iconId = response.data.weather[0].icon
            console.log("icon id is ", iconId)
            let iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`
            console.log("icon is ", iconURL)
            setIcon(iconURL)
            console.log(icon)

        })


    }, [])
    console.log("This countries official languages are ", languages)

    return <div>
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital.join(", ")}</div>
            <div>Area {country.area}</div>
        </div>
        <div>
            <h1>Languages</h1>
            <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>


        </div>
        <div>
            <img src={country.flags.png} alt={country.flags.alt} length="150" width="180"></img>

        </div>
        <div>
            <h1>Weather in {country.name.common}</h1>
            <div>Temperature {temperature} Celsius</div>
            <img src={icon}></img>
            <div>Wind {wind} m/s</div>

        </div>




    </div>


}
export default Country