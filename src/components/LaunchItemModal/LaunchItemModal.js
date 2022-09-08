import NasaLogo from "../../assets/NasaLogo.png";
import WikipediaLogo from "../../assets/WikipediaLogo.png";
import YouTubeLogo from "../../assets/YouTubeLogo.png";
import "./LaunchItemModal.styles.scss";

function LaunchItemModal({ data, launchDate }) {
  return (
    <div className="launchModal">
      <div className="launchModal__header">
        <img src={data.links.mission_patch_small} alt="Mission patch" />
        <div className="launchModal__headerInfo">
          <h3>{data.mission_name}</h3>
          <p>{data.rocket.rocket_name}</p>
          <a href={data.links.article_link}>
            <img src={NasaLogo} alt="Nasa Logo" />
          </a>
          <a href={data.links.wikipedia}>
            <img src={WikipediaLogo} alt="Wikipedia Logo" />
          </a>
          <a href={data.links.video_link}>
            <img src={YouTubeLogo} alt="YouTube Logo" />
          </a>
        </div>
        {data.launch_success ? (
          <button className="success">Success</button>
        ) : !data.upcoming ? (
          <button className="failed">Failed</button>
        ) : (
          <button className="upcoming">Upcoming</button>
        )}
      </div>
      <div className="launchModal__body">
        {data.details ? (
          <p>
            {data.details}. <a href={data.links.wikipedia}>Wikipedia</a>
          </p>
        ) : (
          <p>
            <a href={data.links.wikipedia}>Wikipedia</a>
          </p>
        )}
        <div className="launchModal__bodyInfo">
          <table>
            <tbody>
              <tr>
                <td>Flight Number</td>
                <td>{data.flight_number}</td>
              </tr>
              <tr>
                <td>Mission Name</td>
                <td>{data.mission_name}</td>
              </tr>
              <tr>
                <td>Rocket Type</td>
                <td>{data.rocket.rocket_type}</td>
              </tr>
              <tr>
                <td>Rocket Name</td>
                <td>{data.rocket.rocket_name}</td>
              </tr>
              <tr>
                <td>Manufacturer</td>
                <td>
                  {data.rocket.second_stage?.payloads[1]?.manufacturer
                    ? data.rocket.second_stage?.payloads[1]?.manufacturer
                    : "SpaceX"}
                </td>
              </tr>
              <tr>
                <td>Nationality</td>
                <td>
                  {data.rocket.second_stage?.payloads[1]?.nationality
                    ? data.rocket.second_stage?.payloads[1]?.nationality
                    : "SpaceX"}
                </td>
              </tr>
              <tr>
                <td>Launch Date</td>
                <td>{launchDate}</td>
              </tr>
              <tr>
                <td>Payload Type</td>
                <td>{data.rocket.second_stage.payloads[0].payload_type}</td>
              </tr>
              <tr>
                <td>Orbit</td>
                <td>{data.rocket.second_stage.payloads[0].orbit}</td>
              </tr>
              <tr>
                <td>Launch Site</td>
                <td>{data.launch_site.site_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaunchItemModal;
