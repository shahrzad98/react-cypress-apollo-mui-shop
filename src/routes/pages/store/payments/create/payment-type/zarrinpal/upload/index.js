import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { StyledGrid } from '../style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DocumentSample from '../../../../../../../../static/image/documentSample.png';
import ImageUploading from 'react-images-uploading';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { ReactComponent as UploadPlus } from '../../../../../../../../static/svg/uploadPlus.svg';
import { ReactComponent as WarningSvg } from '../../../../../../../../static/svg/warning.svg';
import { useMutation, useQuery } from '@apollo/client';
import { UPLOAD_ZARRINPAL_DOCUMENT } from '../../../../../../../../constant/mutations/payment';
import FeedbackModal from '../gateway/feedbackModal';
import { GET_PAYMENT_METHOD } from '../../../../../../../../constant/queries/payment';

const Upload = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [uploadDocument, { loading }] = useMutation(UPLOAD_ZARRINPAL_DOCUMENT);
  const [nationalCard, setNationalCard] = useState();
  const [nationalCardURL, setNationalCardURL] = useState(null);
  const [identificationDoc, setIdentificationDoc] = useState();
  const [identificationDocURL, setIdentificationDocURL] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [feedbackShow, setFeedbackShow] = useState(false);
  const { data } = useQuery(GET_PAYMENT_METHOD, {
    variables: {
      getPaymentMethodId: params?.id
    }
  });
  const paymentInfo = data?.payment?.getPaymentMethod;

  const onChangeNationalCard = async imageList => {
    setFileError(false);
    setNationalCard(imageList[0]);
    setNationalCardURL(URL.createObjectURL(imageList[0].file));
  };
  const onChangeIdentificationDoc = async imageList => {
    setFileError(false);
    setIdentificationDoc(imageList[0]);
    setIdentificationDocURL(URL.createObjectURL(imageList[0].file));
  };
  const uploadZarrinpal = async () => {
    await uploadDocument({
      variables: { files: [nationalCard?.file, identificationDoc?.file] },
      onCompleted: () => setFeedbackShow(true),
      onError: () => setFileError(true)
    });
  };
  function closeFeedback() {
    setFeedbackShow(false);
    navigate('/store/payment');
  }

  return (
    <>
      <FeedbackModal
        modalType="success"
        onClose={closeFeedback}
        open={feedbackShow}
      />
      <Box sx={{ height: 'calc(100vh - 100px)', overflow: 'scroll' }}>
        <StyledGrid container>
          <Grid className="header">
            <Grid
              className="back-link"
              onClick={() => navigate(state?.from || '/store/payment')}
            >
              <i className="df-arrow" />
              <h1>زرین پال</h1>
            </Grid>
            <Typography mt="10px">
              برای اینکه کاربر نقره ای زرین پال باشید ، لطفا مراحل زیر را انجام
              دهید.
            </Typography>
          </Grid>

          <Grid width={1} className="container ">
            <Typography fontSize={16} mb={2}>
              1. فرم احراز هویت را ازاینجا
              <a
                className="identifyFormLink"
                href="https://cdn.zarinpal.com/files/auth.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                &nbsp;لینک&nbsp;
              </a>
              دانلود کنید ، پرینت بگیرید و پس از مطالعه امضا کنید.
            </Typography>
            <Typography fontSize={16} mb={2} textAlign="justify">
              2. اصل کارت ملی خود را در قسمت مربوطه بچسبانید و از خودتان در
              حالیکه فرم احراز هویت را در دست دارید عکس بگیرید.
            </Typography>
            <Typography fontSize={16} mb={2} textAlign="justify">
              3. از کارت ملی خود جداگانه عکس بگیرید.
            </Typography>
            <Typography fontSize={16} mb={3} textAlign="justify">
              4. عکس های گرفته شده را بارگزاری و ارسال کنید.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <img src={DocumentSample} alt="" />
            </Stack>
            <Typography fontSize={18} color="#6A6F80" my={3}>
              تصویر کارت ملی
            </Typography>

            <Grid className="upload">
              <ImageUploading
                inputProps={{
                  disabled:
                    paymentInfo?.is_identity_info_confirmed === 'in processing'
                }}
                data-cy="ImageUploading"
                value={[]}
                onChange={onChangeNationalCard}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, onImageRemove }) => {
                  return (
                    <Grid mt={1} justifyContent="space-between" container>
                      <Grid
                        onClick={loading ? '' : onImageUpload}
                        className={
                          fileError ? 'square file-error' : 'square dashed'
                        }
                      >
                        {nationalCardURL ? (
                          <i className="df-edit" />
                        ) : (
                          <UploadPlus />
                        )}
                      </Grid>
                      {fileError && (
                        <Typography variant="caption" className="errorFeedback">
                          لطفا تصویر را طبق مشخصات وارد کنید.
                        </Typography>
                      )}
                      {imageList?.length > 0 &&
                        imageList.map((e, i) => (
                          <div className="removeImageContainer" key={i}>
                            <div
                              onClick={() => {
                                onImageRemove();
                              }}
                              className="removeImage"
                            >
                              <Close />
                            </div>
                            <img
                              alt=""
                              style={{ width: '100%' }}
                              src={e.data_url}
                              className="square img"
                            ></img>
                          </div>
                        ))}
                    </Grid>
                  );
                }}
              </ImageUploading>
            </Grid>

            {nationalCardURL && (
              <Box className="uploadImageContainer">
                <Box
                  onClick={() => {
                    setNationalCardURL(null);
                    setNationalCard(null);
                  }}
                  className="removeUploadedImage"
                >
                  <i className="df-close" />
                </Box>
                <img src={nationalCardURL} alt="" />
              </Box>
            )}
            <Typography fontSize={18} color="#6A6F80" my={3}>
              تصویر فرم تکمیل شده احراز هویت
            </Typography>
            <Tooltip
              open={paymentInfo?.is_identity_info_confirmed === 'in processing'}
              title="مدارک آپلود شده در حال بررسی می باشد"
            >
              <Grid className="upload" mb="30px">
                <ImageUploading
                  inputProps={{
                    disabled:
                      paymentInfo?.is_identity_info_confirmed ===
                      'in processing'
                  }}
                  data-cy="ImageUploading"
                  value={[]}
                  onChange={onChangeIdentificationDoc}
                  dataURLKey="data_url"
                >
                  {({ imageList, onImageUpload, onImageRemove }) => (
                    <Grid mt={1} justifyContent="space-between" container>
                      <Grid
                        onClick={loading ? '' : onImageUpload}
                        className={
                          fileError ? 'square file-error' : 'square dashed'
                        }
                      >
                        {identificationDocURL ? (
                          <i className="df-edit" />
                        ) : (
                          <UploadPlus />
                        )}
                      </Grid>
                      {fileError && (
                        <Typography variant="caption" className="errorFeedback">
                          لطفا تصویر را طبق مشخصات وارد کنید.
                        </Typography>
                      )}
                      {imageList?.length > 0 &&
                        imageList.map((e, i) => (
                          <div className="removeImageContainer" key={i}>
                            <div
                              onClick={() => {
                                onImageRemove();
                              }}
                              className="removeImage"
                            >
                              <Close />
                            </div>
                            <img
                              alt=""
                              style={{ width: '100%' }}
                              src={e.data_url}
                              className="square img"
                            ></img>
                          </div>
                        ))}
                    </Grid>
                  )}
                </ImageUploading>
              </Grid>
            </Tooltip>
            {identificationDocURL && (
              <Box className="uploadImageContainer">
                <Box
                  onClick={() => {
                    setIdentificationDocURL(null);
                    setIdentificationDoc(null);
                  }}
                  className="removeUploadedImage"
                >
                  <i className="df-close" />
                </Box>
                <img src={identificationDocURL} alt="" />
              </Box>
            )}

            {fileError && (
              <Alert
                severity="warning"
                icon={false}
                sx={{
                  borderLeft: '4px solid #F1C21B',
                  marginTop: identificationDocURL && '1rem'
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Box width={40} mr={2}>
                    <WarningSvg />
                  </Box>
                  <Typography fontWeight={500} fontSize={14}>
                    حجم هر فایل باید کمتر از 2 مگابایت و با فرمت Jpg و Png باشد.
                  </Typography>
                </Stack>
              </Alert>
            )}
          </Grid>

          <Grid container className="submitButton">
            <Grid item xs={6} p="0 8px">
              <Button
                fullWidth
                onClick={() => navigate(state?.from || '/store/payment')}
                data-cy="accept"
                variant="outlined"
              >
                بازگشت
              </Button>
            </Grid>
            <Grid item xs={6} p="0 8px">
              <Button
                disabled={
                  paymentInfo?.is_identity_info_confirmed === 'in processing' ||
                  loading ||
                  !nationalCard ||
                  !identificationDoc
                }
                fullWidth
                onClick={uploadZarrinpal}
                data-cy="accept"
                variant="contained"
              >
                تایید
                {loading && (
                  <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
                )}
              </Button>
            </Grid>
          </Grid>
        </StyledGrid>
      </Box>
    </>
  );
};

export default Upload;
