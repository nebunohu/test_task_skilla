import React, { FC } from 'react';

// Styles
import selectStyles from '../select/select.module.css';
import styles from './select-element.module.css';

type TSelectElementProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
  selected?: boolean;
  children: Element | string;
}

const SelectElement: FC<TSelectElementProps> = ({className, onClick, value, selected, children}) => {
  const componentClassName = className + (selected ? ' ' + selectStyles.selected : '');
  return (
    <span 
      className={componentClassName} 
      onClick={onClick}
      data-value={value}
    >
      {children}
    </span>
  );
};

export default SelectElement;