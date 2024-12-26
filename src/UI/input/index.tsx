import { forwardRef } from "react";
import "./input.css";
import { InputProps } from "../../types";



const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, value, setValue, onSubmit, placeholder, isDisabled }: InputProps,
    ref
  ) => {
    function Send() {
      return value !== "" && !isDisabled
        ? onSubmit()
        : () => console.log("Value is empty");
    }

    return (
      <div className="input-container">
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(evt) => evt.key === "Enter" && Send()}
          enterKeyHint="enter"
          maxLength={40}
          placeholder={placeholder}
          disabled={isDisabled}
        />
        <i
          className={
            type === "main-search"
              ? "bi bi-send-fill"
              : type === "result-search"
              ? "bi bi-search"
              : ""
          }
          onClick={Send}
        ></i>
      </div>
    );
  }
);

export default Input;
