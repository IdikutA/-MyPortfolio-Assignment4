
import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.get("/api/users", userCtrl.list);

router.get("/api/users/:id", userCtrl.read);

router.post("/api/users", userCtrl.create);

router.put("/api/users/:id", userCtrl.update);

router.delete("/api/users/:id", userCtrl.remove);

router.delete("/api/users", userCtrl.removeAll);

export default router;
