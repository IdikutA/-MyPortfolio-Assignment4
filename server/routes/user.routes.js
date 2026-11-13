
import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/api/users", userCtrl.list);

router.get("/api/users/:id",
  authCtrl.requireSignin,
  userCtrl.read);

router.post("/api/users", userCtrl.create);

router.put("/api/users/:id",
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  userCtrl.update);

router.delete("/api/users/:id",
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  userCtrl.remove);

router.param('id', userCtrl.userByID);

export default router;
