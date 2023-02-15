const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const User = mongoose.model('user', userSchema);
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const connectionString = 'mongodb+srv://TianlingFeng:542456679ftL@cluster0.lacdace.mongodb.net/comp531-ricezone?retryWrites=true&w=majority';
const uploadImage = require('./uploadCloudinary')
const cloudinary = require('cloudinary')

async function checkUser(username) {
    return await Profile.findOne({username: username });
}

function getHeadline(req, res) {
    let username = req.params.user;
    if (!username) {
        username = req.username;
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return checkUser(username);
        })
        if (!user) {
            res.send({username: username, headline: "no user found"});
            return;
        }
        res.send({username: username, headline: user.status})
    })();
}

function updateHeadline(req, res) {
    let username = req.username;
    let newHeadline = req.body.headline;
    if (!username || !newHeadline) {
        return res.sendStatus(400);
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await connector.then(async () => {
            await Profile.updateOne({username: username}, {
                status: newHeadline
            })
        })
        res.send({username: username, headline: newHeadline})
    })();
}

function getEmail(req, res) {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await connector.then(async () => {
            let user;
            if (!req.params.user) {
                user = await checkUser(req.username);
            } else {
                user = await checkUser(req.params.user);
            }
            if (user) {
                res.send({username: req.username, email: user.email});
            } else {
                res.send({username: req.username, email: "user not found"});
            }
        });
    })();
}

async function updateEmail(req, res) {
    if (!req.body.email) {
        res.sendStatus(400);
    }
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async ()=> {
        await Profile.updateOne({
            username: req.username
        }, {email: req.body.email});
    });
    res.send({username: req.username, email: req.body.email});
}

async function getDOB(req, res) {
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async () => {
        let user;
        if (!req.params.user) {
            user = await checkUser(req.username);
        } else {
            user = await checkUser(req.params.user);
        }
        if (user) {
            res.send({username: req.username, dob: user.dob});
        } else {
            res.send({username: req.username, dob: "user not found"});
        }
    });
}

async function updateZipcode(req, res) {
    if (!req.body.zipcode) {
        res.sendStatus(400);
    }
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async ()=> {
        await Profile.updateOne({
            username: req.username
        }, {zipcode: req.body.zipcode});
    });
    res.send({username: req.username, zipcode: req.body.zipcode});
}

async function getZipcode(req, res) {
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async () => {
        let user;
        if (!req.params.user) {
            user = await checkUser(req.username);
        } else {
            user = await checkUser(req.params.user);
        }
        if (user) {
            res.send({username: req.username, zipcode: user.zipcode});
        } else {
            res.send({username: req.username, zipcode: "user not found"});
        }
    });
}

async function updateAvatar(req, res) {
    //fixme mongodb document
    const image = cloudinary.image(req.fileid, {
        format: "png", width: 100, height: 130, crop: "fill" 
    })
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async ()=> {
        await Profile.updateOne({username: req.username}, {avatar: image})
    });
    res.send({username: req.username, avatar: image});
}

async function getAvatar(req, res) {
    //fixme mongodb document
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await connector.then(async () => {
        let user;
        if (!req.params.user) {
            user = await checkUser(req.username);
        } else {
            user = await checkUser(req.params.user);
        }
        if (user) {
            res.send({username: req.username, avatar: user.avatar});
        } else {
            res.send({username: req.username, avatar: "user not found"});
        }
    });
}

module.exports = (app) => {
    app.get('/headline/:user?', getHeadline);
    app.put('/headline', updateHeadline);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/dob/:user?', getDOB);
    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', updateZipcode);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', uploadImage('avatar'), updateAvatar);
}