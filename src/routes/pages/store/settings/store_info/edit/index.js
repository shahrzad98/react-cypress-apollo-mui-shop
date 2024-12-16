import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  Radio,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Style } from './style';
import { ReactComponent as StoreSVG } from '../../../svg/store.svg';
import { ReactComponent as SuccessSVG } from '../../../../../../components/createProduct/svg/success.svg';
import { useFormik } from 'formik';
import persianJs from 'persianjs';
import { KeyboardArrowDown } from '@mui/icons-material';
import provincesDataset from './provinceDataSet';
import { useMutation } from '@apollo/client';
import { EDIT_STORE } from '../../../../../../constant/mutations/store';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import NeshanShowingMap from '../../../../../../components/shared/mapNeshan/showingMap';
import ShowingMapWithoutMarker from '../../../../../../components/shared/mapNeshan/showingMapWithoutMarker';
import { UPLOAD_IMAGE } from '../../../../../../constant/mutations/products';

const GUILDS = [
  { id: 1, name: 'خانگی (کسب و کارهای تلگرامی و اینستاگرامی و امثالهم)' },
  { id: 2, name: 'پوشاک (لباس و کیف و کفش و ...)' },
  { id: 3, name: 'پروتئینی و گوشت' },
  { id: 4, name: 'نوشت افزار و کتاب' },
  { id: 5, name: 'قهوه، شکلات، غذای خشک' },
  { id: 6, name: 'پت شاپ' },
  { id: 7, name: 'آرایشی بهداشتی' },
  { id: 8, name: 'لوازم دیجیتال' },
  { id: 9, name: 'داروخانه' },
  { id: 10, name: 'آجیل و خشکبار' },
  { id: 11, name: 'قنادی، شیرینی، نون فانتزی' },
  { id: 12, name: 'زیورآلات و اکسسوری' },
  { id: 13, name: 'آرایشگاه' },
  { id: 14, name: 'ماساژ' },
  { id: 15, name: 'سوپرمارکت' },
  { id: 16, name: 'کافه رستوران - فست فود' },
  { id: 17, name: 'گیم سنتر' },
  { id: 18, name: 'گلفروشی' },
  { id: 19, name: 'اسباب بازی' },
  { id: 20, name: 'دخانیات' },
  { id: 21, name: 'ابزارآلات' },
  { id: 22, name: 'لوازم یدکی - خودرو' },
  { id: 23, name: 'میوه - سبزی' },
  { id: 24, name: 'عطاری' },
  { id: 25, name: 'آبمیوه - بستنی - حلیم آش' },
  { id: 26, name: 'کارواش' },
  { id: 27, name: 'خرازی- کادویی' },
  { id: 28, name: 'پلاستیک و یکبار مصرف' },
  { id: 29, name: 'عینک' },
  { id: 30, name: 'لبنیات' },
  { id: 31, name: 'سایر' }
];

const postalCodeRegex = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g;

const validationSchema = yup.object().shape({
  name: yup.string().required('نام فروشگاه اجباری است.'),
  // postal_code: yup.number().max(10)
  postal_code: yup
    .string()
    .matches(postalCodeRegex)
    .typeError('کدپستی را به درستی وارد کنید.')
});

