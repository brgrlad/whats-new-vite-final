import Header from "../components/header/Header";
import Toast from "../components/toast/Toast";
import Filter from "../components/filter/Filter";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import { useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function Home() {
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

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
