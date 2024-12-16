/// <reference types="cypress" />

import {
  categoriesData,
  editProductData,
  productsList,
  resultAfterEditProduct,
  updateProductResult
} from '../../fixtures/create_product';
import { login } from '../../utils/login';
import { mockData } from '../../utils/mockData';

const inputByName = name => cy.get(`input[name=${name}]`);
const submitBtn = () => cy.get('[data-cy=create_submit_btn]');

describe('test create product page', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=products').click();
    mockData('GetCategories', 'gqlGetCategoriesQuery', categoriesData);
  });

  // it('check UI and Create simple product', () => {
  //   cy.get('[data-cy=definition]').click();
  //   cy.get('[data-cy=definition_btn]').eq(0).click();
  //   cy.wait('@gqlGetCategoriesQuery');
  //   //check errors
  //   submitBtn().click();
  //   cy.contains('نام ، اطلاعات مورد نیاز برای نمایش محصول می باشد').should(
  //     'be.visible'
  //   );
  //   cy.contains('قیمت ، باید بیشتر از صفر باشد.').should('be.visible');
  //   inputByName('name').type('testtesttesttesttesttesttesttesttest');
  //   cy.contains('نام ، باید حداکثر دارای 32 کاراکتر باشد.');

  //   inputByName('name').clear().type('test');
  //   inputByName('name').should('have.value', 'test');
  //   inputByName('cost').type('10000');
  //   inputByName('cost').should('have.value', '10000');

  //   //click add button 3 times and stock should be 3
  //   cy.get('.minus').click();
  //   cy.get('.minus').click();
  //   cy.get('.minus').click();
  //   inputByName('stock').should('have.value', '3');

  //   //check unlimited and input should not visible
  //   cy.get('[data-cy=unlimited_stock]').click();
  //   inputByName('stock').should('not.exist');

  //   //uncheck unlimited and input should be visible with previous value
  //   cy.get('[data-cy=unlimited_stock]').click();
  //   inputByName('stock').should('exist');
  //   inputByName('stock').should('have.value', '3');

  //   //click minus button 4 times and stock should be 0
  //   cy.get('.plus').click();
  //   cy.get('.plus').click();
  //   cy.get('.plus').click();
  //   cy.get('.plus').click();

  //   mockData(
  //     'CreateProduct',
  //     'gqlCreateProductMutation',
  //     createProductDuplicateNameResult,
  //     false
  //   );

  //   //create with duplicate name
  //   submitBtn().click();
  //   cy.get('[data-cy=zero_stock_btn]').click();
  //   cy.wait('@gqlCreateProductMutation');
  //   cy.contains('نام محصول، تکراری است').should('be.visible');

  //   mockData(
  //     'CreateProduct',
  //     'gqlCreateProductMutation',
  //     createProductSuccessResult
  //   );
  //   //create with only primary fields(name,cost,preparing_days,stock)
  //   inputByName('name').type('234test');
  //   submitBtn().click();
  //   cy.get('[data-cy=zero_stock_btn]').click();
  //   cy.wait('@gqlCreateProductMutation');
  // });

  // it('create product with moreInfo data', () => {
  //   cy.get('[data-cy=definition]').click();
  //   cy.get('[data-cy=definition_btn]').eq(0).click();
  //   cy.wait('@gqlGetCategoriesQuery');
  //   inputByName('name').type('test_product_12');
  //   inputByName('cost').type('25000');
  //   inputByName('time_delay').type('3');
  //   cy.get('.minus').click();
  //   cy.get('.minus').click();
  //   cy.get('[data-cy=more_data_btn]').click();

  //   //select category
  //   cy.get('[data-cy=category_select]').click();
  //   cy.get('[data-cy=select_category_option_2]').click();
  //   cy.get('.MuiModal-root').eq(1).click('topLeft');
  //   cy.get('[data-cy=category_select]').should('contain', 'کیمیا ۲');

  //   //select is_active status
  //   cy.get('[data-cy=isActive_select]').click();
  //   cy.get('[data-cy=deactive_option]').click();
  //   cy.get('[data-cy=isActive_select]').should('contain', 'غیر فعال');

  //   //set discount
  //   inputByName('voucher_cash').type(5000);
  //   inputByName('voucher_percent').should('have.value', 20);
  //   cy.contains('مبلغ با تخفیف: 20,000 تومان').should('be.visible');

  //   //change discount percent
  //   inputByName('voucher_percent').clear().type(25);
  //   inputByName('voucher_cash').should('have.value', 6250);
  //   cy.contains('مبلغ با تخفیف: 18,750 تومان').should('be.visible');

  //   //set weight
  //   inputByName('weight').type(500);
  //   inputByName('weight').should('have.value', 500);

  //   //set feauters
  //   cy.get('[data-cy=add_features_btn]').click();
  //   inputByName('title').eq(0).type('رنگ');
  //   inputByName('features-description').eq(0).type('زرد');
  //   inputByName('title').eq(0).should('have.value', 'رنگ');
  //   inputByName('features-description').eq(0).should('have.value', 'زرد');
  //   inputByName('title').eq(1).type('جنس');
  //   inputByName('title').eq(1).should('have.value', 'جنس');
  //   inputByName('features-description').eq(1).type('کاغذ');
  //   inputByName('features-description').eq(1).should('have.value', 'کاغذ');

  //   //type description
  //   cy.get('textarea[name=description]').type('محصولی ساده');
  //   cy.get('textarea[name=description]').should('have.value', 'محصولی ساده');
  //   mockData(
  //     'CreateProduct',
  //     'gqlCreateProductMutation',
  //     createProductDuplicateNameResult
  //   );
  //   mockData('GetProducts', 'gqlGetProductsQuery', productsDataAfterCreation);

  //   cy.get('[data-cy=submit_more_data]').click();
  //   submitBtn().click();

  //   cy.wait('@gqlCreateProductMutation');
  //   cy.wait('@gqlGetProductsQuery');
  //   cy.contains('test_product_12');
  // });

  it('edit product', () => {
    mockData('GetProducts', 'gqlGetProductsQuery', productsList);
    cy.get('[data-cy=order_card]').eq(0).click();
    cy.wait('@gqlGetProductsQuery');
    cy.get('[data-cy=showMoreClick]').eq(0).click();

    mockData('GetCategories', 'gqlGetCategoriesQuery', editProductData);
    cy.get('[data-cy=edit_product]').click();
    cy.wait('@gqlGetCategoriesQuery');
    cy.get('[data-cy=more_data_btn]').click();

    //change category
    cy.get('[data-cy=category_select]').should('contain', 'محصولات');

    cy.get('[data-cy=category_select]').click();
    cy.get('[data-cy=select_category_option_2]').click();
    cy.get('.MuiModal-root').eq(1).click('topLeft');
    cy.get('[data-cy=category_select]').should('contain', 'کیمیا ۲');

    //select is_active status
    cy.get('[data-cy=isActive_select]').click();
    cy.get('[data-cy=deactive_option]').click();
    cy.get('[data-cy=isActive_select]').should('contain', 'غیر فعال');

    //   //select is_active status
    cy.get('[data-cy=isActive_select]').click();
    cy.get('[data-cy=deactive_option]').click();
    cy.get('[data-cy=isActive_select]').should('contain', 'غیر فعال');

    //set discount
    inputByName('voucher_cash').type(5000);
    inputByName('voucher_percent').should('have.value', 50);
    cy.contains('مبلغ با تخفیف: 5,000 تومان').should('be.visible');

    //change discount percent
    inputByName('voucher_percent').clear().type(25);
    inputByName('voucher_cash').should('have.value', 2500);
    cy.contains('مبلغ با تخفیف: 7,500 تومان').should('be.visible');

    //set feauters
    cy.get('[data-cy=add_features_btn]').click();
    inputByName('title').eq(0).type('رنگ');
    inputByName('features-description').eq(0).type('زرد');
    inputByName('title').eq(0).should('have.value', 'رنگ');
    inputByName('features-description').eq(0).should('have.value', 'زرد');
    inputByName('title').eq(1).type('جنس');
    inputByName('title').eq(1).should('have.value', 'جنس');
    inputByName('features-description').eq(1).type('کاغذ');
    inputByName('features-description').eq(1).should('have.value', 'کاغذ');

    //type description
    cy.get('textarea[name=description]').type('محصولی ساده');
    cy.get('textarea[name=description]').should('have.value', 'محصولی ساده');
    mockData('UpdateProduct', 'gqlCreateProductMutation', updateProductResult);
    mockData('GetCategories', 'gqlGetCategoriesQuery', resultAfterEditProduct);

    cy.get('[data-cy=submit_more_data]').click();

    //   //click add button 3 times and stock should be 3
    cy.get('.minus').click();
    cy.get('.minus').click();
    cy.get('.minus').click();
    inputByName('stock').should('have.value', '3');

    submitBtn().click();

    cy.wait('@gqlCreateProductMutation');
    cy.wait('@gqlGetCategoriesQuery');
    cy.contains('test234test');
  });
});
