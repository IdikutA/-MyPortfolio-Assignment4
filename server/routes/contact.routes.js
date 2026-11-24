
import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();


router.post("/api/contacts", contactCtrl.create);

router.get('/api/contacts',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.list);

  router.get('/api/contacts/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.read);

  router.put('/api/contacts/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.update);

router.delete('/api/contacts/:id',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.remove);

router.delete('/api/contacts',
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.removeAll);
  
export default router;
