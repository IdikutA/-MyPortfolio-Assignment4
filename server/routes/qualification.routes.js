
import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/api/qualifications", qualificationCtrl.list);

router.get("/api/qualifications/:id", qualificationCtrl.read);

router.post('/api/qualifications',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  qualificationCtrl.create);

router.put('/api/qualifications/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  qualificationCtrl.update);

router.delete('/api/qualifications/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  qualificationCtrl.remove);

router.delete('/api/qualifications',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  qualificationCtrl.removeAll);
export default router;
