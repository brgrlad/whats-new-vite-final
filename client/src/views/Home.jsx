import Header from "../components/header/Header";
// import Nav from "../components/nav/Nav";
import Toast from "../components/toast/Toast";
import Filter from "../components/filter/Filter";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
// import { useContext } from "react";
// import { LoginContext } from "../contexts/LoginContext";

// import { useState } from "react";

export default function Home() {
  // const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  return (
    <>
      <Toast />
      <Header />

      <Filter />
      <Main />
      <Footer />
    </>
  );
}
