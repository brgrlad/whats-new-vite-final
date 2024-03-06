import { useState } from "react";

const findBookmark = (url) => {
  let localStorageBookmarks = localStorage.getItem("bookmarks");

  let parsedBookmark = JSON.parse(localStorageBookmarks);
  if (!parsedBookmark) {
    return false;
  }
  return parsedBookmark.includes(url);
};

const useBookmark = (url) => {
  let [isSaved, setIsSaved] = useState(() => findBookmark(url));

  // check if user is logged in before doing everything else?

  const toggleBookmark = () => {
    let localStorageBookmarks = localStorage.getItem("bookmarks");

    if (!localStorageBookmarks) {
      localStorage.setItem("bookmarks", JSON.stringify([url]));
      setIsSaved(true);
    } else {
      let parsedBookmark = JSON.parse(localStorageBookmarks);

      if (findBookmark(url)) {
        let newArr = parsedBookmark.filter((bookmark) => bookmark !== url);
        localStorage.setItem("bookmarks", JSON.stringify(newArr));
        setIsSaved(false);
      } else {
        setIsSaved(true);
        parsedBookmark.push(url);
        localStorage.setItem("bookmarks", JSON.stringify(parsedBookmark));
      }
    }
  };

  return { toggleBookmark, isSaved };
};

export default useBookmark;
