import { ChangeEvent, FC } from "react";
import InputMask from 'react-input-mask';

// Styles
import styles from './period-input.module.css';

type TPeriodInputProps = { 
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PeriodInput: FC<TPeriodInputProps> = ({ onChange}) => {
  return (
    <div className="period-input">
      Указать даты
      <InputMask 
        mask='99.99.99-99.99.99'
        maskChar={'_'}
        placeholder='__.__.__-__.__.__'
        onChange={onChange}
      >
         {(inputProps: any) => <input className={`${styles.periodInput}`} {...inputProps} type='text' />}
      </InputMask>
    </div>
    
  );
};

export default PeriodInput;