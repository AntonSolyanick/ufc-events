import Link, { LinkProps } from "next/link";

interface AppLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
  const { href, className, children, ...otherProps } = props;

  return (
    <Link href={href} {...otherProps}>
      {children}
    </Link>
  );
};
