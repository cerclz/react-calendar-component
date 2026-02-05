// taskRoutes.ts

import { Router } from "express";
import { createStore, deleteStore, getStoreById, getStores, updateStore } from "../controllers/storeControllers.js";

const router = Router()

router.get("/", getStores)
router.post("/", createStore)

router.get("/:id", getStoreById)
router.put("/:id", updateStore)
router.delete("/:id", deleteStore)

export default router