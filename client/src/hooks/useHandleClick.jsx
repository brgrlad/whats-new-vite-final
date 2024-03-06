// Inside useHandleClick.js
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useBookmark from "./useBookmark";
import { LoginContext } from "../contexts/LoginContext";

const useHandleClick = (url) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { toggleBookmark, isSaved } = useBookmark(url);

  const clickBookmark = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      console.log(setIsLoggedIn);
      return alert("please log in");
    }

    toggleBookmark();
    if (isSaved) {
      toast("removed from bookmark");
    } else {
      toast("Added to bookmarks");
    }
  };

  return { showModal, setShowModal, isSaved, clickBookmark };
};

export default useHandleClick;

// ____________________________________________________

// const useBookmark = (url) => {
//   const toggleBookmark = () => {
//     let localStorageBookmarks = localStorage.getItem("bookmarks");
//     let parsedBookmark = localStorageBookmarks
//       ? JSON.parse(localStorageBookmarks)
//       : [];

//     let isBookmarked = parsedBookmark.includes(url);

//     switch (isBookmarked) {
//       case true:
//         parsedBookmark = parsedBookmark.filter((bookmark) => bookmark !== url);
//         break;
//       case false:
//         parsedBookmark.push(url);
//         break;
//       default:
//         break;
//     }

//     localStorage.setItem("bookmarks", JSON.stringify(parsedBookmark));

//     return !isBookmarked;
//   };

//   return { toggleBookmark };
// };

// export default useBookmark;
