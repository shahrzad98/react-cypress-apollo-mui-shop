import {
  discountSearchList,
  discountsItem,
  discountsItemFillter_V1
} from '../../../fixtures/product';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';
import { formatDate, formatNumber } from '../../../../src/utils/helpers';

describe('Test product/list ', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=products]').click();
    mockData('Item', 'gqlItemQuery', discountsItem);
    cy.get('[data-cy=order_card]').eq(2).click();
    cy.wait('@gqlItemQuery');
  });

  const discountShouldHave = (discounts = discountsItem) => {
    const discountsItems = discounts.data.item.getVouchers.results;
    for (let i in discountsItems) {
      let everyDiscount = discountsItems[i];
      cy.get('[data-cy=discountCard]').eq(i).click();
      console.log('everyDiscount.voucher_type', everyDiscount.voucher_type);
      cy.get('[data-cy=AccordionDetails]')
        .eq(i)
        .should('contain', formatNumber(everyDiscount.amount))
        .should('contain', formatNumber(everyDiscount?.limit))
        .should('contain', formatDate(everyDiscount?.start_date))
        .should('contain', formatDate(everyDiscount?.expire_date));

      cy.get('[data-cy=discountCard]').eq(i).click();
    }
  };

  it('discounts  has been in document', () => {
    cy.get('[data-cy=discountCard]');
    discountShouldHave();
  });

  it('When the word "test" is searched, the output list should match ', () => {
    mockData('Item', 'gqlItemQuery', discountSearchList);
    cy.get('[data-cy="search_input"]').type('تست');
    cy.wait('@gqlItemQuery');
    cy.get('[data-cy=discountCard]')
      .should('contain', 'تست')
      .should('be.length', 6);
    discountShouldHave(discountSearchList);
    mockData('Item', 'gqlItemQuery', discountsItem);
    cy.get('[data-cy="search_input"]').clear();
    cy.wait('@gqlItemQuery');
    cy.get('[data-cy=discountCard]');
    discountShouldHave();
  });

  it('filter with "نقدری" and StartDate =1401/05/01 & EndDate=1401/05/31  ', () => {
    mockData('Item', 'gqlItemQuery', discountsItemFillter_V1);
    cy.get('.df-filter').click();
    cy.get('.select-cat').click();
    cy.get('[data-value="2"]').click();
    cy.get('[data-cy=start_date]').type('1401/05/01');
    cy.get('[data-cy=end_date]').type('1401/05/31');
    cy.get('[data-cy=submit_filter]').click();
    cy.wait('@gqlItemQuery');
    discountShouldHave(discountsItemFillter_V1);
  });
});
