import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { clearCallsList, getCallsListThunk, getCallsNexPageThunk } from '../../redux/actions/calls-actions';

import styles from './app.module.css';

import LazyLoad from 'react-lazyload';
import CallsListItem from '../calls-list-item/calls-list-item';
import Sidebar from '../sidebar/sidebar';
import Select from '../select/select';
import SelectElement from '../select-element/select-element';
import PeriodInput from '../period-input/period-input';
import calculatePeriod from '../../utils/calculate-period';
import Header from '../header/header';
import { TListItem } from '../../types';

type TFormState = { 
  type: string;
  period: string;
}

function App() {
  const [formState, setFormState] = useState<TFormState>({type: '', period: '3'});
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const {
    callsList,
    getNextPageRequest,
    getCallsRequestFailed,
    getCallsRequestSuccess,
    error_msg,
    pagesCount,
  } = useSelector(store => store.callsListState);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNoteElementRef = useCallback((node: any) => {
    if (getNextPageRequest || page === pagesCount) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [getNextPageRequest, page, pagesCount]);

  useEffect(() => {
    const period = calculatePeriod(formState.period);
    if (period.success) {
      dispatch(getCallsListThunk(period.dateStart, period.dateEnd, formState.type));
    }
    else dispatch(clearCallsList());
  }, [dispatch, formState]);

  useEffect(() => {
    const period = calculatePeriod(formState.period);
    if (period.success && page) {
      dispatch(getCallsNexPageThunk(period.dateStart, period.dateEnd, formState.type, page));
    }
  }, [dispatch, formState, page])

  const onFormChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setFormState({...formState, [name]: value === '_' ? '' : value});
  }

  const onPeriodInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({...formState, period: e.target.value});
  }

  return (
    <div className ={styles.wrapper}>
      <Sidebar />
      <div className ={styles.mainBlock}>
        <Header />
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
                <PeriodInput onChange={onPeriodInputChange}/>
              </SelectElement>
            </Select>
          </form>
            
          
          <div className={`${styles.listWrapper}`}>
            <div className={`${styles.listHeader} ${styles.grid}`}>
              <div>Тип</div> 
              <div>Время</div> 
              <div>Сотрудник</div> 
              <div>Звонок</div>
              <div>Источник</div>
              <div>Длительность</div> 
            </div>
            {getCallsRequestSuccess && (
              callsList.map((item, index) => {
                if (index !== callsList.length - 1) return <CallsListItem className={styles.grid} item={item} key={item.id} />
                else return <CallsListItem className={styles.grid} item={item} key={item.id} wrapperRef={lastNoteElementRef} />
            })
            )}
            {getCallsRequestFailed && (
              <p>{error_msg}</p>
            )}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
