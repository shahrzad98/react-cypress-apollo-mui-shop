import React from 'react';
import styled from '@emotion/styled';

const Style = styled('div')({
  '& ul': {
    margin: '0',
    padding: '0',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#F3F3F3',
      borderRadius: '10px',
      '& .table--cell': {
        flex: '1 1',
        textAlign: 'left',
        padding: '14px',
        '& p': {
          margin: '0',
          fontSize: '14px',
          color: '#ADAABA'
        },
        '&:first-of-type': {
          borderRight: '1px solid #fff'
        },
        '&:last-child': {
          '& p': {
            color: '#6A6F80'
          }
        }
      },
      '&:nth-of-type(even)': {
        background: '#fff'
      }
    }
  }
});

const Table = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <Style>
      <ul>
        {data.map(({ key, value }, i) => (
          <li key={i}>
            <div className="table--cell">
              <p>{key}</p>
            </div>
            <div className="table--cell">
              <p>{value}</p>
            </div>
          </li>
        ))}
      </ul>
    </Style>
  );
};

export default Table;
