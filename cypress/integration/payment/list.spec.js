import { login } from '../../utils/login';
import { mockData } from '../../utils/mockData';
import { paymentList } from '../../fixtures/payment/list';

describe('renders list of payment', () => {
  beforeEach(() => {
    login();
  });
  it('should display list of payment methods', () => {
    cy.visit('/store/payment');
    mockData('GetPayments', 'gqlGetPaymentsQuery', paymentList);
    cy.get('[id="root"]').should('contain', 'آی دی پی');
  });
});
