import {Router} from 'express';
import passport from 'passport';

import {login, register} from '../services/v1/controller/authController';

const router = Router();
router.post('/login', login);
router.post('/register', register);
router.get('/check', passport.authenticate('jwt'), (req, res) =>
  res.json({success: true}),
);

export default router;
