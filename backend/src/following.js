const mongoose = require('mongoose');
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const connectionString = 'mongodb+srv://TianlingFeng:542456679ftL@cluster0.lacdace.mongodb.net/comp531-ricezone?retryWrites=true&w=majority';
function getFollowing(req, res) {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        if (!req.params.user) {
            let username = req.username;
            let user = await connector.then(async () => {
                return await Profile.findOne({username: username });
            })
            res.send({username: username, following: user.followingList});
        } else {
            let username = req.params.user;
            let user = await connector.then(async () => {
                return await Profile.findOne({username: username });
            })
            res.send({username: username, following: user.followingList});
        }
    })();
}

function updateFollowing(req, res) {
    if (!req.params.user) {
        res.sendStatus(400);
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let toBeAdded = await connector.then(async () => {
            return await Profile.findOne({username: req.params.user});
        })
        if (!toBeAdded) {
            res.send({username: req.username, following: "user not found"});
        } else {
            let user = await connector.then(async () => {
                return await Profile.findOne({username: req.username});
            })
            let following = [...user.followingList];
            if (following.includes(req.params.user)) {
                res.send({username: req.username, following: "user already followed"})
            } else {
                following.push(req.params.user);
                await connector.then(async () => {
                    await Profile.updateOne({
                        username: req.username
                    }, {followingList: following})
                });
                res.send({username: req.username, following: following});
            }
        }
    })();
}

function deleteFollowing(req, res) {
    if (!req.params.user) {
        res.sendStatus(400);
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let user = await connector.then(async () => {
            return await Profile.findOne({username: req.username});
        })
        let following = [...user.followingList];
        for( var i = 0; i < following.length; i++){ 
            if (following[i] === req.params.user) { 
                following.splice(i, 1); 
            }
        }
        await connector.then(async () => {
            await Profile.updateOne({
                username: req.username
            }, {followingList: [...following]})
        });
        res.send({username: req.username, following: [...following]});
    })();
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', updateFollowing);
    app.delete('/following/:user', deleteFollowing);
}