// taskRoutes.ts

import { Router } from "express";
import { createStore, deleteStore, getStores } from "../controllers/storeControllers.js";

const router = Router()

router.get("/", getStores)
router.post("/", createStore)
router.delete("/:id", deleteStore)

export default router