import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { APIProvider } from "./contexts/APIContext";
import { SliderSelectorProvider } from "./contexts/SliderSelectorContext";
import { LoginProvider } from "./contexts/LoginContext";

import Home from "./views/Home";
import Bookmarks from "./views/Bookmarks";
import Profile from "./views/Profile";
import "./app.css";
import NotFound from "./views/NotFound";
import Login from "./views/Login";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* "Context wrapper"technique will  encapsule all contexts in one single file */}
        <SliderSelectorProvider>
          <LoginProvider>
            <APIProvider>
              <Routes>
                <Route index element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </APIProvider>
          </LoginProvider>
        </SliderSelectorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
