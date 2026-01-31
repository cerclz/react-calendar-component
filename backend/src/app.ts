import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/dbConnection.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT || 5000)
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env")
}

app.use('/api/tasks', taskRoutes)

console.log("Starting server...")

await connectDB(MONGODB_URI)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
