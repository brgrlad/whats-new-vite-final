import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { toast } from "react-toastify";
import useBookmark from "../../hooks/useBookmark";
import SocialMediaShare from "../share-content/SocialMediaShare";
import ShareIcon from "../share-content/ShareIcon";
import BookmarkIcon from "../share-content/BookmarkIcon";
import "./newsList.css";

export default function NewsList({ title, url, urlToImage, sources }) {
  //
  const { toggleBookmark, isSaved } = useBookmark(url);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

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
  let [shareIcons, setShareIcons] = useState(false);

  //move inside component???
  let handleMouseEnter = () => {
    setShareIcons(true);
  };
  let handleMouseLeave = () => {
    setShareIcons(false);
  };

  const truncatedTitle = title ? title.slice(0, 85) + `...` : "";

  return (
    <li className="newsFragmentList">
      <a href={url} target="_blank" rel="noreferrer">
        <img src={urlToImage} alt={urlToImage} />

        <div className="articleTitleList">
          <h3>{truncatedTitle}</h3>
          {/* <h3>{title.slice(0, 70) + `...`}</h3> */}
        </div>

        <p className="sources">{sources}</p>
      </a>

      <div className="iconsWrapper">
        <button
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => setTimeout(handleMouseLeave, 500)}
        >
          {shareIcons && <SocialMediaShare url={url} />}
          <ShareIcon />
        </button>

        <button onClick={() => handleClick()}>
          <BookmarkIcon url={url} isSaved={isSaved} />
        </button>
      </div>
    </li>
  );
}

// ==============  PROP TYPES

NewsList.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  sources: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
};

// export default function NewsList() {
//   return <div>NewsList</div>;
// }
