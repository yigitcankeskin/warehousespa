/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";
import User from "../../../models/user"
export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { name, surname, email, password } = req.body;
      const fs = require("fs");
      if (
        name.length == 0 ||
        surname.length == 0 ||
        email.length == 0 ||
        password.length == 0
      ) {
        res.status(401).send("All fields must be filled");
      } else {
        let rawdata = fs.readFileSync("pages/api/users.json");
        let users = JSON.parse(rawdata);
        let user = users.find((user) => user.email === email);
        if (user) {
          res.status(401).send("User already exists!");
        } else {
          let newUser = {
            id: parseInt(users[Object.keys(users).length-1].id)+1, //
            name: name,
            surname: surname,
            email: email,
            password: password,
        };
        users.push(newUser);
        fs.writeFileSync("pages/api/users.json", JSON.stringify(users));
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
