export const createTipax_v1 = {
  data: {
    shipping: {
      createNewShipping: {
        id: 180,
        name: 'تیپاکس',
        is_active: true,
        __typename: 'CreateShippingResponse'
      },
      __typename: 'ShippingMutation'
    }
  }
};

export const getShiping_v1 = {
  data: {
    shipping: {
      getShippingMethods: {
        count: 32,
        results: [
          {
            name: 'پیک',
            chips_values: ['inner_province'],
            other_provinces_is_active: false,
            my_province_is_active: true,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'لالای لای',
            chips_values: [],
            other_provinces_is_active: false,
            my_province_is_active: false,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'تیپاکس',
            chips_values: [],
            other_provinces_is_active: false,
            my_province_is_active: false,
            shipping_type_display: 'digiexpress_tipax',
            __typename: 'ShippingMethod'
          }
        ],
        __typename: 'ShippingMethods'
      },
      __typename: 'ShippingQuery'
    }
  }
};

export const getShiping_v2 = {
  data: {
    shipping: {
      getShippingMethods: {
        count: 32,
        results: [
          {
            name: 'sdfsdfsdf',
            chips_values: [],
            other_provinces_is_active: false,
            my_province_is_active: false,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'میلادپیک',
            chips_values: ['inner_province', 'outer_province'],
            other_provinces_is_active: true,
            my_province_is_active: true,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'تیپاکس',
            chips_values: ['inner_province', 'outer_province'],
            other_provinces_is_active: true,
            my_province_is_active: true,
            shipping_type_display: 'digiexpress_tipax',
            __typename: 'ShippingMethod'
          }
        ],
        __typename: 'ShippingMethods'
      },
      __typename: 'ShippingQuery'
    }
  }
};

export const getShiping_v3 = {
  data: {
    shipping: {
      getShippingMethods: {
        count: 32,
        results: [
          {
            name: 'sdfsdfsdf',
            chips_values: [],
            other_provinces_is_active: false,
            my_province_is_active: false,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'میلادپیک',
            chips_values: ['outer_province'],
            other_provinces_is_active: true,
            my_province_is_active: true,
            shipping_type_display: 'other',
            __typename: 'ShippingMethod'
          },
          {
            name: 'تیپاکس',
            chips_values: ['outer_province'],
            other_provinces_is_active: true,
            my_province_is_active: true,
            shipping_type_display: 'digiexpress_tipax',
            __typename: 'ShippingMethod'
          }
        ],
        __typename: 'ShippingMethods'
      },
      __typename: 'ShippingQuery'
    }
  }
};

export const brandInfo = {
  data: {
    user: {
      getUserRead: {
        my_store: [
          {
            id: '4',
            name: 'پاستیل فروشی حاجی',
            guild: 'پوشاک (لباس و کیف و کفش و ...)',
            telephone_number: '+982177293695',
            birthday: '1997-01-15',
            email: 'm.amin.h.h@gmail.com',
            first_name: 'محمد امین',
            last_name: 'حاجی حسیsنی',
            national_code: '4112031521',
            phone_number: '+989124724088',
            sheba_number: null,
            store_address: {
              address: 'تهران- خ مطهری- خ میرزای شیرازی- کوچه اخر',
              city: 'تهران',
              province: 'تهران',
              latitude: '35.7622540902968850',
              longitude: '51.4054691791534500',
              postal_code: '1141817167',
              __typename: 'StoreAddress'
            },
            logo: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/download_AZk9eIH.jpeg',
              __typename: 'Image'
            },
            __typename: 'UserReadMyStore'
          }
        ],
        __typename: 'UserRead'
      },
      __typename: 'UserQuery'
    }
  }
};
