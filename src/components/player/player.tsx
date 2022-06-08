import React, { FC, useEffect } from 'react';
import { useDispatch } from '../../hooks';

// Styles
import styles from './player.module.css';

import playSrc from '../../images/play.svg';
import { getRecordThunk } from '../../redux/actions/player-actions';

type TPlayerProps = {
    recordId: string;
    partnershipId: string;
};

const Player: FC<TPlayerProps> = ({ recordId, partnershipId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecordThunk(recordId, partnershipId));
    }, []);

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.timer}`}>

            </div>
            <div className={`${styles.playButton}`}></div>
            <div className={`${styles.track}`}>
                <img src={playSrc} alt='' /> 
            </div>
            <div className={`${styles.downlosd}`}></div>
        </div>
    )
};

export default Player;