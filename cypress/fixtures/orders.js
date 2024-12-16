export const orderSearchResult = {
  data: {
    order: {
      getManagers: {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: '2459',
            is_seen: true,
            reference_code: 'DF-35496',
            customer: {
              name: 'کیمیا فدایی 3',
              __typename: 'Customer',
              card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱'
            },
            created_at: '2022-05-10T12:06:28.446208+04:30',
            registration_type: 2,
            cost: 45000,
            status: 15,
            __typename: 'Order'
          }
        ],
        status_count: [
          {
            status: 15,
            total: 1,
            __typename: 'OrderStatusCount'
          }
        ],
        __typename: 'Orders'
      },
      __typename: 'OrderQuery'
    }
  }
};
export const emptyOrders = {
  data: {
    order: {
      getManagers: {
        count: 0,
        next: null,
        previous: null,
        results: [],
        status_count: [],
        __typename: 'Orders'
      },
      __typename: 'OrderQuery'
    }
  }
};
export const waitingForPaymentlOrder = {
  data: {
    order: {
      getManager: {
        cost: 55000,
        created_at: '2022-05-18T11:24:28.907405+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-20T11:24:28+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: '2022-05-18T11:24:38.000354+04:30',
        pocket_name: '',
        expired_at: '2022-05-18T15:24:38.000293+04:30',
        preparing_days: 2,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 60000,
        tax: 0,
        id: '2488',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 15,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 14,
        deadline_date: '2022-05-25',
        reference_code: 'DF-89434',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9LUQUB6.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  },
                  {
                    value: 'صورتی',
                    option: {
                      name: 'رنگ',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ashegane20iranbanou.com09022.jpg',
                      __typename: 'Image'
                    },
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/knafeh-recipe-11.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'کنافه عربی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 60000,
                cost: 55000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const getManagerStatusResponse = {
  data: {
    order: {
      getManagersStatusCount: {
        status_count: [
          {
            status: 2,
            total: 1,
            __typename: 'StatusCount'
          },
          {
            status: 14,
            total: 1,
            __typename: 'StatusCount'
          },
          {
            status: 15,
            total: 1,
            __typename: 'StatusCount'
          },
          {
            status: 17,
            total: 2,
            __typename: 'StatusCount'
          },
          {
            status: 12,
            total: 8,
            __typename: 'StatusCount'
          },
          {
            status: 13,
            total: 8,
            __typename: 'StatusCount'
          },
          {
            status: 4,
            total: 18,
            __typename: 'StatusCount'
          },
          {
            status: 3,
            total: 35,
            __typename: 'StatusCount'
          },
          {
            status: 10,
            total: 68,
            __typename: 'StatusCount'
          },
          {
            status: 5,
            total: 75,
            __typename: 'StatusCount'
          }
        ],
        returns_count: 27,
        all: 217,
        __typename: 'StatusesCount'
      },
      __typename: 'OrderQuery'
    }
  }
};

export const orderSearch_typeOne = {
  order: {
    getManagers: {
      count: 91,
      next: 'http://backend.apps.digify.shop/order/v3/manager/4/?limit=10&offset=10&search=1&statuses=',
      previous: null,
      results: [
        {
          id: '2470',
          is_seen: true,
          reference_code: 'DF-51386',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-11T17:22:13.297127+04:30',
          registration_type: 1,
          cost: 70000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2468',
          is_seen: true,
          reference_code: 'DF-55148',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-11T15:03:46.955936+04:30',
          registration_type: 2,
          cost: 101500,
          status: 12,
          __typename: 'Order'
        },
        {
          id: '2466',
          is_seen: true,
          reference_code: 'DF-20149',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-11T11:43:57.275849+04:30',
          registration_type: 2,
          cost: 225000,
          status: 12,
          __typename: 'Order'
        },
        {
          id: '2451',
          is_seen: true,
          reference_code: 'DF-47915',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T17:39:50.869285+04:30',
          registration_type: 2,
          cost: 2360000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2449',
          is_seen: true,
          reference_code: 'DF-41489',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T15:58:15.449544+04:30',
          registration_type: 2,
          cost: 2360000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2448',
          is_seen: true,
          reference_code: 'DF-01761',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T15:52:28.364169+04:30',
          registration_type: 2,
          cost: 2360000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2447',
          is_seen: false,
          reference_code: 'DF-10408',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T15:39:12.903257+04:30',
          registration_type: 2,
          cost: 2360000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2446',
          is_seen: true,
          reference_code: 'DF-71518',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T15:38:35.887371+04:30',
          registration_type: 2,
          cost: 2360000,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2445',
          is_seen: false,
          reference_code: 'DF-16773',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T15:37:55.595420+04:30',
          registration_type: 2,
          cost: 2106250,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2439',
          is_seen: true,
          reference_code: 'DF-15363',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-05-09T12:16:49.066051+04:30',
          registration_type: 1,
          cost: 55000,
          status: 3,
          __typename: 'Order'
        }
      ],
      status_count: [
        {
          status: 17,
          total: 1,
          __typename: 'OrderStatusCount'
        },
        {
          status: 4,
          total: 4,
          __typename: 'OrderStatusCount'
        },
        {
          status: 12,
          total: 4,
          __typename: 'OrderStatusCount'
        },
        {
          status: 13,
          total: 4,
          __typename: 'OrderStatusCount'
        },
        {
          status: 3,
          total: 17,
          __typename: 'OrderStatusCount'
        },
        {
          status: 5,
          total: 25,
          __typename: 'OrderStatusCount'
        },
        {
          status: 10,
          total: 36,
          __typename: 'OrderStatusCount'
        }
      ],
      __typename: 'Orders'
    },
    getManagersFilterPrimaries: {
      max_cost: 100009000,
      min_cost: 0,
      cities: [
        'احمدابادسفلی',
        'اردستان',
        'اندیشه',
        'بهارستان',
        'تجریش',
        'تهران',
        'جم',
        'ساري',
        'پاکدشت',
        'کرج'
      ],
      __typename: 'FilterPrimaries'
    },
    __typename: 'OrderQuery'
  }
};
export const orderSearchResultAll_null = {
  getManagers: {
    count: 0,
    next: null,
    previous: null,
    results: [],
    status_count: [],
    __typename: 'Orders'
  },
  getManagersFilterPrimaries: {
    max_cost: 100009000,
    min_cost: 0,
    cities: [
      'احمدابادسفلی',
      'اردستان',
      'اندیشه',
      'بهارستان',
      'تجریش',
      'تهران',
      'جم',
      'ساري',
      'پاکدشت',
      'کرج'
    ],
    __typename: 'FilterPrimaries'
  },
  __typename: 'OrderQuery'
};
export const orderSearch = {
  data: {
    order: {
      getManagers: {
        count: 225,
        next: 'http://backend.apps.digify.shop/order/v3/manager/4/?limit=10&offset=10&search=&statuses=',
        previous: null,
        results: [
          {
            id: '2470',
            is_seen: true,
            reference_code: 'DF-51386',
            customer: {
              name: 'ندا حجتascacapvjapdivjaonv پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T17:22:13.297127+04:30',
            registration_type: 1,
            cost: 70002142141840,
            status: 10,
            __typename: 'Order'
          },
          {
            id: '2469',
            is_seen: true,
            reference_code: 'DF-70927',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T16:33:43.737150+04:30',
            registration_type: 1,
            cost: 325000,
            status: 3,
            __typename: 'Order'
          },
          {
            id: '2468',
            is_seen: true,
            reference_code: 'DF-55148',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T15:03:46.955936+04:30',
            registration_type: 2,
            cost: 101500,
            status: 12,
            __typename: 'Order'
          },
          {
            id: '2467',
            is_seen: true,
            reference_code: 'DF-25548',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T13:53:42.234878+04:30',
            registration_type: 2,
            cost: 101500,
            status: 3,
            __typename: 'Order'
          },
          {
            id: '2466',
            is_seen: true,
            reference_code: 'DF-20149',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T11:43:57.275849+04:30',
            registration_type: 2,
            cost: 225000,
            status: 12,
            __typename: 'Order'
          },
          {
            id: '2465',
            is_seen: true,
            reference_code: 'DF-55935',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T10:36:00.109429+04:30',
            registration_type: 2,
            cost: 45000,
            status: 12,
            __typename: 'Order'
          },
          {
            id: '2464',
            is_seen: true,
            reference_code: 'DF-93826',
            customer: {
              name: 'کیمیا فدایی 3',
              __typename: 'Customer'
            },
            created_at: '2022-05-10T17:27:23.357209+04:30',
            registration_type: 1,
            cost: 10000,
            status: 3,
            __typename: 'Order'
          },
          {
            id: '2463',
            is_seen: true,
            reference_code: 'DF-99239',
            customer: {
              name: 'کیمیا فدایی 3',
              __typename: 'Customer'
            },
            created_at: '2022-05-10T17:24:51.311716+04:30',
            registration_type: 1,
            cost: 225000,
            status: 4,
            __typename: 'Order'
          },
          {
            id: '2462',
            is_seen: true,
            reference_code: 'DF-28709',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-10T16:01:07.814869+04:30',
            registration_type: 1,
            cost: 55000,
            status: 3,
            __typename: 'Order'
          },
          {
            id: '2461',
            is_seen: true,
            reference_code: 'DF-32898',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-10T16:00:35.845431+04:30',
            registration_type: 2,
            cost: 1500,
            status: 13,
            __typename: 'Order'
          }
        ],
        status_count: [
          {
            status: 17,
            total: 2,
            __typename: 'OrderStatusCount'
          },
          {
            status: 13,
            total: 9,
            __typename: 'OrderStatusCount'
          },
          {
            status: 12,
            total: 11,
            __typename: 'OrderStatusCount'
          },
          {
            status: 4,
            total: 16,
            __typename: 'OrderStatusCount'
          },
          {
            status: 3,
            total: 39,
            __typename: 'OrderStatusCount'
          },
          {
            status: 10,
            total: 70,
            __typename: 'OrderStatusCount'
          },
          {
            status: 5,
            total: 78,
            __typename: 'OrderStatusCount'
          }
        ],
        __typename: 'Orders'
      },
      getManagersFilterPrimaries: {
        max_cost: 100009000,
        min_cost: 0,
        cities: [
          'احمدابادسفلی',
          'اردستان',
          'اندیشه',
          'بهارستان',
          'تجریش',
          'تهران',
          'جم',
          'ساري',
          'پاکدشت',
          'کرج'
        ],
        __typename: 'FilterPrimaries'
      },
      __typename: 'OrderQuery'
    }
  }
};
export const order_scroll_one = {
  order: {
    getManagers: {
      count: 108,
      next: 'http://backend.apps.digify.shop/order/v3/manager/4/?limit=10&max_cost=0&min_cost=0&offset=20&search=&statuses=',
      previous:
        'http://backend.apps.digify.shop/order/v3/manager/4/?limit=10&max_cost=0&min_cost=0&search=&statuses=',
      results: [
        {
          id: '2384',
          is_seen: true,
          reference_code: 'DF-01174',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-12T14:35:37.021474+04:30',
          registration_type: 1,
          cost: 0,
          status: 13,
          __typename: 'Order'
        },
        {
          id: '2334',
          is_seen: false,
          reference_code: 'DF-75123',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-09T11:18:16.246185+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2333',
          is_seen: true,
          reference_code: 'DF-93635',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-09T09:51:48.085533+04:30',
          registration_type: 1,
          cost: 0,
          status: 13,
          __typename: 'Order'
        },
        {
          id: '2332',
          is_seen: false,
          reference_code: 'DF-32470',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-06T19:35:46.889959+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2331',
          is_seen: true,
          reference_code: 'DF-90459',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-06T19:28:05.041795+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2330',
          is_seen: false,
          reference_code: 'DF-39988',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-06T18:23:23.036409+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2327',
          is_seen: false,
          reference_code: 'DF-52867',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-06T13:12:40.539469+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2326',
          is_seen: false,
          reference_code: 'DF-02061',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-04-05T14:19:01.791999+04:30',
          registration_type: 1,
          cost: 0,
          status: 10,
          __typename: 'Order'
        },
        {
          id: '2312',
          is_seen: true,
          reference_code: 'DF-96792',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-03-30T20:19:06.409079+04:30',
          registration_type: 2,
          cost: 0,
          status: 3,
          __typename: 'Order'
        },
        {
          id: '2311',
          is_seen: true,
          reference_code: 'DF-06818',
          customer: {
            name: 'ندا حجت پناه',
            __typename: 'Customer'
          },
          created_at: '2022-03-30T20:18:38.048070+04:30',
          registration_type: 1,
          cost: 0,
          status: 3,
          __typename: 'Order'
        }
      ],
      status_count: [
        {
          status: 13,
          total: 3,
          __typename: 'OrderStatusCount'
        },
        {
          status: 4,
          total: 10,
          __typename: 'OrderStatusCount'
        },
        {
          status: 3,
          total: 19,
          __typename: 'OrderStatusCount'
        },
        {
          status: 10,
          total: 31,
          __typename: 'OrderStatusCount'
        },
        {
          status: 5,
          total: 45,
          __typename: 'OrderStatusCount'
        }
      ],
      __typename: 'Orders'
    },
    getManagersFilterPrimaries: {
      max_cost: 100009000,
      min_cost: 0,
      cities: [
        'احمدابادسفلی',
        'اردستان',
        'اندیشه',
        'بهارستان',
        'تجریش',
        'تهران',
        'جم',
        'ساري',
        'پاکدشت',
        'کرج'
      ],
      __typename: 'FilterPrimaries'
    },
    __typename: 'OrderQuery'
  }
};

export const order_all_Fillter = {
  data: {
    order: {
      getManagers: {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: '2469',
            is_seen: true,
            reference_code: 'DF-70927',
            customer: {
              name: 'ندا حجت پناه',
              __typename: 'Customer'
            },
            created_at: '2022-05-11T16:33:43.737150+04:30',
            registration_type: 1,
            cost: 325000,
            status: 3,
            __typename: 'Order'
          }
        ],
        status_count: [
          {
            status: 3,
            total: 1,
            __typename: 'OrderStatusCount'
          }
        ],
        __typename: 'Orders'
      },
      getManagersFilterPrimaries: {
        max_cost: 100009000,
        min_cost: 0,
        cities: [
          'احمدابادسفلی',
          'اردستان',
          'اندیشه',
          'بهارستان',
          'تجریش',
          'تهران',
          'جم',
          'ساري',
          'پاکدشت',
          'کرج'
        ],
        __typename: 'FilterPrimaries'
      },
      __typename: 'OrderQuery'
    }
  }
};

export const waitingForApprovalOrder = {
  data: {
    order: {
      getManager: {
        cost: 55000,
        created_at: '2022-05-18T11:15:37.937157+04:30',
        is_seen: false,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-20T11:15:38+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: null,
        pocket_name: '',
        expired_at: '2022-05-18T13:15:37.923848+04:30',
        preparing_days: 2,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 60000,
        tax: 0,
        id: '2486',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 14,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: null,
        deadline_date: '2022-05-25',
        reference_code: 'DF-50111',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9LUQUB6.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  },
                  {
                    value: 'صورتی',
                    option: {
                      name: 'رنگ',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ashegane20iranbanou.com09022.jpg',
                      __typename: 'Image'
                    },
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/knafeh-recipe-11.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'کنافه عربی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 60000,
                cost: 55000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const waitingForApprovalOrderEditedCardNumber = {
  data: {
    order: {
      getManager: {
        cost: 45000,
        created_at: '2022-05-11T10:36:00.109429+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-11T10:36:00+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: null,
        expired_at: '2022-05-11T12:36:00.100307+04:30',
        preparing_days: 0,
        shipping_support_number: '',
        address: {
          lat: '51.3640270000000000',
          lng: '35.7644650000000000',
          address: 'تهران، شهرک غرب (شهرک قدس)، سیف، حسن سیف، سیف',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1416525354',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 50000,
        tax: 0,
        id: '2465',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 14,
        owner_card_name: 'محمد حسینی',
        owner_card_number: '7037997436813682',
        previous_status: null,
        deadline_date: '2022-05-16',
        reference_code: 'DF-55935',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_ohkz5Yu.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_46UYegU.png',
                      __typename: 'Image'
                    }
                  ],
                  label: 'شکلات پسته ای کرم دار',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 50000,
                cost: 45000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const canceledByMerchantSettledOrder = {
  data: {
    order: {
      getManager: {
        cost: 55000,
        created_at: '2022-05-18T11:20:25.180888+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-20T11:20:25+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: null,
        pocket_name: '',
        expired_at: '2022-05-18T13:20:25.171055+04:30',
        preparing_days: 2,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 60000,
        tax: 0,
        id: '2487',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 12,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 14,
        deadline_date: '2022-05-25',
        reference_code: 'DF-05384',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9LUQUB6.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  },
                  {
                    value: 'صورتی',
                    option: {
                      name: 'رنگ',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ashegane20iranbanou.com09022.jpg',
                      __typename: 'Image'
                    },
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/knafeh-recipe-11.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'کنافه عربی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 60000,
                cost: 55000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const canceledByMerchantSettledMutatuin = {
  data: {
    order: {
      updateOrderStatus: null,
      __typename: 'OrderMutation'
    }
  }
};
export const updateOrderSendMutationResponse = {
  data: {
    order: {
      updateOrderSend: {
        post_tracking_number: ''
      },
      __typename: 'OrderMutation'
    }
  }
};
export const waitingForPaymentAppprovalOrder = {
  data: {
    order: {
      getManager: {
        cost: 55000,
        created_at: '2022-05-18T11:15:37.937157+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-20T11:15:38+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: '2022-05-18T11:16:41.837948+04:30',
        pocket_name: '',
        expired_at: '2022-05-19T11:16:54.786104+04:30',
        preparing_days: 2,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 60000,
        tax: 0,
        id: '2486',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 16,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 15,
        deadline_date: '2022-05-25',
        reference_code: 'DF-50111',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9LUQUB6.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  },
                  {
                    value: 'صورتی',
                    option: {
                      name: 'رنگ',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ashegane20iranbanou.com09022.jpg',
                      __typename: 'Image'
                    },
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/knafeh-recipe-11.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'کنافه عربی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 60000,
                cost: 55000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/Screenshot_from_2022-04-04_17-34-37_TBn3cvi.png',
                    created_at: '2022-05-18T11:16:54.541080+04:30',
                    __typename: 'OrderPaymentTransactionsCardBills'
                  }
                ],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const InPreparingOrder = {
  data: {
    order: {
      getManager: {
        cost: 55000,
        created_at: '2022-05-10T16:01:07.814869+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 1,
        prepare_deadline: '2022-05-12T16:01:07+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 0,
        order_weight: 0,
        sent_at: null,
        confirmed_at: '2022-05-11T17:16:22.219690+04:30',
        pocket_name: '',
        expired_at: '2022-05-12T16:01:07+04:30',
        preparing_days: 2,
        shipping_support_number: '',
        address: {
          lat: '51.4160930000000000',
          lng: '35.7247280000000000',
          address:
            'تهران، محله عباس آباد - اندیشه (بهجت آباد)، مطهری، نعیمی، فروشگاه کیف و کفش تک چرم',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1533733123',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 60000,
        tax: 0,
        id: '2462',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 3,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 2,
        deadline_date: '2022-05-17',
        reference_code: 'DF-28709',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9LUQUB6.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  },
                  {
                    value: 'صورتی',
                    option: {
                      name: 'رنگ',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ashegane20iranbanou.com09022.jpg',
                      __typename: 'Image'
                    },
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/knafeh-recipe-11.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'کنافه عربی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 60000,
                cost: 55000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: {
        approximate_post_cost: 0,
        shipping_time_sending: 4,
        weight: 0,
        is_sms_service_active: false,
        receiver_phone_number: '+989120441859',
        receiver_last_name: 'حجت پناه',
        receiver_first_name: 'ندا',
        wallet_balance: 0,
        pay_at_dest: false,
        postex_username: '09124724088',
        address: {
          address:
            'تهران، محله عباس آباد - اندیشه (بهجت آباد)، مطهری، نعیمی، فروشگاه کیف و کفش تک چرم',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1533733123',
          __typename: 'Address'
        },
        merchant_data: {
          address: {
            city: 'تهران',
            province: 'تهران',
            address: 'this is a test address',
            postal_code: '1861861865',
            __typename: 'Address'
          },
          first_name: 'محمد امین ها',
          last_name: 'حاجی حسینی',
          phone_number: '+989124724088',
          __typename: 'OrderSendMerchantData'
        },
        __typename: 'OrderSend'
      },
      __typename: 'OrderQuery'
    }
  }
};
export const canceledByMerchantOrder = {
  data: {
    order: {
      getManager: {
        cost: 101500,
        created_at: '2022-05-11T15:03:46.955936+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 2,
        prepare_deadline: '2022-05-11T15:03:47+04:30',
        tracking_url: '',
        total_profit: 300,
        shipping_cost: 100000,
        order_weight: 20,
        sent_at: null,
        confirmed_at: null,
        expired_at: '2022-05-12T15:06:24.920090+04:30',
        preparing_days: 0,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 1800,
        tax: 0,
        id: '2468',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 11,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 16,
        deadline_date: '2022-05-18',
        reference_code: 'DF-55148',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [],
                option_values: [
                  {
                    value: '2k',
                    option: {
                      name: 'وزن',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D9%BE%D8%A7%D8%B3%D8%AA%DB%8C%D9%84-%DA%AF%DB%8C%D8%A7%D9%87%DB%8C-%DA%A9%D8%B1%D9%85%DB%8C-%D8%B4%DA%A9%D9%84-%D8%AF%D8%B1%D8%B3%D8%AA-%DA%A9%D9%86%DB%8C%D9%85_W4pZOAP.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'پاستیل کرمی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 1800,
                cost: 1500,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/Screenshot_from_2022-04-04_17-34-37_mdZqBOL.png',
                    created_at: '2022-05-11T15:06:24.633027+04:30',
                    __typename: 'OrderPaymentTransactionsCardBills'
                  }
                ],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
export const paidOrder = {
  data: {
    order: {
      getManager: {
        cost: 77000,
        created_at: '2022-05-18T11:27:00.771462+04:30',
        is_seen: false,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 1,
        prepare_deadline: '2022-05-18T11:27:00+04:30',
        tracking_url: '',
        total_profit: 5000,
        shipping_cost: 32000,
        order_weight: 0,
        sent_at: null,
        confirmed_at: null,
        pocket_name: '',
        expired_at: '2022-05-19T11:27:07.256925+04:30',
        preparing_days: 0,
        shipping_support_number: '',
        address: {
          lat: '35.7371041797834440',
          lng: '51.4055366854069010',
          address: 'تهران، محله یوسف آباد، میدان سید جمال الدین اسدآبادی',
          city: 'کرج',
          province: 'البرز',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 50000,
        tax: 0,
        id: '2491',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 2,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: null,
        deadline_date: '2022-06-09',
        reference_code: 'DF-09967',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_ohkz5Yu.png',
                    __typename: 'Image'
                  }
                ],
                option_values: [
                  {
                    value: 's',
                    option: {
                      name: 'سایز',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_46UYegU.png',
                      __typename: 'Image'
                    }
                  ],
                  label: 'شکلات پسته ای کرم دار',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 50000,
                cost: 45000,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: {
        approximate_post_cost: 0,
        shipping_time_sending: 16,
        weight: 0,
        is_sms_service_active: false,
        receiver_phone_number: '+989120441859',
        receiver_last_name: 'حجت پناه',
        receiver_first_name: 'ندا',
        wallet_balance: 0,
        pay_at_dest: false,
        postex_username: '09124724088',
        address: {
          address: 'تهران، محله یوسف آباد، میدان سید جمال الدین اسدآبادی',
          city: 'کرج',
          province: 'البرز',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        merchant_data: {
          address: {
            city: 'تهران',
            province: 'تهران',
            address: 'this is a test address',
            postal_code: '1861861865',
            __typename: 'Address'
          },
          first_name: 'محمد امین ها',
          last_name: 'حاجی حسینی',
          phone_number: '+989124724088',
          __typename: 'OrderSendMerchantData'
        },
        __typename: 'OrderSend'
      },
      __typename: 'OrderQuery'
    }
  }
};
export const sendingOrder = {
  data: {
    order: {
      getManager: {
        cost: 1500,
        created_at: '2022-05-16T12:08:57.705158+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 1,
        prepare_deadline: '2022-05-16T12:08:57+04:30',
        tracking_url: '',
        total_profit: 300,
        shipping_cost: 0,
        order_weight: 3000,
        sent_at: '2022-05-16T12:09:28.740617+04:30',
        confirmed_at: '2022-05-16T12:09:23.412029+04:30',
        pocket_name: '',
        expired_at: '2022-05-16T12:08:57+04:30',
        preparing_days: 0,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 1800,
        tax: 0,
        id: '2480',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 4,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 3,
        deadline_date: '2022-05-20',
        reference_code: 'DF-09750',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [],
                option_values: [
                  {
                    value: '2k',
                    option: {
                      name: 'وزن',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D9%BE%D8%A7%D8%B3%D8%AA%DB%8C%D9%84-%DA%AF%DB%8C%D8%A7%D9%87%DB%8C-%DA%A9%D8%B1%D9%85%DB%8C-%D8%B4%DA%A9%D9%84-%D8%AF%D8%B1%D8%B3%D8%AA-%DA%A9%D9%86%DB%8C%D9%85_W4pZOAP.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'پاستیل کرمی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 1800,
                cost: 1500,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};

export const deliveredOrder = {
  data: {
    order: {
      getManager: {
        cost: 1500,
        created_at: '2022-05-16T12:08:57.705158+04:30',
        is_seen: true,
        courier_info: {
          phone: null,
          avatar: null,
          lastname: null,
          firstname: null,
          __typename: 'CourierInfo'
        },
        registration_type: 1,
        prepare_deadline: '2022-05-16T12:08:57+04:30',
        tracking_url: '',
        total_profit: 300,
        shipping_cost: 0,
        order_weight: 3000,
        sent_at: '2022-05-16T12:09:28.740617+04:30',
        confirmed_at: '2022-05-16T12:09:23.412029+04:30',
        pocket_name: '',
        expired_at: '2022-05-16T12:08:57+04:30',
        preparing_days: 0,
        shipping_support_number: '',
        address: {
          lat: '35.7617438313242530',
          lng: '51.4230899047832110',
          address: 'تهران، محله میرداماد (داووديه)، میرداماد',
          city: 'تهران',
          province: 'تهران',
          postal_code: '1477663813',
          __typename: 'Address'
        },
        customer_description: '',
        order_description: null,
        shipping_type: 'other',
        shipping: null,
        total_primary_cost: 1800,
        tax: 0,
        id: '2480',
        loyalty_amount: 0,
        total_discount_cost: 0,
        status: 5,
        owner_card_name: 'ندا حجت پناه',
        owner_card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
        previous_status: 4,
        deadline_date: '2022-05-20',
        reference_code: 'DF-09750',
        customer: {
          name: 'ندا حجت پناه',
          phone_number: '+989120441859',
          card_number: '7۰۳۷۹۹۷۴۳۶۸۱۳۶۸۱',
          __typename: 'Customer'
        },
        items: [
          {
            details: {
              variant: {
                images: [],
                option_values: [
                  {
                    value: '2k',
                    option: {
                      name: 'وزن',
                      __typename: 'OptionValueOption'
                    },
                    __typename: 'OptionValue'
                  }
                ],
                product_serialized: {
                  images: [
                    {
                      image:
                        'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D9%BE%D8%A7%D8%B3%D8%AA%DB%8C%D9%84-%DA%AF%DB%8C%D8%A7%D9%87%DB%8C-%DA%A9%D8%B1%D9%85%DB%8C-%D8%B4%DA%A9%D9%84-%D8%AF%D8%B1%D8%B3%D8%AA-%DA%A9%D9%86%DB%8C%D9%85_W4pZOAP.jpg',
                      __typename: 'Image'
                    }
                  ],
                  label: 'پاستیل کرمی',
                  chosen_image: null,
                  __typename: 'ProductSerialized'
                },
                primary_cost: 1800,
                cost: 1500,
                __typename: 'Variant'
              },
              __typename: 'OrderItemsDetail'
            },
            unit_amount: 1,
            __typename: 'OrderItems'
          }
        ],
        payment: [
          {
            transactions: [
              {
                card_bills: [],
                __typename: 'OrderPaymentTransactions'
              }
            ],
            __typename: 'OrderPayment'
          }
        ],
        __typename: 'Order'
      },
      getOrderSend: null,
      __typename: 'OrderQuery'
    }
  }
};
