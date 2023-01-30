// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/product";
import { tokenCheckFunction } from "../auth/tokenCheckFunction";
export default async (req, res) => {
  try {
    // Token CHECK
    let token = req.query.token
      ? req.query.token
      : req.body.token
      ? req.body.token
      : "";
    try {
      tokenCheckFunction(token);
    } catch (e) {
      console.error(e);
      res.status(401).json("Unauthorized User");
    }
    // Token CHECK

    if (req.method === "DELETE") {
      const { productCode, productPcs } = req.body;
      if (productCode === "" || productPcs === "") {
        res.status(400).json({ message: "Every fields should not be empty" });
      } else if (!Number.isInteger(parseInt(productPcs))) {
        res.status(400).json({ message: "Product pcs Should be Integer" });
      } else {
        await Product.removeProduct(productCode, productPcs);
        res.status(201).json({
          message: "remove Successful",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};
