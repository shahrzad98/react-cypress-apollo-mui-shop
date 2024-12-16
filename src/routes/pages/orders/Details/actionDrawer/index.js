import React, { useEffect, useState } from 'react';
import { CircularProgress, Drawer, Grid } from '@mui/material';
import styled from '@emotion/styled';
import WaitingForApproval from './statuses/WaitingForApproval';
import WaitingForPaymentApproval from './statuses/WaitingForPaymentApproval';
import Paid from './statuses/Paid';
import Sent from './statuses/Sent';
import Recieved from './statuses/Recieved';
import UnRecieved from './statuses/Unrecieved';
import CanceledOverTime from './statuses/CanceledOverTime';
import CanceledByMerchant from './statuses/CanceledByMerchant';
import CanceledByMerchantSettled from './statuses/CanceledByMerchantSettled';
import CanceledOverTimeSettled from './statuses/CanceledOverTimeSettled';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_MANAGER,
  GET_MANAGER_POST,
  GET_MANAGER_POSTEX
} from '../../../../../constant/queries/orders';
import {
  CHANGE_ORDER_STATUS,
  UPDATE_ORDER_SEND
} from '../../../../../constant/mutations/orders';
import Post from './statuses/InPreparing/post';
import Postex from './statuses/InPreparing/postex';
import OtherPost from './statuses/InPreparing/other';
import AloPeyk from './statuses/InPreparing/alopeyk';
import DigiExpress from './statuses/InPreparing/digiexpress';
import Tipax from './statuses/InPreparing/tipax';

const Style = styled(Drawer)`
  .MuiDrawer-paperAnchorBottom {
    border-radius: 16px 16px 0 0;
    padding: 16px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    max-height: 93vh;
  }

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .loading {
    height: 300px;
  }

  .divider {
    height: 4px;
    width: 50px;
    background-color: #dad6e9;
  }

  h3 {
    color: #101820;
    font-size: 18px;
    font-weight: 500;
    margin: 24px 0;
  }

  p {
    margin: 0 0 16px;
    color: #101820;
    font-size: 14px;
    font-weight: 400;
  }

  h2 {
    color: #6a6f80;
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 400;
  }
`;

