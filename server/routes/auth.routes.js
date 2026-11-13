
import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Sign in
router.route('/auth/signin')
  .post(authCtrl.signin);

// Sign out
router.route('/auth/signout')
  .get(authCtrl.signout);

export default router;
