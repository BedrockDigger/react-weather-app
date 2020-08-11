import axios from "axios"
import moment from "moment"

async function getWeatherObj(cityName, countryCode) {
    const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                q: cityName + ',' + countryCode,
                // q: 'Chengdu' + ',' +'cn',
                appid: 'a9e41a6cc6fbe60470a00a7fe977fddc',
                units: 'metric'
            }
        }
    ).then(
        res => {
            return {
                data: stripWeatherObj(res.data),
                succeeded: true
            }
        }
    ).catch(
        err => {
            return {
                data: err,
                succeeded: false
            }
        }
    )
    return res
}

function stripWeatherObj(obj) {
    const iconUrl = 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@4x.png'
    const strippedObj = {
        description: obj.weather[0].description,
        icon: iconUrl,
        temp: obj.main.temp,
        pressure: obj.main.pressure,
        humidity: obj.main.humidity, //in %
        temp_min: obj.main.temp_min,
        temp_max: obj.main.temp_max,
        visibility: obj.visibility, //in meters
        wind_speed: obj.wind.speed,
        wind_deg: obj.wind.deg,
        cloudness: obj.clouds.all, //in %
        time_data_calc: moment(obj.dt, "X").format("MMM D, H:mm"), //now in a nice format
        time_sunrise: moment(obj.sys.sunrise, "X").format("h:mm a"), //now in a nice format
        time_sunset: moment(obj.sys.sunset, "X").format("h:mm a") //now in a nice format
    }
    return strippedObj
}

export default getWeatherObj