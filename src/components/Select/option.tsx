import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { SelectContext } from './select'

export interface SelectOptionProps {
    index?: string;
    /** 默认根据此属性值进行筛选，该值不能相同*/
    value: string;
    /** 选项的标签，若不设置则默认与 value 相同*/
    label?: string;
    /** 是否禁用该选项*/
    disabled?: boolean;
  }

  export const Option: FC<SelectOptionProps> = ({value, label, disabled, children, index}) => {
    const { onSelect, selectedValues, multiple } = useContext(SelectContext)
    const isSelected = selectedValues && selectedValues.findIndex(option => option.value === value) !== -1
    const classes = classNames('lister-select-item', {
      'is-disabled': disabled,
      'is-selected': isSelected,
    })
    const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
      e.preventDefault()
      if(onSelect && !disabled) {
        onSelect(({value,label}), isSelected)
      }
    }
    return (
      <li key={index} className={classes} onClick={(e) => {handleClick(e, value, isSelected)}}>
        {children || (label ? label: value)}
        {multiple && isSelected && <Icon icon="check"/>}
      </li>
    )
  }
  
  Option.displayName = 'Option'
  
  export default Option;