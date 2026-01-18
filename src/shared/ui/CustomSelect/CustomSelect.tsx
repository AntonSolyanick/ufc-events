import Select, { SingleValue, StylesConfig } from "react-select";
import { SelectOption } from "./model/types";

interface SelectProps {
  options: SelectOption[];
  selectHandler: (selectedOption: SingleValue<SelectOption>) => void;
  value?: SingleValue<SelectOption>;
}

export const controlStyles: StylesConfig<SelectOption, false> = {
  control: (provided) => ({
    ...provided,
    background: "var(--secondary-bg-color-selected)",
    color: "white",
    border: "none",
    borderRadius: "3px",
    boxShadow: "var(--box-shadow)",
    outline: "none",
    width: "250px",
    paddingLeft: "8px",
    justifyContent: "center",
    minHeight: "40px",
    cursor: "pointer",
    fontFamily: "sans-serif",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  option: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
};

export const CustomSelect = (props: SelectProps) => {
  const { options, selectHandler, value } = props;
  return (
    <Select
      options={options}
      onChange={selectHandler}
      value={value}
      styles={controlStyles}
    ></Select>
  );
};
