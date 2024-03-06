import { createContext, useEffect, useState } from "react";
import { liberal, moderate, conservative } from "./mediaOutlets";
import PropTypes from "prop-types";

const SliderSelectorContext = createContext();

const SliderSelectorProvider = ({ children }) => {
  let [sliderValue, setSliderValue] = useState(50);
  let [mediaOutletsSelection, setMediaOutletsSelection] = useState(moderate);

  useEffect(() => {
    switch (sliderValue) {
      case 0:
        setMediaOutletsSelection(liberal);
        break;
      case 50:
        setMediaOutletsSelection(moderate);
        break;
      case 100:
        setMediaOutletsSelection(conservative);
        break;
      default:
        throw new Error(
          "Unexpected sliderValue: " +
            sliderValue +
            ". Slider value must be either 0, 50 or 100"
        );
    }
  }, [mediaOutletsSelection, sliderValue]);

  return (
    <SliderSelectorContext.Provider
      value={{
        sliderValue,
        setSliderValue,
        mediaOutletsSelection,
      }}
    >
      {children}
    </SliderSelectorContext.Provider>
  );
};

export { SliderSelectorContext, SliderSelectorProvider };

SliderSelectorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
