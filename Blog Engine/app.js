const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/nodekb', { useNewUrlParser: true });
let db = mongoose.connection;

//Check for successful connections
db.once('open', function() {
    console.log('Connected to MongoDB');
});

//Checking for errors;
db.on('error', function(err) {
    console.log(err);
});

const app = express();

//Getting out models
let article = require('./models/articles');

//Loading view engines
//app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    article.find({}, function(err, articles) {
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {
                title: 'Articles',
                articles: articles
            })
        }
    });
});
app.get('/article', (req, res,next) => {
    res.render('add-article', {
       
    });
    console.log('add page');
});

app.listen(1010);