import { mockData } from '../../utils/mockData';
import {
  getCoockieResponse,
  getHomeDataResponse,
  getUserReadResponse,
  getUserReadResponseTrial
} from '../../fixtures/user';

describe('packages', () => {
  beforeEach(() => {
    cy.visit('/login');
    mockData('getCookie', 'gqlGetCookieQuery', getCoockieResponse, false);
    mockData(
      'GetUserRead',
      'gqlGetUserReadQuery',
      getUserReadResponseTrial,
      false
    );
    cy.get('#username').type('09120441859');
    cy.get('#password').type('nedaneda1 {enter}');
    cy.wait('@gqlGetCookieQuery');
    cy.wait('@gqlGetUserReadQuery');
  });

  it('trial account package suggestion', function () {
    cy.get('[data-cy="newPackage-modal"]').should('be.visible');
  });
});
