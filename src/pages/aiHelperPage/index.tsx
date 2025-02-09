import { useRef, useState } from "react";
import "./ai-helper.css";
import Input from "../../UI/input";
import anime from "animejs";

export default function AiHelperPage() {
  const [searchAiInputValue, setSearchAiInputValue] = useState("");
  const [Messages, setMessages] = useState<Array<string>>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFirstSend, setIsFirstSend] = useState(true);

  const resultRef = useRef(null);
  const inputRef = useRef(null);

  const tips: Array<string> = [
    "Лучшая гитара для начинающего",
    "С какого инструмента начать?",
    "Покажи самые популярные музыкальные магазины",
  ];

  function handleSearchSubmit() {
    setIsDisabled(true);

    if (isFirstSend) {
      anime({
        targets: [".ai-search-tips, .search-tip"],
        opacity: [1, 0],
      });
      const tl = anime.timeline({
        easing: "easeOutQuart",
      });
      tl.add({
        targets: [".bi-binoculars"],
        color: "var(--secondary-color)",
        duration: 250,
      });
      tl.add({
        targets: ["input"],
        background: "var(--main-color)",
        duration: 250,
      });
      tl.add({
        targets: resultRef.current,
        easing: "easeInOutBack",
        opacity: [0, 1],
        scale: [0.9, 1],
        height: ["80%", "85vh"],
        complete: function () {
          setIsDisabled(false);
          setSearchAiInputValue("");
        },
      });
      tl.add({
        targets: [inputRef.current, ".bi-binoculars"],
        translateY: ["0%", "60vh"],
        duration: 500,
        easing: "easeOutQuart",
      });
      setIsFirstSend(false);
    }
    setMessages((prevMessages) => [...prevMessages, searchAiInputValue]);

    setIsDisabled(false);
  }

  return (
    <main>
      <div className="ai-search-part">
        <div className="search-tip">
          <h2>Спросите любой вопрос про музыкальные инструменты у ии</h2>
        </div>

        <div className="ai-search">
          <Input
            type={"ai-search"}
            ref={inputRef}
            value={searchAiInputValue}
            setValue={setSearchAiInputValue}
            onSubmit={handleSearchSubmit}
            placeholder={"Сообщение для ИИ"}
            isDisabled={isDisabled}
          />
          <div className="ai-search-tips">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="ai-search-tip"
                onClick={() => !isDisabled && setSearchAiInputValue(tip)}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>

        {
          <div ref={resultRef} className="ai-search-result">
            {Messages.map((message) => {
              return <div className="user-prompt">{message}</div>;
            })}
          </div>
        }
      </div>
    </main>
  );
}
