import { InputHTMLAttributes } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = (props: InputProps) => {
  const { className, value, type = "text", placeholder, ...otherProps } = props;

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
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
