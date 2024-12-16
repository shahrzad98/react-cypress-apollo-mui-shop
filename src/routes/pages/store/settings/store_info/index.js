import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as StoreSVG } from '../../svg/store.svg';
import { useQuery } from '@apollo/client';
import { GET_STORE_INFO } from '../../../../../constant/queries/settings';
import EditStoreDrawer from './edit';
import ShowingMap from '../../../../../components/shared/mapNeshan/showingMap';
import ShowingMapWithoutMarker from '../../../../../components/shared/mapNeshan/showingMapWithoutMarker';
import LocationDrawer from './edit/map';
import { ToastContainer } from 'react-toastify';

const StoreInfo = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(10);
  const [selectedStore, setSelectedStore] = useState({});
  const { data, refetch, loading } = useQuery(GET_STORE_INFO);
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, setLat] = useState('35.70004352300933');
  const [lng, setLng] = useState('51.33971214294434');

  useEffect(() => {
    if (selectedStore?.id) {
      setLat(selectedStore?.store_address?.latitude);
      setLng(selectedStore?.store_address?.longitude);
      let storeInfoFields = [
        selectedStore?.name,
        selectedStore?.guild,
        selectedStore?.store_address?.province,
        selectedStore?.store_address?.city,
        selectedStore?.telephone_number,
        selectedStore?.store_address?.address,
        selectedStore?.logo?.image
      ];
      let count = 0;
      for (let index = 0; index < storeInfoFields.length; index++) {
        if (storeInfoFields[index]) {
          count++;
        }
      }

      setPercentage(((count * 100) / 7).toFixed());
    }
  }, [selectedStore, loading]);

  useEffect(() => {
    if (data) {
      setSelectedStore(data?.user?.getUserRead?.my_store[0]);
    }
  }, [data, loading]);

  window.onpopstate = function () {
    navigate('/store/settings');
  };
  history.pushState({}, '');

  return (
    <Style container>
      <Grid justifyContent="space-between" container>
        <Grid onClick={() => navigate('/store/settings')} className="header">
          <i className="df-arrow" />
          <h1>اطلاعات فروشگاه</h1>
        </Grid>
        <Button
          onClick={() => setSearchParams({ modal: 'edit' })}
          variant="text"
          color="primary"
          data-cy="editStore"
          startIcon={<i className="df-edit" />}
        >
          ویرایش
        </Button>
      </Grid>
      <Grid alignContent="flex-start" mt={3} container className="content">
        <Grid justifyContent="center" container>
          <Grid className="progressCont">
            <CircularProgressbarWithChildren
              value={percentage}
              strokeWidth={4}
              counterClockwise
              styles={{
                path: {
                  stroke:
                    percentage > 74
                      ? '#02E061'
                      : percentage > 24
                      ? '#FFC72A'
                      : '#EA002A',
                  strokeLinecap: 'round',
                  transformOrigin: 'center center'
                },
                trail: {
                  stroke: '#d6d6d6',
                  strokeLinecap: 'round',
                  transformOrigin: 'center center',
                  width: '1px'
                },
                text: {
                  fill: '#f88',
                  fontSize: '16px'
                },
                background: {
                  fill: '#3e98c7'
                }
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '80%',
                  backgroundColor: '#DAD6E966',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: selectedStore?.logo?.image
                    ? 'center'
                    : 'flex-end',
                  overflow: 'hidden'
                }}
              >
                {selectedStore?.logo?.image ? (
                  <img
                    style={{ height: '100%' }}
                    src={selectedStore?.logo?.image}
                  ></img>
                ) : (
                  <StoreSVG className="svg" />
                )}
              </div>
            </CircularProgressbarWithChildren>
          </Grid>
        </Grid>
        <Grid mt={3} alignItems="center" container className="text-progress">
          <Grid item className="line" xs={4}></Grid>
          <Grid container justifyContent="center" item xs={4}>
            <h2>{percentage} % کامل شده</h2>
          </Grid>
          <Grid item className="line" xs={4}></Grid>
        </Grid>
        <Grid mt={2} container>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>اسم فروشگاه</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6 data-cy="nameStore">{selectedStore?.name || '----------'}</h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-even-row">
              <h5>صنف</h5>
            </Grid>
            <Grid item xs={6} className="left-even-row">
              <h6 data-cy="guildStore">
                {selectedStore?.guild || '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>استان</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6 data-cy="cityStore">
                {selectedStore?.store_address?.province || '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-even-row">
              <h5>شهر</h5>
            </Grid>
            <Grid item xs={6} className="left-even-row">
              <h6 data-cy="provinceStore">
                {selectedStore?.store_address?.city || '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>تلفن</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6 data-cy="telephoneStore">
                {selectedStore?.telephone_number?.replace('+98', '0') ||
                  '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-even-row">
              <h5>کدپستی</h5>
            </Grid>
            <Grid item xs={6} className="left-even-row">
              <h6 data-cy="postalCode">
                {selectedStore?.store_address?.postal_code || '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container className="address-container">
            <Grid container>
              <h5>آدرس</h5>
            </Grid>
            <Grid container>
              <h6 data-cy="addressStore">
                {' '}
                {selectedStore?.store_address?.address || '----------'}
              </h6>
            </Grid>
          </Grid>
          {selectedStore?.store_address?.latitude && (
            <Grid style={{ height: '100px', marginTop: '32px' }} container>
              <ShowingMap
                latLng={[
                  selectedStore?.store_address?.latitude,
                  selectedStore?.store_address?.longitude
                ]}
              />
            </Grid>
          )}
          {!selectedStore?.store_address?.latitude && (
            <Grid style={{ height: '100px', marginTop: '32px' }} container>
              <ShowingMapWithoutMarker latLng={[35.699739, 51.338097]} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <EditStoreDrawer
        setSearchParams={setSearchParams}
        selectedStore={selectedStore}
        lat={lat}
        lng={lng}
        refetch={refetch}
        open={searchParams.get('modal') === 'edit'}
        close={() => setSearchParams({})}
      />
      <LocationDrawer
        setSearchParams={setSearchParams}
        selectedStore={selectedStore}
        lat={lat}
        lng={lng}
        setlat={setLat}
        setLng={setLng}
        open={searchParams.get('modal') === 'map'}
        close={() => setSearchParams({ modal: 'edit' })}
      />
      <ToastContainer />
    </Style>
  );
};

export default StoreInfo;
