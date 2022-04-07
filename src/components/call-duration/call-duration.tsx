import { FC } from 'react';

type TCallDurationProps = {
  value: string;
}

const CallDuration: FC<TCallDurationProps> = ({ value }) => {
  const toMinutesAndSeconds = (value: string) => {
    const intValue = parseInt(value);
    const minutes = Math.trunc(intValue / 60);
    const seconds = intValue % 60;
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }
  const callDuration = toMinutesAndSeconds(value);
  return (
    <div style={{margin: "0 10px"}}>{callDuration}</div>
  );
};

export default CallDuration;