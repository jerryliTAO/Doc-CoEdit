import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sinon from "sinon";
import { UserSchema } from "../models/UserSchema";
import * as AuthService from "../Services/AuthService";

const secretOrKey = process.env.JWT_SECRET_KEY || "";
describe("sing in", () => {
  let findOneStub: sinon.SinonStub;
  let comparePasswordStub: sinon.SinonStub;
  let sandbox = sinon.createSandbox();

  let user = new UserSchema({
    email: "test123@gmail.com",
    password: "zxc123",
    name: "TestUser",
  });

  beforeEach(() => {
    comparePasswordStub = sandbox.stub(bcrypt, "compare");
    findOneStub = sandbox.stub(UserSchema, "findOne");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should sing in with correct credentials", async () => {
    comparePasswordStub.resolves(true);
    const mockQuery = {
      select: sandbox.stub().returns(user),
    };
    findOneStub.returns(mockQuery);

    const jwtSignInSpy = sandbox.spy(jwt, "sign");
    const result = await AuthService.singIn("test123@gmail.com", "zxc123");
    expect(result).toEqual({
      userId: user._id,
      token: "bearer " + jwtSignInSpy.returnValues,
    });
    expect(jwtSignInSpy.calledOnce).toBe(true);
    expect(
      jwtSignInSpy.calledWithMatch(
        { _id: user._id, name: user.name },
        sinon.match(secretOrKey),
        sinon.match({
          expiresIn: "1h",
        })
      )
    ).toBe(true);
  });

  it("sign in failed with user not found", async () => {
    let notExistUser = null;
    let mockQuery = {
      select: sinon.stub().returns(notExistUser),
    };
    findOneStub.returns(mockQuery);

    const result = await AuthService.singIn("test987654@gmail.com", "zxc123");
    expect(result).toEqual("failed");
  });

  it("sign in failed with error password", async () => {
    comparePasswordStub.resolves(false);
    let mockQuery = {
      select: sinon.stub().returns(user),
    };
    findOneStub.returns(mockQuery);
    let result = await AuthService.singIn("test123@gmail.com", "zxc123");
    expect(result).toEqual("failed");
  });

  it("sign in error", async () => {
    await expect(AuthService.singIn("test123@gmail.com.tw", "error")).rejects.toThrow();
  });
});

describe("sing up", () => {
  let sandbox = sinon.createSandbox();
  let findOneStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let bcryptPasswordStub: sinon.SinonStub;

  // mock user
  let user = new UserSchema({
    email: "test123@gmail.com",
    password: "zxc123",
    name: "TestUser",
  });
  let newUser = new UserSchema({
    email: "test321@gmail.com",
    password: "mock password",
    name: "TestUser",
  });

  beforeEach(() => {
    findOneStub = sandbox.stub(UserSchema, "findOne");
    createStub = sandbox.stub(UserSchema, "create");
    bcryptPasswordStub = sandbox.stub(bcrypt, "hash");
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("user already exist", async () => {
    findOneStub.resolves(user);
    const result = await AuthService.singUp("test123@gmail.com", "zxc123", "TestUser");
    expect(result).toEqual("failed");
  });

  it("should sign up user and sing in", async () => {
    findOneStub.resolves(null);
    bcryptPasswordStub.returns("mock password");
    createStub.resolves(newUser);
    const jwtSignInSpy = sandbox.spy(jwt, "sign");
    const result = await AuthService.singUp("test321@gmail.com", "mock password", "TestUser");
    expect(result).toEqual({
      userId: newUser._id,
      token: "bearer " + jwtSignInSpy.returnValues,
    });
    expect(jwtSignInSpy.calledOnce).toBe(true);
    expect(
      jwtSignInSpy.calledWithMatch(
        { _id: newUser._id, name: newUser.name },
        sinon.match(secretOrKey),
        sinon.match({
          expiresIn: "1h",
        })
      )
    ).toBe(true);
  });
});
