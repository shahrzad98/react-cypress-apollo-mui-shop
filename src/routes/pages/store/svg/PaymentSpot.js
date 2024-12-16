import * as React from 'react';

function PaymentSpot(props) {
  return (
    <svg width={53} height={53} fill="none" {...props}>
      <path
        d="M19.912 52a2.273 2.273 0 01-2.267-2.266V37.273a2.273 2.273 0 012.267-2.266h22.676a2.273 2.273 0 012.268 2.266v12.461A2.273 2.273 0 0142.588 52H19.912z"
        stroke="#6D5DA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.95 35.008l1.518-6.23c.205-.884.771-1.632 1.543-2.107a3.402 3.402 0 012.562-.408l19.819 4.78c.884.204 1.632.77 2.108 1.541.477.77.613 1.7.409 2.56l-2.404 9.901a3.367 3.367 0 01-1.791 2.244 3.406 3.406 0 01-2.858.09M31.613 42.644a.86.86 0 11.001 1.721.86.86 0 01-.001-1.721zM1 38.406c0-4.894 2.358-9.493 6.327-12.37a15.33 15.33 0 0113.741-2.175M8.234 5.622a15.509 15.509 0 0011.18 4.735c2.108 0 4.217-.43 6.145-1.268"
        stroke="#6D5DA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.307 19.715c5.17 0 9.365-4.192 9.365-9.358C25.672 5.192 21.477 1 16.307 1S6.94 5.192 6.94 10.357c0 5.166 4.196 9.358 9.366 9.358z"
        stroke="#6D5DA9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoPaymentSpot = React.memo(PaymentSpot);
export default MemoPaymentSpot;
