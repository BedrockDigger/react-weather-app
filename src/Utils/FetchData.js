import axios from "axios"

async function getLocalObj(cityName, countryCode) {
    const res = await axios.get(
        'http://localhost:8080/weather',
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                cityname: cityName,
                countrycode: countryCode
            }
        }
    ).then(
        res => {
            console.log(res)
            return {
                data: res.data.obj,
                succeeded: res.data.succeeded
            }
        }
    ).catch(
        res => {
            return {
                data: res.data.obj,
                succeeded: false
            }
        }
    )
    return res
}

export default getLocalObj