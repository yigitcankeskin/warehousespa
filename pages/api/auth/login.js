// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import User from "../../../models/user"
export default function login(req, res) {
    try {
        if(req.method === "POST") {
            const{email, password} = req.body;
            if(email.length ==  0 || password.length == 0){
                res.status(401).send("Email and password are required");
            }else{
                let user = User.checkUserLogin(email,password);
                if(user===undefined) {
                    res.status(401).send("Email or password entered incorrectly");
                }else
                {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        {
                          expiresIn: "7d",
                        }
                      );
                      const { name,surname,email, id } = user;
                      res.status(201).json({
                        message: "Login Successful",
                        user: {  id,name,surname,email},
                        token,
                      });   
                }

            }


        }
     
    }
    catch (err) 
    {
        console.log(err);
    }
    }
    