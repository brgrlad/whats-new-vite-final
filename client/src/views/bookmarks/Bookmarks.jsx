import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import "./bookmarks.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SectionDivider from "../../components/section-divider/SectionDivider";
import NewsList from "../../components/news-list-item/NewsList";

import axios from "axios";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    console.log("from bookmarks jsx");
    const fetchBookmarks = async () => {
      let email = userProfile.email;

      console.log({ userEmail: email });

      try {
        console.log("triggering fetchBookmarks");
        let user = await axios.post("http://localhost:4004/api/users/user", {
          email,
        });

        let userBookmarks = user.data.data.bookmarks;

        setBookmarks(userBookmarks);
      } catch (error) {
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [bookmarks, userProfile.email]);

  return (
    <div className="bookmarksWrapper">
      <Header />
      <SectionDivider>
        <h4 className="playfair-display">BOOKMARKS HISTORY</h4>
      </SectionDivider>
      <main className="bookmarks">
        {bookmarks.length <= 0 ? (
          <div className="noBookmarks">
            <p>Currently, you have no bookmarks saved.</p>
          </div>
        ) : null}
        {!isLoading &&
          bookmarks.map((bookmark) => {
            const { title, url, sources, publishedAt, urlToImage } = bookmark;
            return (
              <NewsList
                title={title}
                url={url}
                sources={sources}
                key={title}
                publishedAt={publishedAt}
                urlToImage={urlToImage}
                // onRefresh={handleRefresh}
              />
            );
          })}
      </main>
      <Footer />
    </div>
  );
}
