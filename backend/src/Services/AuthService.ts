import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/UserSchema";
const dotenv = config();

const secretOrKey = process.env.JWT_SECRET_KEY || "";

export const singUp = async (email: string, password: string, name: string) => {
  //check if the email already been singed up
  const isExitEmail = await UserSchema.findOne({ email: email });
  if (isExitEmail) {
    return "failed";
  }

  //hash password
  const bcryptPassword = await bcrypt.hash(password, 12);
  // create  a new user
  const newUser = await UserSchema.create({
    email: email,
    password: bcryptPassword,
    name: name,
  });

  // sign up success and create a token
  let token = jwt.sign({ _id: newUser._id, name: newUser.name }, secretOrKey, {
    expiresIn: "1h",
  });
  token = "bearer " + token;
  return { userId: newUser._id, token: token };
};

export const singIn = async (email: string, password: string) => {
  try {
    // check if user exist
    const user = await UserSchema.findOne({ email: email }).select("email password name");

    // user exist
    if (user) {
      // verify password
      const validatePassword = await bcrypt.compare(password, user.password);
      if (validatePassword) {
        let token = jwt.sign({ _id: user._id, name: user.name }, secretOrKey, {
          expiresIn: "1h",
        });
        token = "bearer " + token;
        return { userId: user._id, token: token };
      } else {
        return "failed";
      }
    } else {
      return "failed";
    }
  } catch (error) {
    throw error;
  }
};
