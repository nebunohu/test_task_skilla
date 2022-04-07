import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { getCallsListThunk } from '../../redux/actions/calls-actions';

import styles from './app.module.css';

import LazyLoad from 'react-lazyload';
import CallsListItem from '../calls-list-item/calls-list-item';

function App() {
  const dispatch = useDispatch();
  const { callsList } = useSelector(store => store.callsListState);
  useEffect(() => {
    dispatch(getCallsListThunk('2022-03-01', '2022-04-01', ''));
  }, []);
  return (
    <div className ={styles.wrapper}>
      {callsList.map((item, index) => {
        return (
          <LazyLoad height="100%" offset={200} placeholder={<div style={{height: "100%", width: "100%"}}></div>} key={item.id}><CallsListItem item={item}/></LazyLoad>
        )
      })}
    </div>
  );
}

export default App;
