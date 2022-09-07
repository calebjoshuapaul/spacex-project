import { useContext, useEffect, useState } from "react";
import { LaunchesContext } from "../../context/LaunchesContext";
import "./FilterComponent.styles.scss";

function FilterComponent() {
  const { launchData, setFilteredData } = useContext(LaunchesContext);
  const [launchOption, setLaunchOption] = useState("launches");

  const handleLaunchOptions = () => {
    setLaunchOption(document.getElementById("launchOptions").value);
  };

  useEffect(() => {
    switch (launchOption) {
      case "upcoming":
        setFilteredData(
          launchData.filter((data) => {
            return data.upcoming;
          })
        );

        break;
      case "successful":
        setFilteredData(
          launchData.filter((data) => {
            return data.launch_success;
          })
        );
        break;
      case "failed":
        setFilteredData(
          launchData.filter((data) => {
            if (!data.upcoming) return !data.launch_success;
            return false;
          })
        );
        break;
      default:
        setFilteredData(launchData);
        break;
    }
  }, [launchOption, launchData, setFilteredData]);

  return (
    <div className="filterComponent">
      <div className="filterByTime">
        <input type="date" id="start" name="launch-start" />
        <input type="date" id="end" name="launch-end" />
      </div>

      <div className="filterByLaunchStatus">
        <select
          defaultValue="launches"
          name="launchOptions"
          id="launchOptions"
          onChange={handleLaunchOptions}
        >
          <option value="launches">All Launches</option>
          <option value="upcoming">Upcoming Launches</option>
          <option value="successful">Successful Launches</option>
          <option value="failed">Failed Launches</option>
        </select>
      </div>
    </div>
  );
}

export default FilterComponent;
