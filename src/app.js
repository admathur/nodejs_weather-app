const path = require('path')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<b>Hello there!!<b>')
// })

// app.get('/help', (req, res) => {
//     res.send('I am here to help. What can I do for you today?')
// })

// app.get('/about', (req, res) => {
//     res.send('hmm... what can I say about myself, except that <b>I AM AWESOME!!<b>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please enter a valid address"
        })

    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(data.latitude, data.longitude, (error, foreCastData)=>{
            if(error){
                return res.send({error: error})
            }
            res.send({
                forecast: foreCastData,
                location: data.placeName,
                address: req.query.address
            })
        })

    }
    )
})

app.listen(port, () => {
    console.log('express webserver up and running on port ' + port)
})