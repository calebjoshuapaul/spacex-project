import { useContext } from "react";
import { LaunchesContext } from "../../context/LaunchesContext";
import "./Pagination.styles.scss";

function Pagination() {
  const { currentPage, setCurrentPage, launchData } =
    useContext(LaunchesContext);

  const paginationRangeLength = Math.ceil(launchData.length / 20);
  const paginationRangeArray = (() => {
    let i = 1;
    const result = [];
    for (i; i <= paginationRangeLength; i++) {
      result.push(i);
    }
    return result;
  })();

  const handlePageSet = (event) => {
    if (event.target.innerHTML === "Prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (event.target.innerHTML === "Next") {
      setCurrentPage(currentPage + 1);
    } else if (Number(event.target.innerHTML)) {
      setCurrentPage(Number(event.target.innerHTML));
    }
  };

  return (
    <div className="pagination">
      <div onClick={handlePageSet} className="pagination__container">
        <span>Prev</span>
        {paginationRangeArray.map((range) => {
          return <span key={range}>{range}</span>;
        })}
        <span>Next</span>
      </div>
    </div>
  );
}

export default Pagination;
