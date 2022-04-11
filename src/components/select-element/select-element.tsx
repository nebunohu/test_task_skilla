import React, { FC } from 'react';

type TSelectElementProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string
}

const SelectElement: FC<TSelectElementProps> = ({className, onClick, value}) => {
  return (
    <span 
      className={className} 
      onClick={onClick}
      data-value={value}
    >
      {value}
    </span>
  );
};

export default SelectElement;