import { Server } from "socket.io";
import { ElectionsService } from "../service/elections.services";
import { verifyToken } from "../utils/utils";

export const electionSocket = (io: Server) => {
  const nameSpace = io.of("/election");

  nameSpace.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = verifyToken(token);
      socket.data.user = decoded;
    } catch (err) {
      return next(new Error("invalid credentials!."));
    }
    next();
  });

  nameSpace.on("connection", async (socket) => {
    const bearer_id = socket.data.user.bearer_id;
    let role = socket.data.user.slug;
    // console.log(io.engine.clientsCount);
    const send = await ElectionsService.getElectionSummaryV2(bearer_id);
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
      .on("vote", async (data, res) => {
        try {
          const saving = await ElectionsService.saveElectionSummary(data);
          const send = await ElectionsService.getElectionSummaryV2(bearer_id);
          nameSpace.emit(`/data/summary/${bearer_id}`, JSON.stringify(send));
        } catch (error) {
          console.log(error);
          res(new Error("Connection reset, please try again!."));
        }
      });
  });

  nameSpace.on("disconnect", (socket) => {
    console.log("user disconnected");
  });
};
