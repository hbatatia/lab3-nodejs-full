const express = require('express');
var session = require('express-session');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require("morgan");

//creating app
const app = express();

//use morgan middleware
app.use(morgan('dev'));
//setting up a favicon 
app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')));

//define a session
app.use(session({
    secret: '1B55-7C33-XnnT78s',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

//handling static HTML and EJS templates
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index'); //no need for ejs extension
});

// using JSO  and URL Encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pass requests to the router middleware
const router = require('./routes/post');
app.use(router);

//create database if not exists
//const createDB = require('./daos/dbCreate');
//createDB();

//No eed for this anymore/ It was just for creating account for the first time
//with both username and password set to lastname (with password hashed).
//create initial accounts
/** 
const clientDAO = require('./daos/clientDAO');
clientDAO.createInitialAccounts(function(err, rows) {
    console.log(rows.length);
});
*/
//make the app listen on port 
const port = process.argv[2] || process.env.PORT || 3001;
const server = app.listen(port, () => {

    console.log(`Cart app listening at http://localhost:${port}`);
});