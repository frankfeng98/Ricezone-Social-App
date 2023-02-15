const authJS = require('./src/auth');
const articlesJS = require('./src/articles');
const profileJS = require('./src/profile');
const followingJS = require('./src/following');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
const User = mongoose.model('user', userSchema);
const connectionString = 'mongodb+srv://TianlingFeng:542456679ftL@cluster0.lacdace.mongodb.net/comp531-ricezone?retryWrites=true&w=majority';
const cors = require('cors');
const corsOption = {origin: 'https://scintillating-beginner.surge.sh', credentials: true};

const hello = (req, res) => res.send({ hello: 'world' });

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', hello);
app.use(cors(corsOption));
app.options('/auth/google', cors())
authJS(app);
profileJS(app);
articlesJS(app);
followingJS(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
