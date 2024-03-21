import "../header/header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

export default function Header() {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="h1Wrapper">
          <p>24 Mar 2023</p>
          <h1 className="playfair-display" onClick={() => navigate("/home")}>
            WHATS NEW?
          </h1>
          <span></span>
          {isLoggedIn ? (
            <button onClick={() => navigate("/user/profile")}> PROFILE </button>
          ) : (
            <button onClick={() => navigate("/login")}>LOGIN</button>
          )}
        </div>
        <h2>Navigate the media and political noise. Know your bias.</h2>
      </header>
    </>
  );
}
