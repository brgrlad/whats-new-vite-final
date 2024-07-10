//STYLES
import "./app.css";

//REACT
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

//LIBRARIES
import axios from "axios";

//CONTEXTS
import { LoginContext } from "./contexts/LoginContext";
import { UserContext } from "./contexts/UserContext";
import { APIProvider } from "./contexts/APIContext";
import { SliderSelectorProvider } from "./contexts/SliderSelectorContext";

// VIEWS
import Home from "./views/Home";
import Bookmarks from "./views/bookmarks/Bookmarks";
import Profile from "./views/Profile";
import NotFound from "./views/not-found/NotFound";
import Login from "./views/Login";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { setUserProfile } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  let tokenLocalStorage = localStorage.getItem("token");
  let URL = `http://localhost:4004/api/users/verifyToken`;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const tokenLocalStorage = localStorage.getItem("token");

        if (!tokenLocalStorage) {
          console.log("User not logged in");
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = tokenLocalStorage;
          const response = await axios.post(URL);

          if (response.data.ok === true) {
            setIsLoggedIn(true);

            setUserProfile(response.data.user);
          }
        }
      } catch (error) {
        console.error("Error occurred during token verification:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [tokenLocalStorage, setIsLoggedIn, URL, setUserProfile]);

  // Render loading state while verifying token
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <SliderSelectorProvider>
          <APIProvider>
            <Routes>
              <Route index element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route
                path="/user/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/user/bookmarks"
                element={isLoggedIn ? <Bookmarks /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </APIProvider>
        </SliderSelectorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
