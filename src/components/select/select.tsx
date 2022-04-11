import React, { FC, useEffect, useRef } from 'react';

// Components
import SelectElement from '../select-element/select-element';

// Styles
import styles from './select.module.css';

type TSelectProps = {
  children?: Element;
}

const Select: FC<TSelectProps> = ({ children }) => {
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        selectorRef.current?.classList.remove(styles.open);
      }
    });
  }, []);
  const onSelectClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    
    selectorRef.current?.classList.add(styles.open);
  }

  const onCustomOptionClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const target = event.target as Element;
    if(selectorRef.current) {
      selectorRef.current.querySelector(`.${styles.customOption}.${styles.selected}`)?.classList.remove(styles.selected);
      target.classList.add(styles.selected);
      target.closest(`.${styles.select}`)!.querySelector(`.${styles.selectTrigger} span`)!.textContent = target.textContent;
      selectorRef.current.classList.remove(styles.open);
    }
  }

  return (
    <div className={`${styles.wrapper}`} onClick={onSelectClickHandler}>
      <div className={`${styles.select}`} ref={selectorRef}>
          <div className={`${styles.selectTrigger}`}>
              <span>Tesla</span>
              <div className={`${styles.arrow}`}></div>
          </div>
          <div className={`${styles.customOptions}`}>
              <SelectElement 
                className={`${styles.customOption}`}
                value="123" 
                onClick={onCustomOptionClickHandler}
              />
              <span 
                className={`${styles.customOption} ${styles.selected}`} 
                onClick={onCustomOptionClickHandler}
                data-value="tesla"
              >
                Tesla
              </span>
              <span 
                className={`${styles.customOption}`}
                data-value="volvo"
                onClick={onCustomOptionClickHandler}
              >
                Volvo
              </span>
              <span className={`${styles.customOption}`} data-value="mercedes">Mercedes</span>
          </div>
      </div>
    </div>
  );
};

export default Select;