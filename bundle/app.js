"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const objection_1 = require("objection");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const v1_1 = __importDefault(require("./routes/v1"));
const electionSocket_1 = require("./sockets/electionSocket");
const app = (0, express_1.default)();
//SOCKET CONFIG
const httpServer = (0, http_1.createServer)(app);
let io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
try {
    (0, electionSocket_1.electionSocket)(io);
    objection_1.Model.knex(config_1.default);
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/api/v1", v1_1.default);
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
    const PORT = process.env.SERVER_PORT || 8081;
    httpServer.listen(PORT, () => {
        console.log(`server is running on port ${PORT}...`);
    });
}
catch (error) {
    console.log(error);
    process.exit(1);
}
