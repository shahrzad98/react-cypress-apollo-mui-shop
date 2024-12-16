import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchInput from '../../../../components/shared/searchInput/searchInput';
import SimpleCard from '../../../../components/shared/UI/simpleCard';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ORDERS, GET_STATUSES } from '../../../../constant/queries/orders';
import OrderCard from '../../../../components/shared/UI/orderCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import persianJs from 'persianjs';

const CARDS = [
  { name: 'همه سفارش ها', id: 1, icon: 'df-orders', route: '/orders/all' },
  {
    name: 'در انتظار بررسی',
    id: 2,
    icon: 'df-waiting-order',
    route: '/orders/waiting'
  },
  {
    name: 'در حال پردازش',
    id: 3,
    icon: 'df-Inprogress-order',
    route: '/orders/in-progress'
  },
  { name: 'بسته شده', id: 4, icon: 'df-closed-order', route: '/orders/closed' }
];

const Header = styled(Grid)`
  padding: 20px;

  h1 {
    margin: 0 0 20px;
    font-size: 20px;
  }

  p {
    margin: 0 0 20px;
    font-size: 14px;
    color: #9fa6b9;
  }
`;

const Style = styled(Grid)`
  padding: 0 0px 100px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  margin-top: 20px;
  width: 100%;

  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

const Overview = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const { data: statusData } = useQuery(GET_STATUSES, {
    fetchPolicy: 'network-only'
  });

  const [getSearchData, { data: searchData, fetchMore }] =
    useLazyQuery(GET_ORDERS);

  useEffect(() => {
    let delayDebounce;

    if (value.length > 0) {
      delayDebounce = setTimeout(() => {
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
      (async () => {
        setSearchLoading(true);
        await getSearchData({
          variables: {
            params: {
              limit: 10,
              offset: 0,
              search: value
            }
          }
        });
        setShowSearchData(true);
        setSearchLoading(false);
      })();
    }
  }, [search]);

  window.onpopstate = function () {
    navigate('/');
  };
  history.pushState({}, '');

  return (
    <Header container>
      <Grid alignItems="center" justifyContent="space-between" container>
        <h1>سفارش ها</h1>
        <p>
          {showSearchData
            ? searchData?.order?.getManagers?.count
            : statusData?.order?.getManagersStatusCount?.all
            ? statusData?.order?.getManagersStatusCount?.all
            : 0}{' '}
          سفارش
        </p>
      </Grid>
      <SearchInput
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        onClear={() => {
          setValue('');
          setShowSearchData(false);
        }}
        value={value}
        onChange={ev => {
          const enValue =
            ev.target.value?.length > 0
              ? persianJs(ev.target.value).toEnglishNumber().toString()
              : '';
          setValue(enValue);
          if (ev.target.value === '') {
            setShowSearchData(false);
          }
        }}
        isFocused={isFocused}
        setIsFocused={setisFocused}
      />
      {showSearchData &&
      searchData?.order?.getManagers?.results?.length === 0 ? (
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
      ) : searchLoading ? (
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
      ) : searchData?.order?.getManagers?.results && showSearchData ? (
        <Style id="scrollableDiv">
          <InfiniteScroll
            dataLength={
              searchData?.order?.getManagers?.results?.length > 0
                ? searchData?.order?.getManagers?.results?.length
                : 0
            } //This is important field to render the next data
            next={async () => {
              setLoadMoreLoading(true);
              await fetchMore({
                variables: {
                  params: {
                    offset: searchData?.order?.getManagers?.results?.length,
                    limit: 10,
                    search: value
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
              setLoadMoreLoading(false);
            }}
            hasMore={searchData?.order?.getManagers?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {searchData?.order?.getManagers?.results?.map(e => (
              <OrderCard
                id={e?.id}
                customer={e?.customer}
                created_at={e?.created_at}
                is_seen={e?.is_seen}
                refrence_code={e?.reference_code}
                key={e?.id}
                status={e?.status}
                cost={e?.cost}
              />
            ))}
            {loadMoreLoading
              ? [1, 2].map(e => (
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
              : ''}
          </InfiniteScroll>
        </Style>
      ) : value?.length > 0 || isFocused ? (
        <Grid
          style={{ height: '60vh' }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <i
            data-cy="order_search_icon"
            style={{
              fontSize: '120px',
              color: '#C9C3E0',
              fontWeight: 'normal'
            }}
            className="df-order-search"
          />
        </Grid>
      ) : (
        CARDS.map(e => (
          <SimpleCard
            clickHandler={() => navigate(e.route)}
            id={e.id}
            name={e.name}
            key={e.id}
            icon={e.icon}
          />
        ))
      )}
    </Header>
  );
};

export default Overview;
