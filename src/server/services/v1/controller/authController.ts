import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {successHandler, errorHandler} from './helpers/response';
import User from '../models/User';

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('login', function (err, user, info) {
    if (err || !user) {
      return errorHandler(res, 'AUTH_FAILED');
    }
    req.logIn(user, function (err) {
      if (err) {
        return errorHandler(res, err);
      }
      const body = {_id: user._id, email: user.email};
      const token = jwt.sign(
        {user: body},
        process.env.JWT_SECRET || 'WARNING WARNING WARNING',
      );

      res.cookie('socorro-jwt', token, {
        expires: new Date(Date.now() + 28 * 24 * 3600),
      });
      return successHandler(res);
    });
  })(req, res, next);
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {username, password} = req.body;
  const newUser = new User({username, password});
  // Hash password before saving in database
  try {
    const salt = await bcrypt.genSaltSync();
    const hash = await bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    newUser
      .save()
      .then((user) => successHandler(res, user, 201))
      .catch((err) => errorHandler(res, err));
  } catch (err) {
    return errorHandler(res, err);
  }
}
