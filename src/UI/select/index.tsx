import "./select.css";

type SelectProps = {
  options: Array<string>;
};

export default function Select({ options }: SelectProps) {
  return (
    <div className="select-container">
      <select>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      <i className="bi bi-caret-down-fill" ></i>
    </div>
  );
}
