import React, { FC, MutableRefObject, useState } from "react";
import { TListItem } from "../../types";
import CallDuration from "../call-duration/call-duration";
import CallType from "../call-type/call-type";
import Player from "../player/player";

// Styles
import componentStyles from './calls-list-item.module.css';

type TCallsListItemProps = {
  item: TListItem;
  className?: string;
  wrapperRef?: any;
};

const CallsListItem: FC<TCallsListItemProps> = ({ item, className, wrapperRef }) => {
  const [isShowPlayer, setIsShowPlayer] = useState(false);
  const date = new Date(item.date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const onCllickHandter = () => {
    setIsShowPlayer(!isShowPlayer);
  };

  return (
    <div className={`${componentStyles.wrapper} ${className}`} ref={wrapperRef}>
      <CallType type={item.in_out}/>
      <div className={`${componentStyles.date}`}>
        {hours}:{minutes > 9 ? minutes : '0' + minutes}
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
        {item.record && !isShowPlayer && <div onClick={onCllickHandter}><CallDuration value={item.time} /></div>}
        {isShowPlayer && <Player recordId={item.record} partnershipId={item.partnership_id}/>}
      </div>
    </div>
  );
};

export default CallsListItem;