const ActionDrawer = ({
  open,
  close,
  refetchDetail,
  status,
  shipping_type
}) => {
  const params = useParams();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (open) {
      setStep(1);
    }
  }, [open]);

  const [fetchManager, { data, loading, refetch }] = useLazyQuery(
    status !== 3
      ? GET_MANAGER
      : shipping_type === 'other' || shipping_type === 'alopeyk'
      ? GET_MANAGER
      : shipping_type === 'post'
      ? GET_MANAGER_POST
      : GET_MANAGER_POSTEX,
    {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      variables: {
        getManagerId: params.orderId,
        ...(shipping_type === 'post' && {
          params: {
            post_type: 1
          }
        })
      }
    }
  );

  const closehandler = () => {
    switch (step) {
      case 1:
        if (
          data?.order?.getManager?.status === 12 ||
          data?.order?.getManager?.status === 11 ||
          data?.order?.getManager?.status === 10 ||
          data?.order?.getManager?.status === 13
        ) {
          close();
          refetchDetail();
          break;
        } else {
          refetchDetail();
          close();
          break;
        }
      case 2:
        if (
          data?.order?.getManager?.status === 12 ||
          data?.order?.getManager?.status === 11 ||
          data?.order?.getManager?.status === 10 ||
          data?.order?.getManager?.status === 13
        ) {
          close();
          refetchDetail();
          break;
        } else {
          close();
          break;
        }

      case 3: {
        if (
          data?.order?.getManager?.status === 14 ||
          data?.order?.getManager?.status === 2
        ) {
          refetchDetail();
          close();
          break;
        } else if (
          data?.order?.getManager?.shipping_type === 'post' ||
          data?.order?.getManager?.shipping_type === 'other'
        ) {
          close();
          refetchDetail();
          break;
        } else {
          close();
          break;
        }
      }
      case 4: {
        if (
          data?.order?.getManager?.shipping_type === 'postex' ||
          data?.order?.getManager?.shipping_type === 'alopeyk'
        ) {
          close();
          refetchDetail();
          break;
        } else {
          close();
          break;
        }
      }
      case 6: {
        if (data?.order?.getManager?.shipping_type === 'postex') {
          refetchDetail();
          close();
          break;
        } else {
          close();
          break;
        }
      }
      default:
        if (
          data?.order?.getManager?.status == 12 ||
          data?.order?.getManager?.status == 11 ||
          data?.order?.getManager?.status == 10 ||
          data?.order?.getManager?.status == 13
        ) {
          close();
          refetchDetail();
          break;
        } else {
          close();
        }
    }
  };

  useEffect(() => {
    if (open) {
      fetchManager();
    }
  }, [open]);

  useEffect(() => {
    if (
      data?.order?.getManager?.status === 3 &&
      data?.order?.getPostexInfo?.password_state === 'bad'
    ) {
      setStep(6);
    }
  }, [data]);

  // pass this content for using in stautses:
  // {
  //   "updateOrderStatusId": null,
  //   "content": {
  //     "status": null,
  //     "owner_card_name": null,
  //     "owner_card_number": null,
  //     "cancellation_reason": null,
  //     "preparing_days": null,
  //     "put_back_items": null
  //   }
  // }
  const [changeStatus, { loading: changeStatusloading }] =
    useMutation(CHANGE_ORDER_STATUS);

  //pass this content for using in statuses:
  // {
  //   "updateManagerId": null,
  //   "content": {
  //     "weight": null,
  //     "receiver_first_name": null,
  //     "receiver_last_name": null,
  //     "address": {
  //       "postal_code": null,
  //       "address": null,
  //       "city": null,
  //       "province": null,
  //       "latitude": null,
  //       "longitude": null
  //     },
  //     "receiver_phone_number": null,
  //     "insurance_name": null,
  //     "cartoon_size": null,
  //     "need_cartoon": null,
  //     "pickup_date": null,
  //     "is_morning_shift": null,
  //     "merchant_shipping_cost": null,
  //     "cashed": null,
  //     "has_access_to_printer": null,
  //     "pay_at_dest": null,
  //     "transport_type": null,
  //     "is_non_standard_package": null,
  //     "is_sms_service_active": null
  //   }
  // }
  const [
    updateSendOrder,
    { loading: sendOrderLoading, error: sendOrderError }
  ] = useMutation(UPDATE_ORDER_SEND);

  const renderContent = order => {
    switch (order?.status) {
      case 2:
        return (
          <Paid
            step={step}
            setStep={setStep}
            changeStatusloading={changeStatusloading}
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
            close={closehandler}
          />
        );
      case 3: {
        if (order?.shipping_type === 'post') {
          return (
            <Post
              sendOrder={data.order?.getOrderSend}
              refetchOrder={refetch}
              changeStatus={changeStatus}
              order={order}
              close={closehandler}
              step={step}
              setStep={setStep}
            />
          );
        } else if (order?.shipping_type === 'postex') {
          return (
            <Postex
              postexOptions={data.order?.getPostCartoonsInsurances}
              close={closehandler}
              sendOrder={data.order?.getOrderSend}
              changeStatus={changeStatus}
              updateSendOrder={updateSendOrder}
              sendOrderLoading={sendOrderLoading}
              order={order}
              step={step}
              setStep={setStep}
              sendOrderError={sendOrderError}
              cities={data?.order?.getPostProvincesCities}
            />
          );
        } else if (order?.shipping_type === 'other') {
          return (
            <OtherPost
              close={closehandler}
              sendOrder={data.order?.getOrderSend}
              changeStatus={changeStatus}
              updateSendOrder={updateSendOrder}
              sendOrderLoading={sendOrderLoading}
              order={order}
              step={step}
              setStep={setStep}
            />
          );
        } else if (order?.shipping_type === 'digiexpress_tipax') {
          return (
            <Tipax
              close={closehandler}
              sendOrder={data.order?.getOrderSend}
              changeStatus={changeStatus}
              updateSendOrder={updateSendOrder}
              sendOrderLoading={sendOrderLoading}
              order={order}
              step={step}
              refetchOrder={refetch}
              setStep={setStep}
            />
          );
        } else if (order?.shipping_type === 'digiexpress') {
          return (
            <DigiExpress
              close={closehandler}
              sendOrder={data.order?.getOrderSend}
              changeStatus={changeStatus}
              updateSendOrder={updateSendOrder}
              sendOrderLoading={sendOrderLoading}
              order={order}
              step={step}
              refetchOrder={refetch}
              setStep={setStep}
            />
          );
        } else if (order?.shipping_type === 'alopeyk') {
          return (
            <AloPeyk
              close={closehandler}
              sendOrder={data.order?.getOrderSend}
              changeStatus={changeStatus}
              updateSendOrder={updateSendOrder}
              sendOrderLoading={sendOrderLoading}
              order={order}
              step={step}
              refetchOrder={refetch}
              setStep={setStep}
            />
          );
        } else return null;
      }
      case 4:
        return (
          <Sent
            step={step}
            setStep={setStep}
            changeStatusloading={changeStatusloading}
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
            close={closehandler}
          />
        );
      case 5:
        return (
          <Recieved
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
          />
        );
      case 10:
        return (
          <CanceledOverTime
            changeStatus={changeStatus}
            close={closehandler}
            order={order}
          />
        );
      case 11:
        return (
          <CanceledByMerchant
            changeStatus={changeStatus}
            close={closehandler}
            order={order}
          />
        );
      case 12:
        return <CanceledByMerchantSettled close={closehandler} />;
      case 13:
        return <CanceledOverTimeSettled close={closehandler} />;
      case 14:
        return (
          <WaitingForApproval
            step={step}
            setStep={setStep}
            changeStatusloading={changeStatusloading}
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
            close={closehandler}
          />
        );
      case 16:
        return (
          <WaitingForPaymentApproval
            changeStatus={changeStatus}
            changeStatusloading={changeStatusloading}
            order={order}
            step={step}
            setStep={setStep}
            refetchDetail={refetchDetail}
            refetchOrder={refetch}
          />
        );
      case 8:
        return (
          <WaitingForPaymentApproval
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
          />
        ); //Todo: Remove this case
      case 17:
        return (
          <UnRecieved
            step={step}
            setStep={setStep}
            changeStatusloading={changeStatusloading}
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
            close={closehandler}
          />
        );
      default:
        return (
          <WaitingForApproval
            refetchDetail={refetchDetail}
            refetchOrder={refetch}
            changeStatus={changeStatus}
            order={order}
          />
        );
    }
  };

  return (
    <Style onClose={closehandler} anchor="bottom" open={open}>
      <Grid container justifyContent="center">
        <Grid className="divider" />
      </Grid>
      {loading ? (
        <Grid
          className="loading"
          justifyContent="center"
          alignItems="center"
          container
        >
          <CircularProgress />
        </Grid>
      ) : (
        renderContent(data?.order?.getManager)
      )}
    </Style>
  );
};

export default ActionDrawer;
