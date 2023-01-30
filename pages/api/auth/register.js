/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";
import User from "../../../models/user"
export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { name, surname, email, password } = req.body;
      if (
        name.length == 0 ||
        surname.length == 0 ||
        email.length == 0 ||
        password.length == 0
      ) {
        res.status(401).send("All fields must be filled");
      } else {
        const user=await User.findByEmail(email);
        if (user) {
          res.status(401).send("User already exists!");
        } else {
        const newUser = new User(name,surname,email,password);
        newUser.save().then(() => {
            res.status(200).send("User Saved Successfully!");
          }).catch((error) => {
            res.status(400).send("User Saved Error");
            console.log(error.message);
          });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
