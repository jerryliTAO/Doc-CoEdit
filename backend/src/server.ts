import { config } from "dotenv";
import { Server } from "socket.io";
import { onlineListUser, userListUser, usersInfo } from "./interfaces/usersInfo";
import { DocSchema } from "./models/DocSchema";
import { UserSchema } from "./models/UserSchema";
import { addAccessUser } from "./Services/DocService";

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
    //  ====== user open the document ====
    socket.on("join", async (data) => {
      const { userId, docId, lastOpened } = data;
      // get document information
      const doc: Doc | null = (await DocSchema.findById({ _id: docId }, "_id title owner content").populate({
        path: "owner",
        select: "_id email name",
      })) as Doc | null;

      // deal with not existing doc
      if (doc == null) {
        return socket.emit("doc-not-exist");
      }
      // open a unique room for the document to deliver information such as online user list, document content etc to user who is editing
      socket.join(docId);
      const user = await UserSchema.findOne({ _id: userId }, "_id email name photoSticker recentOpened");
      let usersInfo = docs.get(docId);

      // if there're no user editing
      if (usersInfo === undefined) {
        // show info with email
        const userList: Array<userListUser> = await UserSchema.find({ shared: docId }, "email");
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

      // update user's recently opened document list
      const recentOpened = user?.recentOpened;
      // if document have been opened, update last open date
      if (recentOpened?.length != 0) {
        // find the index of document in the array and delete
        const docIndex = recentOpened?.findIndex((item) => item._id == docId);
        if (docIndex !== -1 && typeof docIndex === "number") {
          recentOpened?.splice(docIndex, 1);
        }
      }
      // add document in array
      recentOpened?.unshift({ _id: docId, lastOpened: lastOpened });
      await UserSchema.findOneAndUpdate({ _id: userId }, { recentOpened: recentOpened });

      // update document information
      docs.set(docId, usersInfo);

      const document = {
        doc: doc,
        usersInfo: usersInfo,
      };
      // return information to frontend
      socket.emit("join-finish", document);
      // to broadcast to users who are editing the same document
      io.to(docId).emit("new-user", { newUser: user?.name, newOnlineList: usersInfo.onlineList });
    });

    // ===== user leave the document =====
    socket.on("leave", (data) => {
      const { userId, docId } = data;
      let doc = docs.get(docId);
      let name: string | undefined;
      // remove the user from online list array
      const index = doc?.onlineList.findIndex((item) => item?._id.toString() === userId);
      if (index !== -1 && typeof index === "number") {
        name = doc?.onlineList[index]?.name;
        doc?.onlineList.splice(index, 1);
      }
      if (doc?.onlineList.length === 1) {
        docs.delete(docId);
      }
      socket.leave(docId);
      io.to(docId).emit("user-leave", {
        name: name,
        onlineList: doc?.onlineList,
      });
    });

    // ===== grant access =====
    socket.on("grant-access", async (data) => {
      const { userId, docId, email } = data;
      const result = await addAccessUser(docId, email);
      if (result === "success") {
        const grantedAccessUser: userListUser | undefined | null = await UserSchema.findOne({ email: email }, "_id email");
        docs.get(docId)?.userList.push(grantedAccessUser);
        const updateUserList = docs.get(docId)?.userList;
        socket.emit("receive-granted", {
          status: "success",
          updateUserList: updateUserList,
        });
      } else {
        socket.emit("receive-granted", {
          status: result,
        });
      }
    });

    //===== delete shared user =====
    socket.on("delete-user", async (data) => {
      const { userId, docId } = data;
      let usersInfo = docs.get(docId);
      let deleteName: string | undefined;
      // delete user from user list
      const userIndex = usersInfo?.userList.findIndex((user) => user?._id.toString() === userId);
      if (userIndex !== -1 && userIndex !== undefined) {
        usersInfo?.userList.splice(userIndex, 1);
      }
      // update data in db
      await UserSchema.findOneAndUpdate({ _id: userId }, { $pull: { shared: docId } });

      // delete user from online list
      const onlineIndex = usersInfo?.onlineList.findIndex((user) => user?._id.toString() === userId);
      let isDeletedUserOnline = false;
      if (onlineIndex !== -1 && onlineIndex !== undefined) {
        deleteName = usersInfo?.onlineList[onlineIndex]?.name;
        usersInfo?.onlineList.splice(onlineIndex, 1);
        isDeletedUserOnline = true;
      }

      let document = {
        deleteId: userId,
        deleteName: deleteName,
        usersInfo: usersInfo,
        isDeletedUserOnline: isDeletedUserOnline,
      };
      io.to(docId).emit("delete-user", document);
    });

    // ===== save title =====
    socket.on("title-changed", async (data) => {
      const { docId, title } = data;
      await DocSchema.findOneAndUpdate({ _id: docId }, { title: title });
      socket.broadcast.to(docId).emit("receive-title", title);
    });

    // ===== save content =====
    socket.on("send-change", async (data) => {
      const { docId, delta } = data;
      socket.broadcast.to(docId).emit("receive-contents", delta);
    });
    socket.on("save-contents", async (data) => {
      const { docId, contents, lastModified } = data;
      const updateDoc = await DocSchema.findByIdAndUpdate(docId, { content: contents, lastModified: lastModified });
    });

    // ===== delete document =====
    socket.on("delete-document", async (docId) => {
      await DocSchema.findByIdAndDelete({ _id: docId });
      io.to(docId).emit("receive-delete-document");
    });

    // ===== editing user cursor =====
    socket.on("user-editing", (cursorInfo) => {
      socket.broadcast.to(cursorInfo.docId).emit("receive-cursor", cursorInfo);
    });

    // ===== user leave the document and disconnect to the socket for releasing resource
    socket.on("disconnect", () => {});
  });
};
