import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";
import { Model } from "objection";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import knex from "./config/config";
import router from "./routes/v1";

const app = express();

//SOCKET CONFIG
const httpServer = createServer(app);
var io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

Model.knex(knex);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
const PORT = process.env.SERVER_PORT || 8081;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
