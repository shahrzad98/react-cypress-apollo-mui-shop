import { Add } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import persianJs from 'persianjs';
import React, { useCallback, useState } from 'react';
import { Style } from './style';
import { ReactComponent as TrashSVG } from '../../svg/trashCan.svg';
import { formatNumber } from '../../../../utils/helpers';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  voucher_cash: yup.number().typeError('مبلغ را به درستی وارد کنید'),
  voucher_percent: yup.number().typeError('مبلغ را به درستی وارد کنید'),
  weight: yup.number().typeError('وزن را به درستی وارد کنید.')
});

const SecondaryFieldsCard = ({
  open,
  close,
  formik,
  categories,
  setSelectedCategory,
  selectedCategory,
  setSearchParams,
  openToast
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  const internalFormik = useFormik({
    initialValues: {
      category: formik.values.category || '',
      is_active: formik.values.is_active || true,
      voucher_cash: formik.values.voucher_cash || '',
      voucher_percent: formik.values.voucher_percent || '',
      weight: formik.values.weight || '',
      features: formik.values.features || [
        {
          title: '',
          description: ''
        }
      ],
      description: formik.values.description || ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      formik.setFieldValue('category', values.category);
      formik.setFieldValue('is_active', values.is_active);
      formik.setFieldValue('voucher_cash', values.voucher_cash);
      formik.setFieldValue('voucher_percent', values.voucher_percent);
      formik.setFieldValue('weight', values.weight);
      formik.setFieldValue('features', values.features);
      formik.setFieldValue('description', values.description);
      setSearchParams({});
      openToast();
    }
  });

  internalFormik.handleChange = e => {
    if (e?.target?.value) {
      const newValue = persianJs(e.target.value).toEnglishNumber().toString();
      // e.target.value = parseFloat(e.target.value) || 0;
      formik.setFieldValue(e.target.name, parseFloat(newValue) || 0);
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  };
  const removeNonNumeric = useCallback(
    num => num.toString().replace(/[^0-9]/g, ''),
    []
  );
  return (
    <Style onClose={close} open={open} anchor="right">
      <form onSubmit={internalFormik.handleSubmit}>
        <Grid onClick={close} className="header">
          <i className="df-arrow" />
          <h1>اطلاعات بیشتر</h1>
        </Grid>
        <Grid container className="fields-container">
          <Grid mt={2} container>
            <h3>دسته بندی</h3>
          </Grid>
          <Grid mt={1} container>
            <FormControl fullWidth>
              <Select
                data-cy="category_select"
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
                value={internalFormik?.values?.category}
                renderValue={() => {
                  if (internalFormik?.values.category && selectedCategory)
                    return selectedCategory;
                  return (
                    <p style={{ margin: 0 }}>
                      دسته بندی مورد نظر را انتخاب کنید
                    </p>
                  );
                }}
              >
                {categories?.map((e, i) => (
                  <div key={e.id}>
                    <MenuItem
                      data-cy={`select_category_option_${i}`}
                      onClick={gh => {
                        internalFormik.setFieldValue(
                          'category',
                          +gh.target.value
                        );
                        setSelectedCategory(e.title);
                      }}
                      style={{ padding: 0 }}
                      value={e.id}
                    >
                      <Radio
                        disabled
                        style={{ color: '#00CE7D' }}
                        checked={internalFormik.values.category == e.id}
                      />
                      {e.title}
                    </MenuItem>
                    {e?.child_categories?.length > 0 &&
                      e?.child_categories?.map(f => (
                        <MenuItem
                          key={f.id}
                          onClick={c => {
                            {
                              internalFormik.setFieldValue(
                                'category',
                                +c.target.value
                              );
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
                              internalFormik.values.category == f.id ||
                              internalFormik.values.category == f.parent
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
          <Grid mt={2} container>
            <h3>وضعیت</h3>
          </Grid>
          <Grid mt={1} container>
            <FormControl fullWidth>
              <Select
                data-cy="isActive_select"
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
                onChange={e =>
                  internalFormik.setFieldValue('is_active', e.target.value)
                }
                name="is_active"
                displayEmpty
                value={internalFormik?.values?.is_active}
                renderValue={() => {
                  if (internalFormik.values.is_active) return 'فعال';
                  return 'غیر فعال';
                }}
              >
                <MenuItem data-cy="active_option" value>
                  {' '}
                  <Radio
                    disabled
                    style={{ color: '#00CE7D' }}
                    checked={internalFormik.values.is_active === true}
                  />
                  فعال
                </MenuItem>
                <MenuItem data-cy="deactive_option" value={false}>
                  {' '}
                  <Radio
                    disabled
                    style={{ color: '#00CE7D' }}
                    checked={internalFormik.values.is_active === false}
                  />
                  غیرفعال
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid mt={2} container>
            <h3>تخفیف</h3>
          </Grid>
          <Grid mt={1} item xs={6} pr={1} container>
            <TextField
              name="voucher_cash"
              value={internalFormik.values.voucher_cash}
              onChange={e => {
                if (e.target.value) {
                  const newValue = persianJs(e.target.value)
                    .toEnglishNumber()
                    .toString();

                  let percent = (
                    (1 -
                      parseFloat(
                        formik.values.cost.replace(/,/g, '') - newValue
                      ) /
                        parseFloat(formik.values.cost.replace(/,/g, ''))) *
                    100
                  ).toFixed();
                  if (percent < 100) {
                    internalFormik.setFieldValue('voucher_cash', newValue);
                    internalFormik.setFieldValue('voucher_percent', percent);
                  }
                } else {
                  internalFormik.setFieldValue('voucher_cash', '');
                  internalFormik.setFieldValue('voucher_percent', '');
                }
              }}
              error={
                internalFormik.touched.voucher_cash &&
                internalFormik.errors.voucher_cash
              }
              helperText={
                internalFormik.touched.voucher_cash &&
                internalFormik.errors.voucher_cash
              }
              variant="outlined"
              disabled={!formik.values.cost}
              InputProps={{
                endAdornment: <p>تومان</p>
              }}
              placeholder="مبلغ"
              fullWidth
            />
          </Grid>
          <Grid mt={1} item xs={6} pl={1} container>
            <TextField
              name="voucher_percent"
              value={internalFormik.values.voucher_percent}
              disabled={!formik.values.cost}
              onChange={e => {
                const re = /^[0-9\b]+$/;
                let val = e?.target?.value;
                if (val) {
                  if (re.test(val)) {
                    const newValue = persianJs(val)
                      .toEnglishNumber()
                      .toString();
                    if (newValue < 100 && newValue > 0) {
                      internalFormik.setFieldValue('voucher_percent', newValue);
                      let cost =
                        (parseFloat(formik.values.cost.replace(/,/g, '')) *
                          newValue) /
                        100;
                      internalFormik.setFieldValue('voucher_cash', cost);
                    }
                  }
                } else {
                  internalFormik.setFieldValue('voucher_percent', '');
                  internalFormik.setFieldValue('voucher_cash', '');
                }
              }}
              error={
                internalFormik.touched.voucher_percent &&
                internalFormik.errors.voucher_percent
              }
              helperText={
                internalFormik.touched.voucher_percent &&
                internalFormik.errors.voucher_percent
              }
              variant="outlined"
              InputProps={{
                endAdornment: <p>%</p>
              }}
              placeholder="درصد"
              fullWidth
            />
          </Grid>
          <Grid mt={1} container>
            {!formik.values.cost ? (
              <p
                style={{ color: '#6A6F80', fontSize: '14px', fontWeight: 400 }}
              >
                برای تعریف تخفیف ابتدا قیمت را وارد کنید
              </p>
            ) : internalFormik.values.voucher_cash ? (
              <p
                style={{ color: '#6A6F80', fontSize: '14px', fontWeight: 400 }}
              >
                مبلغ با تخفیف:{' '}
                {formatNumber(
                  parseFloat(formik.values.cost.replace(/,/g, '')) -
                    internalFormik.values.voucher_cash
                )}{' '}
                تومان
              </p>
            ) : (
              ''
            )}
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
              value={internalFormik.values.weight}
              onChange={e => {
                if (e.target.value) {
                  const newVal = persianJs(e.target.value)
                    .toEnglishNumber()
                    .toString();
                  internalFormik.setFieldValue(
                    'weight',
                    removeNonNumeric(newVal)
                  );
                } else {
                  internalFormik.setFieldValue('weight', '');
                }
              }}
              error={
                internalFormik.touched.weight && internalFormik.errors.weight
              }
              helperText={
                internalFormik.touched.weight && internalFormik.errors.weight
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            alignItems="center"
            mt={2}
            container
            justifyContent="space-between"
          >
            <h3>مشخصات</h3>
            <Button
              onClick={() => {
                let featuresCopy = [...internalFormik.values.features];
                featuresCopy.push({
                  title: '',
                  description: ''
                });
                internalFormik.setFieldValue('features', featuresCopy);
              }}
              data-cy="add_features_btn"
              className="add-btn"
              color="primary"
              variant="text"
              startIcon={<Add />}
            >
              افزودن
            </Button>
          </Grid>
          {internalFormik.values.features?.map((e, i) => (
            <Grid mb={1} key={i} container>
              <Grid
                mt={1}
                pr={1}
                item
                xs={internalFormik?.values.features.length > 1 ? 5 : 6}
                container
              >
                <TextField
                  name="title"
                  value={e.title}
                  onChange={e => {
                    let featuresCopy = [...internalFormik.values.features];
                    featuresCopy[i].title = e.target.value;
                    internalFormik.setFieldValue('features', featuresCopy);
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
                xs={internalFormik?.values.features.length > 1 ? 5 : 6}
                container
              >
                <TextField
                  name="features-description"
                  value={e.description}
                  onChange={e => {
                    let featuresCopy = [...internalFormik.values.features];
                    featuresCopy[i].description = e.target.value;
                    internalFormik.setFieldValue('features', featuresCopy);
                  }}
                  variant="outlined"
                  placeholder="توضیح"
                  fullWidth
                />
              </Grid>
              {internalFormik?.values.features.length > 1 && (
                <Grid justifyContent="center" container item xs={2}>
                  <IconButton
                    onClick={() => {
                      let newfeatures = [...internalFormik.values.features];
                      newfeatures.splice(i, 1);
                      internalFormik.setFieldValue('features', newfeatures);
                    }}
                  >
                    <TrashSVG style={{ width: '20px', height: '20px' }} />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
          <Grid mt={2} container>
            <h3>توضیحات</h3>
          </Grid>
          <Grid mt={1} container>
            <TextField
              multiline
              placeholder="توضیحات محصول را وارد کنید."
              rows={3}
              name="description"
              value={internalFormik.values.description}
              onChange={e =>
                internalFormik.setFieldValue('description', e.target.value)
              }
              error={
                internalFormik.touched.description &&
                internalFormik.errors.description
              }
              helperText={
                internalFormik.touched.description &&
                internalFormik.errors.description
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          data-cy="submit_more_data"
          alignItems="center"
          justifyContent="center"
          className="submitBtnCont"
          container
        >
          <Button type="submit" fullWidth color="primary" variant="contained">
            تائید جزئیات
          </Button>
        </Grid>
      </form>
    </Style>
  );
};

export default SecondaryFieldsCard;
