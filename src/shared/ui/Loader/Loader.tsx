import { SiUfc } from "react-icons/si";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Loader.module.css";

export enum LoaderSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

interface LoaderProps {
  className?: "string";
  size?: LoaderSize;
}

export const Loader = (props: LoaderProps) => {
  const { className, size = LoaderSize.M } = props;
  const mods = {
    [cls[size]]: size,
  };
  return (
    <div className={classNames(cls.Loader, mods, [className])}>
      <SiUfc />
    </div>
  );
};
