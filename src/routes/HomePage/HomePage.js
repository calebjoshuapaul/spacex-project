import React from "react";
import LaunchLog from "../../components/LaunchLogContainer/LaunchLog";
import Pagination from "../../components/Pagination/Pagination.js";
import "./HomePage.styles.scss";

function HomePage() {
  return (
    <div className="homePage">
      <LaunchLog />
      <Pagination />
    </div>
  );
}

export default HomePage;
