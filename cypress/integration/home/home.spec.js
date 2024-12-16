import { login } from '../../utils/login';

describe('home page test', () => {
  beforeEach(() => {
    login();
  });
  it('check UI', () => {
    //home page UI
    cy.get('h1').should('contain', 'خانه');
    cy.get('.order_card', { timeOut: 4000 }).should('have.length', 20);
    cy.get('h2').should('contain', 'خوش امدی');
    cy.get('h3').should('contain', 'ندالینا');
    cy.get('h3').should('contain', 'جدیدترین محصول ها');
    cy.get('h3').should('contain', 'جدیدترین سفارش ها');
    cy.get('button').should('have.length', 2);
    cy.contains('فروشگاه ندالینا');
    cy.contains('414');
    cy.contains('48');
    cy.contains('ندا حجت پناه');
    cy.contains('کیمیا فدایی 3');
    //navigation buttons
    cy.get('li').should('have.length', 4);
  });

  it('check links', () => {
    cy.get('.df-orders').first().click();
    cy.url().should('include', 'orders/detail');
    cy.get('.back--button').click();
    //check packages
    cy.get('[data-cy=package]').click();
    cy.url().should('include', 'settings/package');
    cy.get('.header').click();
    cy.get('[data-cy=home_nav_btn]').click();

    //check sms
    cy.get('[data-cy=sms]').click();
    cy.url().should('include', 'settings/sms');
    cy.get('.header').click();
    cy.get('[data-cy=home_nav_btn]').click();
  });
});
