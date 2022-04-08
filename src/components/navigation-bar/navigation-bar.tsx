import { FC } from "react";

import { NavValues } from "../../types";

// Styles
import styles from './navigation-bar.module.css';

// Components
import NavigationBarItem from "../navigation-bar-item/navigation-bar-item";

const NavigationBar: FC = () => {
  return (
    <nav className={`${styles.wrapper}`}>
      <ul>
        <li>
          <NavigationBarItem value={NavValues.results} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.orders} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.messages} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.calls} active />
        </li>
        <li>
          <NavigationBarItem value={NavValues.counterparties} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.documents} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.executors} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.reports} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.knowledgeBase} />
        </li>
        <li>
          <NavigationBarItem value={NavValues.settings} />
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;