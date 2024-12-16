import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  DELETE_CATEGORY,
  PARTIAL_UPDATE_PRODUCT
} from '../../../../constant/mutations/products';
import { GET_CATEGORIES_MAIN_PAGE } from '../../../../constant/queries/products';
import ConfirmModal from '../../../../components/createProduct/modal/confirmModal/index';
import CategoryCard from './caregoryCard';
import CategoryModal from './modal/categoryModal';
import { Style } from './style';
import { ReactComponent as SuccessSVG } from '../../../../components/createProduct/svg/success.svg';
import CategorySkeleton from '../skeletons/CategorySkeleton';

const index = () => {
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedProd, setSelectedProd] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalProd, setDeleteModalProd] = useState(false);
  const navigate = useNavigate();
  const [boom, setBoom] = useState(0);
  const { data, fetchMore, loading, refetch } = useQuery(
    GET_CATEGORIES_MAIN_PAGE,
    {
      variables: {
        params: {
          offset: 0,
          limit: 10,
          parent_only: true
        }
      }
    }
  );
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const [editProduct] = useMutation(PARTIAL_UPDATE_PRODUCT);

  window.onpopstate = function () {
    navigate('/products');
  };
  history.pushState({}, '');

  return (
    <Style>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid
          onClick={() => navigate('/products')}
          item
          xs={6}
          className="header"
        >
          <i className="df-arrow" />
          <h1>دسته بندی</h1>
        </Grid>
        <Grid>
          <p className="count">{data?.item?.getCategories?.count} دسته بندی</p>
        </Grid>
      </Grid>
      <InfiniteScroll
        dataLength={
          data?.item?.getCategories?.results?.length > 0
            ? data?.item?.getCategories?.results?.length
            : 0
        }
        next={async () => {
          setLoadingFetchMore(true);
          await fetchMore({
            variables: {
              params: {
                offset: data?.item?.getCategories?.results?.length,
                limit: 10,
                parent_only: true
              }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                item: {
                  ...prev.item,
                  getCategories: {
                    ...prev.item.getCategories,
                    results: [
                      ...prev.item.getCategories.results,
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      ...fetchMoreResult?.item.getCategories?.results
                    ],
                    next: fetchMoreResult.item.getCategories?.next
                  }
                }
              });
            }
          });
          setLoadingFetchMore(false);
        }}
        hasMore={data?.item?.getCategories?.next !== null}
        scrollableTarget="scrollableDiv"
      >
        {' '}
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => <CategorySkeleton key={e} />)
          : data?.item?.getCategories?.results?.map((e, i) => (
              <>
                <CategoryCard
                  selectedCat={selectedCat}
                  deleteProd={() => {
                    setSelectedCat(e);
                    setDeleteModalProd(true);
                  }}
                  setSelectedProd={setSelectedProd}
                  moreClick={() => {
                    setShowMoreModal(true);
                    setSelectedCat(e);
                    setBoom(boom + 1);
                  }}
                  boom={boom}
                  category={e}
                  key={i}
                  data_cy="accord_category"
                />
                {e?.child_categories?.length > 0 && (
                  <Grid className="child_category" container>
                    <Grid container>
                      <h5>زیر دسته بندی</h5>
                    </Grid>
                    {e?.child_categories?.map((f, i) => (
                      <CategoryCard
                        deleteProd={() => {
                          setSelectedCat(e);
                          setDeleteModalProd(true);
                        }}
                        setSelectedProd={setSelectedProd}
                        isSubCat
                        selectedCat={selectedCat}
                        moreClick={() => {
                          setShowMoreModal(true);
                          setSelectedCat(f);
                          setBoom(boom + 1);
                        }}
                        boom={boom}
                        category={f}
                        key={i}
                        data_cy="child_categories"
                      />
                    ))}
                  </Grid>
                )}
              </>
            ))}
      </InfiniteScroll>
      {loadingFetchMore &&
        [1, 2, 3, 4, 5, 6].map(r => <CategorySkeleton key={r} />)}
      <CategoryModal
        deleteClick={() => setDeleteModal(true)}
        open={showMoreModal}
        close={() => {
          setShowMoreModal(false);
          setSelectedCat({});
          setSelectedProd({});
        }}
        category={selectedCat}
      />
      <Grid container className="footer">
        <Button
          onClick={() => {
            navigate('/products/categories/create_category');
          }}
          variant="outlined"
          color="primary"
          data-cy="createCategory"
          fullWidth
        >
          {' '}
          تعریف دسته بندی{' '}
        </Button>
      </Grid>
      {deleteModal && (
        <ConfirmModal
          submit={() => {
            deleteCategory({
              variables: {
                deleteCategoryId: selectedCat.id
              },
              onCompleted: () => {
                refetch();
                setDeleteModal(false);
                setShowMoreModal(false);
                toast('دسته بندی با موفقیت حذف شد.', {
                  position: 'bottom-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  // closeOnClick: true,
                  draggable: true,
                  closeButton: false,
                  icon: <SuccessSVG />
                });
              },
              onError: () => {
                setDeleteModal(false);
                setShowMoreModal(false);
              }
            });
          }}
          text={`آیا از حذف دسته بندی ${selectedCat?.title} اطمینان دارید؟`}
          close={() => setDeleteModal(false)}
        />
      )}
      {deleteModalProd && (
        <ConfirmModal
          submit={() => {
            editProduct({
              variables: {
                partialUpdateProductId: selectedProd?.id,
                content: {
                  category: 0
                }
              },
              onCompleted: () => {
                refetch();
                setDeleteModalProd(false);
                setSelectedCat({});
                toast('محصول با موفقیت از دسته بندی حذف شد.', {
                  position: 'bottom-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  // closeOnClick: true,
                  draggable: true,
                  closeButton: false,
                  icon: <SuccessSVG />
                });
              },
              onError: () => {
                setDeleteModalProd(false);
              }
            });
          }}
          text={`آیا از حذف محصول ${selectedProd?.label} از دسته بندی ${selectedCat?.title} اطمینان دارید؟`}
          close={() => setDeleteModalProd(false)}
        />
      )}
      <ToastContainer />
    </Style>
  );
};

export default index;
