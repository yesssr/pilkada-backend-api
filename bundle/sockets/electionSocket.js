"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.electionSocket = void 0;
const elections_services_1 = require("../service/elections.services");
const utils_1 = require("../utils/utils");
const electionSocket = (io) => {
    const nameSpace = io.of("/election");
    nameSpace.use((socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            const decoded = (0, utils_1.verifyToken)(token);
            socket.data.user = decoded;
        }
        catch (err) {
            return next(new Error("invalid credentials!."));
        }
        next();
    });
    nameSpace.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const bearer_id = socket.data.user.bearer_id;
        let role = socket.data.user.slug;
        // console.log(io.engine.clientsCount);
        const send = yield elections_services_1.ElectionsService.getElectionSummaryV2(bearer_id);
        console.log(bearer_id);
        console.log(send);
        nameSpace.emit(`/data/summary/${bearer_id}`, JSON.stringify(send));
        socket
            .use((socket, next) => {
            if (role !== "auditor") {
                return next(new Error("Only auditor can vote!."));
            }
            next();
        })
            .on("vote", (data, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const saving = yield elections_services_1.ElectionsService.saveElectionSummary(data);
                const send = yield elections_services_1.ElectionsService.getElectionSummaryV2(bearer_id);
                nameSpace.emit(`/data/summary/${bearer_id}`, JSON.stringify(send));
            }
            catch (error) {
                console.log(error);
                res(new Error("Connection reset, please try again!."));
            }
        }));
    }));
    nameSpace.on("disconnect", (socket) => {
        console.log("user disconnected");
    });
};
exports.electionSocket = electionSocket;
