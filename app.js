const express = require('express')
const app = express();
const ejs = require('ejs');
const result = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const router = require('./routers/router');
require('./db/db')
const passport = require('passport');
require('./middleware/passport')
const session = require('express-session');
const cookie = require('cookie-parser');

var MongoDBStore = require('connect-mongodb-session')(session);

app.use(cookie())
app.use(cors());
app.use(express.urlencoded({
    'extended': 'true'
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
if (result.error) {
    throw result.error
}

var stores = new MongoDBStore({
    uri: process.env.MONGU_URI,
    collection: 'mySessions'
});
stores.on('error', function(error) {
    console.log(error);
});
app.use(session({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: stores
}));


app.listen(process.env.PORT, () => {
    console.log('Sunucu ayağa kaldırıldı.');
})