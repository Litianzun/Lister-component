import React from "react";
import classNames from "classnames";
import Icon, { IconProps } from "../Icon/icon";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

type types = "primary" | "default" | "danger" | "link";
type size = "lg" | "sm" | "ml";

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: size;
  btnType?: types;
  href?: string;
  icon?: React.ReactElement<IconProps>;
  loading?: boolean;
  children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, className, href, children, icon, loading, ...restProps } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`btn-icon`]: icon || !!loading,
    disabled: (btnType === "link" && disabled) || !!loading,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {loading ? <Icon icon="spinner" spin /> : icon}
        {children}
      </button>
    );
  }
};

export default Button;

Button.defaultProps = {
  disabled: false,
  btnType: "default",
  size: "ml",
  loading: false,
};
