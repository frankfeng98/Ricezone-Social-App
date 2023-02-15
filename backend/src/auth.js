let sessionUser = {};
let cookieKey = "sid";

const md5 = require('md5');
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const User = mongoose.model('user', userSchema);
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const connectionString = 'mongodb+srv://TianlingFeng:542456679ftL@cluster0.lacdace.mongodb.net/comp531-ricezone?retryWrites=true&w=majority';
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const CLIENT_HOME_PAGE_URL = "https://scintillating-beginner.surge.sh/handleGoogle"

function isLoggedIn(req, res, next) {
    // likely didn't install cookie parser
    if (!req.cookies) {
       return res.sendStatus(401);
    }

    let sid = req.cookies[cookieKey];

    // no sid for cookie key
    if (!sid) {
        return res.sendStatus(401);
    }

    let username = sessionUser[sid];

    // no username mapped to sid
    if (username) {
        req.username = username;
        next();
    }
    else {
        return res.sendStatus(401)
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return checkUser(username);
        })
        if (!user) {
            return res.sendStatus(401)
        }
        let hash = md5(user.salt + password);
        if (hash === user.hash) {
            const sessionKey = md5("123" + username)
            sessionUser[sessionKey] = username

            // this sets a cookie
            res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true})
            msg = {username: username, result: 'success'};
            res.send(msg);
        }
        else {
            res.sendStatus(401);
        }
    })();
}

async function checkUser(username) {
    return await User.findOne({ username });
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password1;
    let zipcode = req.body.zipcode;
    let email = req.body.email;
    let dob = req.body.dob;

    // supply username and password
    if (!username || !password || !zipcode || !email || !dob) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(salt + password);
    let msg; 
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return checkUser(username);
        })
        if (user) {
            msg = {username: username, result: "User already exist"};
            res.send(msg);
        } else {
            await (connector.then(()=> {
                return new User({
                    username: username,
                    salt: salt,
                    hash: hash,
                    oauth: "none"
                }).save();
            }));
    
            await (connector.then(()=> {
                return new Profile({
                    username: username,
                    email: email,
                    dob: dob,
                    zipcode: zipcode,
                    followingList: [],
                    status: "default",
                    avatar: "<img src='https://www.cmor-faculty.rice.edu/~rja2/icons/ardilla.jpg' height='130' width='100'/> "
                }).save();
            }));
            const sessionKey = md5("123" + username)
            sessionUser[sessionKey] = username

            // this sets a cookie
            res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true})
            msg = {username: username, result: 'success'};
            res.send(msg);
        }
    })();
}

function logout(req, res) {
    let username = req.username;

    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return checkUser(username);
        })
        if (!user) {
            return res.sendStatus(401)
        }
        const sessionKey = md5("123" + username)
        delete sessionUser[sessionKey];
        res.clearCookie(cookieKey);
        res.send(sessionUser);
    })();
}

async function changePassword(req, res) {
    if (!req.body.password) {
        res.sendStatus(400);
    } else {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return checkUser(req.username);
        })
        let salt = user.salt;
        let hash = md5(salt + req.body.password);
        await User.updateOne({username: req.username}, {hash: hash});
        res.send({username: req.username, result: "success"});
    }
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '354349960840-3cj279lib06t8hj136o8cr4a4jncirdl.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://finalricezone.herokuapp.com/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done) {
        let username = profile.emails[0].value;
        let salt = username + new Date().getTime();
        let hash = md5(salt);
        let user = {
            /*'email': profile.emails[0].value,
            'name' : profile.name.givenName + ' ' + profile.name.familyName,
            'id'   : profile.id,*/
            username: username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            salt: salt,
            hash: hash,
            oauth: profile.emails[0].value,
            'token': accessToken
        };
        
        // You can perform any necessary actions with your user at this point,
        // e.g. internal verification against a users table,
        // creating new user entries, etc.

        return done(null, {
            username: user.username,
            salt: user.salt,
            hash: user.hash,
            oauth: user.oauth,
            email: user.email
        });
        // User.findOrCreate(..., function(err, user) {
        //     if (err) { return done(err); }
        //     done(null, user);
        // });
    })
);

async function checkOauth(oauth) {
    return await User.findOne({ oauth: oauth });
}

module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.use(session({
        secret: 'doNotGuessTheSecret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Redirect the user to Google for authentication.  When complete,
    // Google will redirect the user back to the application at
    //     /auth/google/callback
    app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login','email'] })); // could have a passport auth second arg {scope: 'email'}
    
    // Google will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: CLIENT_HOME_PAGE_URL,
            failureRedirect: "/"
           }));
    app.get('/login/success', (req,res)=>{
            // let username = req.user.username;
            // let user = req.user;
            // const sessionKey = md5("123" + username);
            // sessionUser[sessionKey] = username;

            // // this sets a cookie
            // (async () => {
            //     const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            //     let findUser = await connector.then(async () => {
            //         return checkOauth(user.oauth);
            //     })
            //     if (findUser) {
            //         user.username = findUser.username;
            //         user.salt = findUser.salt;
            //         user.hash = findUser.hash;
            //     } else {
            //         await (connector.then(()=> {
            //             console.log(1);
            //             return new User({
            //                 username: user.username,
            //                 salt: user.salt,
            //                 hash: user.hash,
            //                 oauth: user.oauth
            //             }).save();
            //         }));
            
            //         await (connector.then(()=> {

            //             return new Profile({
            //                 username: user.username,
            //                 email: user.email,
            //                 dob: " ",
            //                 zipcode: " ",
            //                 followingList: [],
            //                 status: "default",
            //                 avatar: "<img src='https://www.cmor-faculty.rice.edu/~rja2/icons/ardilla.jpg' height='130' width='100'/> "
            //             }).save();
            //         }));
            //     }
            //     res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true})
                if (req.user) {
                    res.json({
                        message : "User Authenticated",
                        user : req.user
                   })
                }
                else res.json({
                    message : "User Not Authenticated",
                    user : null
               })
            //})();
         });
    app.use(isLoggedIn); //any endpoint defined after this must pass isLoggedIn method
    app.put('/logout', logout);
    app.put('/password', changePassword);
}

