const express = require('express')
const app = express();
const ejs = require('ejs');
const result = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const router = require('./routers/router');
const bodyParser = require('body-parser');
const { json } = require('express');
const db = require('./db/db')


app.use(cors());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/', router);

if (result.error) {
    throw result.error
}

app.listen(process.env.PORT, () => {
    console.log('Sunucu ayağa kaldırıldı.');
})