import React from 'react';
export const renderColor = status => {
  switch (status) {
    case 2:
    case 16:
      return 'rgb(132, 50, 240)';
    case 17:
      return 'rgb(234, 0, 42)';
    case 3:
      return 'rgb(0, 99, 247)';
    case 4:
      return 'rgb(0, 188, 202)';
    case 14:
      return 'rgb(250, 106, 25)';
    case 10:
    case 11:
    case 12:
    case 13:
      return 'rgba(145, 133, 190, 0.6)';
    case 15:
      return 'rgb(236, 184, 0)';
    case 5:
      return 'rgb(0, 206, 125)';
    default:
      return 'transparent';
  }
};
export const renderWidth = status => {
  switch (status) {
    case 2:
    case 14:
      return '17.5%';
    case 10:
    case 11:
    case 12:
    case 13:
      return '100%';
    case 15:
      return '27.5%';
    case 3:
      return '45.5%';
    case 4:
      return '67.5%';
    case 16:
      return '50%';
    case 17:
      return '87.5%';
    case 5:
      return '100%';
    default:
      return '0';
  }
};
export const renderTitle = status => {
  switch (status) {
    case 2:
    case 16:
      return 'در انتطار تایید';
    case 3:
      return 'در حال آماده‌سازی';
    case 4:
      return 'در حال ارسال';
    case 10:
      return 'منقضی شده';
    case 11:
      return 'رد شده';
    case 12:
      return 'رد شده (تسویه شده)';
    case 13:
      return 'منقضی شده (تسویه شده)';
    case 14:
      return 'درخواست شده';
    case 15:
      return 'در انتظار پرداخت';
    case 17:
      return 'مشکل در ارسال';
    case 5:
      return 'تحویل شده';
    default:
      return 'نامشخص';
  }
};
export const renderBackColor = status => {
  switch (status) {
    case 2:
    case 16:
      return '#8432F033';
    case 17:
      return '#EA002A33';
    case 3:
      return '#0063F733';
    case 4:
      return '#00BCCA33';
    case 10:
    case 11:
    case 12:
    case 13:
      return '#9185BE33';
    case 14:
      return '#FA6A1933';
    case 15:
      return '#ECB80033';
    default:
      return '#8432F033';
  }
};

const Progressbar = ({ status }) => {
  // if (status === 10)
  //   return (
  //     <p style={{ fontSize: '12px', color: '#9185BE', margin: 0 }}>
  //       {' '}
  //       منقضی شده
  //     </p>
  //   );
  // if (status === 13)
  //   return (
  //     <p style={{ fontSize: '12px', color: '#9185BE', margin: 0 }}>
  //       {' '}
  //       منقضی شده (مبلغ برگردانده شده)
  //     </p>
  //   );
  // if (status === 11)
  //   return (
  //     <p style={{ fontSize: '12px', color: '#9185BE', margin: 0 }}> رد شده</p>
  //   );
  // if (status === 12)
  //   return (
  //     <p style={{ fontSize: '12px', color: '#9185BE', margin: 0 }}>
  //       {' '}
  //       زد شده (مبلغ برگردانده شده)
  //     </p>
  //   );
  return (
    <>
      <h4
        data-cy="title_status"
        style={{
          color: renderColor(status),
          fontSize: '12px',
          margin: 0,
          fontWeight: 'normal',
          //   marginTop: '25px',
          marginBottom: '6.5px'
        }}
      >
        {renderTitle(status)}
      </h4>
      <div
        data-cy="progressBar_Back"
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: renderBackColor(),
          borderRadius: '10px'
          //   marginBottom: '25px'
        }}
      >
        <div
          data-cy="progressBar_in"
          style={{
            width: renderWidth(status),
            backgroundColor: renderColor(status),
            borderRadius: '10px',
            height: '100%'
          }}
        ></div>
      </div>
    </>
  );
};

export default Progressbar;
