
import express from "express";
import projectCtrl from "../controllers/project.controller.js";

const router = express.Router();

router.get("/api/projects", projectCtrl.list);


router.get("/api/projects/:id", projectCtrl.read);


router.post("/api/projects", projectCtrl.create);


router.put("/api/projects/:id", projectCtrl.update);


router.delete("/api/projects/:id", projectCtrl.remove);

router.delete("/api/projects", projectCtrl.removeAll);

export default router;
