import "../login-form/login-form.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

let URL = `http://localhost:4004/user/login`;

export default function LoginForm() {
  let [formData, setFormData] = useState({ email: "", password: "" });

  //HANDLE INPUT CHANGE AND formData STATE
  const handleInputChange = (e) => {
    e.preventDefault();
    //DESTRUCTURING/ACCESSING e.target.name and e.target.value
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FETCH API TO LOG IN USER AND RETRIEVE TOKEN
  const userLogin = async () => {
    try {
      let res = await axios.post(URL, formData);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  //VALIDATE INPUT AND HANDLE FORM SUBMIT
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length <= 0 || formData.password.length <= 0) {
      return toast.error(`Please, provide e-mail and password.`);
    }

    try {
      let isLoggedIn = await userLogin();

      if (isLoggedIn.data.ok === false) {
        return toast.error(isLoggedIn.data.message + ". Please, try again.");
      }

      console.log(isLoggedIn);
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE TOKEN IN LOCAL STORAGE
  // const saveTokenInLocalStorage = (token) => {
  //   localStorage.setItem("token", token);
  // };

  return (
    <form className="loginForm">
      <h2> SIGN IN</h2>
      <p>
        Only registered users get unlimited access to quality journalism free of
        charge.
      </p>
      <p>
        By being a registered user you also get access to our bookmark feature
        that allows users to favorite news articles for future reading.
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
      {/* on click, fetch login */}
      {/* store token in LS */}
      {/* change is logged in state */}
    </form>
  );
}
