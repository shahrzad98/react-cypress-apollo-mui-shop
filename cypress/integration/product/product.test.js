import { login } from '../../utils/login';

describe('check overview page', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=products]').click();
  });

  it('check UI', () => {
    const list_order_card = ['list', 'categories', 'discounts'];
    const list_definition = [
      'products/create_product',
      'products/categories/create_category',
      'products/discounts/create'
    ];
    for (let i in list_order_card) {
      cy.get('[data-cy=order_card]').eq(i).click();
      cy.url().should('include', `/${list_order_card[i]}`);
      cy.visit('/products');
    }

    for (let i in list_definition) {
      cy.get('[data-cy=definition]').click();
      cy.get('[data-cy=definition_btn]').eq(i).click();
      cy.url().should('include', `/${list_definition[i]}`);
      cy.visit('/products');
    }
  });
});
