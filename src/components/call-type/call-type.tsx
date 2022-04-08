import { FC } from "react";
import callInSrc from '../../images/call-in.svg';
import callOutSrc from '../../images/call-out.svg';

import styles from './call-type.module.css';

type TCallTypeProps = {
  type: string;
};

const CallType: FC<TCallTypeProps> = ({ type }) => {
  const typeInt = parseInt(type);
  let picSrc = '';

  switch (typeInt) {
    case 0: 
      picSrc = callOutSrc;
    break;
    case 1: 
      picSrc = callInSrc;
    break;
    default: 

  }
  return (
    <div className={`${styles.wrapper}`}>
      <img src={picSrc} alt='' />
    </div>
  );
};

export default CallType;