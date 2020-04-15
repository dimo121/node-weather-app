const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//below required if views directory has other name e.g. templates
const viewsPath = path.join(__dirname, '../templates/views')
//partials path
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
//setup handlebars engine
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve - checks folder for .js files to serve
app.use(express.static(publicDirectoryPath))

//configure the app server for specific endpoints
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Dimo Papadopoulos'
    })
})


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dimo Papadopoulos'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'express server is available',
        title: 'Help',
        name: 'Dimo Papadopoulos'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address argument required'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, name } = {}) => {
        if(error) {
            return res.send({ error })
        } 
        forecast(latitude,longitude, (error, { windGust,windSpeed,summary, temperature, rainProb } = {}) => {
            if(error){
                return res.send({ error })
            } else {
                res.send({
                    location: name,
                    windGust,
                    windSpeed,
                    summary,
                    temperature,
                    rainProb
                })
            }
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        error : 'Help article not found',
        name: 'Dimo Papadopoulos'
    })
})

//404 route * matches anything that hasn't been matched up to here.
app.get('*', (req,res) => {
    res.render('error', {
        error : 'Page not found',
        name: 'Dimo Papadopoulos'
    })
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})

