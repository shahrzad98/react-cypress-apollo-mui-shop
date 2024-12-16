import { login } from '../../utils/login';

const equalUrl = path => {
  cy.url().should('eq', path);
};
describe('test all general and bottom navigation', () => {
  beforeEach(() => {
    login();
  });
  it('change route after login to home', () => {
    equalUrl('http://localhost:3000/');
  });
  it('change route from home to all orders', () => {
    cy.get('[data-cy="allOrdersBtn"]').click();
    equalUrl('http://localhost:3000/orders/all');
  });
  it('change route from all orders to orders filter', () => {
    cy.get('[data-cy="allOrdersBtn"]').click();
    cy.wait(5000);
    cy.get('[data-cy="filter"]').click();
    equalUrl('http://localhost:3000/orders/all?modal=filter');
  });
  it('change route from all orders to orders page', () => {
    cy.get('[data-cy="allOrdersBtn"]').click();
    cy.wait(5000);
    cy.get('[data-cy="order_header"]>h1').click();
    equalUrl('http://localhost:3000/orders');
  });
  it('change route from home to products with home button link', () => {
    cy.get('[data-cy="allProductsBtn"]').click();
    equalUrl('http://localhost:3000/products/list');
  });
  it('change route from home to products page with bottom navigation', () => {
    cy.get('[data-cy="products"]').click();
    equalUrl('http://localhost:3000/products');
  });
  it('change route from home to setting page with bottom navigation', () => {
    cy.get('[data-cy="settings"]').click();
    equalUrl('http://localhost:3000/store');
  });
  it('change route from home to setting store page with button link', () => {
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="settingStore"]').click();
    equalUrl('http://localhost:3000/store/settings');
  });
  it('change route from home to setting store page with button link in home header', () => {
    cy.get('[data-cy="settingStoreDrawer"]').click();
    cy.get('[data-cy="settingStoreBtn"]').click();
    equalUrl('http://localhost:3000/store/settings');
  });
});
