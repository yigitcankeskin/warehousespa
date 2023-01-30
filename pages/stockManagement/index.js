import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";

const ProductRow = ({ productCode, productDesc, productPcs }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell component="th" scope="row">
      {productCode}
    </TableCell>
    <TableCell align="right">{productDesc}</TableCell>
    <TableCell align="right">{productPcs}</TableCell>
  </TableRow>
);

export default function stockManagement() {
  const [products, setProducts] = useState([
    {
      productCode: "ExampleCode",
      productDesc: "Example Product 1",
      productPcs: 1,
    },
  ]);
  const getProducts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const token = cookie?.get("token");
      const { data } = await axios.get(
        `/api/product/getAllProject`,
        { params: { token: token } },
        config
      );
      setProducts(data.products);
    } catch (e) {
      alert(e.response?.data);
      console.error(e.response?.data);
    }
  };
  useEffect(() => {
    getProducts();
  }, [products]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>product Code</TableCell>
            <TableCell align="right">product Description</TableCell>
            <TableCell align="right">Product PCS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.productCode}
              productCode={product.productCode}
              productDesc={product.productDesc}
              productPcs={product.productPcs}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
