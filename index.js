import express from "express";
import authRouter from "./route/auth.route.js";
import PdfRouter from "./route/generatePdf.route.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.use("/api/auth", authRouter);
app.use("/api/process", PdfRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
