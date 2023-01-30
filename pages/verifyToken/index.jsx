import cookie from "js-cookie";
import axios from "axios";
import { useState } from "react";

export async function app(value) {
  
  let token = cookie?.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    
    if (token !== undefined) {
      var data = await axios.post(`/api/auth/tokenCheckFunction`, { token }, config);
    }
  } catch (e) {
    console.error(e);
  }

  if (data?.data?.message === "true") {
    return true;
  } else {
    return false;
  }
}
