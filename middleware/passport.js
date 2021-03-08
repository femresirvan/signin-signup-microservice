const passport = require('passport')
const googlePass = require('passport-google-oauth20').Strategy
const User = require('../Models/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new googlePass({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
        //console.log("access token: ", accessToken);
        //console.log(profile);
        User.findOne({ email: profile.emails[0].value })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    new User({
                            //googleId: profile.id,
                            name: profile.name.givenName,
                            email: profile.emails[0].value,
                            userIsHere: true
                        }).save()
                        .then(newUser => done(null, newUser));
                }
            })
    }
));