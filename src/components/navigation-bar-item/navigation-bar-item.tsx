import { FC } from 'react';

import styles from './navigation-bar-item.module.css';

// Media
import resultsSrc from '../../images/results.svg';
import ordersSrc from '../../images/orders.svg';
import messagesSrc from '../../images/messages.svg';
import callsSrc from '../../images/calls.svg';
import counterpartiesSrc from '../../images/counterparties.svg';
import documentsSrc from '../../images/documents.svg';
import executorsSrc from '../../images/executors.svg';
import reportsSrc from '../../images/reports.svg';
import knowledgeBaseSrc from '../../images/knowledge-base.svg';
import settingsSrc from '../../images/settings.svg';

import { NavValues }  from '../../types';

type TNavigationBarItemProps = {
  value: string;
  active?: boolean;
};



const NavigationBarItem: FC<TNavigationBarItemProps> = ({ value, active }) => {
  let imageSrc = '';
  const wrapperClassName = styles.wrapper + (active ? ` ${styles.active}` : '');

  switch (value) {
    case NavValues.results: 
      imageSrc = resultsSrc;
    break;
    case NavValues.orders: 
      imageSrc = ordersSrc;
    break;
    case NavValues.messages: 
      imageSrc = messagesSrc;
    break;
    case NavValues.calls: 
      imageSrc = callsSrc;
    break;
    case NavValues.counterparties: 
      imageSrc = counterpartiesSrc;
    break;
    case NavValues.documents: 
      imageSrc = documentsSrc;
    break;
    case NavValues.executors: 
      imageSrc = executorsSrc;
    break;
    case NavValues.reports: 
      imageSrc = reportsSrc;
    break;
    case NavValues.knowledgeBase: 
      imageSrc = knowledgeBaseSrc;
    break;
    case NavValues.settings: 
      imageSrc = settingsSrc;
    break;
  }
  return (
    <div className={`${wrapperClassName}`}>
      <div className={`${styles.pictureWrapper}`}><img src={imageSrc} alt='' /></div><span>{value}</span>
    </div>
  );
};

export default NavigationBarItem;