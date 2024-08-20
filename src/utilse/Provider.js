const passport = require('passport');
const Users = require('../modal/users.modal');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

    
const googleProvuder = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID:process.env.GOOGLE_ClIENTID,
            clientSecret: process.env.GOOGKE_ClIENTSECRET,
            callbackURL: "http://localhost:5000/api/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
                try {
                    let user = await Users.findOne({ googleId: profile.id })

                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: "user"
                        })
                    }

                    return cb(null, user)
                } catch (error) {
                    console.log(error);
                    return cb(error, null)
                }

                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("serializeUser", user);
            done(null, user);
        });

        passport.deserializeUser(async function (data, done) {
            console.log("deserializeUser", data);

            try {
                done(null, data);
            } catch (error) {
                done(error,null);
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}


const facebookProvider = async () => {

    try {
        passport.use(new FacebookStrategy({
            clientID:process.env.FACEBOOK_ClIENTID,
            clientSecret: process.env.FACEBOOK_ClIENTSECRET,
            callbackURL: "http://localhost:5000/api/v1/users/facebook/callback",
            enableProof: true,
            profileFields: ['id', 'displayName', 'photos']
        },
            async (accessToken, refreshToken, profile, cb) => {
                console.log(profile);
                try {
                    let user = await Users.findOne({ facebookId: profile.id });

                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            facebookId: profile.id,
                            role: "user"
                        });
                    }

                    return cb(null, user);
                } catch (error) {
                    console.error('Error finding or creating user:', error);
                    return cb(error, null);
                }
            }));

        passport.serializeUser((user, done) => {
            console.log("serializeUser", user);
            done(null, user.id);
        });

        passport.deserializeUser(async (_id, done) => {
            console.log("deserializeUser", _id);
            try {
                const user = await Users.findById(_id);
                done(null, user);
            } catch (error) {
                console.error('Error deserializing user:', error);
                done(error, null);
            }
        });
    } catch (error) {
        console.error('Error setting up Facebook provider:', error);
    }
};

module.exports = { googleProvuder, facebookProvider } 