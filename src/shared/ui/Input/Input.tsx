import { InputHTMLAttributes } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputSize?: "small" | "medium" | "large";
  placeholderJustify?: "start" | "center" | "end";
}

export const Input = (props: InputProps) => {
  const {
    inputSize = "medium",
    className,
    value,
    type = "text",
    placeholder,
    placeholderJustify = "start",
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[inputSize]]: inputSize,
    [cls[placeholderJustify]]: placeholderJustify,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        className={cls.input}
        {...otherProps}
      />
    </div>
  );
};
