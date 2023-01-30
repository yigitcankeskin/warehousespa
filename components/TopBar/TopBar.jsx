import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Router, useRouter } from "next/router";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import cookie from "js-cookie";
import { useState,useEffect } from "react";
import { app } from "../../pages/verifyToken";

export default function TopBar() {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await app();
      return data;
    };
    const result = fetchData().catch(console.error);
    result.then(function (val) {
       if(val === true){
        setAuth(true);
       }
    });
  })

  const handleLogout = () => {
    cookie.remove("user");
    cookie.remove("token");
    router.reload(window.location.pathname);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={6} justifyContent="flex-start">
            <Button className="titleTop" href={"/"}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
            </Button>
            {auth && (
              <>
                <Button className="titleTop" href={"/stockManagement"}>
                  {" "}
                  <Typography variant="h6" component="div">
                    Stock management
                  </Typography>{" "}
                </Button>
                <Button className="titleTop" href={"/productEntry"}>
                  <Typography variant="h6" component="div">
                    Product entry{" "}
                  </Typography>
                </Button>
                <Button className="titleTop" href={"/productOutput"}>
                  <Typography variant="h6" component="div">
                    Product Output{" "}
                  </Typography>
                </Button>
              </>
            )}
          </Stack>
          <>
            {!auth && (
              <Button className="titleTop" href={"/signIn"}>
                <Typography variant="h6" component="div">
                  Login{" "}
                </Typography>
              </Button>
            )}
            {auth && (
              <Button className="titleTop" onClick={handleLogout}>
                <Typography variant="h6" component="div">
                  Logout{" "}
                </Typography>
              </Button>
            )}
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
