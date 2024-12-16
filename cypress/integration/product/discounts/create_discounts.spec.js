/// <reference types="cypress" />
import { formatDate } from './../../../../src/utils/helpers';
import { login } from '../../../utils/login';

describe('/create discounts test ', () => {
  beforeEach(() => {
    login();
    cy.visit('/');
    cy.get('[data-cy=products]').click();
    cy.get('[data-cy=order_card]').eq(2).click();
    cy.get('[data-cy=create_discount]').click();
    cy.visit('/products/discounts/create');
  });
  it('create discount page inputs validation ', () => {
    cy.get('[data-cy=enter_discount]').click();
    cy.get('p:contains("نام ، برای ثبت تخفیف نیاز است.")');
    cy.get('p:contains("  مقدار ، برای ثبت تخفیف نیاز است.")');
    cy.get('p:contains("حداکثر سقف خرید ، برای ثبت تخفیف نیاز است.")');
    cy.get('p:contains("محدودیت زمان ، برای ثبت تخفیف نیاز است.")');
    cy.get('[data-cy=field_amount]').type('hekki');
    cy.get('p:contains("  مقدار را به درستی وارد کنید")');
    cy.get('[data-cy=field_limit]').type('kjhhgk');
    cy.get('p:contains("حداکثر سقف خرید را به درستی وارد کنید")');
  });

  it('create discount should works  ', () => {
    const dateNow = Date.now();
    const strDate = formatDate(new Date(dateNow + 86327055).toISOString());
    const exDate = formatDate(new Date(dateNow + 2678404950).toISOString());
    const rendomNumber = Math.floor(Math.random() * 100);
    const rendomName = 'nameForTest:  ' + Math.floor(Math.random() * 100);
    cy.get('[data-cy=field_name]').type(rendomName);
    cy.get('[data-cy=field_amount]').type(rendomNumber);
    cy.get('[data-cy=field_limit]').type('700000');
    cy.get('[data-cy=field_from]').type(strDate);
    cy.get('[data-cy=field_to]').type(exDate);
    cy.get('[data-cy=enter_discount]').click();
    cy.get('[data-cy=discountCard]').eq(0).click();
    cy.get('[data-cy=discountCard]')
      .eq(0)
      .should('contain', rendomName)
      .should('contain', `٪ ${rendomNumber}`)
      .should('contain', '700,000 تومان')
      .should('contain', strDate)
      .should('contain', exDate);
  });
});
