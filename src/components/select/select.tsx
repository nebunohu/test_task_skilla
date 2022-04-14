import React, { FC, useEffect, useRef } from 'react';

// Components

// Styles
import styles from './select.module.css';

type TSelectProps = {
  children?: Array<any> | Element | String;
  defaultValue?: string;
  value?: string;
  renderValue?: string;
  name?: string;
  id?: string;
  onChange?: (e: any) => void;
}

const Select: FC<TSelectProps> = ({ children, defaultValue, name, renderValue, id, onChange }) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  const onSelectClickHandler = () => {
    selectorRef.current?.classList.add(styles.open);
  }

  const onCustomOptionClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set;

    if ( selectorRef.current ) {
      selectorRef.current.querySelector(`.${styles.customOption}.${styles.selected}`)?.classList.remove(styles.selected);
      target.classList.add(styles.selected);
      const selectorRenderValueContainer = target.closest(`.${styles.select}`)!.querySelector(`[class='${styles.selectTrigger}'] span`);

      if ( selectorRenderValueContainer )selectorRenderValueContainer.textContent = target.textContent;

      const selectorInput = target.closest(`.${styles.select}`)?.querySelector(`input`);

      if ( selectorInput ) {
        nativeInputValueSetter!.call(selectorInput, target.dataset.value ? target.dataset.value : '');
        const inputEvent = new Event('input', { bubbles: true});
        selectorInput.dispatchEvent(inputEvent);
      }

      if ( !target.querySelector('.period-input') && !target.closest('.period-input') )selectorRef.current.classList.remove(styles.open);
    }
  }

  return (
    <div className={`${styles.wrapper}`} onClick={onSelectClickHandler}>
      <div className={`${styles.select}`} ref={selectorRef}>
          <div className={`${styles.selectTrigger}`}>
              
              <span>{renderValue ? renderValue : ''}</span>
              <div className={`${styles.arrow}`}></div>
          </div>
          <input className={`${styles.selectInput}`} id={id} tabIndex={-1} type='text' value={defaultValue} name={name} onChange={onChange} ref={inputRef}/>
          <div className={`${styles.customOptions}`} onClick={onCustomOptionClickHandler}>
              {children}
          </div>
      </div>
    </div>
  );
};

export default Select;