// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/product";
import {tokenCheckFunction} from "../auth/tokenCheckFunction";
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
    if (req.method === "GET") {
      const products = await Product.getProducts();
      res.status(201).json({
        message: "get Products Successful",
        products: products,
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
