import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { getCallsListThunk } from '../../redux/actions/calls-actions';

import styles from './app.module.css';

import LazyLoad from 'react-lazyload';
import CallsListItem from '../calls-list-item/calls-list-item';
import Sidebar from '../sidebar/sidebar';
import Select from '../select/select';

function App() {
  const dispatch = useDispatch();
  const { callsList } = useSelector(store => store.callsListState);
  useEffect(() => {
    dispatch(getCallsListThunk('2022-03-30', '2022-04-01', '0'));
  }, [dispatch]);
  return (
    <div className ={styles.wrapper}>
      <Sidebar />
      <div className ={styles.mainBlock}>
        <header>
          header
        </header>
          
        <div className={`${styles.listWrapper}`}>
          <div className={`${styles.filterWrapper}`}>
            <div>
              <input type='text' name='type'></input>
              <input name='time-period'></input>
              <Select />
            </div>
          </div>
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
  );
}

export default App;
