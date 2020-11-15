import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import path from 'path';

import './middleware/database';
import authentication from './middleware/authentication';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import diveEntriesRouter from './routes/entries';

dotenv.config();

const buildDir = path.join(process.cwd() + '/build');
const app = express();
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static(buildDir));
app.use(authentication.initialize());
app.use(authentication.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt'), userRouter);
app.use('/api/v1/entries', passport.authenticate('jwt'), diveEntriesRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const port = process.env.PORT || 9000;
console.log('checking port', port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
