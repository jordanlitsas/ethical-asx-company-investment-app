const passport = require('passport');
const faceBookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const fbClientId = "571022527435224";
const fbClientSecret = "da9c396da925a027f87ae5b54cc1ae82";

const googleClientId = "489314203788-hhi1q49g4c8qjvcpo5b6ntvg4voijgsr.apps.googleusercontent.com";
const googleClientSecret = "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";


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new faceBookStrategy({
    clientID: fbClientId,
    clientSecret: fbClientSecret,
    callbackURL: "http://localhost:9000/auth/facebook/callback"
},

function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:9000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));