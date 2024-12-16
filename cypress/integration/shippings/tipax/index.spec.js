const { login } = require('../../../utils/login');
import {
  brandInfo,
  createTipax_v1,
  getShiping_v1,
  getShiping_v2,
  getShiping_v3
} from '../../../fixtures/shiping/tipax';
import { mockData } from '../../../utils/mockData';
const brandInfoData = brandInfo.data.user.getUserRead.my_store?.[0];
describe('test create tipax', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy="settings"]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v1);
    cy.get('[data-cy="shippingSetting"]').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('.create-shipping').click();
    mockData('My_brand', 'gqlMy_brand', brandInfo);
    cy.get('[data-cy="tipaxCy"]').click();
    cy.wait('@gqlMy_brand');
  });
  Cypress.on('uncaught:exception', () => {
    return false;
  });

  it("show userinfo at step1 's form ", () => {
    cy.get('[data-cy=first_name] input ').should(
      'have.value',
      brandInfoData.first_name
    );
    cy.get('[data-cy=last_name] input ').should(
      'have.value',
      brandInfoData.last_name
    );
    cy.get('[data-cy=phone_number] input ').should(
      'have.value',
      brandInfoData.phone_number?.replace('+98', '0')
    );
    cy.get('[data-cy=citiesStoreSelected] input ').should(
      'have.value',
      brandInfoData.store_address.city
    );
    cy.get('[data-cy=cityStoreSelected] input ').should(
      'have.value',
      brandInfoData.store_address.province
    );
  });
  it("show userinfo at step1 's form validations ", () => {
    cy.get('[data-cy=first_name] input ').clear();
    cy.get('[data-cy=last_name] input ').clear();
    cy.get('[data-cy=phone_number] input ').clear();
    cy.get('[data-cy=address]').clear();
    cy.get('[data-cy=btn]').click();
    cy.get('[data-cy=form]')
      .should('contain', 'نام خود را وارد کنید.')
      .should('contain', 'نام خانوادگی خود را وارد کنید')
      .should('contain', 'شماره تلفن خود را وارد کنید.')
      .should('contain', 'آدرس خود را وارد کنید.');
  });

  it('create tipax that inner and out province is false', () => {
    cy.get('[data-cy=btn]').click();
    mockData('CreateNewShipping', 'gqlCreateNewShipping', createTipax_v1);
    cy.get('[data-cy=btn]').click();
    cy.wait('@gqlCreateNewShipping');
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v1);
    cy.get('[data-cy=understand‌Btn]').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('[data-cy=step2]').click();
    cy.get('[data-cy=step1]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v1);
    cy.get('.back-link').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('[data-cy=shippings]')
      .eq(2)
      .should('not.contain', 'درون استانی')
      .should('not.contain', 'برون استانی');
  });

  it('create tipax that inner and out province is true', () => {
    cy.get('[data-cy=btn]').click();
    mockData('CreateNewShipping', 'gqlCreateNewShipping', createTipax_v1);
    cy.get('[data-cy=inner_switch]').click();
    cy.get('[data-cy=out_switch]').click();
    cy.get('[data-cy=btn]').click();
    cy.wait('@gqlCreateNewShipping');
    cy.get('[data-cy=understand‌Btn]').click();
    cy.get('[data-cy=step2]').click();
    cy.get('[data-cy=step1]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v2);
    cy.get('.back-link').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('[data-cy=shippings]')
      .eq(2)
      .should('contain', 'درون استانی')
      .should('contain', 'برون استانی');
  });
  it('create tipax that inner province is false and out  is true', () => {
    cy.get('[data-cy=btn]').click();
    mockData('CreateNewShipping', 'gqlCreateNewShipping', createTipax_v1);
    cy.get('[data-cy=out_switch]').click();
    cy.get('[data-cy=btn]').click();
    cy.wait('@gqlCreateNewShipping');
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v3);
    cy.get('[data-cy=understand‌Btn]').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('[data-cy=step2]').click();
    cy.get('[data-cy=step1]').click();
    mockData('GetShippingMethods', 'gqlGetShippingMethods', getShiping_v3);
    cy.get('.back-link').click();
    cy.wait('@gqlGetShippingMethods');
    cy.get('[data-cy=shippings]')
      .eq(2)
      .should('not.contain', 'درون استانی')
      .should('contain', 'برون استانی');
  });
});
