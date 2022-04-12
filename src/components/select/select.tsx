import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

// Components

// Styles
import styles from './select.module.css';

type TSelectProps = {
  children?: Array<any> | Element | String;
  defaultValue?: string;
  value?: string;
  renderValue?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Select: FC<TSelectProps> = ({ children, defaultValue, name, renderValue, onChange }) => {
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ClickHandler = (event: MouseEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        selectorRef.current?.classList.remove(styles.open);
      }
    };

    document.addEventListener('click', ClickHandler);
    const customOptionsWrapper = selectorRef.current?.querySelector(`[class='${styles.customOptions}']`);
    if(customOptionsWrapper) {
      for(let i = 0; i < customOptionsWrapper?.children.length; i++) {
        customOptionsWrapper.children[i].classList.add(`${styles.customOption}`);
      }
    }
    return () => {
      document.removeEventListener('click', ClickHandler);
    }
  }, []);
  const onSelectClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    
    selectorRef.current?.classList.add(styles.open);
    const input = selectorRef.current?.querySelector('input');
    if(input) input.focus();
  }

  const onCustomOptionClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if(selectorRef.current) {
      selectorRef.current.querySelector(`.${styles.customOption}.${styles.selected}`)?.classList.remove(styles.selected);
      target.classList.add(styles.selected);
      const selectorRenderValueContainer = target.closest(`.${styles.select}`)!.querySelector(`[class='${styles.selectTrigger}'] span`);
      if( selectorRenderValueContainer )selectorRenderValueContainer.textContent = target.textContent;
      const selectorInput = target.closest(`.${styles.select}`)?.querySelector(`input`);
      if( selectorInput ) {
        selectorInput.value = target.dataset.value ? target.dataset.value : '';
        selectorInput.blur();
      }
      selectorRef.current.classList.remove(styles.open);
    }
  }

  return (
    <div className={`${styles.wrapper}`} onClick={onSelectClickHandler}>
      <div className={`${styles.select}`} ref={selectorRef}>
          <div className={`${styles.selectTrigger}`}>
              
              <span>{renderValue ? renderValue : ''}</span>
              <div className={`${styles.arrow}`}></div>
          </div>
          <input type='text' value={defaultValue} name={name} onBlur={onChange}/>
          <div className={`${styles.customOptions}`} onClick={onCustomOptionClickHandler}>
              {children}
          </div>
      </div>
    </div>
  );
};

export default Select;