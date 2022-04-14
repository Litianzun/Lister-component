import React from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export enum AlertType {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

type types = "success" | "default" | "danger" | "warning";

export interface BaseAlertProps {
  message: React.ReactNode;
  className?: string;
  type?: types;
  description?: React.ReactNode;
  closable?: boolean; //是否显示关闭图标
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { className, message, description, closable, type, onClose } = props;
  const [hidden, setHidden] = React.useState(false);
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  const handleClose = (e: React.MouseEvent) => {
    setHidden(true);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Transition in={!hidden} timeout={300} animation="zoom-in-right" wrapper>
      <div className={classes}>
        <div className="alert-content">
          <div className="alert-message">{message}</div>
          <div className="alert-description">{description}</div>
        </div>
        <Icon className="alert-close-icon" onClick={handleClose} icon={faXmark} style={{ display: closable ? "block" : "none" }} />
      </div>
    </Transition>
  );
};
export default Alert;

Alert.defaultProps = {
  type: "default",
  closable: true,
};
