import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ time, onExpire }) => {
  if (!time) return null;

  const { seconds, minutes, hours, days, restart } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date(time),
    onExpire
  });

  useEffect(() => restart(new Date(time), true), [time]);

  return (
    <>
      {days ? days + ':' : ''}
      {hours}:{minutes}:{seconds}
    </>
  );
};

export default MyTimer;
