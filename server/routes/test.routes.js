import express from "express";
import { testController } from "../controllers/test.controller.js";

const router = express.Router();

//test route
router.get("/", testController);

//export
export default router;
