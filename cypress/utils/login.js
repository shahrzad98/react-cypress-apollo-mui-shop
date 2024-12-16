import {
  getCoockieResponse,
  getHomeDataResponse,
  getUserReadResponse
} from '../fixtures/user';
import { mockData } from './mockData';

export const login = () => {
  cy.visit('/login');
  mockData('getCookie', 'gqlgetCookieQuery', getCoockieResponse, false);
  mockData('GetUserRead', 'gqlgetUserReadQuery', getUserReadResponse, false);
  mockData('getHomeData', 'gqlgetHomeDataQuery', getHomeDataResponse, false);
  cy.get('#username').type('09120441859');
  cy.get('#password').type('nedaneda1 {enter}');
  cy.wait('@gqlgetCookieQuery');
  cy.wait('@gqlgetUserReadQuery');
  cy.wait('@gqlgetHomeDataQuery');
  cy.wait('@gqlgetUserReadQuery');
};
