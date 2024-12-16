import {
  productList,
  productListFillter_1,
  productListFillter_2,
  productListSearch,
  productList_scroll_one
} from '../../fixtures/product';
import { login } from '../../utils/login';
import { mockData } from './../../utils/mockData';
describe('Test product/list ', () => {
  beforeEach(() => {
    login();
  });
  //global method
  const goToProductAll = product_all => {
    mockData('GetProducts', 'gqlGetProductsQuery', product_all);
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(0).click();
    cy.wait('@gqlGetProductsQuery');
  };

  const checkProductList = product_detail_card => {
    product_detail_card
      .should('contain', 'دسته بندی')
      .should('contain', 'وضعیت')
      .should('contain', 'موجودی');
  };
  //test case
  const testUi = () => {
    mockData('GetProducts', 'gqlGetProductsQuery', productList);
    cy.get('[data-cy="products"]').click();
    cy.get('[data-cy=order_card]').eq(0).click();

    cy.wait('@gqlGetProductsQuery');
    cy.get('.header_count').should(
      'contain',
      productList.data.item.getProducts.count
    );

    const PAGE_SIZE = 10;
    const list = productList?.item?.getProducts?.results || [];
    const product_detail_card = cy.get('[data-cy=product-card]');
    product_detail_card.should('be.visible').should('be.length', PAGE_SIZE);
    checkProductList(product_detail_card);
    for (let i in list) {
      const item = list[i];
      const product_detail_card_loop = cy.get('[data-cy=product-card]');
      const item_detail_card = product_detail_card_loop.eq(i);
      if (item.variants.length > 1) {
        item_detail_card.get('[data-cy=svgVariant]').should('be.visible');
        item_detail_card.get('[data-cy=showMoreClick]').eq(i).click();
        cy.get('[data-cy=productModal]')
          .should('contain', 'حذف')
          .should('contain', 'نمایش در فروشگاه')
          .should('contain', 'وضعیت');
        cy.get('body').click();
      } else if (item.variants.length === 1) {
        item_detail_card.get('[data-cy=showMoreClick]').eq(i).click();
        cy.get('[data-cy=productModal]')
          .should('contain', 'حذف')
          .should('contain', 'نمایش در فروشگاه')
          .should('contain', 'وضعیت')
          .should('contain', 'ویرایش')
          .should('contain', 'ساخت کپی ');
        cy.get('body').click();
      }
    }
  };

  const testSearch = () => {
    mockData('GetProducts', 'gqlGetProductsQuery', productList);
    cy.get('[data-cy="products"]').click();
    cy.get('[data-cy=order_card]').eq(0).click();
    cy.wait('@gqlGetProductsQuery');
    const PAGE_SIZE = 10;
    const product_detail_card = cy.get('[data-cy=product-card]');
    product_detail_card.should('be.visible').should('be.length', PAGE_SIZE);
    mockData('GetProducts', 'gqlGetProductsQuery', productListSearch);
    cy.get('[data-cy=search_input]').type('ساعت');
    cy.wait('@gqlGetProductsQuery');
    const list = productListSearch.data.item.getProducts.results;
    for (let i in list) {
      cy.get(
        ` .infinite-scroll-component > :nth-child(${parseInt(i) + 1})`
      ).should('contain', list[i].name);
    }
    mockData('GetProducts', 'gqlGetProductsQuery', productList);
    cy.get('[data-cy=search_input]').clear();
    cy.wait('@gqlGetProductsQuery');
    const productList_local = productList.data.item.getProducts.results;
    for (let i in productList_local) {
      cy.get(
        ` .infinite-scroll-component > :nth-child(${parseInt(i) + 1})`
      ).should('contain', productList_local[i].name);
    }
  };
  const testFillter = () => {
    goToProductAll(productList);
    cy.get('.df-filter').click();
    cy.get('[data-cy=productList-filters-name]').type('ساعت');
    cy.get('[data-cy=select-category').click();
    cy.get(':nth-child(13) > .MuiMenuItem-root').click().type('{esc}');
    mockData('GetProducts', 'gqlGetProductsQuery', productListFillter_1);
    cy.get('.MuiButton-contained').click();
    cy.wait('@gqlGetProductsQuery');
    cy.get('[data-cy="product-card"]')
      .should('have.length', 1)
      .get('[data-cy=svgVariant]')
      .should('be.visible')
      .get('[data-cy=showMoreClick]')
      .eq(0)
      .click();
    cy.get('[data-cy=productModal]')
      .should('contain', 'حذف')
      .should('contain', 'نمایش در فروشگاه')
      .should('contain', 'وضعیت');
    cy.get('body').click();
    cy.get('.df-filter').click();
    mockData('GetProducts', 'gqlGetProductsQuery', productListFillter_2);
    cy.get('[data-cy=productList-filters-name]').clear().type('فروشگاه دنیلی');
    cy.get('[data-cy=select-category').click();
    cy.get(':nth-child(8) > .MuiMenuItem-root').click().type('{esc}');
    cy.get('[data-cy="productList-DiscountedPrice-to"]')
      .clear()
      .type('1000000');
    cy.get('[data-cy="productList-price-to"]').clear().type('1000000');
    cy.get('.MuiButton-contained').click();
    cy.wait('@gqlGetProductsQuery');
    cy.get('[data-cy="product-card"]').should('have.length', 2);
  };
  const testScroll = () => {
    goToProductAll(productList);
    mockData('GetProducts', 'gqlGetProductsQuery', productList_scroll_one);
    cy.get('#scrollableDiv').scrollTo('bottom');
    cy.wait('@gqlGetProductsQuery');
    cy.get('[data-cy=product-card]')
      .should('be.visible')
      .should('be.length', 20);
  };

  it('UI', testUi);
  it('Search', testSearch);
  it('Fillter', testFillter);
  it('scroll', testScroll);
});
