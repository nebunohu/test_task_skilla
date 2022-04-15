import { FC } from 'react';

// Styles
import styles from './header.module.css';

const Header: FC = () => {
  const date = new Date();
  let dateString = date.toLocaleString('ru', {weekday: 'long', day: 'numeric', month: 'short'});
  dateString = dateString[0].toUpperCase() + dateString.slice(1, dateString.length-1);
  return (
    <header className={`${styles.header}`}>
      {dateString}
    </header>
  );
};

export default Header;