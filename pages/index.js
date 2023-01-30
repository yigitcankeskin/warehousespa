import { TopBar } from "@/components/TopBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        m: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{ m: 5, p: 5, border: 1, borderRadius: "16px" }}
      >
        This İs a WareHouse Web Site
      </Typography>
      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
        WareHouse Web Site performs:
      </Typography>
      <Typography variant="h6">
        -Product Entry
        <br /> -Show Products List
        <br /> -Product Output
      </Typography>
      <Typography variant="h5" sx={{ textDecoration: "underline" }}>
       <br/> WareHouse Web site includes:
      </Typography>
      <Typography variant="h6">
         - React - Next.js
        <br /> - Json File as a Data Base
        <br /> - Server-Side Rendering
        <br /> - Authorization and Authentication with Jwt
        <br /> - session management with cookies
      </Typography>
    </Box>
  );
}
