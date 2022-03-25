import React, { useState, createContext } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

type selectCallback = (selectedIndex: string) => void;
type TabType = "line" | "card";
export interface TabProps {
  className?: string;
  defaultIndex?: string;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  type?: TabType;
}

interface ITabContext {
  index: string;
  onSelect?: selectCallback;
  type?: TabType;
}

export const TabContext = createContext<ITabContext>({ index: "0" });

const Tabs: React.FC<TabProps> = (props) => {
  const { className, defaultIndex, style, onSelect, children, type } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const navClass = classNames("viking-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("viking-tabs-nav-item", {
        "is-active": currentActive === index.toString(),
        'disabled': disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(index.toString());
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index.toString() === currentActive) {
        return child;
      }
    });
  };
  return (
    <div className={`viking-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="viking-tabs-content">{renderContent()}</div>
    </div>
  );
};

export default Tabs;

Tabs.defaultProps = {
  defaultIndex: "0",
  type: "line",
};
