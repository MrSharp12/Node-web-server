const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//set to run in heroku and locally
const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
//telling express to use hbs as the view engine
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    //allows the server to make a log file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

//static takes the absolute path to the folder you want to serve up
//__dirname variable stores the path to your project's directory
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to the home page!',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send('Error handling request');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});