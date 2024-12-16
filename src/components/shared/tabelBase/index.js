import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  Paper
} from '@mui/material';
import React from 'react';

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

export default function index({ innerCostRows }) {
  return (
    <>
      <TableContainer>
        <Table component={Paper}>
          <TableBody>
            {innerCostRows.map(row => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row" sx={{ color: '#ADAABA' }}>
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
