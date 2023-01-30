import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Router, useRouter } from "next/router";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import cookie from "js-cookie";
import { useState, useEffect } from "react";
import { app } from "../../pages/verifyToken";
import EmailIcon from "@mui/icons-material/Email";
export default function TopBar() {
  const router = useRouter();

  return (
    <Box
      position="static"
      sx={{
        p: "10px",
        color: "primary.contrastText",
        bgcolor: "#4dabf5",
        position: "relative",
        bottom: 0,
        position: "absolute",
        width: "100%",
        maxHeight: "70px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">Made By Yigitcan Keskin</Typography>
      <Typography variant="h7" sx={{ spacing: 4 }}>
        Email addresses : <br />
        <Link href="mailto:yigitcankkeskin@gmail.com">
          <EmailIcon sx={{ mr: 1 }} />
          yigitcankkeskin@gmail.com
        </Link>
        <br />
        <Link href="mailto:yc.keskin.1903@gmail.com" color="inherit">
          <EmailIcon sx={{ mr: 1 }} />
          yc.keskin.1903@gmail.com
        </Link>
      </Typography>
      <Typography variant="h6" sx={{ mr: "30px" }}>
        <Button href="https://github.com/yigitcankeskin">
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 25, md: 50 },
              maxWidth: { xs: 25, md: 50 },
            }}
            alt="Github"
            src={"https://cdn-icons-png.flaticon.com/512/5968/5968866.png"}
          />
        </Button>
        <Button href="https://www.linkedin.com/in/yigitcankeskin/">
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 25, md: 50 },
              maxWidth: { xs: 25, md: 50 },
            }}
            alt="Linkedin"
            src={
              "https://i.pinimg.com/564x/19/40/ab/1940abcfbcbdbdb11b1b8fdbf2f01973.jpg"
            }
          />
        </Button>
      </Typography>
    </Box>
  );
}
