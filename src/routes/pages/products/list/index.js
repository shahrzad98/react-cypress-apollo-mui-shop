import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Style } from './style';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS_LIST } from '../../../../constant/queries/products';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchInput from '../../../../components/shared/searchInput/searchInput';
import persianJs from 'persianjs';
import ProductCard from './productCard';
import { ReactComponent as EmptySearch } from './svg/empty.svg';
import OrdersFilters from './filter';
import ProductModal from './modal/productModal';
import ConfirmModal from '../../../../components/createProduct/modal/confirmModal/index';
import { DELETE_PRODUCT } from '../../../../constant/mutations/products';
import ProductSkeleton from '../skeletons/productCardSkeleton';

const ProductsList = () => {
  const navigate = useNavigate();
  const { data, loading, fetchMore, refetch } = useQuery(GET_PRODUCTS_LIST, {
    fetchPolicy: 'network-only',
    variables: {
      params: {
        limit: 10,
        offset: 0,
        search: ''
      }
    }
  });

  const [loadingFetchMore, setLoadingFetchMore] = useState('');
  const [value, setValue] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchparams] = useSearchParams();
  const [searched, setSearched] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState('');
  const [selectedProd, setSelectedProd] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    if (searchParams.get('modal') === 'filter') {
      setShowFilterDrawer(true);
    } else {
      setShowFilterDrawer(false);
    }
  }, [searchParams]);

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

  useEffect(async () => {
    if (searchParams.get('isFilter')) {
      setSearchLoading(true);
      await fetchMore({
        variables: {
          params: {
            offset: 0,
            limit: 10,
            search: value,
            ...(searchParams?.get('min_cost') && {
              cost_gte: +searchParams?.get('min_cost')
            }),
            ...(searchParams?.get('max_cost') && {
              cost_lte: +searchParams?.get('max_cost')
            }),
            ...(searchParams?.get('min_primary_cost') && {
              primary_cost_gte: +searchParams?.get('min_primary_cost')
            }),
            ...(searchParams?.get('max_primary_cost') && {
              primary_cost_lte: +searchParams?.get('max_primary_cost')
            }),
            ...(searchParams?.get('min_stock') && {
              min_stock: searchParams?.get('min_stock')
            }),
            ...(searchParams?.get('max_stock') && {
              max_stock: searchParams?.get('max_stock')
            }),
            ...(searchParams?.get('name') && {
              label: searchParams?.get('name')
            }),
            ...(searchParams?.get('category') && {
              category: searchParams?.get('category')
            }),
            ...(searchParams?.get('is_active') && {
              is_active:
                searchParams.get('is_active') === 'false' ? false : true
            })
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
      setSearchLoading(false);
    } else if (searchParams.get('clearedFilter')) {
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
  }, [searchParams]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  window.onpopstate = function () {
    navigate('/products');
  };
  history.pushState({}, '');

  return (
    <Style container>
      <OrdersFilters
        filterPrimaries={data?.item?.getProductsFilterPrimsMerchant}
        close={() => {
          setShowFilterDrawer(false);
          setSearchparams({});
        }}
        setSearchparams={setSearchparams}
        open={showFilterDrawer}
      />
      <ProductModal
        product={selectedProd}
        open={showMoreModal}
        deleteClick={() => setDeleteModal(true)}
        close={() => {
          setShowMoreModal(null);
          setSelectedProd('');
          setSelectedTitle(null);
        }}
      />
      {deleteModal && (
        <ConfirmModal
          submit={() => {
            setSearchLoading(true);
            deleteProduct({
              variables: {
                deleteProductId: selectedProd.id
              },
              onCompleted: () => {
                refetch();
                setDeleteModal(false);
                setShowMoreModal(false);
              }
            });
            setSearchLoading(false);
          }}
          text={`آیا از حذف محصول ${selectedTitle} اطمینان دارید؟`}
          close={() => setDeleteModal(false)}
        />
      )}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        data-cy="product-list"
        onClick={() => navigate(-1)}
      >
        <Grid className="header">
          <i className="df-arrow" />
          <h1>لیست محصول</h1>
        </Grid>
        <p className="header_count">{data?.item?.getProducts?.count} محصول</p>
      </Grid>
      <Grid mt={2} item style={{ width: '86%' }}>
        {' '}
        <SearchInput
          isProduct
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
          onClear={async () => {
            setValue('');
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
          }}
          value={value}
          onChange={ev => {
            const enValue =
              ev.target.value?.length > 0
                ? persianJs(ev.target.value).toEnglishNumber().toString()
                : '';
            setValue(enValue);
            if (ev.target.value === '') {
              setLoadingFetchMore(false);
            }
          }}
          isFocused={isFocused}
          setIsFocused={setisFocused}
        />
      </Grid>
      <Grid mt={2} style={{ textAlign: 'end', width: '14%' }} item>
        <IconButton
          onClick={() => setSearchparams({ modal: 'filter' })}
          style={{
            backgroundColor: '#FFF',
            boxShadow: '0px 4px 8px rgba(72, 52, 147, 0.08)',
            padding: '9px',
            borderRadius: '10px'
          }}
        >
          <i
            style={{
              color: searchParams?.get('isFilter') ? '#483493' : '#9FA6B9'
            }}
            className="df-filter"
          />
        </IconButton>
      </Grid>

      <Grid container className="scrollabale" id="scrollableDiv">
        {searchLoading ? (
          [1, 2, 3, 4].map(e => <ProductSkeleton key={e} />)
        ) : loading ? (
          [1, 2, 3, 4, 5].map(e => <ProductSkeleton key={e} />)
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
                    limit: 10,
                    search: value,
                    ...(searchParams?.get('min_cost') && {
                      cost_gte: +searchParams?.get('min_cost')
                    }),
                    ...(searchParams?.get('max_cost') && {
                      cost_lte: +searchParams?.get('max_cost')
                    }),
                    ...(searchParams?.get('min_primary_cost') && {
                      primary_cost_gte: +searchParams?.get('min_primary_cost')
                    }),
                    ...(searchParams?.get('max_primary_cost') && {
                      primary_cost_lte: +searchParams?.get('max_primary_cost')
                    }),
                    ...(searchParams?.get('min_stock') && {
                      min_stock: searchParams?.get('min_stock')
                    }),
                    ...(searchParams?.get('max_stock') && {
                      max_stock: searchParams?.get('max_stock')
                    }),
                    ...(searchParams?.get('name') && {
                      label: searchParams?.get('name')
                    }),
                    ...(searchParams?.get('category') && {
                      category: searchParams?.get('category')
                    }),
                    ...(searchParams?.get('is_active') && {
                      is_active:
                        searchParams.get('is_active') === 'false' ? false : true
                    })
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
            {loading
              ? [1, 2, 3, 4, 5, 6].map(e => <ProductSkeleton key={e} />)
              : data?.item?.getProducts?.results?.map(e => (
                  <ProductCard
                    selectedProd={selectedProd}
                    showMoreClick={() => {
                      setShowMoreModal(true);
                      setSelectedProd(e);
                      setSelectedTitle(e.label);
                    }}
                    product={e}
                    key={e.id}
                  />
                ))}
          </InfiniteScroll>
        )}
        {loadingFetchMore && [1, 2, 3].map(e => <ProductSkeleton key={e} />)}
      </Grid>
    </Style>
  );
};

export default ProductsList;
