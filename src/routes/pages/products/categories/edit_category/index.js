import { Add, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as EmptyImgSVG } from './svg/emptyImage.svg';
import ImageUploading from 'react-images-uploading';
import { useMutation, useQuery } from '@apollo/client';
import { UPLOAD_IMAGE } from '../../../../../constant/mutations/products';
import { GET_CATEGORY } from '../../../../../constant/queries/products';
import { EDIT_CATEGORY } from '../../../../../constant/mutations/products';
import ImageCropperModal from '../../../../../components/createProduct/modal/imageCropperModal/index';
import { useCallback } from 'react';

const CreateCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [imageUUid, setImageUUid] = useState('');
  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [lastImage, setLastImage] = useState({});
  const [showCropper, setShowCropper] = useState(false);
  const { data: categoryData, loading: categoryLoading } = useQuery(
    GET_CATEGORY,
    {
      variables: {
        getCategoryId: params?.categoryId
      }
    }
  );

  const handleUploadCroppedImage = useCallback(
    img => {
      uploadImage({
        variables: {
          file: img.file
        },
        onCompleted: response => {
          setImages(prev => {
            return [...prev, img];
          });
          setImageUUid(response?.item?.uploadImage?.uuid);
        },
        onError: () => {
          setErrors({ image: 'عکس مورد نظر مجاز نیست.' });
        }
      });
    },
    [setImageUUid, setImages]
  );
  const onChange = (imageList, addUpdateIndex) => {
    setErrors({});
    if (addUpdateIndex) {
      setLastImage(imageList[addUpdateIndex[0]]);
      setShowCropper(true);
    } else {
      setImages(imageList);
    }
  };

  // const onChange = (imageList, addUpdateIndex) => {
  //   setErrors({});
  //   if (addUpdateIndex) {
  //     uploadImage({
  //       variables: {
  //         file: imageList[imageList?.length - 1].file
  //       },
  //       onCompleted: response => {
  //         setImages(imageList);
  //         setImageUUid(response?.item?.uploadImage?.uuid);
  //       },
  //       onError: () => {
  //         setErrors({ image: 'عکس مورد نظر مجاز نیست.' });
  //       }
  //     });
  //   } else {
  //     setImages(imageList);
  //   }
  // };

  useEffect(() => {
    if (categoryData?.item?.getCategory?.title) {
      setName(categoryData?.item?.getCategory?.title);
    }
    if (categoryData?.item?.getCategory?.image?.image) {
      setImage(categoryData?.item?.getCategory?.image?.image);
      setImageUUid(categoryData?.item?.getCategory?.image?.uuid);
    }
  }, [categoryData]);

  const [editCategory, { loading: editLoading }] = useMutation(EDIT_CATEGORY);

  window.onpopstate = function () {
    navigate('/products/categories');
  };
  history.pushState({}, '');

  return (
    <Style container>
      <ImageCropperModal
        open={showCropper}
        close={() => setShowCropper(false)}
        image={lastImage?.data_url}
        setImage={handleUploadCroppedImage}
      />
      <Grid onClick={() => navigate('/products/categories')} className="header">
        <i className="df-arrow" />
        <h1>ویرایش دسته بندی</h1>
      </Grid>
      {categoryLoading ? (
        <Skeleton
          variant="rectangular"
          style={{
            width: '100%',
            height: '600px',
            borderRadius: '10px',
            marginTop: '16px'
          }}
        />
      ) : (
        <Grid alignContent="start" mt={2} container className="content">
          <Grid container>
            <h2>دسته بندی {categoryData?.item?.getCategory?.title}</h2>
          </Grid>
          <Grid mt={2} container>
            <h3>تصویر</h3>
          </Grid>
          <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <>
                <Grid mt={1} justifyContent="space-between" container>
                  <Grid
                    onClick={loading ? '' : onImageUpload}
                    className="square dashed"
                  >
                    {loading ? (
                      <CircularProgress
                        style={{
                          width: '48px',
                          height: '48px',
                          color: '#6A6F80'
                        }}
                      />
                    ) : images?.length > 0 || image ? (
                      <i
                        className="df-edit"
                        style={{ color: '#6A6F80', fontSize: '30px' }}
                      />
                    ) : (
                      <Add
                        style={{
                          width: '48px',
                          height: '48px',
                          color: '#6A6F80'
                        }}
                      />
                    )}
                  </Grid>
                  {imageList?.length > 0 ? (
                    imageList.map((e, i) => (
                      <div
                        style={{ width: '48%', position: 'relative' }}
                        key={i}
                      >
                        <div
                          onClick={() => {
                            onImageRemove();
                            setImage();
                            setImageUUid('');
                          }}
                          className="removeImage"
                        >
                          <Close />
                        </div>
                        <img
                          style={{ width: '100%' }}
                          src={e.data_url}
                          className="square img"
                        ></img>
                      </div>
                    ))
                  ) : image ? (
                    <div style={{ width: '48%', position: 'relative' }}>
                      <div
                        onClick={() => {
                          setImage();
                          setImageUUid('');
                        }}
                        className="removeImage"
                      >
                        <Close />
                      </div>
                      <img
                        style={{ width: '100%' }}
                        src={image}
                        className="square img"
                      ></img>
                    </div>
                  ) : (
                    <Grid className="square img">
                      <EmptyImgSVG />
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </ImageUploading>
          <Grid mt={1} container>
            <p className="error">{errors?.image}</p>
          </Grid>
          <Grid mt={2} container>
            <h3>نام</h3>
          </Grid>
          <Grid mt={1} container>
            <TextField
              fullWidth
              data-cy="edit_name"
              helperText={errors.name}
              error={errors.name}
              placeholder="نام دسته بندی را وارد کنید"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setErrors({});
              }}
            />
          </Grid>
        </Grid>
      )}

      <Grid className="footer">
        <Button
          data-cy="submit_product"
          onClick={() => {
            if (!name) {
              setErrors({
                name: 'نام، اطلاعات مورد نیاز برای نمایش دسته بندی می باشد'
              });
            }
            if (!imageUUid) {
              setErrors({
                image: 'تصویر برای دسته بندی الزامی می باشد'
              });
            }
            if (name && imageUUid) {
              editCategory({
                variables: {
                  partialUpdateCategoryId: params.categoryId,
                  content: {
                    title: name,
                    image: imageUUid,
                    ...(params.parentId && { parent: params.parentId })
                  }
                },
                onCompleted: data => {
                  navigate(
                    `/products/categories/add_product/${data?.item?.partialUpdateCategory?.id}?origin=add-product`
                  );
                }
              });
            }
          }}
          disabled={editLoading || loading}
          variant="contained"
          color="primary"
          fullWidth
        >
          {editLoading ? (
            <CircularProgress style={{ width: '24px', height: '24px' }} />
          ) : (
            'ثبت و ادامه'
          )}
        </Button>
      </Grid>
    </Style>
  );
};

export default CreateCategory;
