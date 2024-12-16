import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Style } from './style';
import ImageUploading from 'react-images-uploading';
import { useMutation } from '@apollo/client';
import AllImagesDrawer from '../modal/all-images';
import { UPLOAD_IMAGE } from '../../../constant/mutations/products';
import ConfirmModal from '../../../components/createProduct/modal/confirmModal/index';
import BigPicture from '../modal/big-picture';
import ImageCropperModal from '../../../components/createProduct/modal/imageCropperModal';

const ProductImagesUploadCard = ({
  imageUUids,
  setImageUUids,
  openAll,
  searchParams,
  setSearchParams,
  product
}) => {
  const [images, setImages] = useState([]);
  const maxNumber = 50;
  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE);
  const [ownImages, setOwnImages] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalOwn, setDeleteModalOwn] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastImage, setLastImage] = useState({});
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    if (product?.item?.getProduct?.images?.length > 0) {
      let ownUuids = product?.item?.getProduct?.images?.map(e => {
        return e.uuid;
      });
      setOwnImages(product?.item?.getProduct?.images);
      setImageUUids([...imageUUids, ...ownUuids]);
    }
    if (product?.item?.getVariant?.images?.length > 0) {
      let ownUuids = product?.item?.getVariant?.images?.map(e => {
        return e.uuid;
      });
      setOwnImages(product?.item?.getVariant?.images);
      setImageUUids([...imageUUids, ...ownUuids]);
    }
  }, [product]);
  const onChange = (imageList, addUpdateIndex) => {
    setErrors({});
    if (addUpdateIndex) {
      setLastImage(imageList[addUpdateIndex[0]]);
      setShowCropper(true);
    } else {
      setImages(imageList);
    }
  };

  const handleUploadCroppedImage = useCallback(
    img => {
      if (img.file.size < 5782996) {
        uploadImage({
          variables: {
            file: img.file
          },
          onCompleted: response => {
            setImages(prev => {
              return [...prev, img];
            });
            setImageUUids([...imageUUids, response?.item?.uploadImage?.uuid]);
          },
          onError: () => {
            setErrors({ image: 'عکس مورد نظر مجاز نیست.' });
          }
        });
      } else {
        setErrors({ image: '    سایز عکس مورد نظر باید کمتر از 5مگ باشد!' });
      }
    },
    [imageUUids, setImageUUids, setImages]
  );

  // const onChange = (imageList, addUpdateIndex) => {
  //   if (addUpdateIndex) {
  //     uploadImage({
  //       variables: {
  //         file: imageList[imageList?.length - 1].file
  //       },
  //       onCompleted: response => {
  //         setImages(imageList);
  //         setImageUUids([...imageUUids, response?.item?.uploadImage?.uuid]);
  //       },
  //       onError: () => {
  //         setErrors({ image: 'عکس مورد نظر مجاز نیست.' });
  //       }
  //     });
  //   } else {
  //     setImages(imageList);
  //   }
  // };
  return (
    <Style container>
      <ImageCropperModal
        open={showCropper}
        close={() => setShowCropper(false)}
        image={lastImage?.data_url}
        setImage={handleUploadCroppedImage}
      />
      <Grid alignItems="center" justifyContent="space-between" container>
        <h2>تصویر محصول</h2>
        {imageUUids?.length > 2 && (
          <Button onClick={openAll} endIcon={<i className="df-arrow" />}>
            همه
          </Button>
        )}
      </Grid>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemove }) => (
          <>
            <AllImagesDrawer
              imageList={imageList}
              ownImages={ownImages}
              setOwnImages={setOwnImages}
              onImageUpload={onImageUpload}
              close={() => setSearchParams({})}
              onImageRemove={onImageRemove}
              open={searchParams?.get('modal') === 'all-images'}
              imageUUids={imageUUids}
              setImageUUids={setImageUUids}
              loading={loading}
            />
            <Grid container>
              <Button
                disabled={loading}
                onClick={onImageUpload}
                className="btn"
                variant="outlined"
                fullWidth
              >
                {loading ? 'در حال آپلود... ' : <Add />}
              </Button>
            </Grid>
            <Grid mt={2} container className="images_container">
              {ownImages?.map((imgOwn, i) => (
                <div key={i} className="image_item">
                  {searchParams.get('modal') === `big-picture-own-${i}` && (
                    <BigPicture
                      img={imgOwn.image}
                      close={() => setSearchParams({})}
                      index={i}
                      all={imageUUids?.length}
                      openDelete={() => setDeleteModalOwn(i)}
                    />
                  )}
                  {deleteModalOwn === i && (
                    <ConfirmModal
                      submit={() => {
                        let newOwnImages = [...ownImages];
                        newOwnImages?.splice(i, 1);
                        setOwnImages(newOwnImages);
                        let newUUids = [...imageUUids];
                        newUUids.splice(i, 1);
                        setImageUUids(newUUids);
                        setDeleteModalOwn(false);
                        setSearchParams({});
                      }}
                      text={'آیا از حذف تصویر اطمینان دارید؟'}
                      close={() => setDeleteModalOwn(false)}
                    />
                  )}
                  <div
                    onClick={() => {
                      setDeleteModalOwn(i);
                    }}
                    className="closeCont"
                  >
                    <i className="df-close" />
                  </div>
                  <img
                    onClick={() =>
                      setSearchParams({
                        modal: `big-picture-own-${i}`
                      })
                    }
                    src={imgOwn.image}
                    alt=""
                    width="100"
                  />
                </div>
              ))}
              {imageList.map((image, index) => (
                <div key={index} className="image_item">
                  {searchParams.get('modal') === `big-picture-${index}` && (
                    <BigPicture
                      img={image.data_url}
                      close={() => setSearchParams({})}
                      index={index + ownImages?.length}
                      all={imageUUids?.length}
                      openDelete={() => setDeleteModal(index)}
                    />
                  )}
                  {deleteModal === index && (
                    <ConfirmModal
                      submit={() => {
                        onImageRemove(index);
                        let newUUids = [...imageUUids];
                        newUUids.splice(index + ownImages?.length, 1);
                        setImageUUids(newUUids);
                        setDeleteModal(false);
                        setSearchParams({});
                      }}
                      text={'آیا از حذف تصویر اطمینان دارید؟'}
                      close={() => setDeleteModal(false)}
                    />
                  )}
                  <div
                    onClick={() => {
                      setDeleteModal(index);
                    }}
                    className="closeCont"
                  >
                    <i className="df-close" />
                  </div>
                  <img
                    onClick={() =>
                      setSearchParams({
                        modal: `big-picture-${index}`
                      })
                    }
                    src={image.data_url}
                    alt=""
                    width="100"
                  />
                </div>
              ))}
            </Grid>
          </>
        )}
      </ImageUploading>
      {errors?.image ? (
        <p style={{ margin: 0, color: '#ee3b4f', fontSize: '14px' }}>
          {errors?.image}
        </p>
      ) : null}
    </Style>
  );
};

export default ProductImagesUploadCard;
