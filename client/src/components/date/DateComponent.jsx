import PropTypes from "prop-types";
export default function DateComponent({ dateString }) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Ooc",
    "Nov",
    "Dec",
  ];
  const dateObject = new Date(dateString);

  // const year = dateObject.getFullYear();
  const nameOfTheMonth = dateObject.getMonth();
  const dayOfTheWeek = dateObject.getDay();
  const dateOfTheMonth = dateObject.getDate();

  return (
    <p className="publishedAt">
      {dayNames[dayOfTheWeek - 1] +
        ` ` +
        monthNames[nameOfTheMonth] +
        ` ` +
        dateOfTheMonth}
    </p>
  );
}

DateComponent.propTypes = {
  dateString: PropTypes.string.isRequired,
};
