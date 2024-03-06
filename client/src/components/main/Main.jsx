import NewsSection from "../news-section/NewsSection";
import "./main.css";

export default function Main() {
  return (
    <main>
      {/* if no other section is implemented, render news here */}
      <NewsSection />
    </main>
  );
}
