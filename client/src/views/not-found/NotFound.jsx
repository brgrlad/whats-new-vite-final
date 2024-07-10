import { Link } from "react-router-dom";

import "./not-found.css";

export default function NotFound() {
  return (
    <section className="notFound">
      <div className="404Wrapper">
        <p>...oooops!</p>
        <h2>Page Not Found : </h2>
        <Link to="/" className="takeMeHome">
          Take me Home
        </Link>
      </div>
    </section>
  );
}
