import { connectDB } from "../config/mongodb";
import { UserSchema } from "../models/UserSchema";

console.log("執行");
connectDB();
console.log("結束");

const singUpUser = async (email: String, password: String, name: String) => {
  try {
    const newUser = await UserSchema.create({
      email: email,
      password: password,
      name: name,
    });
    const allUsers = await UserSchema.find();
    console.log(
      allUsers.forEach((elem) => {
        console.log(typeof elem._id);
      })
    );
    // console.log(newUser)
  } catch (error) {
    console.log(error);
  }
  return "新增資料完成";
};

// const findAll = async ()=>{
//     const user = await UserSchema.find();
//     console.log(user);
// }
console.log("***************開始新增");
const newUser = singUpUser("sdfsd@gmail.com", "zxc123", "TestAccount");
console.log("***************新增結束");
// findAll();
