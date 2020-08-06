const request = require('request')


const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapboxAccess_token = 'access_token=pk.eyJ1IjoiYWRtYXRodXIiLCJhIjoiY2tid2g5cm9jMDVraTJxcXE0dDF4bXdxZSJ9.sfhPboajg_qwZ7BMxlNbvg'

const geocode = (address, callback) => {
    const geocodeurl = mapboxUrl+ encodeURIComponent(address) +'.json?'+mapboxAccess_token

    request({url: geocodeurl, json: true}, (error, response) => {
        if(error){
            callback('unable to connent to mapbox api. please try again later', undefined)
        } else if (response.body.reference === 0){
            callback('couldnt find location. please try entering another location', undefined)
        } else {
            // console.log(response.body.features[0].center[0])
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                placeName: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode