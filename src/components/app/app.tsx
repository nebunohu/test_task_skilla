import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { getCallsListThunk } from '../../redux/actions/calls-actions';

import styles from './app.module.css';

import LazyLoad from 'react-lazyload';
import CallsListItem from '../calls-list-item/calls-list-item';
import Sidebar from '../sidebar/sidebar';
import Select from '../select/select';
import SelectElement from '../select-element/select-element';
import PeriodInput from '../period-input/period-input';

type TFormState = { 
  type: string;
  period: string;
}

function App() {
  const [formState, setFormState] = useState<TFormState>({type: '', period: '3'});
  const dispatch = useDispatch();
  const { callsList } = useSelector(store => store.callsListState);
  useEffect(() => {
    dispatch(getCallsListThunk('2022-04-09', '2022-04-12', ''));
  }, [dispatch]);

  const onFormChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setFormState({...formState, [name]: value === '_' ? '' : value});
  }
  return (
    <div className ={styles.wrapper}>
      <Sidebar />
      <div className ={styles.mainBlock}>
        <header>
          header
        </header>
        <div className={`${styles.contentWrapper}`}>
          <form 
            className={`${styles.filtersWrapper}`}
            
          >
            <Select
              id='inp1'
              defaultValue=''
              name='type'
              renderValue='Все звонки'
              onChange={onFormChangeHandler}
            >
              <SelectElement 
                value='_' 
                selected
              >
                Все звонки
              </SelectElement>
              <SelectElement 
                value='0' 
              >              
                Входящие
              </SelectElement>
              <SelectElement 
                value='1'
              >
                Исходящие
              </SelectElement>
            </Select>
            <Select
              defaultValue=''
              name='period'
              renderValue='3 дня'
              onChange={onFormChangeHandler}
            >
              <SelectElement 
                value='3' 
                selected
              >
                3 дня
              </SelectElement>
              <SelectElement 
                value='7' 
              >              
                Неделя
              </SelectElement>
              <SelectElement 
                value='30'
              >
                Месяц
              </SelectElement>
              <SelectElement 
                value='30'
              >
                <PeriodInput />
              </SelectElement>
            </Select>
          </form>
            
          
          <div className={`${styles.listWrapper}`}>
            <div className={`${styles.listHeader} ${styles.grid}`}>
              <div>Тип</div> 
              <div>Время</div> 
              <div>Сотрудник</div> 
              <div>Звонок</div>
              <div>Длительность</div> 
            </div>
            {callsList.map((item, index) => {
              return (
                <LazyLoad height="100%" offset={200} placeholder={<div style={{height: "100%", width: "100%"}}></div>} key={item.id}><CallsListItem styles={styles.grid} item={item}/></LazyLoad>
              )
            })}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
