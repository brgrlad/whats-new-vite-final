import "./sliderSelector.css";
import { useContext } from "react";
import { SliderSelectorContext } from "../../../contexts/SliderSelectorContext";

export default function SliderSelector() {
  let { sliderValue, setSliderValue, mediaOutletsSelection } = useContext(
    SliderSelectorContext
  );

  const handleChange = (e) => {
    // handleChange update slider value that is accessed inside SliderSelectorContext.
    let updatedValue = parseInt(e.target.value);
    setSliderValue(updatedValue);
  };

  return (
    <div className="slider">
      <h2>START EXPLORING!</h2>

      <div className="sourceBiasLabels">
        <p>LIBERAL</p>
        <p>MODERATE</p>
        <p>CONSERVATIVE</p>
      </div>

      <input
        id="sliderInput"
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        step={50}
        onChange={(e) => handleChange(e)}
      />
      <div className="sourcesList">
        <ul>
          {mediaOutletsSelection.map((source) => (
            //remove source on click??????source name
            // setMediaOutletsSelection(prev => {prev.filter()...}); <<<< filter this?

            <li key={source.name}>{source.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
