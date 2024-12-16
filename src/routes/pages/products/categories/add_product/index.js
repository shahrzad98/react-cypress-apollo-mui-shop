import { useQuery } from '@apollo/client';
import { Button, Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchInput from '../../../../../components/shared/searchInput/searchInput';
import { GET_CATEGORY_AND_PRODUCTS } from '../../../../../constant/queries/products';
import CategoryProductCard from './product_card';
import { Style } from './style';
import { ReactComponent as EmptySearch } from '../../list/svg/empty.svg';

const CategoryAddProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loadingFetchMore, setLoadingFetchMore] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data, loading, fetchMore } = useQuery(GET_CATEGORY_AND_PRODUCTS, {
    variables: {
      getCategoryId: params.categoryId,
      params: {
        offset: 0,
        limit: 10
      }
    }
  });

  useEffect(() => {
    let delayDebounce;

    if (value.length > 0) {
      delayDebounce = setTimeout(async () => {
        setSearch(true);
      }, 1000);
    } else if (value?.length < 1 && searched) {
      delayDebounce = setTimeout(async () => {
        setClearSearch(true);
      }, 1000);
    }

    return () => {
      clearTimeout(delayDebounce);
      setSearch(false);
      setClearSearch(false);
    };
  }, [value]);

  useEffect(async () => {
    if (search) {
      setSearched(true);
      setSearchLoading(true);
      await fetchMore({
        variables: {
          params: {
            offset: 0,
            limit: 10,
            search: value
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
      setSearchLoading(false);
    }
    if (clearSearch) {
      setSearched(false);
      setSearchLoading(true);
      await fetchMore({
        variables: {
          params: {
            offset: 0,
            limit: 10,
            search: ''
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
      setSearchLoading(false);
    }
  }, [search, clearSearch]);

  window.onpopstate = function () {
    if (searchParams.get('origin') === 'list') {
      navigate('/products/categories');
    }
    if (searchParams.get('origin') === 'add-product') {
      navigate(`/products/categories/edit_category/${params.categoryId}`);
    }
  };
  history.pushState({}, '');

  return (
    <Style>
      <Grid
        onClick={() => {
          if (searchParams.get('origin') === 'list') {
            navigate('/products/categories');
          }
          if (searchParams.get('origin') === 'add-product') {
            navigate(`/products/categories/edit_category/${params.categoryId}`);
          }
        }}
        className="header"
      >
        <i className="df-arrow" />
        <h1>افزودن محصول</h1>
      </Grid>
      <Grid mt={2} container>
        <SearchInput
          isProduct
          onClear={async () => {
            setValue('');
          }}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          isFocused={isFocused}
          onBlur={() => setIsFocused(false)}
        />
      </Grid>
      <Grid mt={3} className="title" container>
        <p>
          محصولاتی که میخواهید به دسته بندی {data?.item?.getCategory?.title}{' '}
          اضافه کنید را انتخاب کنید.
        </p>
      </Grid>

      <Grid container className="scrollabale" id="scrollableDiv">
        {' '}
        <Grid mt={2} container>
          {!loading &&
            !searchLoading &&
            data?.item?.getCategory?.products?.map(e => (
              <CategoryProductCard
                is_active
                categoryId={params.categoryId}
                product={e}
                key={e?.id}
              />
            ))}
        </Grid>
        {searchLoading ? (
          [1, 2].map(e => (
            <Skeleton
              key={e}
              style={{
                width: '100%',
                height: '200px',
                transform: 'none',
                margin: '10px 0',
                borderRadius: '10px'
              }}
            />
          ))
        ) : loading ? (
          [1, 2, 3, 4, 5].map(e => (
            <Skeleton
              key={e}
              style={{
                width: '100%',
                height: '200px',
                transform: 'none',
                margin: '10px 0',
                borderRadius: '10px'
              }}
            />
          ))
        ) : data?.item?.getProducts?.results?.length === 0 ? (
          <Grid
            style={{ height: '60vh' }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <div style={{ textAlign: 'center' }}>
              <EmptySearch />
              <p
                style={{
                  fontSize: '18px',
                  color: '#C9C3E0',
                  fontWeight: 'normal',
                  marginTop: '24px'
                }}
              >
                محصولی پیدا نشد!
              </p>
            </div>
          </Grid>
        ) : (
          <InfiniteScroll
            dataLength={
              data?.item?.getProducts?.results?.length > 0
                ? data?.item?.getProducts?.results?.length
                : 0
            }
            next={async () => {
              setLoadingFetchMore(true);
              await fetchMore({
                variables: {
                  params: {
                    offset: data?.item?.getProducts?.results?.length,
                    limit: 10
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    item: {
                      ...prev.item,
                      getProducts: {
                        ...prev.item.getProducts,
                        results: [
                          ...prev.item.getProducts.results,
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...fetchMoreResult?.item.getProducts?.results
                        ],
                        next: fetchMoreResult.item.getProducts?.next
                      }
                    }
                  });
                }
              });
              setLoadingFetchMore(false);
            }}
            hasMore={data?.item?.getProducts?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {' '}
            {loading
              ? [1, 2, 3, 4, 5, 6].map(e => (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    style={{ marginTop: '16px', borderRadius: '10px' }}
                    key={e}
                  />
                ))
              : data?.item?.getProducts?.results
                  ?.filter(f =>
                    data?.item?.getCategory?.products?.filter(
                      g => g.id === f.id
                    )?.length > 0
                      ? false
                      : true
                  )
                  ?.map(e => (
                    <CategoryProductCard
                      categoryId={params.categoryId}
                      product={e}
                      key={e?.id}
                    />
                  ))}
          </InfiniteScroll>
        )}
        {loadingFetchMore &&
          [1, 2, 3].map(e => (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={100}
              style={{ marginTop: '16px', borderRadius: '10px' }}
              key={e}
            />
          ))}
      </Grid>
      <Grid className="footer">
        <Button
          data-cy="submit_product"
          onClick={() => {
            navigate('/products/categories');
          }}
          fullWidth
          color="primary"
          variant="contained"
        >
          ثبت
        </Button>
      </Grid>
    </Style>
  );
};

export default CategoryAddProduct;
