import React, { useState } from 'react';
import { Style } from '../../../style';
import {
  Box,
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
import { useQuery } from '@apollo/client';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import { SHIPPING_COSTS } from '../../../create/shipping-type/postex/constants';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import DeleteModal from '../../../delete';
import { GET_DIGIEXPRESS_CITIES } from '../../../../../../../constant/queries/orders';

const Tipax = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });
  const { data: storeInfo } = useQuery(GET_STORE_INFO);
  const { data: digiexpressCities } = useQuery(GET_DIGIEXPRESS_CITIES);

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
    '& th:first-of-type", td:first-of-type"': {
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

  const outerCostRows = [
    { id: 1, name: 'زمان ارسال', value: shippingDetail.time_sending },
    {
      id: 2,
      name: 'نوع هزینه ارسال',
      value: SHIPPING_COSTS.find(item =>
        item.value == +shippingDetail?.other_provinces_cost > 0
          ? 'قیمت دلخواه'
          : shippingDetail?.other_provinces_cost
      )?.label
    },
    {
      id: 3,
      name: 'مبلغ',
      value:
        +shippingDetail?.other_provinces_cost > 0
          ? shippingDetail?.other_provinces_cost
          : +shippingDetail?.other_provinces_cost === 0
          ? 'رایگان'
          : 'بر اساس محاسبه تیپاکس'
    }
  ];
  const innerCostRows = [
    { id: 1, name: 'زمان ارسال', value: shippingDetail.time_sending },
    {
      id: 2,
      name: 'نوع هزینه ارسال',
      value: SHIPPING_COSTS.find(item =>
        item.value == +shippingDetail?.cost > 0
          ? 'قیمت دلخواه'
          : shippingDetail?.cost
      )?.label
    },
    {
      id: 3,
      name: 'مبلغ',
      value:
        +shippingDetail?.cost > 0
          ? shippingDetail?.cost
          : +shippingDetail?.cost === 0
          ? 'رایگان'
          : 'بر اساس محاسبه تیپاکس'
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
  const isDigiExpressCoverage =
    digiexpressCities?.shipping?.getDigiExpressActiveCities?.active_cities.includes(
      shippingDetail?.address?.province
    );

  return (
    <>
      <Style mx="16px" onClose={() => setOpenDrawer(false)}>
        <Grid className="header" my="24px">
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <h1>تیپاکس</h1>
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
          {!isDigiExpressCoverage && (
            <>
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
                  <IOSSwitch
                    checked={shippingDetail?.my_province_is_active}
                    disabled
                  />
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
            </>
          )}

          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb="24px"
            >
              <Typography color="#6A6F80" fontSize="18px">
                برون شهری
              </Typography>
              <IOSSwitch
                checked={shippingDetail?.other_provinces_is_active}
                disabled
              />
            </Stack>
          </Grid>
          <TableContainer>
            <Table component={Paper}>
              <TableBody>
                {outerCostRows.map(row => (
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
          label="تیپاکس"
          onClose={() => setDeleteModal(false)}
        />
      </Style>
    </>
  );
};

export default Tipax;
