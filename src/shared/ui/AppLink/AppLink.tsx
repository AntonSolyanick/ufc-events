import Link, { LinkProps } from "next/link";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.css";
import { usePathname } from "next/navigation";

interface AppLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
  const { href, className, children, ...otherProps } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  const mods = {
    [cls.active]: isActive,
  };

  return (
    <Link
      className={classNames(cls.AppLink, mods, [className])}
      href={href}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