const EditStoreDrawer = ({
  open,
  close,
  selectedStore,
  setSearchParams,
  lat,
  lng,
  refetch
}) => {
  const [percentage, setPercentage] = useState(0);
  const [logoImage, setLogoImage] = useState('');
  const [uploadImage, { loading: uploadLoading }] = useMutation(UPLOAD_IMAGE);
  const [editStore, { loading }] = useMutation(EDIT_STORE);

  useEffect(() => {
    if (selectedStore) {
      setLogoImage(selectedStore?.logo?.image);
    }
  }, [selectedStore]);

  const onDrop = async picture => {
    if (picture) {
      uploadImage({
        variables: {
          file: picture.target.files[0]
        },
        onCompleted: response => {
          editStore({
            variables: {
              content: {
                logo: response?.item?.uploadImage?.uuid
              }
            },
            onCompleted: () => {
              setLogoImage(URL.createObjectURL(picture.target.files[0]));
            }
          });
        }
      });
      //   const formData1 = new FormData();
      //   formData1.append('image', picture.target.files[0]);
      //   formData1.append('store_id', selectedStore?.id);
      //   const res = await request('post', api.uploadImg.post, {}, formData1);
      //   if (res) {
      //     setLogoUUID(res.data.uuid);
      //     setLogoImage(res.data.image);
      //   }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: selectedStore?.name || '',
      guild: { name: selectedStore?.guild || '' },
      telephone_number:
        selectedStore?.telephone_number?.replace('+98', '0') || '',
      province: { name: selectedStore?.store_address?.province || '' },
      city: { name: selectedStore?.store_address?.city },
      address: selectedStore?.store_address?.address,
      postal_code: selectedStore?.store_address?.postal_code
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      editStore({
        variables: {
          content: {
            name: values.name,
            telephone_number: values.telephone_number,
            guild: values.guild.name,
            store_address: {
              address: values.address,
              province: values.province.name,
              city: values.city.name,
              postal_code: values.postal_code,
              latitude: `${lat}`,
              longitude: `${lng}`
            }
          }
        },
        onCompleted: () => {
          refetch();
          setSearchParams({});
          toast('ویرایش اطلاعات با موفقیت ثبت شد.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            // closeOnClick: true,
            draggable: true,
            closeButton: false,
            icon: <SuccessSVG />
          });
        }
      });
    }
  });

  formik.handleChange = e => {
    if (e?.target?.value) {
      const newValue = persianJs(e.target.value).toEnglishNumber().toString();
      formik.setFieldValue(e.target.name, newValue);
    } else {
      formik.setFieldValue(e.target.name, '');
    }
  };

  useEffect(() => {
    let count = 0;
    let fields = [
      formik?.values?.name,
      formik?.values?.guild?.name,
      formik?.values?.province?.name,
      formik?.values?.city?.name,
      formik?.values?.telephone_number,
      formik?.values?.postal_code,
      formik?.values?.address,
      logoImage
    ];
    for (let index = 0; index < fields.length; index++) {
      if (fields[index]) {
        count++;
      }
    }
    setPercentage(((count * 100) / 8).toFixed());
  }, [formik.values, logoImage]);

  return (
    <Style anchor="bottom" open={open} onClose={close}>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Grid onClick={close} className="header">
          <i className="df-arrow" />
          <h1>ویرایش اطلاعات فروشگاه</h1>
        </Grid>
        <Grid alignContent="flex-start" mt={3} container className="content">
          <Grid container justifyContent="center">
            <div style={{ width: '85px', height: '85px' }}>
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={4}
                counterClockwise
                styles={{
                  path: {
                    stroke:
                      percentage > 74
                        ? '#02E061'
                        : percentage > 24
                        ? '#FFC72A'
                        : '#EA002A',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center'
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center',
                    width: '1px'
                  },
                  text: {
                    fill: '#f88',
                    fontSize: '16px'
                  },
                  background: {
                    fill: '#3e98c7'
                  }
                }}
              >
                <div
                  // onMouseEnter={() => setHoverIcon(true)}
                  // onMouseLeave={() => {
                  //   setHoverIcon(false);
                  // }}
                  style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#DAD6E966',
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:
                      uploadLoading || loading || logoImage
                        ? 'center'
                        : 'flex-end',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className="hoverDiv">
                    {uploadLoading || loading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <>
                        <input
                          onChange={onDrop}
                          type="file"
                          id="file"
                          style={{ display: 'none' }}
                        />
                        <label
                          style={{
                            cursor: 'pointer',
                            width: '100%',
                            height: '100%'
                          }}
                          htmlFor="file"
                        >
                          {/* <UploadImageSvg /> */}
                        </label>
                      </>
                    )}
                  </div>

                  {uploadLoading || loading ? (
                    <CircularProgress color="primary" />
                  ) : logoImage ? (
                    <img style={{ height: '100%' }} src={logoImage}></img>
                  ) : (
                    <StoreSVG style={{ width: '65%', height: '80%' }} />
                  )}
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </Grid>
          <Grid mt={3} container>
            <h5>اسم فروشگاه</h5>
          </Grid>
          <Grid mt={1} container>
            <TextField
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              name="name"
              data-cy="storeName"
              onChange={formik.handleChange}
              fullWidth
              value={formik?.values?.name}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>صنف</h5>
          </Grid>
          <Grid mt={1} container>
            <Autocomplete
              sx={{ width: '100%' }}
              options={GUILDS}
              value={formik.values.guild}
              data-cy="guildStoreSelected"
              noOptionsText="یافت نشد"
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              onChange={(e, value) => {
                if (value?.name) {
                  formik.setFieldValue('guild', {
                    name: value.name
                  });
                } else {
                  formik.setFieldValue('guild', {
                    name: ''
                  });
                }
              }}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid
                  container
                  // component="li"
                  // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  error={formik?.touched?.guild && formik?.errors?.guild?.name}
                  helperText={
                    formik?.touched?.guild && formik?.errors?.guild?.name
                  }
                  style={{ width: '100%' }}
                  autoComplete="off"
                  variant="outlined"
                  {...params}
                  placeholder="صنف را انتخاب کنید"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                    dataCy: 'optionStoreSelected',
                    form: {
                      autocomplete: 'off'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>استان</h5>
          </Grid>
          <Grid mt={1} container>
            <Autocomplete
              fullWidth
              sx={{ width: '100%' }}
              data-cy="cityStoreSelected"
              options={provincesDataset.provinces}
              value={formik.values.province}
              noOptionsText="یافت نشد"
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              onChange={(e, value) => {
                if (value?.name) {
                  formik.setFieldValue('city', {
                    name: ''
                  });
                  formik.setFieldValue('province', {
                    name: value.name
                  });
                } else {
                  formik.setFieldValue('city', {
                    name: ''
                  });
                  formik.setFieldValue('province', {
                    name: ''
                  });
                }
              }}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid
                  container
                  // component="li"
                  // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Radio
                    checked={formik?.values.province.name === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  error={
                    formik?.touched?.province && formik?.errors?.province?.name
                  }
                  helperText={
                    formik?.touched?.province && formik?.errors?.province?.name
                  }
                  style={{ width: '100%' }}
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  {...params}
                  placeholder="استان خود را انتخاب کنید."
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                    dataCy: 'provinceStoreSelected', // disable autocomplete and autofill
                    form: {
                      autocomplete: 'off'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>شهر</h5>
          </Grid>
          <Grid mt={1} container>
            <Autocomplete
              sx={{ width: '100%' }}
              options={
                formik.values.province.name
                  ? provincesDataset['cities'][formik.values.province.name]
                  : provincesDataset['cities']['تهران']
              }
              value={formik.values.city}
              noOptionsText="یافت نشد"
              data-cy="citiesStoreSelected"
              disabled={!formik.values.province.name}
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              onChange={(e, value) => {
                if (value?.name) {
                  formik.setFieldValue('city', {
                    name: value.name
                  });
                } else {
                  formik.setFieldValue('city', {
                    name: ''
                  });
                }
              }}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid
                  container
                  // component="li"
                  // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Radio
                    checked={formik?.values.city.name === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  error={formik?.touched?.city && formik?.errors?.city?.name}
                  helperText={
                    formik?.touched?.city && formik?.errors?.city?.name
                  }
                  style={{ width: '100%' }}
                  autoComplete="off"
                  variant="outlined"
                  {...params}
                  label="شهر"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                    dataCy: 'citiesStoreSelected', // disable autocomplete and autofill
                    form: {
                      autocomplete: 'off'
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid container mt={2}>
            <h5>تلفن</h5>
          </Grid>
          <Grid container mt={1}>
            <TextField
              fullWidth
              data-cy="teleStore"
              type={'number'}
              name="telephone_number"
              onChange={formik.handleChange}
              value={formik?.values?.telephone_number}
            />
          </Grid>
          <Grid container mt={2}>
            <h5>کد پستی</h5>
          </Grid>
          <Grid container mt={1}>
            <TextField
              fullWidth
              error={formik.touched.postal_code && formik.errors.postal_code}
              data-cy="postalCodeStore"
              helperText={
                formik?.touched?.postal_code && formik?.errors?.postal_code ? (
                  <div>کدپستی نامعتبر است.</div>
                ) : null
              }
              type={'number'}
              variant="outlined"
              value={formik.values?.postal_code}
              name="postal_code"
              onChange={formik.handleChange}
              onInput={e => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </Grid>
          <Grid container mt={2}>
            <h5>آدرس</h5>
          </Grid>
          <Grid container mt={1}>
            <TextField
              multiline
              rows={2}
              fullWidth
              data-cy="address"
              variant="outlined"
              value={formik.values?.address}
              name="address"
              onChange={formik.handleChange}
            />
          </Grid>
          {lat && (
            <Grid
              style={{ height: '100px', marginTop: '24px' }}
              onClick={() => setSearchParams({ modal: 'map' })}
              container
            >
              <NeshanShowingMap latLng={[lat, lng]} />
            </Grid>
          )}{' '}
          {!lat && (
            <Grid
              style={{ height: '100px', marginTop: '24px' }}
              onClick={() => setSearchParams({ modal: 'map' })}
              container
            >
              <ShowingMapWithoutMarker latLng={[35.699739, 51.338097]} />
            </Grid>
          )}
        </Grid>

        <Grid alignItems="center" container className="footer">
          <Button
            data-cy="submitEditStore"
            type="submit"
            disabled={loading}
            fullWidth
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress /> : 'ثبت'}
          </Button>
        </Grid>
      </form>
    </Style>
  );
};

export default EditStoreDrawer;
