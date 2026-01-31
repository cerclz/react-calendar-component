// taskRoutes.ts

import { Router } from "express";
import { getTasks, createTask } from "../controllers/taskControllers.js";

const router = Router()

router.get("/", getTasks)
router.post("/", createTask)

export default router