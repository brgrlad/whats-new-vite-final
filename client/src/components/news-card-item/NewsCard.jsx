import { toast } from "react-toastify";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import PropTypes from "prop-types";

import useBookmark from "../../hooks/useBookmark";
import "./newsCard.css";
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
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { toggleBookmark, isSaved } = useBookmark(url);

  const handleClick = () => {
    if (!isLoggedIn) {
      console.log(setIsLoggedIn);
      return toast.error(`Oops! You must log-in first.`);
    }

    toggleBookmark();

    if (isSaved) {
      toast("removed from bookmark");
      console.log(isSaved);
    } else {
      toast("Added to bookmarks");
      console.log(isSaved);
    }
  };

  return (
    <>
      <li className="newsCard">
        <a href={url} target="_blank" rel="noreferrer">
          <img src={urlToImage} alt={urlToImage} />
          <p className="sourceP"> {sources} </p>
          <DateComponent dateString={publishedAt} />
          <div className="articleTitle">
            <h3>{title.slice(0, 85) + `...`}</h3>
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
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  sources: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
};
