import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  Paper,
  Stack,
  Box
} from '@mui/material';
import React from 'react';
import CustomTooltip from '../../../../routes/pages/store/payments/create/payment-type/zarrinpal/gateway/tooltip';

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
  [theme.breakpoints.down('sm')]: {
    '& td , th': {
      borderBottom: 'none',
      maxWidth: '120px',
      overflowWrap: 'anywhere'
    }
  },
  '& th:first-of-type , td:first-of-type ': {
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

export default function DetailTable({ rows, tooltip }) {
  return (
    <>
      <TableContainer>
        <Table component={Paper}>
          <TableBody>
            {rows.map(row => {
              let hasTooltip = false;
              for (const T of tooltip) {
                if (T.name === row.name) {
                  hasTooltip = true;
                }
              }
              return (
                <StyledTableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: '#ADAABA' }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row">
                      <Box mx={1}>{row.value}</Box>
                      {hasTooltip && (
                        <CustomTooltip
                          right="-16px"
                          top="8px"
                          arrowStyle="-16px!important"
                          type={row.level}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
