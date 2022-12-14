import { useContext, useEffect, useState } from "react";
import { LaunchesContext } from "../../context/LaunchesContext";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import Modal from "react-modal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./FilterComponent.styles.scss";

function FilterComponent() {
  const { launchData, setFilteredData } = useContext(LaunchesContext);
  const [launchOption, setLaunchOption] = useState("launches");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFF",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  };

  const handleRangeSubmit = () => {
    const endDate = duration[0].endDate;
    const startDate = duration[0].startDate;
    (async () => {
      await fetch(
        `https://api.spacexdata.com/v3/launches?start=${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getUTCDate()}&end=${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getUTCDate()}`
      )
        .then((res) => res.json())
        .then((data) => setFilteredData(data));
    })();
  };

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
        <button className="range__btn" onClick={() => setIsOpen(!modalIsOpen)}>
          Adjust Range
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(!modalIsOpen)}
          contentLabel="Date Picker Modal"
          style={customStyles}
          appElement={document.querySelector(".filterComponent")}
        >
          <div className="modal__container">
            <DateRangePicker
              months={1}
              ranges={duration}
              direction="horizontal"
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              onChange={(duration) => setDuration([duration.selection])}
            />
            <button className="submitRange__btn" onClick={handleRangeSubmit}>
              SEARCH
            </button>
          </div>
        </Modal>
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
