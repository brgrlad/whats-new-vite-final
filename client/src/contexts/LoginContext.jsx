import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
