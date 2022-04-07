import React, { FC } from "react";
import { TListItem } from "../../types";
import CallDuration from "../call-duration/call-duration";
import CallType from "../call-type/call-type";

// Styles
import styles from './calls-list-item.module.css';

type TCallsListItemProps = {
  item: TListItem;
}

const CallsListItem: FC<TCallsListItemProps> = ({ item }) => {
  return (
    <div className={`${styles.wrapper}`}>
      <CallType />
      <div className={`${styles.date}`}>
        {item.date}
      </div>
      <div className={`${styles.avatar}`}>
        <img src={item.person_avatar} alt='' />
      </div>
      <div className={`${styles.phone}`}>
        {item.to_number}
      </div>
      <div className={`${styles.time}`}>
        {item.time}
      </div>
      <CallDuration value={item.time} />
    </div>
  );
};

export default CallsListItem;