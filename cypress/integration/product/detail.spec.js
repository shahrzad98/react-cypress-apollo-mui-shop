import {
  productList,
  prodcutListDetails_mock,
  prodcutListDetails_mock_variant,
  getProductVariant
} from '../../fixtures/product';
import { login } from '../../utils/login';
import { mockData } from './../../utils/mockData';
import { formatNumber } from '../../../src/utils/helpers';

describe('Test product/list ', () => {
  beforeEach(() => {
    login();
  });
  //global method`
  const goToProductAll = product_all => {
    mockData('GetProducts', 'gqlGetProductsQuery', product_all);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(0).click();
    cy.wait('@gqlGetProductsQuery');
  };
  //test case
  const testUi = () => {
    goToProductAll(productList);
    mockData('GetCategories', 'gqlGetCategoriesQuery', prodcutListDetails_mock);

    cy.get('[data-cy=product-card]').eq(0).click();
    cy.get('.images_swiper').get('img').should('be.length', 2);
    cy.wait('@gqlGetCategoriesQuery', { timeout: 10000 });
    cy.get('.image_container').should('be.visible');
    cy.get('.data_container').should('be.visible');
    const itemProduct = prodcutListDetails_mock.data.item.getProduct;
    const detailList = [
      'نام',
      'قیمت',
      'موجودی',
      'دسته بندی',
      'تخفیف',
      'قیمت با تخفیف',
      'وضعیت',
      'زمان آماده سازی',
      'وزن'
    ];

    const detailList_left = [
      itemProduct.label,
      formatNumber(itemProduct.variants[0].primary_cost),
      'نامحدود',
      itemProduct.category.title,
      formatNumber(
        Number(itemProduct.variants[0].primary_cost) -
          Number(itemProduct.variants[0].cost)
      ),
      formatNumber(itemProduct.variants[0].cost),
      itemProduct.is_active ? 'فعال' : 'غیرفعال',
      itemProduct.variants[0].time_delay,
      itemProduct.weight
    ];
    let ev = 0;
    let odd = 0;
    for (let i in detailList) {
      let ord = parseInt(i) + 1;
      if (ord % 2 == 0) {
        cy.get('.right-even-row').eq(ev).should('contain', detailList[i]);
        cy.get('.left-even-row').eq(ev).should('contain', detailList_left[i]);
        ev++;
      } else {
        cy.get('.right-odd-row').eq(odd).should('contain', detailList[i]);
        cy.get('.left-odd-row').eq(odd).should('contain', detailList_left[i]);
        odd++;
      }
    }
  };
  const testVariants = () => {
    goToProductAll(productList);
    mockData(
      'GetCategories',
      'gqlGetCategoriesQuery',
      prodcutListDetails_mock_variant
    );
    cy.get('[data-cy=product-card]').eq(1).click();
    cy.wait('@gqlGetCategoriesQuery');
    cy.get('[data-cy=variantCard]').should(
      'be.length',
      prodcutListDetails_mock_variant.data.item.getProduct.variants.length
    );
    cy.get('.data_container')
      .should('contain', 'وزن')
      .should('contain', 'دسته بندی')
      .should('contain', 'وضعیت');
    cy.get('.images_swiper').get('img').should('be.length', 2);
    mockData('GetVariant', 'gqlGetVariantQuery', getProductVariant);
    cy.get('[data-cy=variantCard]').eq(0).get('.df-product').eq(0).click();
    cy.wait('@gqlGetVariantQuery');
  };
  it('UI', testUi);
  it('testVariants', testVariants);
});
