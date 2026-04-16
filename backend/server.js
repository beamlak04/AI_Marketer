import dotenv from "dotenv";
import express from "express"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import chatRoutes from "./routes/chat.routes.js";
import "./lib/firebaseAdmin.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/chat", chatRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));


app.listen(PORT, () => console.log(`Server running on port ${PORT}  ${process.env.FIREBASE_PROJECT_ID}`));
