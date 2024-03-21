import "./newsCard.css";
import { useContext } from "react";

//HOOKS/CONTEXTS
import { LoginContext } from "../../contexts/LoginContext";
import useBookmark from "../../hooks/useBookmark";

//LIBRARIES
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

// COMPONENTS
import DateComponent from "../date/DateComponent";
import SocialMediaShare from "../share-content/SocialMediaShare";
import BookmarkIcon from "../share-content/BookmarkIcon";

let userEmail = localStorage.getItem("userEmail");

const fetchUser = async () => {
  try {
    let URL = `http://localhost:4004/user/findUser`;
    if (!userEmail) {
      return console.log("No user found in local storage");
    }

    const response = await axios.get(URL, { params: { email: userEmail } });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default function NewsCard({
  title,
  url,
  urlToImage,
  sources,
  publishedAt,
}) {
  const { isLoggedIn } = useContext(LoginContext);
  const { toggleBookmark, isSaved } = useBookmark(url);

  const handleClick = async () => {
    if (!isLoggedIn) {
      return toast.error(`Oops! You must log-in first.`);
    }

    toggleBookmark();
    fetchUser();

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
