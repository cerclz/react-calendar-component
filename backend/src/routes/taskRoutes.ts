// taskRoutes.ts

import { Router } from "express";
import { getTasks, createTask, deleteTask, updateTask } from "../controllers/taskControllers.js";

const router = Router()

router.get("/", getTasks)
router.post("/", createTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router