import compression from "compression";
import path from "path";

import { createServer } from "http";
import { Server } from "socket.io";
import { Model } from "objection";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import knex from "./config/config";
import router from "./routes/v1";
import { electionSocket } from "./sockets/electionSocket";

const app = express();

//SOCKET CONFIG
const httpServer = createServer(app);
let io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

try {
  electionSocket(io);

  Model.knex(knex);
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1", router);
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  const PORT = process.env.SERVER_PORT || 8081;
  httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
