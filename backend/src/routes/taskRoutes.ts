// taskRoutes.ts

import { Router } from "express";
import { getTasks, createTask, deleteTask } from "../controllers/taskControllers.js";

const router = Router()

router.get("/", getTasks)
router.post("/", createTask)
router.delete("/:id", deleteTask)

export default router