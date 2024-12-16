import {
  createShippingError,
  createShippingSuccess,
  myBrand,
  provincesCities,
  sendPostexSms,
  shippingMethods
} from '../../../fixtures/shippings';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';

const store = myBrand.data.user.getUserRead.my_store[0];
describe('create postex shipping method', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=settings]').click();
    cy.get('[data-cy="shippingSetting"]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', shippingMethods);
    cy.get('.create-shipping').click();
    mockData('My_brand', 'gqlMy_brand', myBrand);
    cy.get('[data-cy="postex"]').click();
    mockData('GetProvincesCities', 'gqlGetProvincesCities', provincesCities);

    Cypress.on('uncaught:exception', () => {
      return false;
    });
  });

  it('step 1 should be render', () => {
    cy.get('.header').should('contain', 'ساخت حساب کاربری پستکس');
  });

  it('step 1 rendres correct values', () => {
    cy.get('[name="phone_number"]').should('have.value', store.phone_number);
    cy.get('[name="national_code"]').should('have.value', store.national_code);
    cy.get('[name="postal_code"]').should(
      'have.value',
      store.store_address.postal_code
    );
    cy.get('[name="address"]').should(
      'have.value',
      store.store_address.address
    );
    cy.get('[name="province"]').should('have.value', '');
    cy.get('[name="city"]').should('have.value', '');
  });

  it('step 1 validation', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('form').should('contain', 'استان خود را وارد کنید.');
    cy.get('form').should('contain', 'شهر یا محله خود را وارد کنید.');
    cy.get('[name="postal_code"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('form').should('contain', 'کد پستی خود را وارد کنید.');
  });

  it('step 1 provinces and cities selection', () => {
    cy.get('#mui-component-select-province').click();
    cy.get('[data-value="تهران"]').click();
    cy.get('#mui-component-select-city').click();
    cy.get('[data-value="شهریار"]').should('exist');
    cy.get('[data-value="دماوند"]').should('exist');
  });

  const submitStepOne = () => {
    cy.get('#mui-component-select-province').click();
    cy.get('[data-value="تهران"]').click();
    cy.get('#mui-component-select-city').click();
    cy.get('[data-value="دماوند"]').click();
    cy.get('[data-cy="submit-button"]').click();
  };
  it('submit step 1', () => {
    submitStepOne();
    cy.get('.header').should('contain', 'مشخصات روش ارسالی');
  });

  it('step 2 values', () => {
    submitStepOne();
    cy.get('[name="my_province_is_active"]').should('be.checked');
    cy.get('[name="other_provinces_is_active"]').should('be.checked');
    cy.get('[name="cost"]').should('have.value', '');
    cy.get('[name="other_provinces_cost"]').should('have.value', '');
    cy.get('[name="cost"]').should('be.disabled');
    cy.get('[name="other_provinces_cost"]').should('be.disabled');
  });

  it('step 2 my province validations and activity', () => {
    submitStepOne();
    cy.get('[name="my_province_is_active"]').click();
    cy.get('[name="my_province_is_active"]').should('not.be.checked');
    cy.get('[name="my_province_is_active"]').click();
    cy.get('[name="my_province_is_active"]').should('be.checked');
    cy.get('.my_province').click();
    cy.get('[data-value="1"]').click();
    cy.get('[name="cost"]').should('not.be.disabled');
    cy.get('[name="cost"]').type('100000');
    cy.get('.my_province').click();
    cy.get('[data-value="0"]').click();
    cy.get('[name="cost"]').should('have.value', '').should('be.disabled');
  });

  it('step 2 other provinces validations and activity', () => {
    submitStepOne();
    cy.get('[name="other_provinces_is_active"]').click();
    cy.get('[name="other_provinces_is_active"]').should('not.be.checked');
    cy.get('[name="other_provinces_is_active"]').click();
    cy.get('[name="other_provinces_is_active"]').should('be.checked');
    cy.get('.other_provinces').click();
    cy.get('[data-value="1"]').click();
    cy.get('[name="other_provinces_cost"]').should('not.be.disabled');
    cy.get('[name="other_provinces_cost"]').type('100000');
    cy.get('.other_provinces').click();
    cy.get('[data-value="0"]').click();
    cy.get('[name="other_provinces_cost"]')
      .should('have.value', '')
      .should('be.disabled');
  });

  const submitStepTwo = () => {
    submitStepOne();
    cy.get('[name="my_province_is_active"]').click();
    cy.get('.my_province').click();
    cy.get('[data-value="0"]').click();
    cy.get('.other_provinces').click();
    cy.get('[data-value="1"]').click();
    cy.get('[name="other_provinces_cost"]').type('50000');
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
    cy.get('.header').should('contain', 'حساب کاربری پستکس');
    cy.get('.info-card').should('contain', store.phone_number);
    cy.get('[data-cy="postex-link"]')
      .should('exist')
      .should('have.attr', 'href', 'https://postex.ir/login');

    mockData('SendPostexSms', 'gqlSendPostexSms', sendPostexSms);

    cy.get('.get-pass').click();

    cy.wait('@gqlSendPostexSms');

    cy.get('body').should('contain', 'رمز عبور به شماره');

    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="shipping-modal"]').should(
      'contain',
      'ساخت روش ارسال موفق'
    );
    cy.get('[data-cy="shipping-modal"] button').click();
    cy.get('[data-cy="shipping-modal"]').should('not.exist');
  });
});
