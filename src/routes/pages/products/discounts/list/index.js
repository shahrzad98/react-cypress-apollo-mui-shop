import { Button, Grid, IconButton, Skeleton } from '@mui/material';
import persianJs from 'persianjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../../../../../components/shared/searchInput/searchInput';
import DiscountCard from './discountCard';
import { Style } from './style';
import { ReactComponent as SuccessSVG } from '../../../../../components/createProduct/svg/success.svg';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VOUCHERS } from '../../../../../constant/queries/products';
import { ReactComponent as EmptySearch } from '../svg/emptySearch.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConfirmModal from '../../../../../components/createProduct/modal/confirmModal/index';
import { DELETE_VOUCHER } from '../../../../../constant/mutations/products';
import DiscountFilterDrawer from './filter';
import { InfoOutlined } from '@mui/icons-material';

const DiscountsList = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isFocused, setisFocused] = useState('');
  const [searchLoading, setSearchLoading] = useState('');
  const [loadingFetchMore, setLoadingFetchMore] = useState('');
  const [searchParams, setSearchparams] = useSearchParams();
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const { data, loading, fetchMore, refetch } = useQuery(GET_VOUCHERS, {
    fetchPolicy: 'network-only',
    variables: {
      params: {
        limit: 15
      }
    }
  });
  const [deleteVoucher] = useMutation(DELETE_VOUCHER);
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
            limit: 15,
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
            limit: 15,
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
            limit: 15,
            search: value,
            ...(searchParams?.get('expire_date') && {
              expire_date__date__lte: searchParams?.get('expire_date')
            }),
            ...(searchParams?.get('start_date') && {
              start_date__date__gte: searchParams?.get('start_date')
            }),
            ...(searchParams?.get('voucher_type') && {
              voucher_type: +searchParams?.get('voucher_type')
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

  return (
    <Style container>
      <Grid alignItems="center" container justifyContent="space-between">
        <Grid onClick={() => navigate('/products')} className="header">
          <i className="df-arrow" />
          <h1>تخفیف</h1>
        </Grid>
        <h4 className="count">{data?.item?.getVouchers?.count} تخفیف</h4>
      </Grid>
      <Grid mt={2} item style={{ width: '86%' }}>
        {' '}
        <SearchInput
          isVoucher
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
          onClear={async () => {
            setValue('');
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
            padding: '10px',
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
          [1, 2].map(e => (
            <Skeleton
              key={e}
              style={{
                width: '100%',
                height: '80px',
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
                height: '80px',
                transform: 'none',
                margin: '10px 0',
                borderRadius: '10px'
              }}
            />
          ))
        ) : data?.item?.getVouchers?.results?.length === 0 ? (
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
                تخفیفی پیدا نشد!
              </p>
            </div>
          </Grid>
        ) : (
          <InfiniteScroll
            dataLength={
              data?.item?.getVouchers?.results?.length > 0
                ? data?.item?.getVouchers?.results?.length
                : 0
            }
            next={async () => {
              setLoadingFetchMore(true);
              await fetchMore({
                variables: {
                  params: {
                    offset: data?.item?.getVouchers?.results?.length,
                    limit: 15,
                    ...(searchParams?.get('expire_date') && {
                      expire_date__date__lte: searchParams?.get('expire_date')
                    }),
                    ...(searchParams?.get('start_date') && {
                      start_date__date__gte: searchParams?.get('start_date')
                    }),
                    ...(searchParams?.get('voucher_type') && {
                      voucher_type: +searchParams?.get('voucher_type')
                    })
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    item: {
                      ...prev.item,
                      getVouchers: {
                        ...prev.item.getVouchers,
                        results: [
                          ...prev.item.getVouchers.results,
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...fetchMoreResult?.item.getVouchers?.results
                        ],
                        next: fetchMoreResult.item.getVouchers?.next
                      }
                    }
                  });
                }
              });
              setLoadingFetchMore(false);
            }}
            hasMore={data?.item?.getVouchers?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {' '}
            {loading
              ? [1, 2, 3, 4, 5, 6].map(e => (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={80}
                    style={{ marginTop: '16px', borderRadius: '10px' }}
                    key={e}
                  />
                ))
              : data?.item?.getVouchers?.results
                  ?.filter(f => f?.customers?.length === 0)
                  ?.map(e => (
                    <DiscountCard
                      key={e?.id}
                      discount={e}
                      onCopy={e => {
                        toast('کد با موفقیت کپی شد.', {
                          position: 'bottom-center',
                          autoClose: 2000,
                          hideProgressBar: true,
                          // closeOnClick: true,
                          draggable: true,
                          closeButton: false,
                          icon: <SuccessSVG />
                        });
                        navigator.clipboard.writeText(e);
                      }}
                      deleteHandler={() => {
                        setDeleteModal(true);
                        setSelectedVoucher(e);
                      }}
                    />
                  ))}
          </InfiniteScroll>
        )}
        {loadingFetchMore &&
          [1, 2, 3].map(e => (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={80}
              style={{ marginTop: '16px', borderRadius: '10px' }}
              key={e}
            />
          ))}
      </Grid>
      <ToastContainer />
      {deleteModal && (
        <ConfirmModal
          close={() => {
            setSelectedVoucher({});
            setDeleteModal(false);
          }}
          text={`آیا از حذف تخفیف ${selectedVoucher?.name} اطمینان دارید؟`}
          submit={() => {
            deleteVoucher({
              variables: {
                deleteVoucherId: selectedVoucher?.id
              },
              onCompleted: () => {
                setSelectedVoucher({});
                setDeleteModal(false);
                toast('تخفیف با موفقیت حذف شد', {
                  position: 'bottom-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  // closeOnClick: true,
                  draggable: true,
                  closeButton: false,
                  icon: <SuccessSVG />
                });
                refetch();
              },
              onError: () => {
                setSelectedVoucher({});
                setDeleteModal(false);
                toast('تخفیف در سفارشی استفاده شده و قابل حذف نیست.', {
                  position: 'bottom-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  // closeOnClick: true,
                  draggable: true,
                  closeButton: false,
                  icon: <InfoOutlined />,
                  style: { backgroundColor: '#EA002A33', color: '#EA002A' }
                });
              }
            });
          }}
        />
      )}
      <DiscountFilterDrawer
        setSearchparams={setSearchparams}
        open={showFilterDrawer}
        close={() => {
          setShowFilterDrawer(false);
          setSearchparams({});
        }}
      />
      <Grid container className="footer">
        <Button
          onClick={() => navigate('/products/discounts/create')}
          color="primary"
          variant="outlined"
          data-cy="create_discount"
          fullWidth
        >
          ثبت تخفیف
        </Button>
      </Grid>
    </Style>
  );
};

export default DiscountsList;
