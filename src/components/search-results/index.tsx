import { useRef, useState } from "react";
import Input from "../../UI/input";
import Select from "../../UI/select";
import { Product, SearchResultProps } from "../../types";
import "./search-results.css";
import ReactPaginate from "react-paginate";

export default function SearchResult({
  searchInputValue,
  results,
}: SearchResultProps) {
  const [filterInputValue, setFilterInputValue] = useState("");
  const filterInputRef = useRef(null);

  function handleFilterSearchSubmit() {
    console.log(filterInputValue);
  }

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = results.slice(itemOffset, itemOffset + itemsPerPage);
  const pageCount = Math.ceil(results.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % results.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="search-result">
      <div className="search-prompt block">
        <h1>{searchInputValue}</h1>
      </div>

      <div className="result-section block">
        <div className="guitar-image">
          <p>Картинка</p>
        </div>
        <div className="result-content">
          <div className="filters">
            <Input
              type={"result-search"}
              ref={filterInputRef}
              value={filterInputValue}
              setValue={setFilterInputValue}
              onSubmit={handleFilterSearchSubmit}
              placeholder={""}
            />
            <Select options={["По возрастанию", "По убыванию"]} />
          </div>
          <div className="results-pagination">
            <div className="results">
              {results.length === 0 ? (
                <div className="loading">
                  <h2>Loading</h2>
                  <i className="bi bi-slash-circle"></i>
                  <i className="bi bi-circle"></i>
                  <i className="bi bi-slash-circle"></i>
                </div>
              ) : (
                currentItems.map((result: Product, index: number) => (
                  <div key={index} className="result-item">
                    <h3>{result.productName.toLocaleLowerCase()}</h3>
                    <p>{result.productPrice}</p>
                    <a
                      href={result.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Product
                    </a>
                  </div>
                ))
              )}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=""
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel=""
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
