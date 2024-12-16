export const getCoockieResponse = {
  data: {
    user: {
      getCookie: null,
      __typename: 'UserMutation'
    }
  }
};

export const getUserReadResponse = {
  data: {
    user: {
      getUserRead: {
        has_active_purchase_package: true,
        my_store: [
          {
            id: '4',
            ecommerce: {
              is_active: true,
              __typename: 'UserReadMyStoreEcommerce'
            },
            __typename: 'UserReadMyStore'
          }
        ],
        my_brand: {
          id: '4',
          __typename: 'UserReadMyBrand'
        },
        __typename: 'UserRead'
      },
      __typename: 'UserQuery'
    }
  }
};

export const getUserReadResponseTrial = {
  data: {
    user: {
      getUserRead: {
        has_active_purchase_package: false,
        my_store: [
          {
            id: '4',
            ecommerce: {
              is_active: true,
              expire_date: '2022-08-23',
              __typename: 'UserReadMyStoreEcommerce'
            },
            __typename: 'UserReadMyStore'
          }
        ],
        my_brand: {
          id: '4',
          __typename: 'UserReadMyBrand'
        },
        __typename: 'UserRead'
      },
      __typename: 'UserQuery'
    }
  }
};

export const getHomeDataResponse = {
  data: {
    user: {
      getUserRead: {
        my_store: [
          {
            first_name: 'محمد امین',
            id: '4',
            __typename: 'UserReadMyStore'
          }
        ],
        __typename: 'UserRead'
      },
      __typename: 'UserQuery'
    },
    store: {
      getHomeData: {
        orders_count: 414,
        products_count: 48,
        customers_count: 48,
        logo: {
          image:
            'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/Neda-designstyle-popstar-m_46WcPGe.png',
          __typename: 'LogoHome'
        },
        recharge_date: '2022-04-17',
        expire_date: '2032-02-13',
        sms_charge: 344865,
        initial_sms_charge: 344973,
        name: 'فروشگاه ندالینا',
        __typename: 'HomeData'
      },
      __typename: 'StoreQuery'
    },
    order: {
      getOrdersBrief: {
        results: [
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 2,
            id: '2462',
            cost: 55000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 14,
            id: '2461',
            cost: 1500,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'کیمیا',
            customer_last_name: 'فدایی 3',
            status: 4,
            id: '2460',
            cost: 135000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'کیمیا',
            customer_last_name: 'فدایی 3',
            status: 15,
            id: '2459',
            cost: 45000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2455',
            cost: 2360000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2451',
            cost: 2360000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2450',
            cost: 2360000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2449',
            cost: 2360000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2448',
            cost: 2360000,
            __typename: 'OrderBrief'
          },
          {
            customer_first_name: 'ندا',
            customer_last_name: 'حجت پناه',
            status: 10,
            id: '2447',
            cost: 2360000,
            __typename: 'OrderBrief'
          }
        ],
        __typename: 'OrderBriefs'
      },
      __typename: 'OrderQuery'
    },
    item: {
      getItemsBrief: {
        results: [
          {
            id: '1641',
            unlimited_variant_count: 1,
            stock: 0,
            primary_cost: 30000,
            label: 'آجیل 2',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_gPgmNbd.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1637',
            unlimited_variant_count: 0,
            stock: 10,
            primary_cost: 1500,
            label: 'testgg',
            image: null,
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1636',
            unlimited_variant_count: 1,
            stock: 0,
            primary_cost: 400000,
            label: 'ساعت 2',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9XzqegZ.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1635',
            unlimited_variant_count: 1,
            stock: 0,
            primary_cost: 200000,
            label: 'هدفن',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_rBBfA8W.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1634',
            unlimited_variant_count: 0,
            stock: 0,
            primary_cost: 20000,
            label: 'ویژه جدید',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/bk_4x_kOLqEif.jpg',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1633',
            unlimited_variant_count: 0,
            stock: 42,
            primary_cost: 400000,
            label: 'ساعت',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ikornnes-standing-mirror-ash__0715800_pe730623_s5_ZeWDXwl.webp',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1632',
            unlimited_variant_count: 2,
            stock: 11,
            primary_cost: 600000,
            label: 'عینک',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_ZMOv1Kz.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1631',
            unlimited_variant_count: 1,
            stock: 0,
            primary_cost: 10,
            label: 'jkfsdhgsdsksdkskssdsjkhjbhbhb',
            image: null,
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1629',
            unlimited_variant_count: 0,
            stock: 3,
            primary_cost: 20000,
            label: 'دمپایی',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_qn7yCUP.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          },
          {
            id: '1627',
            unlimited_variant_count: 1,
            stock: 0,
            primary_cost: 500000,
            label: 'میز',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_xHpqeiQ.png',
              __typename: 'ItemBriefImage'
            },
            is_active: true,
            __typename: 'ItemBrief'
          }
        ],
        __typename: 'ItemBriefs'
      },
      __typename: 'ItemQuery'
    }
  }
};
