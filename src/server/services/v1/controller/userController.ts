import {Request, Response, NextFunction} from 'express';

import {successHandler, errorHandler} from './helpers/response';
import User from '../models/User';
import DiveEntry from '../models/DiveEntry';

export function createNewEntry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {userId} = req.params;
  const entry = new DiveEntry({diver: userId, ...req.body});
  entry
    .save()
    .then((entryEntity) => {
      return User.findOneAndUpdate(
        {_id: userId},
        {$push: {dives: entryEntity._id}},
        {new: true},
      )
        .populate({path: 'dives', model: DiveEntry})
        .select('dives')
        .exec(function (err, user) {
          if (err) {
            return errorHandler(res, err);
          }
          return successHandler(res, user, 201);
        });
    })
    .catch((err) => errorHandler(res, err));
}
export function getAllEntries(req: Request, res: Response, next: NextFunction) {
  const {userId} = req.params;
  User.findById(userId)
    .populate({path: 'dives', model: DiveEntry})
    .select('dives')
    .exec(function (err, user) {
      if (err) {
        return errorHandler(res, err);
      }
      return successHandler(res, user);
    });
}
