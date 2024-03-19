import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { APIProvider } from "./contexts/APIContext";
import { SliderSelectorProvider } from "./contexts/SliderSelectorContext";
import axios from "axios";
import "./app.css";

import Home from "./views/Home";
import Bookmarks from "./views/Bookmarks";
import Profile from "./views/Profile";
import NotFound from "./views/NotFound";
import Login from "./views/Login";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  let tokenLocalStorage = localStorage.getItem("token");
  let URL = `http://localhost:4004/user/verifyToken`;

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
            console.log("just checked token");
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error occurred during token verification:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false); // Update loading state
      }
    };

    verifyToken();
  }, [tokenLocalStorage, setIsLoggedIn, URL]);

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
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="login" element={<Login />} />
              <Route
                path="user/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              ></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </APIProvider>
        </SliderSelectorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// function App() {
//   const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
//   let tokenLocalStorage = localStorage.getItem("token");
//   let URL = `http://localhost:4004/user/verifyToken`;

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const tokenLocalStorage = localStorage.getItem("token");

//         if (!tokenLocalStorage) {
//           console.log("User not logged in");
//           return setIsLoggedIn(false);
//         }

//         axios.defaults.headers.common["Authorization"] = tokenLocalStorage;
//         const response = await axios.post(URL);

//         if (response.data.ok === true) {
//           console.log("just checked token");
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error("Error occurred during token verification:", error);
//         setIsLoggedIn(false);
//       } finally {
//         setIsLoggedIn(true);
//       }
//     };

//     verifyToken();
//   }, [tokenLocalStorage, isLoggedIn, setIsLoggedIn, URL]);

//   return (
//     <div className="app">
//       <BrowserRouter>
//         <SliderSelectorProvider>
//           <APIProvider>
//             <Routes>
//               <Route index element={<Navigate to="/home" />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="bookmarks" element={<Bookmarks />} />
//               <Route path="login" element={<Login />} />

//               <Route
//                 path="user/profile"
//                 element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//               ></Route>
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </APIProvider>
//         </SliderSelectorProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

{
  /* "Context wrapper"technique will  encapsule all contexts in one single file */
}
