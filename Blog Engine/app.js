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
let Article = require('./models/articles');

//Loading view engines
//app.set('views', 'views');
app.set('view engine', 'ejs');

//Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

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
       title:'Add Article'
    });
    console.log('add page');
});

//POST route for submiting articles
app.post('/article', upload.single('articleImage'), (req, res, next) => {
    console.log(req.file);
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.articleImage = req.file.filename;
    article.save(err => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

app.listen(1010);