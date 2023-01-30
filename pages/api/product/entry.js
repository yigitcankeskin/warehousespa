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

    if (req.method === "POST") {
      const { productCode, productDesc, productPcs } = req.body;
      if (productCode === "" || productDesc === "" || productPcs === "") {
        res.status(400).json({ message: "Every fields should not be empty" });
      } else if (!Number.isInteger(parseInt(productPcs))) {
        res.status(400).json({ message: "Product pcs Should be Integer" });
      } else {
        await Product.addProduct(productCode, productDesc, productPcs);
        res.status(201).json({
          message: "save Successful",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};
