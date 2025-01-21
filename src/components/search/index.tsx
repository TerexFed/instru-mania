import { useEffect, useRef, useState } from "react";
import Input from "../../UI/input";
import "./search.css";
import anime from "animejs";
import SearchResult from "../search-results";
import { Products } from "../../types";

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState("");

  const [results, setResults] = useState<Products>([]);

  const [showResults, setShowResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const inputRef = useRef(null);

  function handleSearchSubmit() {
    setIsDisabled(true);

    anime({
      targets: [".search-tip", ".input-container"],
      opacity: [1, 0],
      duration: 1000,
      complete: () => {
        setShowResults(true);
      },
    });

    const eventSource = new EventSource(
      `http://localhost:3000/search?userInput=${searchInputValue}`
    );

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.done) {
        eventSource.close();
      } else if (
        parsedData.productName &&
        parsedData.productPrice &&
        parsedData.productLink
      ) {
        setResults((prevResults) => [...prevResults, parsedData]);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };
  }

  useEffect(() => {
    if (showResults) {
      anime({
        targets: ".search-result",
        opacity: [0, 1],
        duration: 1500,
        easing: "easeOutExpo",
        translateY: [150, 0],
      });
      anime({
        targets: ".loading i",
        opacity: [0.5, 1],
        keyframes: [
          { translateX: 0, translateY: 0 },
          { translateX: 0, translateY: -40 },
          { translateX: 40, translateY: -40 },
          { translateX: 60, translateY: 0 },
          { translateX: 40, translateY: 40 },
          { translateX: 0, translateY: 60 },
          { translateX: -40, translateY: 40 },
          { translateX: -60, translateY: 0 },
          { translateX: -40, translateY: -40 },
          { translateX: 0, translateY: 0 },
        ],
        scale: function (el: unknown, i: number, l: number) {
          return l - i + 0.25;
        },
        rotate: function () {
          return anime.random(-360, 360);
        },
        borderRadius: function () {
          return ["50%", anime.random(10, 35) + "%"];
        },
        duration: 2000,
        easing: "easeInOutSine",
        loop: true,
        delay: anime.stagger(200),
      });
    }
  }, [showResults]);

  return (
    <main>
      {!showResults && (
        <>
          <div className="search-tip">
            <h2>
              Введите модель музыкального инструмента, которого вы бы хотели
              найти
            </h2>
          </div>

          <Input
            type={"main-search"}
            ref={inputRef}
            value={searchInputValue}
            setValue={setSearchInputValue}
            onSubmit={handleSearchSubmit}
            placeholder={"Например, Ibanez RG421-MOL"}
            isDisabled={isDisabled}
          />
        </>
      )}

      {showResults && (
        <SearchResult
          searchInputValue={searchInputValue}
          setShowResults={setShowResults}
          setIsDisabled={setIsDisabled}
          setResults={setResults}
          results={results}
        ></SearchResult>
      )}
    </main>
  );
}
