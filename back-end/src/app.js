const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');

// Routes
const postsRouter = require('./posts/posts.router');
const commentsRouter = require('./comments/comments.router');
const loginRouter = require('./login/login.router');
const registerRouter = require('./register/register.router');
const reactionsRouter = require('./reactions/reactions.router');
const profilesRouter = require('./profiles/profiles.router');
const searchRouter = require('./search/search.router');
const imagesRouter = require('./images/images.router');
const notificationsRouter = require('./notifications/notifications.router');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/reactions', reactionsRouter);
app.use('/profiles', profilesRouter);
app.use('/search', searchRouter);
app.use('/images', imagesRouter);
app.use('/notifications', notificationsRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
