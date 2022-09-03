import { createContext, useState, useEffect } from "react";

export const LaunchesContext = createContext({
  launchData: [],
  currentPage: 1,
  perPageLaunchData: [],
  setLaunchData: () => null,
  setCurrentPage: () => null,
  setPerPageLaunchData: () => null,
});

export const LaunchesProvider = ({ children }) => {
  const [launchData, setLaunchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLaunchData, setPerPageLaunchData] = useState(launchData);

  const value = {
    launchData,
    setLaunchData,
    currentPage,
    setCurrentPage,
    perPageLaunchData,
    setPerPageLaunchData,
  };

  useEffect(() => {
    const launchsApiData = async () => {
      await fetch("https://api.spacexdata.com/v3/launches")
        .then((response) => response.json())
        .then((data) => setLaunchData(data))
        .catch((err) => console.log(err));
    };
    launchsApiData();
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      setPerPageLaunchData(launchData.slice(0, currentPage * 20));
    } else {
      setPerPageLaunchData(
        launchData.slice(currentPage * 20 - 20, currentPage * 20)
      );
    }
  }, [launchData, currentPage]);

  return (
    <LaunchesContext.Provider value={value}>
      {children}
    </LaunchesContext.Provider>
  );
};
