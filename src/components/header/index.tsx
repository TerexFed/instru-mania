import "./header.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return location.pathname === "/ai-helper"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <header>
      <div className="logo"></div>
      <div className="info">
        <div className="route-switch block">
          <Link to={"/ai-helper"} className={isActive ? "link active" : "link"}>
            ИИ помощник
          </Link>

          <Link to={"/search"} className={!isActive ? "link active" : "link"}>
            Поиск
          </Link>
        </div>
        <div className="content">
          <div
            className="name block"
          >
            <h3>ИнструМания</h3>
            <i className="bi bi-info-circle-fill" style={{ scale: "1.2" }}></i>
          </div>
        </div>
      </div>
    </header>
  );
}
