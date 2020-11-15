import {Request} from 'express';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy} from 'passport-jwt';
// import GoogleStrategy from 'passport-google-oauth'

import User from '../services/v1/models/User';

interface User {
  id: string;
}

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      User.findOne({username})
        .then(async (user) => {
          if (!user) {
            return done(null, false, {message: 'EAUTH_LOGIN_FALED'});
          }
          // Match password
          try {
            const isMatch = bcrypt.compareSync(password, user.password);

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'AUTH_LOGIN_FALED'});
            }
          } catch (err) {
            throw err;
          }
        })
        .catch((err) => {
          return done(null, false, {message: err});
        });
    },
  ),
);

function cookieExtractor(req: Request) {
  console.log(req && req.cookies ? JSON.stringify(req.cookies) : null);
  return req && req.cookies ? req.cookies['socorro-jwt'] : null;
}

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || 'WARNING WARNING WARNING',
      jwtFromRequest: cookieExtractor,
    },
    async ({user}, done) => {
      try {
        User.findById(user._id)
          .then(async (user) => {
            if (!user) {
              return done(null, false, {message: 'AUTH_LOGIN_FALED'});
            }
            return done(null, user);
          })
          .catch((err) => {
            return done(null, false, {message: err});
          });
      } catch (error) {
        throw error;
      }
    },
  ),
);

export default passport;
