// taskRoutes.ts

import { Router } from "express";
import { createStore, getStores } from "../controllers/storeControllers.js";

const router = Router()

router.get("/", getStores)
router.post("/", createStore)

export default router