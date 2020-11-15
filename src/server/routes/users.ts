import {Router} from 'express';
import {
  createNewEntry,
  getAllEntries,
} from '../services/v1/controller/userController';

const router = Router();
router.post('/:userId/entries', createNewEntry);
router.get('/:userId/entries', getAllEntries);

export default router;
