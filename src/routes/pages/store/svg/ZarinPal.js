import * as React from 'react';

function ZarinPal(props) {
  return (
    <svg width={50} height={50} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.892 2.08L2.081 37.883a7.092 7.092 0 000 10.037 7.081 7.081 0 0010.027 0l35.811-35.815c2.775-2.762 2.775-7.25 0-10.025-2.762-2.773-7.252-2.773-10.027 0zM1.342 0h13.984c1.183 0 1.786 1.424.956 2.26L2.332 16.267c-.841.848-2.286.26-2.286-.927L0 1.334C0 .599.592 0 1.343 0zM48.68 50H34.675c-1.184 0-1.788-1.424-.956-2.26l13.946-14.006c.843-.848 2.289-.26 2.289.927l.045 14.005c.023.735-.58 1.334-1.32 1.334z"
        fill="#FFD23F"
      />
    </svg>
  );
}

const MemoZarinPal = React.memo(ZarinPal);
export default MemoZarinPal;
