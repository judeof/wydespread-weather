const request = require('request')
const config = require('./config.js')
const utils = require('./geocode.js')

const forecast = (latitude, longitude, callback) => {

    const url = config.getWeatherURL() + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body } = {}) => {
        //if error returned
        if (error) {
            callback('Unable to connect to location services ', undefined)
        }
        else if (body.error) {
            callback('Unable to fetch Weather information. Try another search', undefined)
        } else {
            callback(undefined, 'The weather is forecast as ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike + ' degrees out!')
        }
    })
}

module.exports = forecast
