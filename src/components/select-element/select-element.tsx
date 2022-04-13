import React, { FC, ReactElement } from 'react';

// Styles
import selectStyles from '../select/select.module.css';
import styles from './select-element.module.css';

type TSelectElementProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
  selected?: boolean;
  children: Element | string | ReactElement;
}

const SelectElement: FC<TSelectElementProps> = ({className, onClick, value, selected, children}) => {
  const componentClassName = className + (selected ? ' ' + selectStyles.selected : '');
  const isReactElement = (x: any): x is ReactElement => children;
  if(children instanceof ReactElement ) return <div>{children}</div>
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