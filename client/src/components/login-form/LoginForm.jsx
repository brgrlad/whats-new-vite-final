import "../login-form/login-form.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
let URL = `http://localhost:4004/user/login`;

export default function LoginForm() {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({ email: "", password: "" });
  let [isLoading, setIsloading] = useState(false);

  //HANDLE INPUT CHANGE AND UPDATE formData STATE
  const handleInputChange = (e) => {
    e.preventDefault();
    //DESTRUCTURING/ACCESSING e.target.name and e.target.value
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FETCH API, LOG IN USER AND RETRIEVE TOKEN
  const userLogin = async () => {
    try {
      let res = await axios.post(URL, formData);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  //VALIDATE INPUTS,HANDLE FORM SUBMIT AND ADD TOKEN TO LOCAL STORAGE
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length <= 0 || formData.password.length <= 0) {
      return toast.error(`Please, provide e-mail and password.`);
    }
    setIsloading(true);
    try {
      let isLoggedIn = await userLogin();

      if (isLoggedIn.ok !== true) {
        let message = isLoggedIn.data.message;
        return toast.error(message + ". Please, try again.");
      }

      localStorage.setItem("token", isLoggedIn.token);
      // change global is signed up

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="loginForm">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2> SIGN IN</h2>
          <p>
            Only registered users get unlimited access to quality journalism
            free of charge.
          </p>
          <p>
            By being a registered user you also get access to our bookmark
            feature that allows users to favorite news articles for future
            reading.
          </p>

          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="E-mail"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleInputChange}
          />

          <button onClick={handleFormSubmit}>CONTINUE</button>
        </>
      )}
    </form>
  );
}
