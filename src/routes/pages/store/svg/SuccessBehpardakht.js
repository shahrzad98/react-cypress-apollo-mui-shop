import * as React from 'react';

function SuccessBehpardakht(props) {
  return (
    <svg width={97} height={96} fill="none" {...props}>
      <path
        d="M69.912 94.367a24.75 24.75 0 100-49.5 24.75 24.75 0 000 49.5z"
        stroke="#00D96F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80.925 62.44L68.88 78.444a3.175 3.175 0 01-4.661.33l-6.105-6.063M82.287 32.492V7.742A6.187 6.187 0 0076.1 1.555H8.037A6.187 6.187 0 001.85 7.742v49.5a6.188 6.188 0 006.187 6.188h24.75M1.85 20.117h80.437M14.225 35.586h24.75M14.225 47.96H26.6"
        stroke="#00D96F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSuccessBehpardakht = React.memo(SuccessBehpardakht);
export default MemoSuccessBehpardakht;
