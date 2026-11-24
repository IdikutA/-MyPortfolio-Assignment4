
import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

// Sign up
router.post('/auth/signup', userCtrl.create);

// Sign in
router.route('/auth/signin')
  .post(authCtrl.signin);

// Sign out
router.route('/auth/signout')
  .get(authCtrl.signout);

export default router;
