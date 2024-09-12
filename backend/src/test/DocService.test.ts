import { Types } from "mongoose";
import sinon from "sinon";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";
import * as DocService from "../Services/DocService";

describe("doc", () => {
  let sandbox = sinon.createSandbox();
  let createStub: sinon.SinonStub;
  let userFindOneStub: sinon.SinonStub;
  let docFindOneStub: sinon.SinonStub;
  let findOneAndUpdateStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let findOneAndDeleteStub: sinon.SinonStub;
  let updateManyStub: sinon.SinonStub;
  let docFindOneAndUpdateStub: sinon.SinonStub;

  let newDoc = new DocSchema({
    owner: "66c7d69d0f64ca6985b8765b",
  });

  let doc = {
    _id: "66c7d69d0f64ca6985b7788b",
    owner: "66c7d69d0f64ca6985b8765b",
    toString: sinon.stub().returns("66c7d69d0f64ca6985b8765b"),
  };

  beforeEach(() => {
    createStub = sandbox.stub(DocSchema, "create");
    userFindOneStub = sandbox.stub(UserSchema, "findOne");
    docFindOneStub = sandbox.stub(DocSchema, "findOne");
    findStub = sandbox.stub(DocSchema, "find");
    findByIdStub = sandbox.stub(UserSchema, "findById");
    findOneAndDeleteStub = sandbox.stub(DocSchema, "findOneAndDelete");
    updateManyStub = sandbox.stub(UserSchema, "updateMany");
  });

  afterEach(() => {
    sandbox.restore();
  });

  // // ===== create doc =====
  describe("create doc", () => {
    it("should create doc", async () => {
      createStub.resolves(newDoc);
      const result = await DocService.createDoc(new Types.ObjectId("66c7d69d0f64ca6985b8765b"));
      expect(result).toEqual(newDoc);
    });

    it("should create error", async () => {
      createStub.throws();
      await expect(DocService.createDoc(new Types.ObjectId("66c7d69d0f64ca6985b8765b"))).rejects.toThrow();
    });
  });

  // ===== grant access =====
  describe("grant access", () => {
    it("should not shared to yourself", async () => {
      let user = {
        _id: doc.owner,
        toString: sinon.stub().returns(doc.owner.toString()),
      };
      userFindOneStub.resolves(user);
      docFindOneStub.resolves(doc);
      const result = await DocService.addAccessUser("66c7d69d0f64ca6985b8765b", "test123@gmail.com");
      expect(result).toStrictEqual("failed_Can't share to yourself.");
    });

    it("should grant access", async () => {
      let user = {
        _id: "mockId",
        shared: [],
        toString: sinon.stub().returns("mockId".toString()),
      };
      findOneAndUpdateStub = sandbox.stub(UserSchema, "findOneAndUpdate");

      // set mock data
      userFindOneStub.resolves(user);
      docFindOneStub.resolves(doc);
      findOneAndUpdateStub.resolves(user);

      const result = await DocService.addAccessUser("66c7d69d0f64ca6985b8765b", "test123@gmail.com");
      expect(result).toStrictEqual("success");
    });

    it("should user not exist", async () => {
      let user = null;
      userFindOneStub.resolves(user);
      docFindOneStub.resolves(doc);

      const result = await DocService.addAccessUser("66c7d69d0f64ca6985b7788b", "test123@gmail.com");
      expect(result).toStrictEqual("failed");
    });

    it("should grant access error", async () => {
      userFindOneStub.throws();
      await expect(DocService.addAccessUser("66c7d69d0f64ca6985b7788b", "test123@gmail.com")).rejects.toThrow();
    });
  });

  // ===== get my doc =====
  describe("get my doc", () => {
    it("should get my doc", async () => {
      let myDoc = [
        {
          _id: "66c7d69d0f64ca6985b9345b",
          title: "Undefined",
          content: "abc123werdsfaaesf random",
          cover: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          lastModified: "2024-08-30T06:33:09.000Z",
          owner: {
            _id: "ccccccccc",
            name: "test3",
          },
        },
      ];
      let mockQuery = {
        populate: sinon.stub().returns(myDoc),
      };
      findStub.returns(mockQuery);
      const result = await DocService.getMyDoc("66c7d69d0f64ca6985b9345b");
      expect(result).toStrictEqual(myDoc);
    });

    it("should get my doc error", async () => {
      findStub.throws();
      await expect(DocService.getMyDoc("66c7d69d0f64ca6985b9345b")).rejects.toThrow();
    });
  });

  // ===== get my shared =====
  describe("get my shared", () => {
    it("should get my shared", async () => {
      let sharedDoc = {
        _id: "66c7d69d0f64ca6985b9345b",
        shared: [
          {
            _id: "ccccccccc",
            name: "test3",
          },
        ],
      };
      let mockQuery = {
        populate: sinon.stub().returns(sharedDoc),
      };

      findByIdStub.returns(mockQuery);
      const result = await DocService.getMyShared("66c7d69d0f64ca6985b9345b");
      expect(result).toStrictEqual(sharedDoc.shared);
    });

    it("should get my shared error", async () => {
      findByIdStub.throws();
      await expect(DocService.getMyShared("66c7d69d0f64ca6985b9345b")).rejects.toThrow();
    });
  });

  // ===== delete doc =====
  describe("delete doc", () => {
    it("should delete doc", async () => {
      let deleteDoc = {
        _id: "66c7d69d0f64ca6985b9345b",
      };
      findOneAndDeleteStub.returns(deleteDoc);
      const result = await DocService.deleteDocById("66c7d69d0f64ca6985b9345b");
      expect(result).toBe(1);
    });

    it("should doc not found", async () => {
      let deleteDoc = null;
      findOneAndDeleteStub.returns(deleteDoc);
      const result = await DocService.deleteDocById("66c7d69d0f64ca6985b9345b");
      expect(result).toBe(0);
    });

    it("should delete doc error", async () => {
      findOneAndDeleteStub.throws();
      await expect(DocService.deleteDocById("66c7d69d0f64ca6985b9345b")).rejects.toThrow();
    });
  });

  // ===== update cover =====
  describe("update cover", () => {
    beforeEach(() => {
      docFindOneAndUpdateStub = sandbox.stub(DocSchema, "findOneAndUpdate");
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("should update cover", async () => {
      let doc = {
        _id: "66c7d69d0f64ca6985b9345b",
        cover: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      };
      docFindOneAndUpdateStub.resolves(doc);
      const result = await DocService.updateDocCover(
        "66c7d69d0f64ca6985b9345b",
        "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );
      expect(result).toBe(1);
    });

    it("should update cover failed", async () => {
      let doc = null;
      docFindOneAndUpdateStub.resolves(null);
      const result = await DocService.updateDocCover(
        "66c7d69d0f64ca6985b9345b",
        "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      );
      expect(result).toBe(0);
    });

    it("should update error", async () => {
      docFindOneAndUpdateStub.throws();
      await expect(
        DocService.updateDocCover(
          "66c7d69d0f64ca6985b9345b",
          "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        )
      ).rejects.toThrow();
    });
  });
});
