import { Button, Grid, Switch, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Style } from './style';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/delete.svg';
import { ReactComponent as CopySVG } from './svg/copy.svg';
import { ReactComponent as ActiveSVG } from './svg/active.svg';
import { ReactComponent as ShowSVG } from './svg/show.svg';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { PARTIAL_UPDATE_PRODUCT } from '../../../../../constant/mutations/products';
import { GET_USER_INFO } from '../../../../../constant/mutations/mutations';
import { GET_PRODUCTS_LIST } from '../../../../../constant/queries/products';

const ProductModal = ({ close, open, product, deleteClick }) => {
  const [isActive, setIsActive] = useState(true);
  const [editProduct, { loading }] = useMutation(PARTIAL_UPDATE_PRODUCT);

  useEffect(() => {
    if (product) {
      setIsActive(product?.is_active);
    }
  }, [product]);

  const { data: storeData } = useQuery(GET_USER_INFO);

  return (
    <Style open={open} onClose={close} anchor="bottom" data-cy="productModal">
      <Grid container className="content">
        <Grid container justifyContent="center">
          {' '}
          <Grid className="divider"></Grid>
        </Grid>
        {product?.variants?.length === 1 && (
          <Grid container>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/products/details/${product.id}/edit`}
            >
              <Button
                data-cy="edit_product"
                onClick={() => {
                  close();
                }}
                className="btn"
                startIcon={<EditSVG />}
              >
                ویرایش
              </Button>
            </Link>
          </Grid>
        )}
        <Grid container>
          <Button
            onClick={deleteClick}
            className="btn"
            startIcon={<DeleteSVG />}
          >
            حذف
          </Button>
        </Grid>
        {product?.variants?.length === 1 && (
          <Grid container>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/products/details/${product.id}/edit?isCopy=true`}
            >
              <Button className="btn" startIcon={<CopySVG />}>
                ساخت کپی
              </Button>
            </Link>
          </Grid>
        )}
        {storeData?.user?.getUserRead?.my_store[0]?.id ? (
          <Grid container>
            <a
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer"
              href={`${storeData?.user?.getUserRead?.my_store[0]?.ecommerce?.full_sub_domain_path}/product/${product.id}`}
            >
              <Button className="btn" startIcon={<ShowSVG />}>
                نمایش در فروشگاه
              </Button>
            </a>
          </Grid>
        ) : null}
        <Grid alignItems="center" container>
          <Grid alignItems="center" container item xs={6}>
            <Button className="btn" startIcon={<ActiveSVG />}>
              وضعیت
            </Button>
            {!loading && <span>{isActive ? '(فعال)' : '(غیرفعال)'}</span>}
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end">
            {loading ? (
              <CircularProgress />
            ) : (
              <Switch
                onChange={e => {
                  setIsActive(e.target.checked);
                  editProduct({
                    variables: {
                      content: {
                        is_active: e.target.checked
                      },
                      partialUpdateProductId: +product?.id
                    },
                    update: cache => {
                      const { item } = cache.readQuery({
                        query: GET_PRODUCTS_LIST
                      });
                      let newProds = item.getProducts.results.map(object => {
                        if (object.id == product.id) {
                          return { ...object, is_active: !e.target.checked };
                        }
                        return object;
                      });
                      cache.writeQuery({
                        query: GET_PRODUCTS_LIST,
                        data: {
                          item: {
                            ...item,
                            getProducts: {
                              ...item.getProducts,
                              results: [...newProds]
                            }
                          }
                        }
                      });
                    }
                  });
                }}
                value={isActive}
                checked={isActive}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Style>
  );
};

export default ProductModal;
