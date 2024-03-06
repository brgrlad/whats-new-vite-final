import "./loading-spinner.css";
import loadingAnimation from "../../assets/icons/loading-animation.gif";

export default function LoadingSpinner() {
  return (
    <div className="loadingSpinner">
      <p>Loading... </p>
      <img src={loadingAnimation} alt="loading animation spinner" />
    </div>

    // if error from API, then add re-try button???
  );
}
