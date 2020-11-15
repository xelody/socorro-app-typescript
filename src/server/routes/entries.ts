import {Router} from 'express';
import {
  viewEntry,
  editEntry,
  deleteEntry,
} from '../services/v1/controller/diveEntryController';

const router = Router();
router.get('/:entryId', viewEntry);
router.post('/:entryId', editEntry);
router.delete('/:entryId', deleteEntry);

export default router;
