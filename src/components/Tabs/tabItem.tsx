import React from "react";
import classNames from "classnames";

export interface TabItemProps {
  label: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { className, style, children } = props;
  const classes = classNames("viking-tab-panel", className);
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

TabItem.displayName = "TabItem";

export default TabItem;
