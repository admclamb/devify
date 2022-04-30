const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const postsRouter = require('./posts/posts.router');
const commentsRouter = require('./comments/comments.router');
const loginRouter = require('./login/login.router');
const registerRouter = require('./register/register.router');
const store = new session.MemoryStore();
const app = express();

app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store,
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
