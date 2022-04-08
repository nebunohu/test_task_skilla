import React, { FC } from "react";
import { TListItem } from "../../types";
import CallDuration from "../call-duration/call-duration";
import CallType from "../call-type/call-type";

// Styles
import componentStyles from './calls-list-item.module.css';

type TCallsListItemProps = {
  item: TListItem;
  styles?: string;
}

const CallsListItem: FC<TCallsListItemProps> = ({ item, styles }) => {
  const date = new Date(item.date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    <div className={`${componentStyles.wrapper} ${styles}`}>
      <CallType type={item.in_out}/>
      <div className={`${componentStyles.date}`}>
        {hours}:{minutes > 10 ? minutes : '0' + minutes}
      </div>
      <div className={`${componentStyles.avatar}`}>
        <img src={item.person_avatar} alt='' />
      </div>
      <div className={`${componentStyles.phone}`}>
        {item.to_number}
      </div>
      <CallDuration value={item.time} />
    </div>
  );
};

export default CallsListItem;