import {Request, Response, NextFunction} from 'express';

import {successHandler, errorHandler} from './helpers/response';
import User from '../models/User';
import DiveEntry from '../models/DiveEntry';

export function viewEntry(req: Request, res: Response, next: NextFunction) {
  const {entryId} = req.params;
  DiveEntry.findById(entryId)
    .then((entry) => {
      if (!entry) {
        return errorHandler(res, 'ENTRY_NOT_FOUND', 404);
      }
      return successHandler(res, entry);
    })
    .catch((err) => errorHandler(res, err));
}

export function editEntry(req: Request, res: Response, next: NextFunction) {
  const {entryId} = req.params;
  DiveEntry.findByIdAndUpdate(entryId, req.body, {new: true})
    .then((entry) => successHandler(res, entry))
    .catch((err) => errorHandler(res, err));
}

export function deleteEntry(req: Request, res: Response, next: NextFunction) {
  const {entryId} = req.params;
  DiveEntry.findById(entryId).then((entry) => {
    if (!entry) {
      return errorHandler(res, 'ENTRY_NOT_FOUND', 404);
    }

    User.findOneAndUpdate({_id: entry.diver}, {$pull: {dives: entryId}})
      .then(() =>
        DiveEntry.findByIdAndDelete(entryId)
          .then(() => successHandler(res))
          .catch((err) => errorHandler(res, err)),
      )
      .catch((err) => errorHandler(res, err));
  });
}
