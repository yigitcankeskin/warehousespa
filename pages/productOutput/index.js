import * as React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function productOutput() {
  const [productCode, setProductCode] = useState("");
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
      const { data } = await axios.delete(
        `/api/product/remove`,
        { data: { productCode, productPcs }, params: { token: token } },
        config
      );
      alert("The product launch is successful!");
    } catch (e) {
      alert(e.response.data.message);
      console.log(e.response.data.message);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
      <form>
        <Typography variant="h4" sx={{ margin: "5px", textAlign: "center" }}>
          Get Product Output
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
          label="Pcs"
          variant="outlined"
          value={productPcs}
          onChange={(e) => {
            setProductPcs(e.target.value);
          }}
        />
        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Remove
        </Button>
      </form>
    </Box>
  );
}
