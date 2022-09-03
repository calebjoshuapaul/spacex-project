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
          {perPageLaunchData.map(
            (
              {
                flight_number,
                launch_date_utc,
                launch_site,
                mission_name,
                rocket,
                launch_success,
              },
              index
            ) => {
              return (
                <LaunchLogItem
                  key={index}
                  flight_number={flight_number}
                  launch_date_utc={launch_date_utc}
                  launch_site={launch_site}
                  mission_name={mission_name}
                  rocket={rocket}
                  launch_success={launch_success}
                />
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LaunchLog;
