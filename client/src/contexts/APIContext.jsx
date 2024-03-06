import { createContext, useContext, useEffect, useReducer } from "react";
import { SliderSelectorContext } from "./SliderSelectorContext";
import PropTypes from "prop-types";
import axios from "axios";

const apiKey = `a9473879d8d44b4c96b956adde579b26`;

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload };

    case "data":
      return { state, data: action.payload };

    case "error":
      return { state, error: action.payload };

    default:
      throw new Error("Invalid action type");
  }
};

const APIContext = createContext();

const APIProvider = ({ children }) => {
  let { mediaOutletsSelection } = useContext(SliderSelectorContext);

  // EXTRACTING IDs TO COMPOSE URL
  let mediaOutletsSelectionArray = mediaOutletsSelection.map(
    (outlet) => outlet.id
  );

  let URL = `https://newsapi.org/v2/top-headlines?sources=${mediaOutletsSelectionArray}&language=en&pageSize=60&apiKey=${apiKey}`;

  //DESTRUCTURING THE STATE PROPERTIES
  const [{ isLoading, data, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading", payload: true });
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        let res = await axios(URL, { signal: controller.signal });
        dispatch({ type: "data", payload: res.data.articles });
        console.log(res);
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        console.log(`API call failed: ${[err, "from API"]}`);
      } finally {
        // dispatch is triggering re-load?
        dispatch({ type: "loading", payload: false });
        controller.abort();
      }
    };

    fetchAPI();
  }, [URL]);

  return (
    //When you use APIContextProvider to wrap your component tree, it sets up the context provider and makes the context value available to all the components within its subtree.
    <APIContext.Provider
      value={{
        data,
        isLoading,
        error,
      }}
    >
      {/* without udeData() props would have to be passed manually to the children  */}

      {children}
    </APIContext.Provider>
  );
};

let useData = () => {
  //consuming the APIContext and returning its value, so that you can access it in other components

  const context = useContext(APIContext);
  // to access the value, call useData() within the component
  //const { data, isLoading, error } = useData();

  if (context === undefined)
    throw new Error("API context was used outside the API provider");

  return context;
};

export { APIProvider, useData };

APIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
