const request = require('request')


const forecast = (lat, long, callback) => {    
    const url = 'http://api.weatherstack.com/current?access_key=99264e93f61bab872c766c60de1faeec&query=' + lat + ',' + long + '&units=f'
    
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to weather data. please try again later', undefined)
        } else if (response.body.success){
            callback('request couldnt be completed as defined. please update location', undefined)

        }else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                city: response.body.location.name,
                region: response.body.location.region,
                country: response.body.location.country,
                weather_description: response.body.current.weather_descriptions[0]
            })

        }
    })
}

module.exports = forecast