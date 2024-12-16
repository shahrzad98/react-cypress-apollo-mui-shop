import * as React from 'react';
import NoGateway from './noGateway';
import HasGateway from './hasGateway';
import HasInfo from './hasInfo';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ZARRINPAL_STATUS } from '../../../../../../../../constant/queries/payment';
import { useEffect, useState } from 'react';
import ZarrinpalErrorPage from './zarrinpalErrorPage';
import GatewayLoading from './gatewayLoading';

const Gateway = () => {
  const { data, loading, error, refetch } = useQuery(GET_ZARRINPAL_STATUS, {
    notifyOnNetworkStatusChange: true
  });
  const zarrinpalStatus = data?.payment?.getZarrinPalStatus;

  const [hasInfo, setHasInfo] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [hasGateway, setHasGateway] = useState(false);

  useEffect(() => {
    setHasInfo(
      zarrinpalStatus?.level !== 'NEW' &&
        !zarrinpalStatus?.active_terminals?.length
    );
    setIsNew(zarrinpalStatus?.level === 'NEW');
    setHasGateway(zarrinpalStatus?.active_terminals?.length > 0);
  }, [zarrinpalStatus]);

  useEffect(() => hasInfo && setHasGateway(false), [hasInfo]);

  function setHasInfoHandle(value) {
    setHasInfo(value);
  }

  if (loading) return <GatewayLoading />;
  if (error) {
    return <ZarrinpalErrorPage retryHandle={refetch} loading={loading} />;
  } else {
    return (
      <Box
        sx={{
          height: !hasInfo ? 'calc(100vh - 75px)' : 'inherit',
          overflow: 'scroll'
        }}
      >
        {isNew && <NoGateway />}
        {hasGateway && !hasInfo && (
          <HasGateway
            terminals={zarrinpalStatus?.active_terminals}
            setHasInfo={setHasInfoHandle}
            level={zarrinpalStatus?.level}
            phoneNumber={zarrinpalStatus?.phone_number}
          />
        )}
        {hasInfo && <HasInfo level={zarrinpalStatus?.level} />}
      </Box>
    );
  }
};

export default Gateway;
