const request = require('request')

const forecast = (latitude,longitude,callback) => {
    
    const url = `https://api.darksky.net/forecast/27a7607a1a686c00c1187606831046fb/${latitude},${longitude}?units=si`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.',undefined)
        } else if (response.body.error) {
            callback('Cannot find that location', undefined)
        } else {
        //console.log(response.body)
            callback(undefined,{
                windGust: response.body.currently.windGust,
                windSpeed: response.body.currently.windSpeed,
                temperature: response.body.currently.temperature,
                summary: response.body.daily.data[0].summary,
                rainProb: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast