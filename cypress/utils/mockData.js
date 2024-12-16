import { hasOperationName } from './graphql-test-utils';

export const mockData = (query, alias, data, shouldIgnoreErrors = true) => {
  cy.intercept({ method: 'POST', url: Cypress.env('graphBaseUrl') }, req => {
    const { body } = req;
    if (hasOperationName(req, query)) {
      req.alias = alias;
      req.reply(res => {
        if (shouldIgnoreErrors) {
          res.body.errors = null;
        }
        res.body.data = data.data;
      });
    }
  });
};

export const mockSpy = (query, alias) => {
  cy.intercept({ method: 'POST', url: Cypress.env('graphBaseUrl') }, req => {
    if (hasOperationName(req, query)) {
      req.alias = alias;
    }
  });
};
