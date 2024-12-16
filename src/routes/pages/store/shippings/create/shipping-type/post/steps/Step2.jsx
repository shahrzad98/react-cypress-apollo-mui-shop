import * as React from 'react';
import { Autocomplete, Box, Grid, Radio, TextField } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import {
  GET_POST_PROVINCES_CITIES,
  GET_UNIT_NODES
} from '../../../../../../../../constant/queries/shipping';
import { useEffect, useState } from 'react';
import NeshanShowingMap from '../../../../../../../../components/shared/mapNeshan/showingMap';
import { useSearchParams } from 'react-router-dom';
import PostMap from '../map';

const Step2 = ({ form, errors }) => {
  const { data: provinces } = useQuery(GET_POST_PROVINCES_CITIES, {
    variables: { params: { post_type: 4 } }
  });
  const { data: unitNodes } = useQuery(GET_UNIT_NODES);
  const provinceData = provinces?.order?.getPostProvincesCities || [];
  const [unitNodesData, setUnitNodesData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (form?.values?.city?.name?.length && unitNodes) {
      setUnitNodesData(prev => ({
        ...prev,
        units:
          Object.keys(
            unitNodes?.shipping?.getUnitsNodes?.units[
              form?.values?.province?.name
            ] || {}
          ) || []
      }));
      setUnitNodesData(prev => ({
        ...prev,
        nodes:
          Object.keys(
            unitNodes?.shipping?.getUnitsNodes?.nodes[
              form?.values?.city?.name
            ] || {}
          ) || []
      }));
    }
  }, [form.values?.city?.name]);
  return (
    <Box>
      {searchParams.get('editMap') ? (
        <PostMap
          latLng={[form?.values?.latLng[0], form?.values?.latLng[1]]}
          setLatLng={val =>
            form.setFieldValue('latLng', [String(val[0]), String(val[1])])
          }
        />
      ) : (
        <>
          <Grid>
            <p>استان</p>
            <Autocomplete
              fullWidth
              options={provinceData?.provinces || []}
              value={form.values.province}
              noOptionsText="یافت نشد"
              popupIcon={<KeyboardArrowDown />}
              onChange={(e, value) => {
                if (value?.name) {
                  form.setFieldValue('city', {
                    name: ''
                  });
                  form.setFieldValue('province', {
                    name: value.name
                  });
                } else {
                  form.setFieldValue('city', {
                    name: ''
                  });
                  form.setFieldValue('province', {
                    name: ''
                  });
                }
              }}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid container {...props}>
                  <Radio
                    checked={form?.values?.province?.name === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  name="province"
                  error={form.touched.province && Boolean(errors.province)}
                  helperText={form?.touched?.province && errors?.province?.name}
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  {...params}
                  placeholder="استان خود را انتخاب کنید."
                  inputProps={{
                    ...params.inputProps
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <p>شهر</p>
            <Autocomplete
              options={
                (provinceData['cities'] &&
                  provinceData['cities'][form.values.province?.name]) ||
                []
              }
              value={form.values.city}
              noOptionsText="یافت نشد"
              disabled={!form.values.province?.name}
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              onChange={(e, value) => {
                if (value?.name) {
                  form.setFieldValue('city', {
                    name: value.name?.trim()
                  });
                } else {
                  form.setFieldValue('city', {
                    name: ''
                  });
                }
              }}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid container {...props}>
                  <Radio
                    checked={form?.values.city.name === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  name="city"
                  error={form.touched.city && Boolean(errors.city)}
                  helperText={form?.touched?.city && errors?.city?.name}
                  autoComplete="off"
                  variant="outlined"
                  placeholder=" شهر خود را انتخاب کنید"
                  {...params}
                  inputProps={{
                    ...params.inputProps
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <p>واحد پستی</p>
            <Autocomplete
              fullWidth
              disabled={!form.values.province?.name}
              options={
                unitNodesData?.units?.map(el => ({
                  name: el
                })) || []
              }
              value={form.values.unit}
              onChange={(e, value) => {
                if (value?.name) {
                  form.setFieldValue('unit', {
                    name: value.name
                  });
                } else {
                  form.setFieldValue('unit', {
                    name: ''
                  });
                }
              }}
              noOptionsText="یافت نشد"
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid container {...props}>
                  <Radio
                    checked={form?.values?.unit === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  name="unit"
                  error={form.touched.unit && Boolean(errors.unit)}
                  helperText={form?.touched?.unit && errors?.unit?.name}
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  {...params}
                  placeholder="واحد پستی را انتخاب کنید."
                  inputProps={{
                    ...params.inputProps
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <p>نقطه مبادله </p>
            <Autocomplete
              disabled={!form.values.city?.name}
              fullWidth
              options={
                unitNodesData?.nodes?.map(el => ({
                  name: el
                })) || []
              }
              value={form.values.node}
              onChange={(e, value) => {
                if (value?.name) {
                  form.setFieldValue('node', {
                    name: value.name
                  });
                } else {
                  form.setFieldValue('node', {
                    name: ''
                  });
                }
              }}
              noOptionsText="یافت نشد"
              dir="rtl"
              popupIcon={<KeyboardArrowDown />}
              getOptionLabel={option => option?.name}
              renderOption={(props, option) => (
                <Grid container {...props}>
                  <Radio
                    checked={form?.values?.node === option.name}
                    color="primary"
                  />
                  <p className="option">{option.name}</p>
                </Grid>
              )}
              renderInput={params => (
                <TextField
                  name="node"
                  error={form.touched.node && Boolean(errors.node)}
                  helperText={form?.touched?.node && errors?.node?.name}
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  {...params}
                  placeholder="نقطه مبادله را انتخاب کنید."
                  inputProps={{
                    ...params.inputProps
                  }}
                />
              )}
            />
          </Grid>
          <Grid>
            <p>کد پستی </p>
            <TextField
              name="postal_code"
              value={form.values?.postal_code}
              placeholder="کد پستی خود را وارد کنید."
              onChange={form.handleChange}
              error={form.touched.postal_code && Boolean(errors.postal_code)}
              helperText={form?.touched?.postal_code && errors?.postal_code}
              national_code
              fullWidth
            />
          </Grid>
          <Grid>
            <p>آدرس مبدا تحویل سفارش </p>
            <TextField
              name="address"
              value={form.values?.address}
              onChange={form.handleChange}
              placeholder="آدرس را وارد کنید."
              error={form.touched.address && Boolean(errors.address)}
              helperText={form?.touched?.address && errors?.address}
              fullWidth
              rows={3}
              multiline
            />
          </Grid>
          <Grid
            container
            height="100px"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              setSearchParams({ editMap: true });
            }}
          >
            <NeshanShowingMap
              latLng={[form.values.latLng[0], form.values.latLng[1]]}
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Step2;
