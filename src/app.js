//load source code
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
//
const path = require('path') //nodejs module for directory and file management
const express = require('express')
//express is a single function
const app = express()
//load handlebars to modify properties e.g. partials
const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//set public directory path containing website assets
const publicDirectoryPath = '../public'

//informs express to use hbs views engine to render html pages
app.set('view engine', 'hbs')

//change default hbs view directory from 'views' to 'templates/views'
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//registers static directory with express and exposes static assets and uses ./public/index.html as default
app.use(express.static(path.join(__dirname, publicDirectoryPath)))

//routes:
app.get('', (req, res) => {
    //to render the hbs views
    res.render('index', {
        title: 'Weather Finder',
        name: 'TaskMate'
    })
})

app.get('/about', (req, res) => {
    //to render the hbs views
    res.render('about', {
        title: 'About Us',
        name: 'TaskMate'
    })
})

app.get('/help', (req, res) => {
    //to render the hbs views
    res.render('help', {
        title: 'Need Help?',
        message: 'FAQ Assistance'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(address, (error, { latitude: lat, longitude: long, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
        //
        forecast(lat, long, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            else { res.send({ forecast, location, address }) }
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404PageNotFound', {
        title: '404',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404PageNotFound', {
        title: '404',
        message: 'Page not found.'
    })
})

//start webserver
app.listen(3001, () => {
    console.log('Server is up on port 3000')
})