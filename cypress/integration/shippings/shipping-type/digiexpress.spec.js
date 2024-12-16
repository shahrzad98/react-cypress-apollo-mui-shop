import {
  createShippingError,
  createShippingSuccess,
  digiExpressActiveCities,
  myBrand,
  shippingMethods
} from '../../../fixtures/shippings';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';

const store = myBrand.data.user.getUserRead.my_store[0];
describe('create digiexpress shipping method', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=settings]').click();
    cy.get('[data-cy="shippingSetting"]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', shippingMethods);
    cy.get('.create-shipping').click();
    mockData('My_brand', 'gqlMy_brand', myBrand);
    cy.get('[data-cy="digiexpress"]').click();
    mockData(
      'GetDigiExpressActiveCities',
      'gqlGetDigiExpressActiveCities',
      digiExpressActiveCities
    );

    Cypress.on('uncaught:exception', () => {
      return false;
    });
  });

  it('step 1 should be render', () => {
    cy.get('.header').should('contain', 'ساخت حساب کاربری دیجی اکسپرس');
  });

  it('step 1 rendres correct values', () => {
    cy.wait('@gqlMy_brand');
    cy.get('[name="first_name"]').should('have.value', store.first_name);
    cy.get('[name="last_name"]').should('have.value', store.last_name);
    cy.get('[name="phone_number"]').should(
      'have.value',
      String(store.phone_number).replace(/\+98/, '0')
    );
    cy.get('[name="address"]').should(
      'have.value',
      store.store_address.address
    );
  });

  it('step 1 validation', () => {
    cy.get('[name="first_name"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('form').should('contain', 'نام خود را وارد کنید.');
    cy.get('[name="phone_number"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('form').should('contain', 'شماره تلفن خود را وارد کنید.');
  });

  it('submit step 1', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.header').should('contain', 'تعیین نوع پرداخت');
  });

  it('step 2 values', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[name="cost"]').should('have.value', '');
    cy.get('[name="cost"]').should('be.disabled');
  });

  it('step 2 my province validations and activity', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.shippingCost').click();
    cy.get('[data-value="1"]').click();
    cy.get('[name="cost"]').should('not.be.disabled');
    cy.get('[name="cost"]').type('100000');
    cy.get('.shippingCost').click();
    cy.get('[data-value="0"]').click();
    cy.get('[name="cost"]').should('have.value', '').should('be.disabled');
  });

  const submitStepTwo = () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.shippingCost').click();
    cy.get('[data-value="1"]').click();
    cy.get('[name="cost"]').type('50000');
    cy.get('[data-cy="submit-button"]').click();
  };

  it('submit step 2 failure', () => {
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

  it('submit step 2 success', () => {
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
});
