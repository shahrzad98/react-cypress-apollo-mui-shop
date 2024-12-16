import { walletData } from '../../fixtures/wallet';
import { login } from '../../utils/login';
import { mockData, mockSpy } from '../../utils/mockData';

describe('Increase credit and show wallet info', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="settingStore"]').click();
    mockData('GetWalletData', 'gqlGetWalletData', walletData);
    cy.get('.wallet-card').click();
  });

  it('show wallet page details', () => {
    cy.contains('کیف پول');
    cy.contains('افزایش اعتبار');
  });

  it('show wallet info', () => {
    cy.contains(
      Number(walletData.data.store.getWalletData.amount).toLocaleString() +
        ' تومان'
    );
  });

  it('show wallet increase buttons', () => {
    cy.contains('20,000 تومان');
    cy.contains('50,000 تومان');
    cy.contains('100,000 تومان');
  });

  it('show wallet increase input with zero value', () => {
    cy.get('.input_box input').should('have.value', 0);
  });

  it('wallet increase input actions works', () => {
    cy.get('.input_box .add_btn').click();
    cy.get('.input_box input').should('have.value', '10,000');
    cy.get('.input_box .add_btn').click();
    cy.get('.input_box .add_btn').click();
    cy.get('.input_box input').should('have.value', '30,000');
  });

  it('wallet decrease input actions works', () => {
    for (let index = 0; index < 3; index++) {
      cy.get('.input_box .add_btn').click();
    }
    cy.get('.input_box .Remove_btn').click();
    cy.get('.input_box input').should('have.value', '20,000');
    cy.get('.input_box .Remove_btn').click();
    cy.get('.input_box input').should('have.value', '10,000');
  });

  it('ready increase button changes input value', () => {
    cy.get('div:contains("20,000 تومان")').last().click();
    cy.get('.input_box input').should('have.value', '20,000');
    cy.get('div:contains("50,000 تومان")').last().click();
    cy.get('.input_box input').should('have.value', '50,000');
    cy.get('div:contains("100,000 تومان")').last().click();
    cy.get('.input_box input').should('have.value', '100,000');
  });

  it('ready increase button click, set active button', () => {
    cy.get('div:contains("20,000 تومان")').last().click();
    cy.get('div:contains("20,000 تومان")').should('have.class', 'active');
    cy.get('div:contains("50,000 تومان")').last().click();
    cy.get('div:contains("50,000 تومان")').should('have.class', 'active');
    cy.get('div:contains("100,000 تومان")').last().click();
    cy.get('div:contains("100,000 تومان")').should('have.class', 'active');
  });

  it('input change can change factor value', () => {
    cy.get('.input_box input').clear().type(40000);
    cy.get('.content_factor').should('contain', '40,000');
    cy.get('.input_box input').clear().type(70000);
    cy.get('.content_factor').should('contain', '70,000');
  });

  it('if input value be zero, factor section should not be exist in page', () => {
    cy.get('.input_box input').clear().type(40000);
    cy.get('.content_factor').should('contain', '40,000');
    cy.get('.input_box input').clear();
    cy.get('.content_factor').should('not.exist');
  });

  it('increase the wallet submit', () => {
    cy.get('.input_box input').clear().type(40000);
    mockSpy('ChargeWallet', 'mutateChargeWallet');

    cy.get('.footer button').click();

    cy.wait('@mutateChargeWallet')
      .its('request.body.variables.content.amount')
      .should('eq', 40000);
  });
});
