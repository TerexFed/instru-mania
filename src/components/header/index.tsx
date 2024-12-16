import { useEffect, useRef } from "react";
import anime from "animejs";
import "./header.css";

export default function Header() {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  useEffect(() => {
    anime({
      targets: dialogRef.current,
      translateY: [-100, 0], 
      duration: 1000,
      easing: 'cubicBezier(.5, .05, .3, .5)',
    });
  }, []);

  return (
    <header>
      <div className="logo"></div>
      <div className="name block" onClick={openDialog}>
        <h3>ИнструМания</h3>
        <i className="bi bi-info-circle-fill" style={{ scale: "1.2" }}></i>
      </div>
      <dialog ref={dialogRef}>
        <i onClick={closeDialog} className="bi bi-x-octagon"></i>
        <div className="dialog-content">
          <h3>Информация про "ИнструМания"</h3>
        </div>
      </dialog>
    </header>
  );
}
