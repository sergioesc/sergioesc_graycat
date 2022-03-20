import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
// import seedRouter from "./routes/seedRoute.js";
import uploadRouter from "./routes/uploadRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado correctamente");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
// app.use("/api/seed", seedRouter);
app.use("/api/upload", uploadRouter);

app.get("/", (req, res) => {
  res.send("HOME DEL SERVER");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`El server esta en el puerto ${port}`);
});
