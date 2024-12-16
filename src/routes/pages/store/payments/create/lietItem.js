import * as React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  margin: '8px ',
  height: '148px'
});

export default function ListItem({ svgComponent, title, link, disabel }) {
  const navigate = useNavigate();
  return (
    <>
      <StyledCard
        onClick={() => !disabel && navigate(`/store/payment/create/${link}`)}
        sx={{
          ...(disabel && { opacity: 0.4 })
        }}
      >
        <Stack
          direction="column"
          justifyContent={'space-evenly'}
          alignItems="center"
          height={'100%'}
        >
          <Stack direction="row" alignItems="center">
            <Typography mx={2}>{svgComponent}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography mx={2}>{title}</Typography>
          </Stack>
        </Stack>
      </StyledCard>
    </>
  );
}
