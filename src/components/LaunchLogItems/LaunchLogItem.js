import { useState } from "react";
import Modal from "react-modal";
import LaunchItemModal from "../LaunchItemModal/LaunchItemModal";

function LaunchLogItem({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#FFF",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  };
  const date = new Intl.DateTimeFormat("default", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(data.launch_date_utc));

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(!modalIsOpen)}
        style={customStyles}
        appElement={document.querySelector("tr")}
      >
        <LaunchItemModal data={data} launchDate={date} />
      </Modal>
      <tr onClick={() => setIsOpen(!modalIsOpen)}>
        <td>
          {data.flight_number < 10
            ? `0${data.flight_number}`
            : data.flight_number}
        </td>
        <td>{date}</td>
        <td>{data.launch_site.site_name}</td>
        <td>{data.mission_name}</td>
        <td>{data.rocket.second_stage.payloads[0].orbit}</td>
        <td className="status">
          {data.launch_success ? (
            <button className="success">Success</button>
          ) : !data.upcoming ? (
            <button className="failed">Failed</button>
          ) : (
            <button className="upcoming">Upcoming</button>
          )}
        </td>
        <td>{data.rocket.rocket_name}</td>
      </tr>
    </>
  );
}

export default LaunchLogItem;
