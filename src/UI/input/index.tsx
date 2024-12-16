import React, { forwardRef } from "react";
import "./input.css";

type InputProps = {
  disabled: boolean;
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, setValue, onSubmit, placeholder, disabled }: InputProps, ref) => {
    return (
      <div className="input-container">
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <i
          className="bi bi-send-fill"
          onClick={
            value !== "" ? onSubmit : () => console.log("Value is empty")
          }
        ></i>
      </div>
    );
  }
);

export default Input;
