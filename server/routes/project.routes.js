
import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/api/projects", projectCtrl.list);


router.get("/api/projects/:id", projectCtrl.read);


router.post('/api/projects',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  projectCtrl.create);

router.put('/api/projects/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  projectCtrl.update);

router.delete('/api/projects/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  projectCtrl.remove);

router.delete('/api/projects',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  projectCtrl.removeAll);

export default router;
