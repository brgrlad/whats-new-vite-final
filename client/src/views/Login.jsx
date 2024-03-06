import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/login-form/LoginForm";
import "./login.css";

export default function Login() {
  return (
    <>
      <Header />
      <section className="loginPage">
        <LoginForm />
      </section>
      <Footer />
    </>
  );
}
