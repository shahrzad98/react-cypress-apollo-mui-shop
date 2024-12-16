import { useQuery } from '@apollo/client';
import { Grid, IconButton } from '@mui/material';
import persianJs from 'persianjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../../../../../components/shared/searchInput/searchInput';
import { GET_FINANCIAL_DATA } from '../../../../../constant/queries/settings';
import { Style } from './style';
import FinanceCard from './financeCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import FinanceSkeleton from '../../../products/skeletons/financeSkeleton';
import FinanceDetail from './finance-detail';
import FinanceFilter from './filter';
import { formatEngDate } from '../../../../../utils/helpers';
import { NetworkStatus } from '@apollo/client';

const Finance = () => {
  const navigate = useNavigate();
  const { data, loading, fetchMore, networkStatus } = useQuery(
    GET_FINANCIAL_DATA,
    {
      variables: {
        params: {
          limit: 10,
          offset: 0,
          search: ''
        }
      },
      notifyOnNetworkStatusChange: true
    }
  );
  const [searchParams, setSearchparams] = useSearchParams();
  const [value, setValue] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [searched, setSearched] = useState(false);

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

  const [selectedFinance, setSelectedFinance] = useState(null);

  useEffect(() => {
    if (searchParams.get('cleared_filter')) {
      fetchMore({
        variables: {
          params: {
            limit: 10,
            offset: 0,
            ...(value && { search: value })
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
    }
    if (searchParams.get('is_filter')) {
      fetchMore({
        variables: {
          params: {
            limit: 10,
            offset: 0,
            ...(value && { search: value }),
            ...(searchParams.get('created_at_start') && {
              created_at_start: formatEngDate(
                new Date(searchParams.get('created_at_start'))
              )
            }),
            ...(searchParams.get('created_at_end') && {
              created_at_end: formatEngDate(
                new Date(searchParams.get('created_at_end'))
              )
            }),
            ...(searchParams.get('status') && {
              status: +searchParams.get('status')
            }),
            ...(searchParams.get('minimum_amount') && {
              minimum_amount: +searchParams.get('minimum_amount')
            }),
            ...(searchParams.get('maximum_amount') && {
              maximum_amount: +searchParams.get('maximum_amount')
            })
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      });
    }
  }, [searchParams.get('is_filter'), searchParams.get('cleared_filter')]);

  window.onpopstate = function () {
    navigate('/store/settings');
  };
  history.pushState({}, '');

  return (
    <Style alignContent="flex-start" container>
      <Grid onClick={() => navigate('/store/settings')} className="header">
        <i className="df-arrow" />
        <h1>سوابق مالی</h1>
      </Grid>
      <Grid mt={2} pb={2} container justifyContent="center" alignItems="center">
        <Grid item style={{ width: '86%' }}>
          {' '}
          <SearchInput
            isFinance
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
        <Grid style={{ textAlign: 'end', width: '14%' }} item>
          <IconButton
            onClick={() => {
              searchParams.get('is_filter')
                ? setSearchparams({
                    modal: 'filter',
                    has_filter: true
                  })
                : setSearchparams({ modal: 'filter' });
            }}
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

      <Grid container className="scrollabale" id="scrollableDiv">
        {searchLoading || networkStatus === NetworkStatus.refetch ? (
          [1, 2, 3, 4, 5, 6].map(e => <FinanceSkeleton key={e} />)
        ) : loading ? (
          [1, 2, 3, 4, 5, 6].map(e => <FinanceSkeleton key={e} />)
        ) : data?.packages?.getFinancialData?.results?.length === 0 ? (
          <Grid
            style={{ height: '60vh' }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <div style={{ textAlign: 'center' }}>
              {/* <EmptySearch /> */}
              <p
                style={{
                  fontSize: '18px',
                  color: '#C9C3E0',
                  fontWeight: 'normal',
                  marginTop: '24px'
                }}
              >
                سابقه ای پیدا نشد!
              </p>
            </div>
          </Grid>
        ) : searchParams.get('is_filter') ? (
          <InfiniteScroll
            dataLength={
              data?.packages?.getFinancialData?.results?.length > 0
                ? data?.packages?.getFinancialData?.results?.length
                : 0
            }
            next={async () => {
              setLoadingFetchMore(true);
              await fetchMore({
                variables: {
                  params: {
                    limit: 10,
                    ...(value && { search: value }),
                    offset: data?.packages?.getFinancialData?.results?.length,
                    ...(searchParams.get('created_at_start') && {
                      created_at_start: formatEngDate(
                        new Date(searchParams.get('created_at_start'))
                      )
                    }),
                    ...(searchParams.get('created_at_end') && {
                      created_at_end: formatEngDate(
                        new Date(searchParams.get('created_at_end'))
                      )
                    }),
                    ...(searchParams.get('status') && {
                      status: +searchParams.get('status')
                    }),
                    ...(searchParams.get('minimum_amount') && {
                      minimum_amount: +searchParams.get('minimum_amount')
                    }),
                    ...(searchParams.get('maximum_amount') && {
                      maximum_amount: +searchParams.get('maximum_amount')
                    })
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    packages: {
                      ...prev.packages,
                      getFinancialData: {
                        ...prev.packages.getFinancialData,
                        results: [
                          ...prev.packages.getFinancialData.results,
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...fetchMoreResult?.packages.getFinancialData?.results
                        ],
                        next: fetchMoreResult.packages.getFinancialData?.next
                      }
                    }
                  });
                }
              });
              setLoadingFetchMore(false);
            }}
            hasMore={data?.packages?.getFinancialData?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {' '}
            {loading
              ? [1, 2, 3, 4, 5, 6].map(e => <FinanceSkeleton key={e} />)
              : data?.packages?.getFinancialData?.results?.map((e, i) => (
                  <FinanceCard
                    onClick={() => {
                      setSearchparams({
                        detail: 'show'
                      });
                      setSelectedFinance(e);
                    }}
                    finance={e}
                    key={i}
                  />
                ))}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            dataLength={
              data?.packages?.getFinancialData?.results?.length > 0
                ? data?.packages?.getFinancialData?.results?.length
                : 0
            }
            next={async () => {
              setLoadingFetchMore(true);
              await fetchMore({
                variables: {
                  params: {
                    offset: data?.packages?.getFinancialData?.results?.length,
                    limit: 10
                  }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    packages: {
                      ...prev.packages,
                      getFinancialData: {
                        ...prev.packages.getFinancialData,
                        results: [
                          ...prev.packages.getFinancialData.results,
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...fetchMoreResult?.packages.getFinancialData?.results
                        ],
                        next: fetchMoreResult.packages.getFinancialData?.next
                      }
                    }
                  });
                }
              });
              setLoadingFetchMore(false);
            }}
            hasMore={data?.packages?.getFinancialData?.next !== null}
            scrollableTarget="scrollableDiv"
          >
            {' '}
            {loading
              ? [1, 2, 3, 4, 5, 6].map(e => <FinanceSkeleton key={e} />)
              : data?.packages?.getFinancialData?.results?.map((e, i) => (
                  <FinanceCard
                    onClick={() => {
                      setSearchparams({
                        detail: 'show'
                      });
                      setSelectedFinance(e);
                    }}
                    finance={e}
                    key={i}
                  />
                ))}
          </InfiniteScroll>
        )}
        {loadingFetchMore &&
          [1, 2, 3, 4, 5, 6].map(e => <FinanceSkeleton key={e} />)}
      </Grid>
      <FinanceDetail
        selectedFinance={selectedFinance}
        open={searchParams.get('detail') === 'show'}
        onClose={() => setSearchparams({})}
      />
      <FinanceFilter
        onSubmtit={e => setSearchparams(e)}
        open={searchParams.get('modal') === 'filter'}
        onClose={() => setSearchparams({})}
      />
    </Style>
  );
};

export default Finance;
