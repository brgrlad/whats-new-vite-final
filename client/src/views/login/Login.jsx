import "./login.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoginForm from "../../components/login-form/LoginForm";
import Toast from "../../components/toast/Toast";

export default function Login() {
  return (
    <>
      <Toast />
      <Header />
      <section className="loginPage">
        <LoginForm />
      </section>
      <Footer />
    </>
  );
}
