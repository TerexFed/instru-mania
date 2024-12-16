import { useRef, useState } from "react";
import Input from "../../UI/input";
import "./search.css";
import anime from "animejs";
// import anime from "animejs";
// import axios from "axios";

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);

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
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline.add({
      targets: [".search-tip", ".input-container"],
      opacity: [1, 0],
      duration: 1000,
      delay: 0,
    });

    timeline.add({
      targets: ".search-prompt",
      opacity: [0, 1],
      duration: 1500,
      translateY: [0, -250],
    });

  }

  return (
    <main>
      <div className="search-tip block">
        <h2>
          Введите модель музыкального инструмента, которого вы бы хотели найти
        </h2>
      </div>

      <Input
        ref={inputRef}
        value={searchInputValue}
        setValue={setSearchInputValue}
        onSubmit={handleSearchSubmit}
        placeholder={"Например, Ibanez RG421-MOL"}
        disabled={isDisabled}
      />

      <div className="search-prompt block">
        <h1>{searchInputValue}</h1>
      </div>
    </main>
  );
}
