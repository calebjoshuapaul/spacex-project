import { useContext } from "react";
import { LaunchesContext } from "../../context/LaunchesContext";
import LaunchLogItem from "../LaunchLogItems/LaunchLogItem";
import "./LaunchLog.styles.scss";

function LaunchLog() {
  const { perPageLaunchData } = useContext(LaunchesContext);

  return (
    <div className="launchLog">
      <table className="launchLog__table">
        <thead className="launchLog__tableHead">
          <tr>
            <th>No:</th>
            <th>Launched(UTC)</th>
            <th>Location</th>
            <th>Mission</th>
            <th>Orbit</th>
            <th>Launch Status</th>
            <th>Rocket</th>
          </tr>
        </thead>
        <tbody className="launchLog__tableBody">
          {!perPageLaunchData.length ? (
            <tr>
              <td colSpan={7}>No results found for the specified filter</td>
            </tr>
          ) : (
            perPageLaunchData.map((data, index) => {
              return <LaunchLogItem key={index} data={data} />;
            })
          )}
          {}
        </tbody>
      </table>
    </div>
  );
}

export default LaunchLog;
