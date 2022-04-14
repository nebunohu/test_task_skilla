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
  const componentClassName = className ? className : '' + (selected ? ' ' + selectStyles.selected : '');
  const isReactElement = (x: typeof children): x is ReactElement => (x as ReactElement).props !== undefined;

  if( isReactElement(children) ) return <div>{children}</div>
  
  return (
    <div 
      className={componentClassName} 
      onClick={onClick}
      data-value={value}
    >
      {children}
    </div>
  );
};

export default SelectElement;