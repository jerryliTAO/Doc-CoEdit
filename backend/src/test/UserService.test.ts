import sinon from "sinon";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";
import * as UserService from "../Services/UserService";

describe("get user all information", () => {
  let findByIdStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let sandbox = sinon.createSandbox();

  let user = {
    _id: "66c7d69d0f64ca6985b8765b",
    name: "TestUser",
    photoSticker: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    cover: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shared: [
      {
        _id: "66c7d69d0f64ca6985b9345b",
        title: "Undefined",
        content: "abc123werdsfaaesf random",
        cover: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        lastModified: "2024-08-30T06:33:09.000Z",
        owner: {
          _id: "66c7d69d0f64ca6985b9321b",
          name: "Test1",
        },
      },
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
    ],
    myDoc: [],
    recentOpened: [],
  };
  let myDoc = [
    {
      _id: "66c7d69d0f64ca6985b9173b",
      title: "Undefined",
      content: "abc123werdsfaaesf random",
      cover: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      lastModified: "2024-08-30T06:33:09.000Z",
    },
    {
      _id: "66c7d69d0f64ca6985b9789b",
      title: "Undefined",
      content: "test content",
      cover: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      lastModified: "2024-08-30T06:33:09.000Z",
    },
  ];

  beforeEach(() => {
    findByIdStub = sandbox.stub(UserSchema, "findById");
    findStub = sandbox.stub(DocSchema, "find");
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should get user all information", async () => {
    let mockQuery = {
      populate: sinon.stub().returns(user),
    };
    findByIdStub.returns(mockQuery);
    findStub.resolves(myDoc);

    const result = await UserService.getUserALLInfo("66c7d69d0f64ca6985b8765b");
    expect(result).toEqual({
      _id: user._id,
      name: user.name,
      photoSticker: user.photoSticker,
      cover: user.cover,
      shared: user.shared,
      myDoc: myDoc,
      recentOpened: user.recentOpened,
    });
  });

  it("getUserAllInfo error", async () => {
    await expect(UserService.getUserALLInfo("66c7d69d0f64ca6985b8765b")).rejects.toThrow();
  });
});

describe("get user profile", () => {
  let sandbox = sinon.createSandbox();
  let findByIdStub: sinon.SinonStub;
  let profile = {
    name: "TestUser",
    photoSticker: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    cover: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };
  beforeEach(() => {
    findByIdStub = sandbox.stub(UserSchema, "findById");
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should get user profile", async () => {
    findByIdStub.resolves(profile);
    const result = await UserService.getUserProfile("66c7d69d0f64ca6985b8765b");
    expect(result).toEqual(profile);
  });
});

describe("update user profile", () => {
  let sandbox = sinon.createSandbox();
  let findOneAndUpdateStub: sinon.SinonStub;
  let updateProfile = {
    name: "TestUser",
    photoSticker: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    cover: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  beforeEach(() => {
    findOneAndUpdateStub = sandbox.stub(UserSchema, "findOneAndUpdate");
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should update user profile", async () => {
    findOneAndUpdateStub.resolves(updateProfile);
    const result = await UserService.updateUserProfile("66c7d69d0f64ca6985b8765b", updateProfile);
    expect(result).toEqual(updateProfile);
  });
});
