import { FC } from 'react';

// Styles
import styles from './sidebar.module.css';

import logo from '../../images/logo.svg';
import NavigationBar from '../navigation-bar/navigation-bar';
import Button from '../button/button';

const Sidebar: FC = () => {
  return (
    <aside className={`${styles.wrapper}`}>
        <img className={`${styles.logo}`} src={logo} alt="logo" />
        <NavigationBar />
        <div className={`${styles.buttonsWrapper}`}>
          <Button value='Добавить заказ'/>
          <Button value='Оплата'/>
        </div>
        
    </aside>
  );
};

export default Sidebar;