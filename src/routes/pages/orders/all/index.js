import { useQuery } from '@apollo/client';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import OrderCard from '../../../../components/shared/UI/orderCard';
import Header from '../../../../components/shared/UI/orderpageHeader';
import { GET_ORDERS_AND_FILTERS } from '../../../../constant/queries/orders';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';
import SearchInput from '../../../../components/shared/searchInput/searchInput';
import persianJs from 'persianjs';
import OrdersFilters from '../../../../components/modals/ordersFilters';
import OrderSkeleton from '../../products/skeletons/orderskeleton';

const Style = styled(Grid)`
  padding: 0 16px 100px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  margin-top: 20px;
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const AllOrders = () => {
  const params = useParams();
  const [searchParams, setSearchparams] = useSearchParams();
  const navigate = useNavigate();

  const [loadingFetchMore, setLoadingFetchMore] = useState('');
  const [value, setValue] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const renderTitle = param => {
    switch (param) {
      case 'all':
        return 'همه سفارش ها';

      case 'in-progress':
        return 'در حال پردازش';
      case 'waiting':
        return 'در انتظار بررسی';
      case 'closed':
        return 'بسته شده';
      default:
        return 'همه سفارش ها';
    }
  };

  const chooseStatus = status => {
    switch (status) {
      case 'all':
        return [];
      case 'waiting':
        return [
          'STATUS_WAITING_FOR_PAYMENT_APPROVAL',
          'STATUS_WAITING_FOR_APPROVAL',
          'STATUS_PAID'
        ];
      case 'in-progress':
        return [
          'STATUS_IN_PREPARING',
          'STATUS_SENT',
          'STATUS_WAITING_FOR_PAYMENT',
          'STATUS_UNRECEIVED'
        ];
      case 'closed':
        return [
          'STATUS_RECEIVED',
          'STATUS_CANCELED_OVER_TIME',
          'STATUS_CANCELED_BY_MERCHANT',
          'STATUS_CANCELED_BY_MERCHANT_SETTLED',
          'STATUS_CANCELED_OVER_TIME_SETTLED'
        ];
      default:
        return [];
    }
  };

  const {
    data: ordersList,
    loading,
    fetchMore
  } = useQuery(GET_ORDERS_AND_FILTERS, {
    variables: {
      params: {
        limit: 10,
        offset: 0,
        statuses: chooseStatus(params?.status),
        search: '',
        ...(searchParams?.get('created_at') && {
          created_at: searchParams?.get('created_at')
        }),
        ...(searchParams?.get('cities') && {
          cities: searchParams?.getAll('cities')
        }),
        ...(searchParams?.get('statuses') && {
          statuses: searchParams?.getAll('statuses')
        }),
        ...(searchParams?.get('payment_types') && {
          payment_types: searchParams?.getAll('payment_types').join(',')
        }),
        ...(searchParams?.get('sent_at') && {
          sent_at: searchParams?.get('sent_at')
        }),
        ...(searchParams?.get('max_cost') && {
          max_cost: +searchParams?.get('max_cost')
        }),
        ...(searchParams?.get('min_cost') && {
          min_cost: +searchParams?.get('min_cost')
        })
      }
    }
  });

  useEffect(() => {
    let delayDebounce;

    if (value.length > 0) {
      delayDebounce = setTimeout(async () => {
        setSearch(true);
      }, 1000);
    }

    return () => {
      clearTimeout(delayDebounce);
      setSearch(false);
    };
  }, [value]);

  useEffect(async () => {
    if (search) {
      setSearchLoading(true);
      await fetchMore({
        variables: {
          params: {
            offset: 0,
            limit: 10,
            statuses: chooseStatus(params?.status),
            search: value
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
      setSearchLoading(false);
    }
  }, [search]);

  useEffect(async () => {
    if (searchParams.get('isFilter')) {
      setSearchLoading(true);
      await fetchMore({
        variables: {
          params: {
            offset: 0,
            limit: 10,
            statuses: chooseStatus(params?.status),
            search: value,
            ...(searchParams?.get('created_at') && {
              created_at: searchParams?.get('created_at')
            }),
            ...(searchParams?.get('cities') && {
              cities: searchParams?.getAll('cities')
            }),
            ...(searchParams?.get('statuses') && {
              statuses: searchParams?.getAll('statuses')
            }),
            ...(searchParams?.get('payment_types') && {
              payment_types: searchParams?.getAll('payment_types').join(',')
            }),
            ...(searchParams?.get('sent_at') && {
              sent_at: searchParams?.get('sent_at')
            }),
            max_cost: +searchParams?.get('max_cost'),
            min_cost: +searchParams?.get('min_cost')
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
            statuses: chooseStatus(params?.status),
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

  window.onpopstate = function () {
    navigate('/orders');
  };
  history.pushState({}, '');

  return (
    <>
      <OrdersFilters
        filterPrimaries={ordersList}
        close={() => {
          setSearchparams({});
        }}
      />

      <Header
        count={ordersList?.order?.getManagers?.count}
        title={renderTitle(params.status)}
      />
      <Grid
        style={{ padding: '0 16px' }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item style={{ width: '86%' }}>
          {' '}
          <SearchInput
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
                    statuses: chooseStatus(params?.status),
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
        <Grid style={{ textAlign: 'end', width: '14%' }} item>
          <IconButton
            data-cy="filter"
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
      </Grid>
      <Style id="scrollableDiv" container>
        {loadingFetchMore && <div className="mask"></div>}
        {searchLoading ? (
          [1, 2].map(e => <OrderSkeleton key={e} />)
        ) : ordersList?.order?.getManagers?.results?.length === 0 ? (
          <Grid
            style={{ height: '60vh' }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <div style={{ textAlign: 'center' }}>
              <i
                style={{
                  fontSize: '120px',
                  color: '#C9C3E0',
                  fontWeight: 'normal'
                }}
                className="df-notfound"
              />
              <p
                style={{
                  fontSize: '18px',
                  color: '#C9C3E0',
                  fontWeight: 'normal',
                  marginTop: '24px'
                }}
              >
                سفارشی پیدا نشد!
              </p>
            </div>
          </Grid>
        ) : loading ? (
          [1, 2, 3, 4, 5].map(e => <OrderSkeleton key={e} />)
        ) : (
          <InfiniteScroll
            dataLength={
              ordersList?.order?.getManagers?.results?.length > 0
                ? ordersList?.order?.getManagers?.results?.length
                : 0
            }
            next={async () => {
              setLoadingFetchMore(true);
              await fetchMore({
                variables: {
                  params: {
                    offset: ordersList?.order?.getManagers?.results?.length,
                    limit: 10,
                    statuses: chooseStatus(params?.status),
                    search: value,
                    ...(searchParams?.get('created_at') && {
                      created_at: searchParams?.get('created_at')
                    }),
                    ...(searchParams?.get('cities') && {
                      cities: searchParams?.getAll('cities')
                    }),
                    ...(searchParams?.get('statuses') && {
                      statuses: searchParams?.getAll('statuses')
                    }),
                    ...(searchParams?.get('payment_types') && {
                      payment_types: searchParams
                        ?.getAll('payment_types')
                        .join(',')
                    }),
                    ...(searchParams?.get('sent_at') && {
                      sent_at: searchParams?.get('sent_at')
                    }),
                    max_cost: +searchParams?.get('max_cost'),
                    min_cost: +searchParams?.get('min_cost')
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    order: {
                      ...prev.order,
                      getManagers: {
                        ...prev.order.getManagers,
                        results: [
                          ...prev.order.getManagers.results,
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...fetchMoreResult?.order.getManagers?.results
                        ],
                        next: fetchMoreResult.order.getManagers?.next
                      }
                    }
                  });
                }
              });
              setLoadingFetchMore(false);
            }}
            hasMore={ordersList?.order?.getManagers?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {' '}
            {ordersList?.order?.getManagers?.results?.map(e => (
              <OrderCard
                id={e?.id}
                customer={e?.customer}
                created_at={e?.created_at}
                is_seen={e?.is_seen}
                refrence_code={e?.reference_code}
                key={e?.id}
                registration_type={e?.registration_type}
                status={e?.status}
                cost={e?.cost}
              />
            ))}
          </InfiniteScroll>
        )}
        {loadingFetchMore ? [1, 2].map(e => <OrderSkeleton key={e} />) : ''}
      </Style>
    </>
  );
};

export default AllOrders;
