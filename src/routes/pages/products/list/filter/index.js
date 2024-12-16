import styled from '@emotion/styled';
import {
  Button,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  Select,
  Slider,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Style = styled(Drawer)`
  tags-standard-option-0 {
    background-color: red;
  }

  h3 {
    font-size: 16px;
    margin: 0;
    margin: 20px 0 17px;
    color: #6a6f80;
  }

  .paperw {
    width: 100vw;
    background-color: #f5f6fa;
    height: 100vh;
    padding: 24px 16px 0;
    overflow-y: auto;

    .submitBtn {
      margin-top: 16px;
      margin-bottom: 20px;
      position: absolute;
      bottom: 0;
      left: 3%;
      width: 94%;
      height: 55px;
    }
  }

  .header {
    h1 {
      margin: 0;
      font-size: 20px;
    }

    .df-arrow {
      margin-right: 6px;
      color: #000;
    }
  }

  .paperCont {
    margin-top: 16px;
    background-color: #fff;
    padding: 0 16px 24px;
    border-radius: 16px;
    height: calc(100vh - 260px);
    overflow-y: scroll;
  }

  .options {
    font-size: 14px;
    margin: 0;
  }

  .dropdown {
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 15px;
    margin-right: 10px;
    color: #483493;
    margin-top: 5px;
  }
  .dropdown-opened {
    transform: rotate(-90deg);
    margin-left: 10px;
    font-size: 15px;
    margin-right: 10px;
    color: #483493;
    margin-top: 1px;
  }

  .price-range-input {
    width: 40%;
  }
`;

const OrdersFilters = ({ open, close, filterPrimaries, setSearchparams }) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState('');
  const [category, setCategory] = useState('');
  const [costRange, setCostRange] = useState([0, 0]);
  const [primaryCostRange, setPrimaryCostRange] = useState([0, 0]);
  const [stockRange, setStockRange] = useState([0, 0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    if (filterPrimaries?.max_cost) {
      setCostRange([filterPrimaries?.min_cost, filterPrimaries?.max_cost]);
    }
    if (filterPrimaries?.max_primary_cost) {
      setPrimaryCostRange([
        filterPrimaries?.min_primary_cost,
        filterPrimaries?.max_primary_cost
      ]);
    }
    if (filterPrimaries?.max_stock) {
      setStockRange([filterPrimaries?.min_stock, filterPrimaries?.max_stock]);
    }
  }, [filterPrimaries]);

  const submitFilterHandler = () => {
    let body = {
      ...(category && { category: category }),
      ...(name && { name: name }),
      max_cost: costRange[1],
      min_cost: costRange[0],
      max_primary_cost: primaryCostRange[1],
      min_primary_cost: primaryCostRange[0],
      max_stock: stockRange[1],
      min_stock: stockRange[0],
      is_active: isActive,
      isFilter: true
    };
    setSearchparams(body);
  };

  return (
    <Style
      onClose={close}
      data-cy="productList-filters"
      PaperProps={{ class: 'paperw' }}
      open={open}
      anchor="bottom"
    >
      <Grid className="header" container justifyContent="space-between">
        <h1
          onClick={() => {
            setSearchparams({});
            close();
          }}
        >
          <i className="df-arrow" /> فیلتر ها
        </h1>
        <Button
          onClick={() => {
            setSearchparams({ clearedFilter: true });
            setName('');
            setCategory('');
            setIsActive('');
            setSelectedCategory('');
            setCostRange([0, 0]);
            setPrimaryCostRange([0, 0]);
          }}
        >
          حذف همه فیلترها
        </Button>
      </Grid>
      <Grid alignContent="flex-start" className="paperCont" container>
        <h3>نام محصول</h3>
        <Grid xs={12}>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="نام محصول را وارد کنید"
            fullWidth
            data-cy="productList-filters-name"
            variant="outlined"
          />
        </Grid>
        <Grid container>
          <h3>دسته بندی</h3>
        </Grid>
        <Grid container>
          <FormControl fullWidth>
            <Select
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              className="select-cat"
              data-cy="select-category"
              IconComponent={() => (
                <i
                  className={
                    isOpen ? 'df-arrow dropdown-opened' : 'df-arrow dropdown'
                  }
                />
              )}
              name="category"
              displayEmpty
              value={category}
              renderValue={() => {
                if (category && selectedCategory) return selectedCategory;
                return (
                  <p style={{ margin: 0 }}>دسته بندی مورد نظر را انتخاب کنید</p>
                );
              }}
            >
              {filterPrimaries?.categories?.map(e => (
                <div key={e.id}>
                  <MenuItem
                    onClick={gh => {
                      setCategory(gh.target.value);
                      setSelectedCategory(e.title);
                    }}
                    style={{ padding: 0 }}
                    value={e.id}
                  >
                    <Radio
                      disabled
                      style={{ color: '#00CE7D' }}
                      checked={category == e.id}
                    />
                    {e.title}
                  </MenuItem>
                  {e?.child_categories?.length > 0 &&
                    e?.child_categories?.map(f => (
                      <MenuItem
                        key={f.id}
                        onClick={c => {
                          {
                            setCategory(c.target.value);
                            setSelectedCategory(f.title);
                          }
                        }}
                        style={{
                          padding: 0,
                          width: '80%',
                          margin: 'auto',
                          borderRight: '2px solid #f1f1f1'
                        }}
                        value={f.id}
                      >
                        <Radio
                          disabled
                          style={{ color: '#00CE7D' }}
                          checked={category == f.id || category == f.parent}
                        />
                        {f.title}
                      </MenuItem>
                    ))}
                </div>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          <h3>وضعیت</h3>
        </Grid>
        <Grid container>
          <FormControl fullWidth>
            <Select
              onOpen={() => setIsOpenActive(true)}
              onClose={() => setIsOpenActive(false)}
              className="select-cat"
              IconComponent={() => (
                <i
                  className={
                    isOpenActive
                      ? 'df-arrow dropdown-opened'
                      : 'df-arrow dropdown'
                  }
                />
              )}
              onChange={e => setIsActive(e.target.value)}
              name="is_active"
              displayEmpty
              value={isActive}
              renderValue={() => {
                if (isActive === true) return 'فعال';
                else if (isActive === false) return 'غیر فعال';
                else return 'وضعیت را انتخاب کنید';
              }}
            >
              <MenuItem value>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={isActive === true}
                />
                فعال
              </MenuItem>
              <MenuItem value={false}>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={isActive === false}
                />
                غیرفعال
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <h3>قیمت با تخفیف</h3>
        <Grid className="slider" item xs={12}>
          <Slider
            min={0}
            max={filterPrimaries?.max_cost || 100000000}
            value={costRange}
            onChange={(e, value) => {
              setCostRange(value);
            }}
            valueLabelDisplay="off"
            disableSwap
          />
        </Grid>
        <Grid justifyContent="space-between" alignItems="center" container>
          <p>از</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setCostRange([e.target.value, costRange[1]])}
            variant="outlined"
            value={costRange[0]}
            data-cy="productList-DiscountedPrice-from"
          />
          <p>تا</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setCostRange([costRange[0], e.target.value])}
            variant="outlined"
            value={costRange[1]}
            data-cy="productList-DiscountedPrice-to"
          />
        </Grid>
        <h3>قیمت اصلی </h3>
        <Grid className="slider" item xs={12}>
          <Slider
            min={0}
            max={filterPrimaries?.max_primary_cost || 100000000}
            value={primaryCostRange}
            onChange={(e, value) => {
              setPrimaryCostRange(value);
            }}
            valueLabelDisplay="off"
            disableSwap
          />
        </Grid>
        <Grid justifyContent="space-between" alignItems="center" container>
          <p>از</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e =>
              setPrimaryCostRange([e.target.value, primaryCostRange[1]])
            }
            variant="outlined"
            value={primaryCostRange[0]}
            data-cy="productList-price-from"
          />
          <p>تا</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e =>
              setPrimaryCostRange([primaryCostRange[0], e.target.value])
            }
            variant="outlined"
            data-cy="productList-price-to"
            value={primaryCostRange[1]}
          />
        </Grid>
        <h3>موجودی</h3>
        <Grid container justifyContent="space-between">
          <p style={{ color: '#6A6F80', margin: 0 }}>{stockRange[0]}</p>
          <p style={{ color: '#6A6F80', margin: 0 }}>{stockRange[1]}</p>
        </Grid>
        <Grid className="slider" item xs={12}>
          <Slider
            min={0}
            max={filterPrimaries?.max_stock || 100000000}
            value={stockRange}
            onChange={(e, value) => {
              setStockRange(value);
            }}
            valueLabelDisplay="off"
            disableSwap
          />
        </Grid>
      </Grid>
      <Button
        className="submitBtn"
        onClick={submitFilterHandler}
        variant="contained"
        color="primary"
        fullWidth
      >
        اعمال
      </Button>
    </Style>
  );
};

export default OrdersFilters;
