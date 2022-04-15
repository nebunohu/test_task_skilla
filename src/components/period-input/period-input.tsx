import { ChangeEvent, FC } from "react";
import InputMask from 'react-input-mask';

// Styles
import styles from './period-input.module.css';

// Media
import calendarSrc from '../../images/calendar.svg';

type TPeriodInputProps = { 
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PeriodInput: FC<TPeriodInputProps> = ({ onChange}) => {
  return (
    <div className={`${styles.wrapper} period-input`}>
      Указать даты
      <div className={`${styles.periodInputWrapper}`}>
      <InputMask 
        mask='99.99.99-99.99.99'
        maskChar={'_'}
        placeholder='__.__.__-__.__.__'
        onChange={onChange}
      >
         {(inputProps: any) => <input className={`${styles.periodInput}`} {...inputProps} type='text' />}
      </InputMask>
      <img src={calendarSrc} alt='' />
      </div>
    </div>
    
  );
};

export default PeriodInput;