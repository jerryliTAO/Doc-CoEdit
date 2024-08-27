import { config } from "dotenv";
import { Server } from "socket.io";
import { onlineListUser, usersInfo } from "./interfaces/usersInfo";
import { DocSchema } from "./models/DocSchema";
import { UserSchema } from "./models/UserSchema";

const dotenv = config();
const ORIGIN = process.env.ORIGIN;

const io = new Server(4000, {
  cors: {
    origin: ORIGIN,
    methods: "GET POST DELETE",
  },
});

/*
key: document ID
value : document information
*/
const docs = new Map<string, usersInfo>();

export const socketServer = () => {
  io.on("connection", (socket) => {
    console.log("user join");

    socket.on("join", async (data) => {
      const { userId, docId } = data;

      const doc: Doc | null = (await DocSchema.findById({ _id: docId }, "_id title owner content").populate({
        path: "owner",
        select: "_id email name",
      })) as Doc | null;

      // deal with not existing doc
      if (doc == null) {
        return socket.emit("doc-not-exist");
      }
      socket.join(docId);
      const user = await UserSchema.findOne({ _id: userId }, "_id email name photoSticker");
      let usersInfo = docs.get(docId);

      // if there're no user editing
      if (usersInfo === undefined) {
        // show info with email
        const userList: Array<object> = await UserSchema.find({ shared: docId }, "email");
        // show info with name
        const onlineList: Array<onlineListUser | undefined> = [{ _id: user?.id, name: user?.name, photoSticker: user?.photoSticker }];
        usersInfo = { userList: userList, onlineList: onlineList };
        docs.set(docId, usersInfo);
      } else {
        // to avoid duplicate user in onlineList
        if (!usersInfo.onlineList.some((item) => item?.name == user?.name)) {
          // if user is the doc owner, let user be at the first of online list
          if (user?.name === doc.owner.name) {
            usersInfo.onlineList.unshift({ _id: user?.id, name: user?.name, photoSticker: user?.photoSticker });
          } else {
            usersInfo.onlineList.push({ _id: user?.id, name: user?.name, photoSticker: user?.photoSticker });
          }
        }
      }
      // docs.delete(docId);
      // update document information
      docs.set(docId, usersInfo);

      const document = {
        doc: doc,
        usersInfo: usersInfo,
      };

      socket.emit("join-finish", document);

      io.to(docId).emit("new-user", { newUser: user?.name, newOnlineList: usersInfo.onlineList });
    });

    socket.on("leave", (data) => {
      const { userId, docId } = data;
      let doc = docs.get(docId);
      let name: string | undefined;
      // remove the user from online list array
      const index = doc?.onlineList.findIndex((item) => item?._id === userId);
      if (index !== -1 && typeof index === "number") {
        name = doc?.onlineList[index]?.name;
        doc?.onlineList.splice(index, 1);
      }
      socket.leave(docId);
      io.to(docId).emit("user-leave", {
        name: name,
        onlineList: doc?.onlineList,
      });
    });

    socket.on("disconnect", () => {
      console.log("user leave");
    });
  });
};
