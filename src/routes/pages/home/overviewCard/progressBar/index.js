import React from 'react';
import { Style } from './style';

const ProgressBar = ({ width }) => {
  return (
    <Style container>
      <div className="fill" style={{ width: `${width}%` }}></div>
    </Style>
  );
};

export default ProgressBar;
