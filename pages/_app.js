import { app } from "../pages/verifyToken/index";
import cookie from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { Footer } from "../components/Footer";
import { BottomNavigation } from "@mui/material";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  /// for Token Check
  useEffect(() => {
    const fetchData = async () => {
      const data = await app();
      return data;
    };
    const result = fetchData().catch(console.error);

    result.then(function (val) {
      if (
        val !== true &&
        router.asPath !== "/signIn" &&
        router.asPath !== "/signUp" &&
        router.asPath !== "/"
      ) {
        router.push("/signIn");
        cookie?.remove("token");
        cookie?.remove("user");
      } else if (
        val === true &&
        (router.asPath === "/signIn" || router.asPath === "signUp")
      ) {
        router.push("/");
      }
    });
  }, [router]);
  /// for Token Check

  if (router.asPath === "/signIn" || router.asPath === "/signUp") {
    return <Component {...pageProps} />;
  } else {
    return (
      <>
        <TopBar />
        <Component {...pageProps} />
        <Footer/>
      </>
    );
  }
}
