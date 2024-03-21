//STYLES
import "./newsCard.css";

//REACT
import { useContext } from "react";

//HOOKS/CONTEXTS
import { LoginContext } from "../../contexts/LoginContext";
import { UserContext } from "../../contexts/UserContext";
import useBookmark from "../../hooks/useBookmark";

//LIBRARIES
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

// COMPONENTS
import DateComponent from "../date/DateComponent";
import SocialMediaShare from "../share-content/SocialMediaShare";
import BookmarkIcon from "../share-content/BookmarkIcon";

export default function NewsCard({
  title,
  url,
  urlToImage,
  sources,
  publishedAt,
}) {
  const { isLoggedIn } = useContext(LoginContext);
  const { userProfile } = useContext(UserContext);
  const { toggleBookmark, isSaved } = useBookmark(url);

  const selectedBookmark = { title, url, urlToImage, sources, publishedAt };

  const getUserAndUpdate = async () => {
    try {
      //GET ID FROM CONTEXT

      const _id = userProfile._id;

      console.log(["the id", _id]);

      // IF NO ID, THROW ERROR
      if (!_id) {
        throw new Error({ ok: true, message: "no user _id found" });
      }
      let URL = "http://localhost:4004/user/updateUser";

      // SEND BOOKMARK UPDATE TO BACKEND
      let updatedUser = await axios.patch(URL, { _id, selectedBookmark });

      console.log("updatedUser");
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (!isLoggedIn) {
      return toast.error(`Oops! You must log-in first.`);
    }

    toggleBookmark();
    getUserAndUpdate();

    if (isSaved) {
      toast("removed from bookmark");
    } else {
      toast("Added to bookmarks");
    }
  };

  const truncatedTitle = title ? title.slice(0, 85) + `...` : "";

  return (
    <>
      <li className="newsCard">
        <a href={url} target="_blank" rel="noreferrer">
          <img src={urlToImage} alt={urlToImage} />
          <p className="sourceP"> {sources} </p>
          <DateComponent dateString={publishedAt} />
          <div className="articleTitle">
            {/* <h3>{title.slice(0, 85) + `...`}</h3> */}
            <h3>{truncatedTitle}</h3>
          </div>
        </a>

        <div className="newsArticleButtons">
          <SocialMediaShare url={url} />

          <button onClick={() => handleClick()}>
            <BookmarkIcon url={url} isSaved={isSaved} />
          </button>
        </div>
      </li>
    </>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  sources: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
};
