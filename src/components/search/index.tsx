import { useEffect, useRef, useState } from "react";
import Input from "../../UI/input";
import "./search.css";
import anime from "animejs";
import Select from "../../UI/select";
// import axios from "axios";

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterInputValue, setFilterInputValue] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const inputRef = useRef(null);
  const filterInputRef = useRef(null);

  function handleSearchSubmit() {
    // axios.post(
    //   "http://localhost:3000/search",
    //   {
    //     userInput: searchInputValue,
    //   },
    //   {
    //     headers: {
    //       Accept: "*/*",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    setIsDisabled(true);

    anime({
      targets: [".search-tip", ".input-container"],
      opacity: [1, 0],
      duration: 1000,
      complete: () => {
        setShowResults(true);
      },
    });
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

  function handleFilterSearchSubmit() {
    console.log(filterInputValue);
  }

  return (
    <main>
      {!showResults && (
        <>
          <div className="search-tip block">
            <h2>
              Введите модель музыкального инструмента, которого вы бы хотели
              найти
            </h2>
            <sup>
              Если не знаете что выбрать воспользуйтесь
              <b>
                <i> ИИ Помощником</i>
              </b>
            </sup>
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
              <div className="loading">
                <h2>Loading</h2>
                <i className="bi bi-slash-circle"></i>
                <i className="bi bi-circle"></i>
                <i className="bi bi-slash-circle"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
