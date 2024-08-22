import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/UserSchema";

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
  return newUser;
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
          expiresIn: "30s",
        });
        token = "bearer " + token;
        return token;
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
