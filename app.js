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
const passport = require('passport');
const googlePass = require('passport-google-oauth20').Strategy
const Gamer = require('./Models/userModel')
const cookie = require('cookie-session')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    Gamer.findById(id).then(user => {
        done(null, user);
    });
});
passport.use(new googlePass({
        clientID: "160339418084-vlh8ompn97pktef4gnlfs12b59jrhblv.apps.googleusercontent.com",
        clientSecret: "EPFSR0c8I9IAJTZG6PL3J-Oc",
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        //console.log("access token: ", accessToken);
        console.log(profile);
        Gamer.findOne({ email: profile.emails[0].value })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    new Gamer({
                            //googleId: profile.id,
                            email: profile.emails[0].value

                        }).save()
                        .then(newUser => done(null, newUser));

                }
            })
    }
));


app.use(cors());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use(cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['herhangirastgelebikey']
}))
app.use(passport.initialize());
app.use(passport.session());
app.get('/api/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
app.get('/api/logout', (req, res) => {
    res.redirect('/')
})
app.use('/', router);
if (result.error) {
    throw result.error
}

app.listen(process.env.PORT, () => {
    console.log('Sunucu ayağa kaldırıldı.');
})