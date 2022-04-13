import React, { FC, useState, createContext, useRef, FunctionComponentElement, useEffect } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import { SelectOptionProps } from "./option";

export interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue?: string[];
  /** 选择框默认文字*/
  placeholder?: string;
  /** 是否禁用*/
  disabled?: boolean;
  /** 是否支持多选*/
  multiple?: boolean;
  /** select input 的 name 属性	 */
  name?: string;
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: SelectOptionProps, selectedValues: SelectOptionProps[]) => void;
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
}

export interface ISelectContext {
  onSelect?: (option: SelectOptionProps, isSelected?: boolean) => void;
  selectedValues: SelectOptionProps[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] });

const findElement = (array: string[], children: React.ReactNode) => {
  return React.Children.map(children, (child, i) => {
    const childElement = child as FunctionComponentElement<SelectOptionProps>;
    if (childElement.type.displayName === "Option") {
      console.log(childElement);
      if (array.includes(childElement.props.value)) {
        return {
          label: childElement.props.label,
          value: childElement.props.value,
        };
      }
    }
  });
};

const Select: FC<SelectProps> = (props) => {
  const { defaultValue, placeholder, disabled, multiple, name, onChange, onVisibleChange, children } = props;
  const input = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const containerWidth = useRef(0);
  const [menuOpen, setOpen] = useState(false);
  let defaultSingleOption = null,
    defalutMultipleOptions = null; //单选模式下默认值
  let targetElementArr = findElement(defaultValue || [], children);
  if (!multiple) {
    defaultSingleOption = targetElementArr ? targetElementArr[0] : null;
  } else {
    defalutMultipleOptions = targetElementArr;
  }
  const [selectedValues, setSelectedValues] = useState<SelectOptionProps[]>(multiple && Array.isArray(defaultValue) ? (defalutMultipleOptions || []) : []);
  const [value, setValue] = useState(defaultSingleOption?.label ? defaultSingleOption?.label : defaultSingleOption?.value);
  const handleOptionClick = (option: SelectOptionProps, isSelected?: boolean) => {
    const { value, label } = option;
    // update value
    if (!multiple) {
      setOpen(false);
      setValue(label ? label : value);
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    } else {
      setValue("");
    }
    let updatedValues: SelectOptionProps[] = [option];
    // click again to remove selected when is multiple mode
    if (multiple) {
      updatedValues = isSelected ? selectedValues.filter((v) => v.value !== value) : [...selectedValues, option];
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(option, updatedValues);
    }
  };
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });
  useClickOutside(containerRef, () => {
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>;
      if (childElement.type.displayName === "Option") {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        });
      } else {
        console.error("Warning: Select has a child which is not a Option component");
      }
    });
  };
  const containerClass = classNames("lister-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="lister-select-input" onClick={handleClick}>
        <Input ref={input} placeholder={placeholder} value={value} readOnly icon="angle-down" disabled={disabled} name={name} />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="lister-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div className="lister-selected-tags" style={{ maxWidth: containerWidth.current - 32 }}>
          {selectedValues.map((option, index) => {
            return (
              <span className="lister-tag" key={`tag-${index}`}>
                {option.label ? option.label : option.value}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(option, true);
                  }}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

Select.defaultProps = {
  name: "lister-select",
  placeholder: "请选择",
};

export default Select;
