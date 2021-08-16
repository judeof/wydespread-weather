

const request = require('request')
const config = require('./config.js')

 //this exports method makes the function to be referenced in the calling app using the const variablename 
 module.exports = (address, callback) => {
    const url = config.getGeoCodeURL() + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVkZW9mIiwiYSI6ImNrczFzbWxjdDF3engydm44MjR3dGI4djEifQ.HtSaODvrFN2n_XYn6x25oQ&limit=1'
    request({ url, json: true }, (error, {body}={}) => {
        //either error(OS/low level only) or response has a value at any time. Both 
        //cannot have an error at the same time
        if (error) {
            callback('Unable to connect to location services ', undefined)
        } else if (body.message) {
            callback('Unable to find location. Try another search', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            const features = body.features[0]
            callback(undefined, {
                latitude: features.center[0],
                longitude: features.center[1],
                location: features.place_name
            })
        }
    })
}