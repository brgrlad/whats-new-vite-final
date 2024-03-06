import PropTypes from "prop-types";
import "../section-divider/section-divider.css";

export default function SectionDivider({ children }) {
  return <div className="sectionDivider"> {children} </div>;
}

SectionDivider.propTypes = {
  children: PropTypes.node.isRequired,
};
