import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function isLinkButton(props: LinkProps | NativeButtonProps): props is LinkProps {
  return "href" in props;
}

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary" } = props;
  const className = `${styles.button} ${styles[variant]}`;

  if (isLinkButton(props)) {
    const { href, children: linkChildren, ...linkProps } = props;
    delete linkProps.variant;

    return (
      <a className={className} href={href} {...linkProps}>
        {linkChildren}
      </a>
    );
  }

  const { children: buttonChildren, ...buttonProps } = props;
  delete buttonProps.variant;

  return (
    <button className={className} {...buttonProps}>
      {buttonChildren}
    </button>
  );
}
