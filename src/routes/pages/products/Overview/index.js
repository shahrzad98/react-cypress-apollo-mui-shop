import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import SimpleCard from '../../../../components/shared/UI/simpleCard';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import CreateProductmodal from './createModal';

const CARDS = [
  { name: 'لیست محصول', id: 1, icon: 'product', route: '/products/list' },
  {
    name: 'دسته بندی',
    id: 2,
    icon: 'category',
    route: '/products/categories'
  },
  { name: 'تخفیف', id: 3, icon: 'discount', route: '/products/discounts' }
];

const Header = styled(Grid)`
  padding: 20px;

  h1 {
    margin: 0;
    font-size: 20px;
  }
  button {
    height: 40px;
    padding: 0;
    color: #483493;
    font-size: 14px;
    font-weight: 400;
    span {
      margin: 0;
      svg {
        width: 25px;
        height: 25px;
        margin-right: 2px;
      }
    }
  }
  p {
    margin: 0 0 20px;
    font-size: 14px;
    color: #9fa6b9;
  }
`;

const ProductsOverview = () => {
  const navigate = useNavigate();
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  return (
    <Header container>
      <Grid mb={2} alignItems="center" justifyContent="space-between" container>
        <h1>محصول</h1>
        <Button
          onClick={() => setShowCreateDrawer(true)}
          startIcon={<Add />}
          variant="text"
          data-cy="definition"
          color="primary"
        >
          تعریف
        </Button>
      </Grid>
      {/* <SearchInput
        isProduct
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        onClear={() => {
          setValue('');
        }}
        value={value}
        onChange={ev => {
          const enValue =
            ev.target.value?.length > 0
              ? persianJs(ev.target.value).toEnglishNumber().toString()
              : '';
          setValue(enValue);
        }}
        isFocused={isFocused}
        setIsFocused={setisFocused}
      /> */}
      {CARDS.map(e => (
        <SimpleCard
          isProduct
          clickHandler={() => navigate(e.route)}
          id={e.id}
          name={e.name}
          key={e.id}
          icon={e.icon}
        />
      ))}
      <CreateProductmodal
        close={() => setShowCreateDrawer(false)}
        open={showCreateDrawer}
      />
    </Header>
  );
};

export default ProductsOverview;
