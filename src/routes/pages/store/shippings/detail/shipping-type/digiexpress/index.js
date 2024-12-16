import React, { useState } from 'react';
import { Style } from '../../../style';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as DotSvg } from '../../../../../../../static/svg/dots.svg';
import { ReactComponent as EditSvg } from '../../../../../../../static/svg/edit.svg';
import { ReactComponent as DeleteSvg } from '../../../../../../../static/svg/delete.svg';
import DrawerComponent from '../../../../../../../components/Layout/Drawer';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import DeleteModal from '../../../delete';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { SHIPPING_COSTS } from '../../../create/shipping-type/digiexpress/constants';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as WarningSvg } from '../../../../svg/warningSvg.svg';

const Digiexpress = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editShipping, { loading: loadingEditShippingDigiexpress }] =
    useMutation(EDIT_SHIPPING);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data, refetch } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });
  const { data: storeInfo } = useQuery(GET_STORE_INFO);

  const storeDetail = storeInfo?.user?.getUserRead?.my_store[0];

  const shippingDetail = data?.shipping?.getShippingMethodDetail;
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      '& th': {
        borderRight: '0.5px solid #fff'
      }
    },
    '&:nth-of-type(even)': {
      '& th': {
        borderRight: '0.5px solid #F1F1F1'
      }
    },
    '& td , th': {
      borderBottom: 'none',
      width: '50%'
    },
    '& th:first-child , td:first-child ': {
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px'
    },
    '& th:last-child , td:last-child ': {
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px'
    },
    '& .muirtl-j9spsk-MuiPaper-root-MuiTable-root': {
      color: '#fff'
    }
  }));
  const drawerItems = [
    {
      id: 1,
      title: 'ویرایش',
      icon: <EditSvg />,
      handler: () => navigate(`/store/shippings/edit/${params.id}`)
    },
    {
      id: 2,
      title: 'حذف',
      icon: <DeleteSvg />,
      handler: () => setDeleteModal(true)
    }
  ];
  const innerCostRows = [
    { id: 1, name: 'زمان ارسال', value: shippingDetail.time_sending },
    {
      id: 2,
      name: 'نوع هزینه ارسال',
      value:
        +shippingDetail?.cost > 0
          ? 'قیمت دلخواه'
          : SHIPPING_COSTS.find(item => item.value == shippingDetail?.cost)
              ?.label
    },
    {
      id: 3,
      name: 'مبلغ',
      value:
        +shippingDetail?.cost > 0
          ? shippingDetail?.cost
          : +shippingDetail?.cost === 0
          ? 'رایگان'
          : 'بر اساس محاسبه دیجی اکسپرس'
    }
  ];
  const userRows = [
    {
      id: 1,
      name: 'نام',
      value: storeDetail?.first_name || '-'
    },
    {
      id: 2,
      name: 'نام خانوادگی',
      value: storeDetail?.last_name || '-'
    },
    {
      id: 3,
      name: 'شماره موبایل',
      value: storeDetail?.phone_number.replace('+98', '0') || '-'
    },
    {
      id: 4,
      name: 'استان',
      value: storeDetail?.store_address?.province || '-'
    },
    {
      id: 5,
      name: 'شهر',
      value: storeDetail?.store_address?.city || '-'
    }
  ];
  const address = {
    id: 6,
    name: 'آدرس مبدا تحویل سفارش',
    value: storeDetail?.store_address?.address || '-',
    lat: storeDetail?.store_address?.latitude,
    lng: storeDetail?.store_address?.longitude,
    type: 'address'
  };
  return (
    <>
      <Style mx="16px" onClose={() => setOpenDrawer(false)}>
        <ToastContainer />
        <Grid className="header" my="24px">
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500}>
              دیجی اکسپرس
            </Typography>
          </Grid>
          <Stack
            justifyContent="flex-end"
            style={{ pointerEvents: 'auto' }}
            onClick={() => setOpenDrawer(true)}
          >
            <DotSvg />
          </Stack>
        </Grid>
        <Grid className="header" display="flex">
          <Typography
            borderLeft="2px solid #DAD6E9"
            paddingLeft="12px"
            variant="body1"
            color="#6A6F80"
            fontSize="18px"
            fontWeight={500}
          >
            اطلاعات ارسال
          </Typography>
        </Grid>

        <Grid
          width="1"
          bgcolor="#fff"
          boxShadow="0px 4px 8px rgba(72, 52, 147, 0.08)"
          borderRadius="10px"
          p="16px"
          mt={2}
        >
          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb="24px"
            >
              <Typography color="#6A6F80" fontSize="18px">
                درون شهری
              </Typography>
              {loadingEditShippingDigiexpress ? (
                <Grid>
                  <CircularProgress />
                </Grid>
              ) : (
                <IOSSwitch
                  checked={shippingDetail?.my_province_is_active}
                  value={shippingDetail?.my_province_is_active}
                  onChange={e => {
                    editShipping({
                      variables: {
                        id: params.id,
                        content: {
                          my_province_is_active: e.target.checked
                        }
                      },
                      onError: () => {
                        toast('مشکلی پیش آمده دوباره تلاش کنید', {
                          position: 'bottom-center',
                          autoClose: 2000,
                          hideProgressBar: true,
                          draggable: true,
                          closeButton: true,
                          icon: <WarningSvg />,
                          style: {
                            backgroundColor: '#FCF4D6',
                            color: '#000',
                            direction: 'rtl'
                          }
                        });
                      },
                      onCompleted: () => refetch()
                    });
                  }}
                />
              )}
            </Stack>
          </Grid>
          <TableContainer>
            <Table component={Paper}>
              <TableBody>
                {innerCostRows.map(row => (
                  <StyledTableRow key={row.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: '#ADAABA' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ width: '100%', my: '24px' }} />
        </Grid>

        <Grid className="header" display="flex" my="24px">
          <Typography
            borderLeft="2px solid #DAD6E9"
            paddingLeft="12px"
            variant="body1"
            color="#101820"
            fontSize="18px"
            fontWeight={500}
          >
            اطلاعات حساب کاربری
          </Typography>
        </Grid>
        <Grid
          width="1"
          bgcolor="#fff"
          boxShadow="0px 4px 8px rgba(72, 52, 147, 0.08)"
          borderRadius="10px"
          p="16px"
          mt={2}
        >
          <TableContainer>
            <Table component={Paper}>
              <TableBody>
                {userRows.map(row => {
                  return row.type === 'address' ? (
                    <>
                      <Box my="24px" key={row.name}>
                        <Typography
                          fontSize="14px"
                          mb="8px"
                          sx={{ color: '#ADAABA' }}
                        >
                          {row.name}
                        </Typography>
                        <Typography fontSize="14px">{row.value}</Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <StyledTableRow key={row.name}>
                        <TableCell
                          colSpan={24}
                          component="th"
                          scope="row"
                          sx={{ color: '#ADAABA' }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell colSpan={24} align="left">
                          {row.value}
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid>
            <Box my="24px" width="100%">
              <Typography fontSize="14px" mb="8px" sx={{ color: '#ADAABA' }}>
                {address.name}
              </Typography>
              <Typography fontSize="14px">{address.value}</Typography>
            </Box>
          </Grid>
          <Grid height={'72px'} mt={'16px'}>
            {address?.lat && (
              <NeshanShowingMap latLng={[address.lat, address.lng]} />
            )}
          </Grid>
        </Grid>
        <DrawerComponent
          items={drawerItems}
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
        />
        <DeleteModal
          showDeleteModal={deleteModal}
          label="دیجی اکسپرس"
          onClose={() => setDeleteModal(false)}
        />
      </Style>
    </>
  );
};

export default Digiexpress;
