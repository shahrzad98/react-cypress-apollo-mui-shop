export const categoriesData = {
  data: {
    item: {
      getCategories: {
        results: [
          {
            id: '383',
            title: 'جذاااب',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '382',
            title: 'ت',
            child_categories: [
              {
                id: '384',
                title: 'ایکس',
                parent: '382',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '381',
            title: 'کیمیا ۲',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '380',
            title: 'جدید',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '378',
            title: 'ویژه',
            child_categories: [
              {
                id: '379',
                title: 'ویژه ۲',
                parent: '378',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '377',
            title: 'تست',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '372',
            title: 'کیمیا',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '344',
            title: 'فاطمه',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '335',
            title: 'tesf',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '316',
            title: 'محصولات',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '285',
            title: 'کیف3',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '270',
            title: 'عینکککک',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '259',
            title: 'همه',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '249',
            title: 'test parent',
            child_categories: [
              {
                id: '251',
                title: 'test subcategory 2',
                parent: '249',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '173',
            title: 'موبایل',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '158',
            title: 'گل و گیاه خوب خوش',
            child_categories: [
              {
                id: '289',
                title: 'کود حیوانی خوب',
                parent: '158',
                __typename: 'childCategoryLite'
              },
              {
                id: '274',
                title: 'کود شیمیایی',
                parent: '158',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '157',
            title: 'لوازم تحریر',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '155',
            title: 'دکوراسیون',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '145',
            title: 'شیرینی جات',
            child_categories: [
              {
                id: '146',
                title: 'شکلات',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '147',
                title: 'پاستیل',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '159',
                title: 'آجیل',
                parent: '145',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '5',
            title: 'کفش',
            child_categories: [
              {
                id: '138',
                title: 'اسپرت',
                parent: '5',
                __typename: 'childCategoryLite'
              },
              {
                id: '139',
                title: 'مجلسی',
                parent: '5',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '4',
            title: 'پوشاک',
            child_categories: [
              {
                id: '19',
                title: 'زنانه',
                parent: '4',
                __typename: 'childCategoryLite'
              },
              {
                id: '141',
                title: 'مردانه',
                parent: '4',
                __typename: 'childCategoryLite'
              }
            ],
            parent: null,
            __typename: 'CategoryLite'
          },
          {
            id: '3',
            title: 'اکسسوری',
            child_categories: [],
            parent: null,
            __typename: 'CategoryLite'
          }
        ],
        __typename: 'CategoriesLite'
      },
      __typename: 'ItemQuery'
    }
  }
};

export const createProductDuplicateNameResult = {
  errors: [
    {
      message: '400: Bad Request',
      locations: [
        {
          line: 3,
          column: 5
        }
      ],
      path: ['item', 'createProduct'],
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        response: {
          url: '/item/v2/product/4/',
          status: 400,
          statusText: 'Bad Request',
          body: {
            non_field_errors: [
              'The fields name, store must make a unique set.',
              'The fields label, store must make a unique set.'
            ]
          }
        },
        exception: {
          stacktrace: [
            'Error: 400: Bad Request',
            '    at ItemAPI.errorFromResponse (/home/mohammad/projects/apollo-core/node_modules/apollo-datasource-rest/src/RESTDataSource.ts:139:15)',
            '    at ItemAPI.didReceiveResponse (/home/mohammad/projects/apollo-core/node_modules/apollo-datasource-rest/src/RESTDataSource.ts:104:24)',
            '    at /home/mohammad/projects/apollo-core/node_modules/apollo-datasource-rest/src/RESTDataSource.ts:263:29',
            '    at runMicrotasks (<anonymous>)',
            '    at processTicksAndRejections (node:internal/process/task_queues:96:5)'
          ]
        }
      }
    }
  ],
  data: {
    item: {
      createProduct: null,
      __typename: 'ItemMutation'
    }
  }
};

export const createProductSuccessResult = {
  data: {
    item: {
      createProduct: {
        id: '1645',
        __typename: 'Product'
      },
      __typename: 'ItemMutation'
    }
  }
};

export const productsDataAfterCreation = {
  data: {
    item: {
      getProducts: {
        count: 51,
        results: [
          {
            id: '1647',
            image: null,
            options: [],
            category: 'کیمیا ۲',
            is_active: true,
            variants: [
              {
                primary_cost: 25000,
                stock: '2',
                cost: 18750,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'test_product_12',
            name: 'test_product_12',
            __typename: 'ProductLite'
          },
          {
            id: '1644',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/Screenshot_20220513-110248_Chrome.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'جذاااب',
            is_active: true,
            variants: [
              {
                primary_cost: 12000,
                stock: '0',
                cost: 12000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'اون',
            name: 'اون',
            __typename: 'ProductLite'
          },
          {
            id: '1643',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_nAtVimw.png',
              __typename: 'Image'
            },
            options: [],
            category: 'ایکس',
            is_active: true,
            variants: [
              {
                primary_cost: 2000,
                stock: '0',
                cost: 2000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'کلیپس کاغذ',
            name: 'کلیپس کاغذ',
            __typename: 'ProductLite'
          },
          {
            id: '1642',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/photo_2022-04-16_11-05-23.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'test subcategory 2',
            is_active: true,
            variants: [
              {
                primary_cost: 1000000,
                stock: '1',
                cost: 1000000,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'فروشگاه دنیلی',
            name: 'فروشگاه دنیلی',
            __typename: 'ProductLite'
          },
          {
            id: '1641',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_gPgmNbd.png',
              __typename: 'Image'
            },
            options: [],
            category: 'ت',
            is_active: true,
            variants: [
              {
                primary_cost: 30000,
                stock: '0',
                cost: 30000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'آجیل 2',
            name: 'آجیل 2',
            __typename: 'ProductLite'
          },
          {
            id: '1637',
            image: null,
            options: ['height'],
            category: 'جذاااب',
            is_active: true,
            variants: [
              {
                primary_cost: 1500,
                stock: '10',
                cost: 1500,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              },
              {
                primary_cost: 1500,
                stock: '0',
                cost: 1500,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'testgg',
            name: 'testgg',
            __typename: 'ProductLite'
          },
          {
            id: '1636',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9XzqegZ.png',
              __typename: 'Image'
            },
            options: [],
            category: 'اکسسوری',
            is_active: true,
            variants: [
              {
                primary_cost: 400000,
                stock: '0',
                cost: 400000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'ساعت 2',
            name: 'ساعت 2',
            __typename: 'ProductLite'
          },
          {
            id: '1635',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_rBBfA8W.png',
              __typename: 'Image'
            },
            options: [],
            category: 'محصولات',
            is_active: true,
            variants: [
              {
                primary_cost: 200000,
                stock: '0',
                cost: 200000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'هدفن',
            name: 'هدفن',
            __typename: 'ProductLite'
          },
          {
            id: '1634',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/bk_4x_kOLqEif.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'کیمیا ۲',
            is_active: true,
            variants: [
              {
                primary_cost: 20000,
                stock: '0',
                cost: 20000,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'ویژه جدید',
            name: 'ویژه جدید',
            __typename: 'ProductLite'
          },
          {
            id: '1633',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/ikornnes-standing-mirror-ash__0715800_pe730623_s5_ZeWDXwl.webp',
              __typename: 'Image'
            },
            options: ['سایز'],
            category: 'کیمیا ۲',
            is_active: true,
            variants: [
              {
                primary_cost: 400000,
                stock: '12',
                cost: 400000,
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_f9dnrQm.png',
                    __typename: 'Image'
                  }
                ],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              },
              {
                primary_cost: 400000,
                stock: '30',
                cost: 390000,
                images: [
                  {
                    image:
                      'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_lOwy9Og.png',
                    __typename: 'Image'
                  }
                ],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'ساعت',
            name: 'ساعت',
            __typename: 'ProductLite'
          }
        ],
        __typename: 'ProductsLite'
      },
      getProductsFilterPrimsMerchant: {
        categories: [
          {
            id: '3',
            title: 'اکسسوری',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '155',
            title: 'دکوراسیون',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '158',
            title: 'گل و گیاه خوب خوش',
            parent: null,
            child_categories: [
              {
                id: '289',
                title: 'کود حیوانی خوب',
                parent: '158',
                __typename: 'Category'
              },
              {
                id: '274',
                title: 'کود شیمیایی',
                parent: '158',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '173',
            title: 'موبایل',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '249',
            title: 'test parent',
            parent: null,
            child_categories: [
              {
                id: '251',
                title: 'test subcategory 2',
                parent: '249',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '259',
            title: 'همه',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '270',
            title: 'عینکککک',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '316',
            title: 'محصولات',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '344',
            title: 'فاطمه',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '372',
            title: 'کیمیا',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '378',
            title: 'ویژه',
            parent: null,
            child_categories: [
              {
                id: '379',
                title: 'ویژه ۲',
                parent: '378',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '380',
            title: 'جدید',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '381',
            title: 'کیمیا ۲',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '382',
            title: 'ت',
            parent: null,
            child_categories: [
              {
                id: '384',
                title: 'ایکس',
                parent: '382',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '383',
            title: 'جذاااب',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          }
        ],
        min_stock: 0,
        max_stock: 3997,
        min_cost: 1000,
        max_cost: 100000000,
        min_primary_cost: 1200,
        max_primary_cost: 100000000,
        __typename: 'filterPrimariesProduct'
      },
      __typename: 'ItemQuery'
    }
  }
};

export const productsList = {
  data: {
    item: {
      getProducts: {
        count: 52,
        results: [
          {
            id: '1648',
            image: null,
            options: [],
            category: 'محصولات',
            is_active: true,
            variants: [
              {
                primary_cost: 10000,
                stock: '0',
                cost: 10000,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'test234test',
            name: 'test234test',
            __typename: 'ProductLite'
          },
          {
            id: '1647',
            image: null,
            options: [],
            category: 'کیمیا ۲',
            is_active: true,
            variants: [
              {
                primary_cost: 25000,
                stock: '2',
                cost: 18750,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'test_product_12',
            name: 'test_product_12',
            __typename: 'ProductLite'
          },
          {
            id: '1644',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/Screenshot_20220513-110248_Chrome.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'جذاااب',
            is_active: true,
            variants: [
              {
                primary_cost: 12000,
                stock: '0',
                cost: 12000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'اون',
            name: 'اون',
            __typename: 'ProductLite'
          },
          {
            id: '1643',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_nAtVimw.png',
              __typename: 'Image'
            },
            options: [],
            category: 'ایکس',
            is_active: true,
            variants: [
              {
                primary_cost: 2000,
                stock: '0',
                cost: 2000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'کلیپس کاغذ',
            name: 'کلیپس کاغذ',
            __typename: 'ProductLite'
          },
          {
            id: '1642',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/photo_2022-04-16_11-05-23.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'test subcategory 2',
            is_active: true,
            variants: [
              {
                primary_cost: 1000000,
                stock: '1',
                cost: 1000000,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'فروشگاه دنیلی',
            name: 'فروشگاه دنیلی',
            __typename: 'ProductLite'
          },
          {
            id: '1641',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_gPgmNbd.png',
              __typename: 'Image'
            },
            options: [],
            category: 'ت',
            is_active: true,
            variants: [
              {
                primary_cost: 30000,
                stock: '0',
                cost: 30000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'آجیل 2',
            name: 'آجیل 2',
            __typename: 'ProductLite'
          },
          {
            id: '1637',
            image: null,
            options: ['height'],
            category: 'جذاااب',
            is_active: true,
            variants: [
              {
                primary_cost: 1500,
                stock: '10',
                cost: 1500,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              },
              {
                primary_cost: 1500,
                stock: '0',
                cost: 1500,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'testgg',
            name: 'testgg',
            __typename: 'ProductLite'
          },
          {
            id: '1636',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_9XzqegZ.png',
              __typename: 'Image'
            },
            options: [],
            category: 'اکسسوری',
            is_active: true,
            variants: [
              {
                primary_cost: 400000,
                stock: '0',
                cost: 400000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'ساعت 2',
            name: 'ساعت 2',
            __typename: 'ProductLite'
          },
          {
            id: '1635',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/image_rBBfA8W.png',
              __typename: 'Image'
            },
            options: [],
            category: 'محصولات',
            is_active: true,
            variants: [
              {
                primary_cost: 200000,
                stock: '0',
                cost: 200000,
                images: [],
                is_active: null,
                is_unlimited: true,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'هدفن',
            name: 'هدفن',
            __typename: 'ProductLite'
          },
          {
            id: '1634',
            image: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/bk_4x_kOLqEif.jpg',
              __typename: 'Image'
            },
            options: [],
            category: 'کیمیا ۲',
            is_active: true,
            variants: [
              {
                primary_cost: 20000,
                stock: '0',
                cost: 20000,
                images: [],
                is_active: null,
                is_unlimited: false,
                option_values: null,
                __typename: 'Variant'
              }
            ],
            label: 'ویژه جدید',
            name: 'ویژه جدید',
            __typename: 'ProductLite'
          }
        ],
        __typename: 'ProductsLite'
      },
      getProductsFilterPrimsMerchant: {
        categories: [
          {
            id: '3',
            title: 'اکسسوری',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '155',
            title: 'دکوراسیون',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '158',
            title: 'گل و گیاه خوب خوش',
            parent: null,
            child_categories: [
              {
                id: '289',
                title: 'کود حیوانی خوب',
                parent: '158',
                __typename: 'Category'
              },
              {
                id: '274',
                title: 'کود شیمیایی',
                parent: '158',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '173',
            title: 'موبایل',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '249',
            title: 'test parent',
            parent: null,
            child_categories: [
              {
                id: '251',
                title: 'test subcategory 2',
                parent: '249',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '259',
            title: 'همه',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '270',
            title: 'عینکککک',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '316',
            title: 'محصولات',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '344',
            title: 'فاطمه',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '372',
            title: 'کیمیا',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '378',
            title: 'ویژه',
            parent: null,
            child_categories: [
              {
                id: '379',
                title: 'ویژه ۲',
                parent: '378',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '380',
            title: 'جدید',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '381',
            title: 'کیمیا ۲',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          },
          {
            id: '382',
            title: 'ت',
            parent: null,
            child_categories: [
              {
                id: '384',
                title: 'ایکس',
                parent: '382',
                __typename: 'Category'
              }
            ],
            __typename: 'Category'
          },
          {
            id: '383',
            title: 'جذاااب',
            parent: null,
            child_categories: [],
            __typename: 'Category'
          }
        ],
        min_stock: 0,
        max_stock: 3997,
        min_cost: 1000,
        max_cost: 100000000,
        min_primary_cost: 1200,
        max_primary_cost: 100000000,
        __typename: 'filterPrimariesProduct'
      },
      __typename: 'ItemQuery'
    }
  }
};

export const editProductData = {
  data: {
    item: {
      getCategories: {
        results: [
          {
            id: '383',
            title: 'جذاااب',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '382',
            title: 'ت',
            child_categories: [
              {
                id: '384',
                title: 'ایکس',
                parent: '382',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '381',
            title: 'کیمیا ۲',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '380',
            title: 'جدید',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '378',
            title: 'ویژه',
            child_categories: [
              {
                id: '379',
                title: 'ویژه ۲',
                parent: '378',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '377',
            title: 'تست',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '372',
            title: 'کیمیا',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '344',
            title: 'فاطمه',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '335',
            title: 'tesf',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '316',
            title: 'محصولات',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '285',
            title: 'کیف3',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '270',
            title: 'عینکککک',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '259',
            title: 'همه',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '249',
            title: 'test parent',
            child_categories: [
              {
                id: '251',
                title: 'test subcategory 2',
                parent: '249',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '173',
            title: 'موبایل',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '158',
            title: 'گل و گیاه خوب خوش',
            child_categories: [
              {
                id: '289',
                title: 'کود حیوانی خوب',
                parent: '158',
                __typename: 'childCategoryLite'
              },
              {
                id: '274',
                title: 'کود شیمیایی',
                parent: '158',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '157',
            title: 'لوازم تحریر',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '155',
            title: 'دکوراسیون',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '145',
            title: 'شیرینی جات',
            child_categories: [
              {
                id: '146',
                title: 'شکلات',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '147',
                title: 'پاستیل',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '159',
                title: 'آجیل',
                parent: '145',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '5',
            title: 'کفش',
            child_categories: [
              {
                id: '138',
                title: 'اسپرت',
                parent: '5',
                __typename: 'childCategoryLite'
              },
              {
                id: '139',
                title: 'مجلسی',
                parent: '5',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '4',
            title: 'پوشاک',
            child_categories: [
              {
                id: '19',
                title: 'زنانه',
                parent: '4',
                __typename: 'childCategoryLite'
              },
              {
                id: '141',
                title: 'مردانه',
                parent: '4',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '3',
            title: 'اکسسوری',
            child_categories: [],
            __typename: 'CategoryLite'
          }
        ],
        __typename: 'CategoriesLite'
      },
      getProduct: {
        id: '1648',
        name: 'test234test',
        label: 'test234test',
        description: '',
        category: {
          id: '316',
          title: 'محصولات',
          __typename: 'Category'
        },
        images: [],
        variants: [
          {
            id: '1619',
            cost: 10000,
            stock: '0',
            name: 'test234test',
            option_values: [],
            images: [],
            time_delay: 1,
            primary_cost: 10000,
            is_unlimited: false,
            __typename: 'Variant'
          }
        ],
        tags: [],
        features: null,
        weight: 0,
        is_active: true,
        __typename: 'Product'
      },
      __typename: 'ItemQuery'
    }
  }
};

export const updateProductResult = {
  data: {
    item: {
      updateProduct: null,
      __typename: 'ItemMutation'
    }
  }
};

export const resultAfterEditProduct = {
  data: {
    item: {
      getCategories: {
        results: [
          {
            id: '383',
            title: 'جذاااب',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '382',
            title: 'ت',
            child_categories: [
              {
                id: '384',
                title: 'ایکس',
                parent: '382',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '381',
            title: 'کیمیا ۲',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '380',
            title: 'جدید',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '378',
            title: 'ویژه',
            child_categories: [
              {
                id: '379',
                title: 'ویژه ۲',
                parent: '378',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '377',
            title: 'تست',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '372',
            title: 'کیمیا',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '344',
            title: 'فاطمه',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '335',
            title: 'tesf',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '316',
            title: 'محصولات',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '285',
            title: 'کیف3',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '270',
            title: 'عینکککک',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '259',
            title: 'همه',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '249',
            title: 'test parent',
            child_categories: [
              {
                id: '251',
                title: 'test subcategory 2',
                parent: '249',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '173',
            title: 'موبایل',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '158',
            title: 'گل و گیاه خوب خوش',
            child_categories: [
              {
                id: '289',
                title: 'کود حیوانی خوب',
                parent: '158',
                __typename: 'childCategoryLite'
              },
              {
                id: '274',
                title: 'کود شیمیایی',
                parent: '158',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '157',
            title: 'لوازم تحریر',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '155',
            title: 'دکوراسیون',
            child_categories: [],
            __typename: 'CategoryLite'
          },
          {
            id: '145',
            title: 'شیرینی جات',
            child_categories: [
              {
                id: '146',
                title: 'شکلات',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '147',
                title: 'پاستیل',
                parent: '145',
                __typename: 'childCategoryLite'
              },
              {
                id: '159',
                title: 'آجیل',
                parent: '145',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '5',
            title: 'کفش',
            child_categories: [
              {
                id: '138',
                title: 'اسپرت',
                parent: '5',
                __typename: 'childCategoryLite'
              },
              {
                id: '139',
                title: 'مجلسی',
                parent: '5',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '4',
            title: 'پوشاک',
            child_categories: [
              {
                id: '19',
                title: 'زنانه',
                parent: '4',
                __typename: 'childCategoryLite'
              },
              {
                id: '141',
                title: 'مردانه',
                parent: '4',
                __typename: 'childCategoryLite'
              }
            ],
            __typename: 'CategoryLite'
          },
          {
            id: '3',
            title: 'اکسسوری',
            child_categories: [],
            __typename: 'CategoryLite'
          }
        ],
        __typename: 'CategoriesLite'
      },
      getProduct: {
        id: '1648',
        name: 'test234test',
        label: 'test234test',
        description: '',
        category: {
          id: '316',
          title: 'محصولات',
          __typename: 'Category'
        },
        images: [],
        variants: [
          {
            id: '1621',
            cost: 10000,
            stock: '1',
            name: 'test234test',
            option_values: [],
            images: [],
            time_delay: 1,
            primary_cost: 10000,
            is_unlimited: false,
            __typename: 'Variant'
          }
        ],
        tags: [],
        features: [
          {
            title: 'جنس',
            description: 'زبر',
            __typename: 'Feature'
          }
        ],
        weight: 500,
        is_active: false,
        __typename: 'Product'
      },
      __typename: 'ItemQuery'
    }
  }
};
