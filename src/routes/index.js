import { lazy } from 'react';
import BigPictureModal from '../components/modals/BigPictureModal';

const publicRoutes = [
  {
    path: 'login',
    element: lazy(() => import('./pages/login/Login'))
  },
  {
    path: 'forget-password',
    element: lazy(() => import('./pages/forget-password/index'))
  },
  {
    path: 'forget-password/validate',
    element: lazy(() => import('./pages/forget-password/validateCode/index'))
  }
];
const privateRoutes = [
  {
    path: '/',
    index: true,
    headerPanel: {
      name: 'خانه',
      hide: false
    },
    element: lazy(() => import('./pages/home'))
  },
  {
    path: '/payment/info/success',
    element: lazy(() => import('./pages/payment/success')),
    settings: {
      hideNav: true
    }
  },
  {
    path: '/payment/info/failed',
    element: lazy(() => import('./pages/payment/failed')),
    settings: {
      hideNav: true
    }
  },
  {
    path: 'store',
    element: lazy(() => import('./pages/store')),
    innerRoutes: [
      {
        index: true,
        element: lazy(() => import('./pages/store/index/index'))
      },
      {
        path: 'shippings',
        element: lazy(() => import('./pages/store/shippings/index'))
      },
      {
        path: 'payment',
        element: lazy(() => import('./pages/store/payments/list'))
      },
      {
        path: 'payment/edit/:id',
        element: lazy(() => import('./pages/store/payments/edit/index')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/detail/:id',
        element: lazy(() => import('./pages/store/payments/detail')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create/zarrinpal',
        element: lazy(() =>
          import(
            './pages/store/payments/create/payment-type/zarrinpal/personalInfo'
          )
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create/zarrinpal/otp',
        element: lazy(() =>
          import('./pages/store/payments/create/payment-type/zarrinpal/otp')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create/zarrinpal/gateway',
        element: lazy(() =>
          import('./pages/store/payments/create/payment-type/zarrinpal/gateway')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create/zarrinpal/upload/:id',
        element: lazy(() =>
          import('./pages/store/payments/create/payment-type/zarrinpal/upload')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'shippings/create',
        element: lazy(() => import('./pages/store/shippings/create/index'))
      },
      {
        path: 'shippings/create/:shippingID',
        element: lazy(() =>
          import('./pages/store/shippings/create/shipping-type/index')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'shippings/edit/:id',
        element: lazy(() => import('./pages/store/shippings/edit/index')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'shippings/detail/:id',
        element: lazy(() => import('./pages/store/shippings/detail/index')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create',
        element: lazy(() => import('./pages/store/payments/create/index'))
      },
      {
        path: 'payment/create/behpardakht',
        element: lazy(() =>
          import('./pages/store/payments/create/payment-type/behpardakht')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/create/cardtocard',
        element: lazy(() =>
          import('./pages/store/payments/create/payment-type/cardToCard')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'payment/detail/:id',
        element: lazy(() => import('./pages/store/payments/detail')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings',
        element: lazy(() => import('./pages/store/settings/index'))
      },
      {
        path: 'settings/info',
        element: lazy(() => import('./pages/store/settings/store_info')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/user_info',
        element: lazy(() => import('./pages/store/settings/user_info')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/package',
        element: lazy(() => import('./pages/store/settings/packages')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/package/renew',
        element: lazy(() => import('./pages/store/settings/packages/renew')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/payment/success',
        element: lazy(() =>
          import('./pages/store/settings/packages/renew/success-payment')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/payment/failed',
        element: lazy(() =>
          import('./pages/store/settings/packages/renew/failed-payment')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/sms',
        element: lazy(() => import('./pages/store/settings/sms')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/sms/charge',
        element: lazy(() => import('./pages/store/settings/sms/charge')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/finance',
        element: lazy(() => import('./pages/store/settings/finance')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/wallet',
        element: lazy(() => import('./pages/store/settings/wallet')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'settings/wallet/logs',
        element: lazy(() => import('./pages/store/settings/wallet/logs')),
        settings: {
          hideNav: true
        }
      }
    ]
  },
  {
    path: 'orders',
    element: lazy(() => import('./pages/orders')),
    innerRoutes: [
      {
        index: true,
        element: lazy(() => import('./pages/orders/Overview'))
      },
      {
        path: 'detail/:orderId',
        element: lazy(() => import('./pages/orders/Details')),
        settings: {
          hideNav: true
        }
      },
      {
        path: ':status',
        element: lazy(() => import('./pages/orders/all'))
      }
    ]
  },
  {
    path: 'products',
    element: lazy(() => import('./pages/products')),
    innerRoutes: [
      {
        index: true,
        element: lazy(() => import('./pages/products/Overview'))
      },
      {
        path: 'create_product',
        element: lazy(() => import('./pages/products/create-product')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'list',
        element: lazy(() => import('./pages/products/list'))
      },
      {
        path: 'details/:productId',
        element: lazy(() => import('./pages/products/details')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'details/:productId/edit',
        element: lazy(() =>
          import('./pages/products/details/edit/withoutVariant')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'details/withVariant/:productId/edit',
        element: lazy(() =>
          import('./pages/products/details/edit/withVariant')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'detail/variant/:variantId',
        element: lazy(() => import('./pages/products/details/variant-detail')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'detail/variant/:variantId/edit',
        element: lazy(() =>
          import('./pages/products/details/variant-detail/edit')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories',
        element: lazy(() => import('./pages/products/categories')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories/create_category',
        element: lazy(() =>
          import('./pages/products/categories/create-category')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories/edit_category/:categoryId',
        element: lazy(() =>
          import('./pages/products/categories/edit_category')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories/edit_category/:parentId/:categoryId',
        element: lazy(() =>
          import('./pages/products/categories/edit_category')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories/create_sub_category/:parentId',
        element: lazy(() =>
          import('./pages/products/categories/create-category')
        ),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'categories/add_product/:categoryId',
        element: lazy(() => import('./pages/products/categories/add_product')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'discounts',
        element: lazy(() => import('./pages/products/discounts/list')),
        settings: {
          hideNav: true
        }
      },
      {
        path: 'discounts/create',
        element: lazy(() => import('./pages/products/discounts/create')),
        settings: {
          hideNav: true
        }
      }
    ]
  }
];

const modalRoutes = [
  {
    path: 'big-picture',
    element: BigPictureModal
  }
];

export const getPrivateRoutes = () => privateRoutes;
export const getPublicRoutes = () => publicRoutes;
export const getModalRoutes = () => modalRoutes;
