
import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/api/contacts", contactCtrl.list);

router.get("/api/contacts/:id", contactCtrl.read);

router.post("/api/contacts", contactCtrl.create);

router.put("/api/contacts/:id", contactCtrl.update);

router.delete("/api/contacts/:id", contactCtrl.remove);

router.delete("/api/contacts", contactCtrl.removeAll);

export default router;
