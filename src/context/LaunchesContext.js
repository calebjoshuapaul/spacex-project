import { createContext, useState, useEffect } from "react";

export const LaunchesContext = createContext({
  launchData: [],
  currentPage: 1,
  perPageLaunchData: [],
  filteredData: [],
  setLaunchData: () => null,
  setCurrentPage: () => null,
  setPerPageLaunchData: () => null,
  setFilteredData: () => null,
});

export const LaunchesProvider = ({ children }) => {
  const [launchData, setLaunchData] = useState([]);
  const [filteredData, setFilteredData] = useState(launchData);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLaunchData, setPerPageLaunchData] = useState(filteredData);

  const value = {
    launchData,
    setLaunchData,
    filteredData,
    setFilteredData,
    currentPage,
    setCurrentPage,
    perPageLaunchData,
    setPerPageLaunchData,
  };

  useEffect(() => {
    const launchsApiData = async () => {
      try {
        await fetch("https://api.spacexdata.com/v3/launches")
          .then((response) => response.json())
          .then((data) => setLaunchData(data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log("ERROR: (LaunchesContext) => ", err);
      }
    };
    launchsApiData();
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      setPerPageLaunchData(filteredData.slice(0, currentPage * 20));
    } else {
      setPerPageLaunchData(
        filteredData.slice(currentPage * 20 - 20, currentPage * 20)
      );
    }
  }, [filteredData, currentPage]);

  return (
    <LaunchesContext.Provider value={value}>
      {children}
    </LaunchesContext.Provider>
  );
};
