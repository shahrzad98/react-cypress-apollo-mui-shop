import {
  MenuItem,
  Radio,
  Select,
  FormControl,
  Button,
  Grid,
  TextField,
  IconButton
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Style } from './style';
import { formatNumber } from '../../../../utils/helpers';
import { ReactComponent as TrashSVG } from '../../svg/trashCan.svg';
import { Add } from '@mui/icons-material';

const PrimaryFields = ({
  formik,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  const featuresFields = useMemo(() => {
    return formik.values.features?.map((e, i) => (
      <Grid mb={1} key={i} container>
        <Grid
          mt={1}
          pr={1}
          item
          xs={formik?.values?.features?.length > 1 ? 5 : 6}
          container
        >
          <TextField
            name="title"
            value={e.title}
            onChange={e => {
              let featuresCopy = [...formik.values.features];
              featuresCopy[i].title = e.target.value;
              formik.setFieldValue('features', featuresCopy);
            }}
            variant="outlined"
            placeholder="عنوان"
            fullWidth
          />
        </Grid>
        <Grid
          pl={1}
          mt={1}
          item
          xs={formik?.values.features.length > 1 ? 5 : 6}
          container
        >
          <TextField
            name="features-description"
            value={e.description}
            onChange={e => {
              let featuresCopy = [...formik.values.features];
              featuresCopy[i].description = e.target.value;
              formik.setFieldValue('features', featuresCopy);
            }}
            variant="outlined"
            placeholder="توضیح"
            fullWidth
          />
        </Grid>
        {formik?.values.features.length > 1 && (
          <Grid justifyContent="center" container item xs={2}>
            <IconButton
              onClick={() => {
                let newfeatures = [...formik.values.features];
                newfeatures.splice(i, 1);
                formik.setFieldValue('features', newfeatures);
              }}
            >
              <TrashSVG style={{ width: '20px', height: '20px' }} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    ));
  }, [formik.values.features]);
  return (
    <Style container>
      <Grid alignItems="center" justifyContent="space-between" container>
        <h2>اطلاعات محصول</h2>
      </Grid>
      <Grid mt={2} container>
        <h3>نام</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          name="name"
          value={formik.values.name}
          onChange={e => formik.setFieldValue('name', e.target.value)}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
          placeholder="نام محصول را وارد کنید"
          fullWidth
        />
      </Grid>
      <Grid mt={2} container>
        <h3>دسته بندی</h3>
      </Grid>
      <Grid mt={1} container>
        <FormControl fullWidth>
          <Select
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="select-cat"
            IconComponent={() => (
              <i
                className={
                  isOpen ? 'df-arrow dropdown-opened' : 'df-arrow dropdown'
                }
              />
            )}
            name="category"
            displayEmpty
            value={formik?.values?.category}
            renderValue={() => {
              if (formik?.values.category && selectedCategory)
                return selectedCategory;
              return (
                <p style={{ margin: 0 }}>دسته بندی مورد نظر را انتخاب کنید</p>
              );
            }}
          >
            {categories?.map(e => (
              <div key={e.id}>
                <MenuItem
                  onClick={gh => {
                    formik.setFieldValue('category', +gh.target.value);
                    setSelectedCategory(e.title);
                  }}
                  style={{ padding: 0 }}
                  value={e.id}
                >
                  <Radio
                    disabled
                    style={{ color: '#00CE7D' }}
                    checked={formik.values.category == e.id}
                  />
                  {e.title}
                </MenuItem>
                {e?.child_categories?.length > 0 &&
                  e?.child_categories?.map(f => (
                    <MenuItem
                      key={f.id}
                      onClick={c => {
                        {
                          formik.setFieldValue('category', +c.target.value);
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
                        checked={
                          formik.values.category == f.id ||
                          formik.values.category == f.parent
                        }
                      />
                      {f.title}
                    </MenuItem>
                  ))}
              </div>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {formik.values.voucher_cash ? (
        <Grid mt={1} container>
          <p>
            قیمت با تخفیف:{' '}
            {formatNumber(formik.values.cost - formik.values.voucher_cash)}{' '}
            تومان
          </p>
        </Grid>
      ) : (
        ''
      )}
      <Grid mt={2} container>
        <h3>وضعیت</h3>
      </Grid>
      <Grid mt={1} container>
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
            onChange={e => formik.setFieldValue('is_active', e.target.value)}
            name="is_active"
            displayEmpty
            value={formik?.values?.is_active}
            renderValue={() => {
              if (formik.values.is_active) return 'فعال';
              return 'غیر فعال';
            }}
          >
            <MenuItem value>
              {' '}
              <Radio
                disabled
                style={{ color: '#00CE7D' }}
                checked={formik.values.is_active === true}
              />
              فعال
            </MenuItem>
            <MenuItem value={false}>
              {' '}
              <Radio
                disabled
                style={{ color: '#00CE7D' }}
                checked={formik.values.is_active === false}
              />
              غیرفعال
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid mt={2} container>
        <h3>وزن</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          InputProps={{
            endAdornment: <p>گرم</p>
          }}
          name="weight"
          value={formik.values.weight}
          onChange={e => formik.setFieldValue('weight', e.target.value)}
          error={formik.touched.weight && formik.errors.weight}
          helperText={formik.touched.weight && formik.errors.weight}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid alignItems="center" mt={2} container justifyContent="space-between">
        <h3>مشخصات</h3>
        <Button
          onClick={() => {
            let featuresCopy = [...formik.values.features];
            featuresCopy.push({
              title: '',
              description: ''
            });
            formik.setFieldValue('features', featuresCopy);
          }}
          className="add-btn"
          color="primary"
          variant="text"
          startIcon={<Add />}
        >
          افزودن
        </Button>
      </Grid>
      {featuresFields}
      <Grid mt={2} container>
        <h3>توضیحات</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          multiline
          placeholder="توضیحات محصول را وارد کنید."
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={e => formik.setFieldValue('description', e.target.value)}
          error={formik.touched.description && formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Style>
  );
};

export default PrimaryFields;
