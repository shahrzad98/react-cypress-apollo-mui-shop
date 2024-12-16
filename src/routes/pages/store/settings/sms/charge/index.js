import { useMutation } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CHARGE_SMS } from '../../../../../../constant/mutations/mutations';
import { redirectToAP, redirectToSEP } from '../../../../../../utils/helpers';
import { ReactComponent as EditPriceSVG } from '../../../svg/editPrice.svg';
import BuyDynamicModal from './modal/buyDynamicModal';
import BuyStaticModal from './modal/buyStaticModal';
import CategoryProductCard from './product_card';
import { smsChoices } from './staticSmsChoies';
import { Style } from './style';

const ChargeSms = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('');
  const [buyStaticCreditModal, setBuyStaticCreditModal] = useState(false);
  const [buyDynamicCreditModal, setBuyDynamicCreditModal] = useState(false);
  const [chargeSms, { data, loading }] = useMutation(CHARGE_SMS);
  const [searchParams] = useSearchParams();

  const payHandler = () => {
    chargeSms({
      variables: {
        content: {
          amount: isActive?.count * (searchParams.get('sms_cost') || 25)
        }
      }
    });
  };
  const payHandler2 = e => {
    chargeSms({
      variables: {
        content: {
          amount: e.cost
        }
      }
    });
  };

  useEffect(() => {
    if (data?.packages.chargeSms.charge_result === false) {
      if (data?.packages.chargeSms.gateway_type === 'AsanPardakht') {
        redirectToAP(data?.packages.chargeSms.token);
      } else if (data?.packages.chargeSms.gateway_type === 'SEP') {
        redirectToSEP(data?.packages.chargeSms.token);
      }
    }
    if (data?.packages.chargeSms.charge_result === true) {
      navigate('/store/settings/sms');
    }
  }, [data?.packages]);

  return (
    <Style alignContent="flex-start" container>
      <Grid onClick={() => navigate('/store/settings/sms')} className="header">
        <i className="df-arrow" />
        <h1>افزایش اعتبار پیامک</h1>
      </Grid>
      <Grid
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        container
        className="address-container "
      >
        <h4>بسته های پیامکی</h4>
        <Button
          data-cy="buyDynamicCreditModal"
          onClick={() => setBuyDynamicCreditModal(true)}
          startIcon={<EditPriceSVG />}
          className="edit_btn"
          variant="text"
        >
          مبلغ دلخواه
        </Button>
      </Grid>
      <Grid container style={{ paddingBottom: '80px' }} mt={1}>
        {smsChoices?.map(e => (
          <CategoryProductCard
            isActive={isActive}
            setIsActive={setIsActive}
            key={e.count}
            smsData={e}
            smsCost={searchParams.get('sms_cost') || 25}
          />
        ))}
      </Grid>
      <Grid container className="footer">
        <Button
          disabled={!isActive}
          fullWidth
          data-cy="accept"
          variant="contained"
          onClick={() => {
            setBuyStaticCreditModal(true);
          }}
        >
          تایید
        </Button>
      </Grid>
      <BuyStaticModal
        smsCost={searchParams.get('sms_cost') || 25}
        loading={loading}
        payHandler={payHandler}
        smsData={isActive}
        open={buyStaticCreditModal}
        close={() => setBuyStaticCreditModal(false)}
      />
      {buyDynamicCreditModal && (
        <BuyDynamicModal
          smsCost={searchParams.get('sms_cost') || 25}
          loading={loading}
          payHandler={payHandler2}
          onClose={() => setBuyDynamicCreditModal(false)}
        />
      )}
    </Style>
  );
};

export default ChargeSms;
