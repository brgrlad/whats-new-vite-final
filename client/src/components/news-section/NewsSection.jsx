import { useData } from "../../contexts/APIContext";
import "./newsSection.css";
import NewsCard from "../news-card-item/NewsCard";
import NewsList from "../news-list-item/NewsList";
import SectionDivider from "../section-divider/SectionDivider";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

export default function NewsSection() {
  const { data, isLoading, error } = useData();

  let topNews = data.slice(0, 6);
  let olderNews = data.slice(7, 50);

  return (
    <section className="newsSection">
      {/* LOGIN MODAL ON ADD BOOKMARK CLICK */}

      {/* RENDER THE 6 MOST RECENT NEWS - CARD LAYOUT */}
      <SectionDivider>
        <h4 className="playfair-display"> TOP NEWS TODAY</h4>
      </SectionDivider>
      <ul>
        {error && <h1>{error.message}</h1>}
        {!isLoading ? (
          topNews &&
          topNews.map((article) => {
            const { title, url, urlToImage, source, publishedAt } = article;
            return (
              <NewsCard
                title={title}
                url={url}
                urlToImage={urlToImage}
                sources={source.name}
                publishedAt={publishedAt}
                key={title}
              />
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </ul>

      {/* RENDER THE REST OF THE NEWS - LIST LAYOUT*/}
      <SectionDivider>
        <h4 className="playfair-display">ALSO TRENDING...</h4>
      </SectionDivider>
      <ul>
        {error && <h1>{error.message}</h1>}
        {!isLoading ? (
          olderNews &&
          olderNews.map((article) => {
            const { title, url, urlToImage, source, publishedAt } = article;
            return (
              <NewsList
                title={title}
                url={url}
                sources={source.name}
                key={title}
                publishedAt={publishedAt}
                urlToImage={urlToImage}
              />
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </ul>
    </section>
  );
}
