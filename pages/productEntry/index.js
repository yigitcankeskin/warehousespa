import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function productEntry() {
  const [productCode, setProductCode] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPcs, setProductPcs] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const token = cookie?.get("token");
      const { data } = await axios.post(
        `/api/product/entry`,
        { productCode, productDesc, productPcs },
        { params: { token: token } },
        config
      );
      alert("Product entering is successful!");
    } catch (e) {
      alert(e.response.data.message);
      console.error(e.response.data.message);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
      <form>
        <Typography variant="h4" sx={{ margin: "5px", textAlign: "center" }}>
          Add new Product
        </Typography>
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Product Code"
          variant="outlined"
          value={productCode}
          onChange={(e) => {
            setProductCode(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Description"
          variant="outlined"
          value={productDesc}
          onChange={(e) => {
            setProductDesc(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Pcs"
          variant="outlined"
          value={productPcs}
          onChange={(e) => {
            setProductPcs(e.target.value);
          }}
        />
        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          save
        </Button>
      </form>
    </Box>
  );
}
