import { useContext, useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <h1>Your Profile Page</h1>
      <h2>Still under development...</h2>
      <Link to="/"> Take me back to /Home</Link>
    </>
  );
}
