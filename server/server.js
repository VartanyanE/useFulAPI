import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import crudRoutes from "./routes/cruds.js"
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/data/", crudRoutes);


  const PORT = process.env.PORT || 5000;


  mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT} `))
  )
  .catch((error) => console.log(error));