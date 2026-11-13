
import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";

const router = express.Router();

router.get("/api/qualifications", qualificationCtrl.list);

router.get("/api/qualifications/:id", qualificationCtrl.read);

router.post("/api/qualifications", qualificationCtrl.create);

router.put("/api/qualifications/:id", qualificationCtrl.update);

router.delete("/api/qualifications/:id", qualificationCtrl.remove);

router.delete("/api/qualifications", qualificationCtrl.removeAll);

export default router;
