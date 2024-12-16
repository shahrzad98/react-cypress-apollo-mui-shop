/// <reference types="cypress" />
import { emptyOrders, orderSearchResult } from '../../../fixtures/orders';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';

describe('check overview page', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=orders]').click();
  });
  it('check UI', () => {
    //check UI
    cy.get('h1').first().should('contain', 'سفارش ها');

    //cards shoudl be visible
    cy.get('[data-cy=order_card]').should('have.length', 4);

    //click on search input so cards should not be visible
    cy.get('[data-cy=search_input]').focus();
    cy.get('[data-cy=order_card]').should('have.length', 0);
  });

  it('search for something', () => {
    //search with for '1' and orders should be visible
    mockData('GetManagers', 'gqlGetLaunchListQuery', orderSearchResult);

    cy.get('[data-cy=search_input]').type('1');
    cy.wait('@gqlGetLaunchListQuery');
    cy.get('[data-cy=order_detail_card]').should('be.visible');

    //search for wrong value and empty search icon should be visible
    mockData('GetManagers', 'gqlGetLaunchListQuery', emptyOrders);
    cy.get('[data-cy=search_input]').type('sadjsiaojhasu');
    cy.wait('@gqlGetLaunchListQuery');
    cy.get('[data-cy=order_detail_card]').should('have.length', 0);
    cy.get('p').should('contain', 'سفارشی پیدا نشد');

    //clear input so search results should be disappear and cards should not be visible
    cy.get('[data-cy=search_input]').clear();
    cy.get('[data-cy=order_search_icon]').should('be.visible');

    //click on clear search so cards should be visible and search resluts disappear
    cy.get('.df-close').click();
    cy.get('[data-cy=order_card]').should('have.length', 4);
  });
});
