//STYLES
import "./newsCard.css";

//REACT
import { useContext } from "react";

//HOOKS/CONTEXTS
import { LoginContext } from "../../contexts/LoginContext";
import useBookmark from "../../hooks/useBookmark";
import useUpdateUserAndBookmarks from "../../hooks/useUpdateUserAndBookmarks";

//LIBRARIES
import { toast } from "react-toastify";
import PropTypes from "prop-types";

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
  //DESTRUCTURE NEWS OBJECT PROPS
  const selectedBookmark = { title, url, urlToImage, sources, publishedAt };

  //USER CONTEXT
  const { isLoggedIn } = useContext(LoginContext);

  //ADD BOOKMARK TO UI
  const { toggleBookmark, isSaved } = useBookmark(url);

  //ADD BOOKMARK TO DATABASE
  const { updateUserAndBookmarks } =
    useUpdateUserAndBookmarks(selectedBookmark);

  const handleClick = async () => {
    if (!isLoggedIn) {
      return toast.error(`Oops! You must log-in first.`);
    }

    toggleBookmark();
    updateUserAndBookmarks();

    if (isSaved) {
      toast("Removed from bookmark");
    } else {
      toast("Added to bookmarks");
    }
  };

  // const truncatedTitle = title ? title.slice(0, 85) + `...` : "";

  return (
    <>
      <li className="newsCard">
        <a href={url} target="_blank" rel="noreferrer">
          <img src={urlToImage} alt={urlToImage} />
          <p className="sourceP"> {sources} </p>
          <DateComponent dateString={publishedAt} />
          <div className="articleTitle">
            <h3>{title.slice(0, 85) + `...`}</h3>
            {/* <h3>{truncatedTitle}</h3> */}
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
