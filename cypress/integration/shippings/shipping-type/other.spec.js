import {
  createShippingError,
  createShippingSuccess,
  myBrand,
  shippingMethods
} from '../../../fixtures/shippings';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';

describe('create other shipping method', () => {
  beforeEach(() => {
    login();
  });
  let i = 0;
  it('Create other shipping', () => {
    cy.get('[data-cy=settings]').click();
    cy.get('[data-cy="shippingSetting"]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', shippingMethods);
    cy.get('.create-shipping').click();
    mockData('My_brand', 'gqlMy_brand', myBrand);
    cy.get('[data-cy="other"]').click();

    Cypress.on('uncaught:exception', () => {
      return false;
    });
  });

  it('validation', () => {
    cy.get('.header').should('contain', 'مشخصات روش ارسالی');
    cy.get('[name="name"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('form').should('contain', 'عنوان روش ارسال را وارد کنید');
    cy.get('form').should('contain', 'استان خود را وارد کنید');
  });

  const submitStepTwo = () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[name="name"]').type('test');
    cy.get('[name="province"]').click();
    cy.get('[id="provinceOption"]').contains('تهران').click();
    cy.get('[name="my_province_is_active"]').click();
    cy.get('[name="time_sending"]').type(1);
    cy.get('[id="cost_method"]').click();
    cy.get('[id="cost_method_option"]').contains('قیمت دلخواه').click();
    cy.get('[name="cost"]').type('10000');
    cy.get('[name="other_provinces_is_active"]').click();
    cy.get('[name="other_provinces_time_sending"]').type(1);
    cy.get('[id="other_provinces_cost_method"]').click();
    cy.get('[id="other_provinces_cost_method_option"]')
      .contains('قیمت دلخواه')
      .click();
    cy.get('[name="other_provinces_cost"]').type('10000');
    cy.get('[data-cy="submit-button"]').click();
  };
  it('create success', () => {
    mockData(
      'CreateNewShipping',
      'gqlCreateNewShipping',
      createShippingSuccess
    );
    submitStepTwo();
    cy.wait('@gqlCreateNewShipping');

    cy.get('[data-cy="shipping-modal"]').should(
      'contain',
      'ساخت روش ارسال موفق'
    );
    cy.get('[data-cy="shipping-modal"] button').click();
    cy.get('[data-cy="shipping-modal"]').should('not.exist');
  });

  it('create failure', () => {
    mockData(
      'CreateNewShipping',
      'gqlCreateNewShipping',
      createShippingError,
      false
    );
    submitStepTwo();
    cy.wait('@gqlCreateNewShipping');
    cy.get('[data-cy="shipping-modal"]').should(
      'contain',
      'ساخت حساب کاربری ناموفق'
    );
    cy.get('[data-cy="shipping-modal"] button').click();
    cy.get('[data-cy="shipping-modal"]').should('not.exist');
  });
});
