import anime from "animejs";
import "./header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const openDialog = () => {
    setIsOpen(false);
    anime({
      targets: ".info-section",
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutSine",
    });
  };

  const closeDialog = () => {
    setIsOpen(true);
    anime({
      targets: ".info-section",
      opacity: [1, 0],
      duration: 500,
      easing: "cubicBezier(.5, .05, .3, .1)",
    });
  };

  return (
    <header>
      <div className="logo"></div>
      <div className="route-switch block">
        <Link
          to={"/ai-helper"}
          onClick={() => setIsActive(true)}
          className={isActive ? "link active" : "link"}
        >
          ИИ помощник
        </Link>

        <Link
          to={"/search"}
          onClick={() => setIsActive(false)}
          className={!isActive ? "link active" : "link"}
        >
          Поиск
        </Link>
      </div>
      <div className="content">
        <div className="name block" onClick={isOpen ? openDialog : closeDialog}>
          <h3>ИнструМания</h3>
          <i className="bi bi-info-circle-fill" style={{ scale: "1.2" }}></i>
        </div>
        <div className="info-section block">
          <h4>Информация о сайте</h4>
        </div>
      </div>
    </header>
  );
}
