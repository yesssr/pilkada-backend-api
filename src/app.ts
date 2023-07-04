import { Model } from "objection";
import express from "express";
import knex from "./config/config";
import router from "./routes/v1";

const app = express();

Model.knex(knex);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
const PORT = process.env.SERVER_PORT || 8081;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
