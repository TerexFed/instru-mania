import { useRef, useState } from "react";
import Input from "../../UI/input";
import Select from "../../UI/select";
import { Product, SearchResultProps } from "../../types";
import "./search-results.css";
import ReactPaginate from "react-paginate";

import MuztorgLogo from "../../assets/shops-logo/muztorg.svg";
import GuitarClub from "../../assets/shops-logo/guitar-club.svg";
import SkifMusic from "../../assets/shops-logo/skifmusic.svg";
import PopMusic from "../../assets/shops-logo/pop-music.svg";
import JazzShop from "../../assets/shops-logo/jazz-shop.svg";
import DjStore from "../../assets/shops-logo/djstore.svg";

export default function SearchResult({
  searchInputValue,
  results,
  setShowResults,
  setIsDisabled,
  setResults,
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

  function chooseShopLogo(website: string) {
    switch (website) {
      case "https://www.muztorg.ru":
        return MuztorgLogo;

      case "https://gitaraclub.ru":
        return GuitarClub;

      case "https://skifmusic.ru":
        return SkifMusic;

      case "https://pop-music.ru":
        return PopMusic;

      case "https://jazz-shop.ru":
        return JazzShop;

      case "https://www.dj-store.ru":
        return DjStore;
    }
  }

  return (
    <div className="search-result">
      <div className="search-prompt">
        <h1>{searchInputValue}</h1>
        <div className="back-button">
          <p
            onClick={() => {
              setShowResults(false);
              setIsDisabled(false);
              setResults([]);
            }}
          >
            Назад
          </p>
          <i className="bi bi-box-arrow-in-left"></i>
        </div>
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
            <div className="selects">
              <Select options={["По возрастанию", "По убыванию"]} />
              <Select
                options={["Все магазины", ...Array.from(
                  new Set(results.map((result) => result.website))
                )]}
              />
            </div>
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
                  <div
                    key={index}
                    className="result-item"
                    onClick={() => window.open(result.productLink, "_blank")}
                  >
                    <img
                      className="shop-logo"
                      src={chooseShopLogo(result.website)}
                      alt="123"
                    />
                    <h3 className="result-name">
                      {result.productName.toLocaleLowerCase()}
                    </h3>
                    <p>{result.productPrice}</p>
                  </div>
                ))
              )}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="🢡"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="🢠"
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
