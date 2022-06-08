import React, { FC, MutableRefObject } from "react";
import { TListItem } from "../../types";
import CallDuration from "../call-duration/call-duration";
import CallType from "../call-type/call-type";

// Styles
import componentStyles from './calls-list-item.module.css';

type TCallsListItemProps = {
  item: TListItem;
  className?: string;
  wrapperRef?: any;
};

const CallsListItem: FC<TCallsListItemProps> = ({ item, className, wrapperRef }) => {
  const date = new Date(item.date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    <div className={`${componentStyles.wrapper} ${className}`} ref={wrapperRef}>
      <CallType type={item.in_out}/>
      <div className={`${componentStyles.date}`}>
        {hours}:{minutes > 10 ? minutes : '0' + minutes}
      </div>
      <div className={`${componentStyles.avatar}`}>
        <img src={item.person_avatar} alt='' />
        {item.person_name} {item.person_surname}
      </div>
      <div className={`${componentStyles.phone}`}>
        {item.partner_data.phone}
      </div>
      <div className={`${componentStyles.source}`}>
        {item.source}
      </div>
      <div>
        {!item.record && <CallDuration value={item.time} />}
      </div>
    </div>
  );
};

export default CallsListItem;