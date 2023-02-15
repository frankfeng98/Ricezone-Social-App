const { connect } = require('http2');
const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const profileSchema = require('./profileSchema');
const uploadImage = require('./uploadCloudinary');
const Profile = mongoose.model('profile', profileSchema);
const Article = mongoose.model('article', articleSchema);
const connectionString = 'mongodb+srv://TianlingFeng:542456679ftL@cluster0.lacdace.mongodb.net/comp531-ricezone?retryWrites=true&w=majority';
const cloudinary = require('cloudinary');

function getArticles(req, res) {
    let IdOrUsername = req.params.id; 
    if (!IdOrUsername) {
        (async () => {
            const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            let user = await connector.then(async() => {
                return await Profile.findOne({username: req.username});
            })
            let followerList = user.followingList;
            followerList.push(req.username);
            let articles = await connector.then(async () => {
                return await Article.find({author: {
                    $in: followerList
                }}).sort({date: -1});
            })
            res.send({articles: articles});
        })();
    } else {
        if (startsWithNumber(IdOrUsername)) {
            (async () => {
                const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                let article = await connector.then(async () => {
                    return await Article.findOne({pid: IdOrUsername});
                })
                res.send({articles: article});
            })();
        } else {
            (async () => {
                const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                let articles = await connector.then(async () => {
                    return await Article.find({author: IdOrUsername});
                })
                res.send({articles: articles});
            })();
        }
    }
}

function startsWithNumber(str) {
    return /^\d/.test(str);
  }

function updateArticle(req, res) {
    let articleID = req.params.id;
    let text = req.body.text;
    let commentId = req.body.commentId;
    if (!articleID) {
        res.sendStatus(400);
    }
    
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        let article = await connector.then(async () => {
            return await Article.findOne({pid: articleID});
        })
        //update article content
        if (!commentId) {
            //verify article ownership
            if (article.author != req.username) {
                res.sendStatus(400);
            }
            await connector.then(async () => {
                await Article.updateOne({
                    pid: articleID
                }, {text: text})
            });
        } else {
            if (commentId === -1) {
                let comments = [...article.comments];
                let newCommentId = comments.length + 1; 
                let text_comment = `${req.username}: ${text}`;
                comments.push({commentId: newCommentId, text: text_comment})
                await connector.then(async () => {
                    await Article.updateOne({
                        pid: articleID
                    }, {comments: comments})
                });
            } else {
                let comments = [...article.comments];
                let text_comment = `${req.username}: ${text}`;
                comments.forEach(comment => {
                    if (comment.commentId === commentId) {
                        comment.text = text_comment; 
                    }
                })
                await connector.then(async () => {
                    await Article.updateOne({
                        pid: articleID
                    }, {comments: comments})
                });
            }
        }
        let user = await connector.then(async() => {
            return await Profile.findOne({username: req.username});
        })
        let followerList = user.followingList;
        followerList.push(req.username);
        let allArticles = await connector.then(async () => {
            return await Article.find({author: {
                $in: followerList
            }}).sort({date: -1});
        })
        res.send({articles: allArticles});
    })();
}

function addArticle(req, res) {
    let content = req.body.text;
    if (!content) {
        res.sendStatus(400);
        return;
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const number = await Article.countDocuments();
        let newID = number + 1;
        await (connector.then(()=> {
            return new Article({
                pid: newID,
                author: req.username,
                text: content,
                date: new Date(),
                comments: [],
                image: ""
            }).save();
        }));

        let user = await connector.then(async() => {
            return await Profile.findOne({username: req.username});
        })
        let followerList = user.followingList;
        followerList.push(req.username);
        let allArticles = await connector.then(async () => {
            return await Article.find({author: {
                $in: followerList
            }}).sort({date: -1});
        })
        res.send({articles: allArticles});
    })();
}

function addArticle_image(req, res) {
    let content = req.body.text;
    const image = cloudinary.image(req.fileid, {
        format: "png", width: 100, height: 130, crop: "fill" 
    });
    if (!content) {
        res.sendStatus(400);
        return;
    }
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const number = await Article.countDocuments();
        let newID = number + 1;
        await (connector.then(()=> {
            return new Article({
                pid: newID,
                author: req.username,
                text: content,
                date: new Date(),
                comments: [],
                image: image
            }).save();
        }));

        let user = await connector.then(async() => {
            return await Profile.findOne({username: req.username});
        })
        let followerList = user.followingList;
        followerList.push(req.username);
        let allArticles = await connector.then(async () => {
            return await Article.find({author: {
                $in: followerList
            }}).sort({date: -1});
        })
        res.send({articles: allArticles});
    })();
}

module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', updateArticle);
    app.post('/article', addArticle);
    app.post('/article_image', uploadImage('articles'), addArticle_image)
}