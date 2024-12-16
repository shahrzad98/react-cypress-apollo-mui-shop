import * as React from 'react';

const SvgComponent = props => (
  <svg
    width={48}
    height={47}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M46.004 26.5V4c0-1.66-1.34-3-3-3H10C8.34 1 7 2.34 7 4v7.5M7 9.999h39.004"
      stroke="#6D5DA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 20.5c0-1.66 1.34-3 3-3h33.004c1.66 0 3 1.34 3 3V43c0 1.66-1.34 3-3 3H4c-1.66 0-3-1.34-3-3V20.5ZM1 26.5h39.004M7 35.498h4.5"
      stroke="#6D5DA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.243 33.995a3.712 3.712 0 0 0-4.18-1.3 3.742 3.742 0 0 0-2.561 3.56c0 1.62 1.04 3.041 2.56 3.561 1.54.52 3.22-.02 4.18-1.3.96 1.3 2.66 1.82 4.181 1.3a3.742 3.742 0 0 0 2.56-3.56c0-1.62-1.04-3.04-2.56-3.56s-3.22 0-4.18 1.3Z"
      stroke="#6D5DA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
