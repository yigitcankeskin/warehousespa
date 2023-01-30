import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const token = req.body.token;
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = true;
    res.status(200).json({ message: "true", data });
  } catch (error) {
    const data = false;
    console.log(error);
    res.status(404).json({ message: "Unidentified User", data });
    return false;
  }
};
function tokenCheckFunction(token) {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    throw error;
  }
}
module.exports.tokenCheckFunction = tokenCheckFunction;
