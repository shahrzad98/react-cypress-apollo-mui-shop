import {
  orderList,
  orderSearch_typeOne,
  orderSearchResultAll_null,
  order_all_Fillter
} from '../../../fixtures/order/list_fillter_search';

import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';
import { formatDate, formatNumber } from '../../../../src/utils/helpers';
import {
  renderTitle,
  renderColor,
  renderWidth
} from '../../../../src/components/shared/UI/progressBar';

describe('Test order_all page', () => {
  beforeEach(() => {
    login();
    mockData('GetManagers', 'gqlGetManagersQuery', orderList);
    cy.get('[data-cy=orders]').click();
    cy.get('[data-cy=order_card]').eq(0).click();
    cy.wait('@gqlGetManagersQuery');
  });

  const filterInputsType = () => {
    cy.get('[data-cy=filter]').click();
    cy.get('[data-cy=ordersFilters]').should('be.visible');
    cy.get('#tags-standard').should('be.visible').click();
    cy.get('[data-cy=popper_OrderStatus]').eq('4').click();
    cy.get('[data-cy=datePicker_order]').type('1402/02/21');
    cy.get('[data-cy=autoComplete_paymentMethod]').click();
    cy.get('[data-cy=popper_paymentMethod]').eq('1').click();
    cy.get('[data-cy=autoComplete_city]').click();
    cy.get('[data-cy=popper_city]').eq('5').click();
    cy.get('[data-cy=textField_priceRange_to]')
      .should('be.visible')
      .clear()
      .type('325000');
  };

  const validListWithMockData = orderList => {
    const orderItems = orderList.data.order.getManagers.results;
    cy.get('[data-cy=order_detail_card]').should(
      'be.length',
      orderItems.length
    );
    for (let i in orderItems) {
      const order = orderItems[i];
      cy.get('[data-cy=order_detail_card]')
        .eq(i)
        .should('contain', formatNumber(order.cost))
        .should('contain', formatDate(order.created_at))
        .should('contain', renderTitle(order.status))
        .should('contain', order.customer.name);

      cy.get('[data-cy=progressBar_in]')
        .eq(i)
        .should('have.attr', 'style')
        .and('include', `width: ${renderWidth(order.status)}`);
      cy.get('[data-cy=progressBar_in]')
        .eq(i)
        .should('have.css', 'background-color', renderColor(order.status));
    }
  };
  it('check list of order : It must be in accordance with the mock data ', () => {
    validListWithMockData(orderList);
  });

  it('order page search : test Search empty data and existing data   ', () => {
    mockData('GetManagers', 'gqlGetManagersQuery', orderSearchResultAll_null);
    cy.get('[data-cy=search_input]').type('sadjsiaojhasu');
    cy.wait('@gqlGetManagersQuery');
    cy.get('[data-cy=order_detail_card]').should('have.length', 0);
    cy.get('p').should('contain', 'سفارشی پیدا نشد');
    mockData('GetManagers', 'gqlGetManagersQuery', orderSearch_typeOne);
    cy.get('[data-cy=search_input]').clear().type('ندا حجت پناه');
    cy.wait('@gqlGetManagersQuery');
    validListWithMockData(orderSearch_typeOne);
  });

  it('check filter with cutom data', () => {
    filterInputsType();
    mockData('GetManagers', 'gqlGetManagersQuery', order_all_Fillter);
    cy.get('[data-cy=submit-filter]').click();
    cy.wait('@gqlGetManagersQuery');
    validListWithMockData(order_all_Fillter);
  });

  it('test clear fillter submit', () => {
    filterInputsType();
    // *submit_clearFilter
    mockData('GetManagers', 'gqlGetManagersQuery', orderList);
    cy.get('[data-cy=submit_clearFilter]').click();
    cy.wait('@gqlGetManagersQuery');
    validListWithMockData(orderList);
  });

  // it('check scroll', scrollTest);
  // const scrollTest = () => {
  //     goToOrderAll(orderList);
  //     mockData('GetManagers', 'gqlGetManagersQuery', order_scroll_one)
  //     cy.get('#scrollableDiv').scrollTo('bottom');
  //     cy.wait('@gqlGetManagersQuery');
  //     const order_detail_card = cy.get('[data-cy=order_detail_card]');
  //     order_detail_card.should('be.visible').should('be.length', 20);
  // }
});
