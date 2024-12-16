import * as React from 'react';

function EmailPayment(props) {
  return (
    <svg width={20} height={20} fill="none" {...props}>
      <path
        d="M13.938 18.438c2.482 0 4.5-2.018 4.5-4.5 0-2.483-2.018-4.5-4.5-4.5a4.504 4.504 0 00-4.5 4.5c0 2.49 2.01 4.5 4.5 4.5zM11.688 13.938h4.5M16.188 13.938L14.5 15.624M16.188 13.938L14.5 12.25"
        stroke="#483493"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.188 12.813h-4.5a1.123 1.123 0 01-1.126-1.126v-9c0-.622.503-1.124 1.125-1.124h13.5c.623 0 1.125.502 1.125 1.125V7.75"
        stroke="#483493"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.058 1.977l-6.105 4.702a2.487 2.487 0 01-3.023 0L1.825 1.977"
        stroke="#483493"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoEmailPayment = React.memo(EmailPayment);
export default MemoEmailPayment;
