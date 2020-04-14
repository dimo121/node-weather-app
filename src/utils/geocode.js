const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiejMyNzM0MzQiLCJhIjoiY2s3cXZvaDY2MDd0ZDNnazU0bTB4NG0xbSJ9.ipAfbu2txO1GZzpqhLZIKQ"

    request({ url:url, json:true }, (error,response) => {
        if(error) {
            //console.log("Unable to establish connection")
            //could saave error to log file or even send by email
            callback('Unable to connect to location services',undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name : response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode