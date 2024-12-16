import React, { useState } from 'react';
import { Style } from '../../../style';
import {
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
import DeleteModal from '../../../delete';

const Tipax = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });

  const shippingDetail = data?.shipping?.getShippingMethodDetail;
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      '& th': {
        borderRight: '0.5px solid #fff'
      }
    },
    '& th': {
      borderRight: '0.5px solid #F1F1F1'
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
  const outerCostRows = [
    {
      id: 1,
      name: 'زمان ارسال',
      value: shippingDetail?.other_provinces_time_sending
    },
    {
      id: 2,
      name: 'نوع هزینه ارسال',
      value:
        +shippingDetail?.other_provinces_cost > 0
          ? 'قیمت دلخواه'
          : SHIPPING_COSTS.find(
              item => item.value == shippingDetail?.other_provinces_cost
            )?.label
    },
    {
      id: 3,
      name: 'مبلغ',
      value:
        +shippingDetail?.other_provinces_cost > 0
          ? shippingDetail?.other_provinces_cost
          : 'رایگان'
    }
  ];
  const innerCostRows = [
    { id: 1, name: 'زمان ارسال', value: shippingDetail?.time_sending },
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
      value: +shippingDetail?.cost > 0 ? shippingDetail?.cost : 'رایگان'
    }
  ];

  return (
    <>
      <Style mx="16px" onClose={() => setOpenDrawer(false)}>
        <Grid className="header" my="24px">
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500}>
              {shippingDetail?.name}
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
          height="80%"
        >
          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb="24px"
            >
              <Typography color="#6A6F80" fontSize="18px">
                درون استانی
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
          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb="24px"
            >
              <Typography color="#6A6F80" fontSize="18px">
                برون استانی
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
