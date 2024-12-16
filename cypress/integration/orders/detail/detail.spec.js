/// <reference types="cypress" />

import {
  canceledByMerchantOrder,
  canceledByMerchantSettledMutatuin,
  canceledByMerchantSettledOrder,
  getManagerStatusResponse,
  InPreparingOrder,
  orderSearchResult,
  paidOrder,
  sendingOrder,
  updateOrderSendMutationResponse,
  waitingForApprovalOrder,
  waitingForApprovalOrderEditedCardNumber,
  waitingForPaymentAppprovalOrder,
  waitingForPaymentlOrder
} from '../../../fixtures/orders';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';
const ACCORDIONS_CHOICES = [
  ['فاکتور', 'مبلغ پرداخت شده'],
  ['روش پرداخت', 'تاریخ ثبت سفارش'],
  ['استان و شهر', 'آدرس'],
  ['روش ارسال', 'زمان ارسال']
];

describe('test order detail', () => {
  beforeEach(() => {
    login();
    mockData(
      'GetManagersStatusCount',
      'gqlgetManagersStatusCountQuery',
      getManagerStatusResponse
    );
    cy.get('[data-cy=orders]').click();

    cy.wait('@gqlgetManagersStatusCountQuery');

    mockData('GetManagers', 'gqlGetLaunchListQuery', orderSearchResult);

    cy.get('[data-cy=search_input]').type('35496');
    cy.wait('@gqlGetLaunchListQuery');
  });

  it('check UI', () => {
    mockData('GetManager', 'gqlGetManagerQuery', waitingForApprovalOrder);

    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');

    cy.get('h3').should('contain', 'سفارش');
    cy.contains('درخواست شده');
    cy.contains('در انتظار پرداخت');
    cy.contains('در انتظار تایید');
    cy.contains('در حال آماده سازی');
    cy.contains('در حال ارسال');
    cy.contains('تحویل شده');
    cy.contains('کد سفارش');
    cy.contains('مبلغ سفارش');
    cy.contains('مشتری');
    cy.get('.acc--title').should('have.length', 4);

    for (let i = 0; i < ACCORDIONS_CHOICES.length; i++) {
      cy.contains(ACCORDIONS_CHOICES[i][0]).should('not.be.visible');
      cy.contains(ACCORDIONS_CHOICES[i][1]).should('not.be.visible');
      cy.get('.acc--title').eq(i).click();
      cy.contains(ACCORDIONS_CHOICES[i][0]).should('be.visible');
      cy.contains(ACCORDIONS_CHOICES[i][1]).should('be.visible');
      cy.get('.acc--title').eq(i).click();
      cy.contains(ACCORDIONS_CHOICES[i][0]).should('not.be.visible');
      cy.contains(ACCORDIONS_CHOICES[i][1]).should('not.be.visible');
    }
  });

  it('check action drawer for status WAITING FOR APPROVAL', () => {
    mockData('GetManager', 'gqlGetManagerQuery', waitingForApprovalOrder);

    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');
    cy.contains('بررسی درخواست').click();
    cy.wait('@gqlGetManagerQuery');

    //change card_number and card_owner_name
    cy.get('.card-number').first().contains('3681');
    cy.get('.card-number').eq(1).contains('ندا حجت پناه');
    cy.get('.edit-btn').click();
    cy.get('input[name=card_number]').clear().type('7037997436813682');
    cy.get('input[name=card_name]').clear().type('محمد حسینی');
    cy.get('[data-cy=submit_edit_btn]').click();

    mockData(
      'GetManager',
      'gqlGetManagerQuery',
      waitingForApprovalOrderEditedCardNumber
    );

    cy.wait('@gqlGetManagerQuery');
    cy.get('.card-number').first().should('contain', '3682');
    cy.get('.card-number').eq(1).should('contain', 'محمد حسینی');

    //decline the order
    cy.get('[data-cy=decline_btn]').click();
    cy.get('[data-cy=decline_reason_select]').click();
    cy.get('[data-cy=cancel_reason_1]').click();
    cy.contains('عدم امکان آماده سازی').should('be.visible');
    cy.get('[data-cy=cancel_decline_btn]').click();

    cy.get('[data-cy=decline_btn]').click();
    cy.get('[data-cy=decline_reason_select]').click();
    cy.get('[data-cy=cancel_reason_2]').click();
    cy.contains('سایر').should('be.visible');

    mockData(
      'GetManager',
      'gqlGetManagerQuery',
      canceledByMerchantSettledOrder
    );
    mockData(
      'UpdateOrderStatus',
      'gqlUpdateOrderStatusMutation',
      canceledByMerchantSettledMutatuin
    );
    cy.get('[data-cy=submit_decline_btn]').click();

    cy.wait('@gqlUpdateOrderStatusMutation');
    cy.wait('@gqlGetManagerQuery');
    cy.contains('درخواست رد شده');
    cy.contains('متوجه شدم').click();
    cy.wait('@gqlGetManagerQuery');
    cy.contains('سفارش مشتری بدلیل عدم تایید شما رد شده است.');
    cy.reload();

    //accept the order
    mockData('GetManager', 'gqlGetManagerQuery', waitingForApprovalOrder);

    cy.wait('@gqlGetManagerQuery');
    cy.contains('بررسی درخواست').click();
    cy.wait('@gqlGetManagerQuery');

    mockData('GetManager', 'gqlGetManagerQuery', waitingForPaymentlOrder);

    cy.get('[data-cy=submit_btn]').click();
    cy.contains('متوجه شدم').click();
    cy.wait('@gqlGetManagerQuery');
    cy.contains('سفارش در انتظار پرداخت مشتری').should('be.visible');
  });
  it('check action drawer for status WAITING FOR PAYMENT APPROVAL', () => {
    mockData(
      'GetManager',
      'gqlGetManagerQuery',
      waitingForPaymentAppprovalOrder
    );

    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');
    cy.contains('بررسی سفارش').click();
    cy.wait('@gqlGetManagerQuery');

    //change preparing_days count
    cy.get('.df-edit').click();
    cy.get('input[name=preparing_days]').clear().type('4');
    cy.get('[data-cy=submit_edit]').click();
    cy.contains('4 روز').should('be.visible');
    cy.contains('رسید کارت به کارت').should('be.visible');
    cy.contains('ارسال شده در 1401/02/28 ساعت 11:05').should('be.visible');

    //accept the order
    mockData('GetManager', 'gqlGetManagerQuery', InPreparingOrder);
    mockData(
      'UpdateOrderStatus',
      'gqlUpdateOrderStatusMutation',
      canceledByMerchantSettledMutatuin
    );

    cy.get('[data-cy=submit_order_btn]').click();

    cy.wait('@gqlUpdateOrderStatusMutation');
    cy.wait('@gqlGetManagerQuery');
    cy.wait('@gqlGetManagerQuery');
    cy.get('h3').should('contain', 'ارسال سفارش');

    //decline the order
    mockData(
      'GetManager',
      'gqlGetManagerQuery',
      waitingForPaymentAppprovalOrder
    );

    cy.reload();
    cy.wait('@gqlGetManagerQuery');
    cy.contains('بررسی سفارش').click();
    cy.wait('@gqlGetManagerQuery');
    cy.get('[data-cy=decline_order_btn]').click();
    cy.get('[data-cy=decline_order_select]').click();
    cy.get('[data-cy=decline_order_select_1').click();

    mockData('GetManager', 'gqlGetManagerQuery', canceledByMerchantOrder);

    cy.get('[data-cy=decline_order_submit]').click();
    cy.wait('@gqlUpdateOrderStatusMutation');
    cy.wait('@gqlGetManagerQuery');
    cy.contains('مبلغ را برگرداندم');
    cy.contains('مبلغ به حسابم واریز نشده');
  });
  it('check action drawer for status PAID', () => {
    mockData('GetManager', 'gqlGetManagerQuery', paidOrder);

    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');
    mockData(
      'UpdateOrderStatus',
      'gqlUpdateOrderStatusMutation',
      canceledByMerchantSettledMutatuin
    );
    //accept order
    cy.contains('بررسی سفارش').click();
    cy.wait('@gqlGetManagerQuery');
    cy.get('[data-cy=accept_submit_btn]').click();
    cy.wait('@gqlUpdateOrderStatusMutation');
    cy.contains('تایید درخواست');

    mockData('GetManager', 'gqlGetManagerQuery', InPreparingOrder);

    cy.contains('متوجه شدم').click();

    cy.wait('@gqlGetManagerQuery');
    cy.contains('ارسال سفارش').should('be.visible');

    mockData('GetManager', 'gqlGetManagerQuery', paidOrder);
    cy.reload();
    cy.wait('@gqlGetManagerQuery');

    //decline order
    cy.contains('بررسی سفارش').click();
    cy.wait('@gqlGetManagerQuery');
    cy.get('[data-cy=decline_order_btn]').click();
    cy.get('[data-cy=decline_order_select]').click();
    cy.get('[data-cy=decline_order_option_1]').click();

    mockData('GetManager', 'gqlGetManagerQuery', canceledByMerchantOrder);
    cy.get('[data-cy=submit_decline_order]').click();
    cy.wait('@gqlUpdateOrderStatusMutation');
    cy.wait('@gqlGetManagerQuery');
    cy.contains('سفارش مشتری بدلیل عدم تایید شما رد شده است').should(
      'be.visible'
    );

    cy.contains('مبلغ را برگرداندم');
    cy.contains('مبلغ به حسابم واریز نشده');
  });

  it('check action drawer for status InPreparing (Other post method)', () => {
    mockData('GetManager', 'gqlGetManagerQuery', InPreparingOrder);

    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');
    cy.get('.MuiButton-root').click();
    cy.wait('@gqlGetManagerQuery');
    cy.get('h2').should('contain', 'اطلاعات مرسوله - پیک');
    cy.get('[data-cy=select_weight]').click();
    cy.get('[data-cy=select_weight_option2]').click();

    mockData(
      'UpdateOrderSend',
      'gqlUpdateOrderSendMutation',
      updateOrderSendMutationResponse
    );
    cy.get('[data-cy=submit_send_btn]').click();
    cy.wait('@gqlUpdateOrderSendMutation');

    cy.get('h3').should('contain', 'ارسال موفق');
    mockData('GetManager', 'gqlGetManagerQuery', sendingOrder);
    cy.contains('متوجه شدم').click();
    cy.wait('@gqlGetManagerQuery');
    cy.contains(
      'لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش'
    ).should('be.visible');
  });

  it('check action drawer for status SENT', () => {
    mockData('GetManager', 'gqlGetManagerQuery', sendingOrder);
    cy.get('[data-cy=order_detail_card]').first().click();
    cy.wait('@gqlGetManagerQuery');

    cy.get('.MuiButton-root').click();
    cy.wait('@gqlGetManagerQuery');

    mockData(
      'UpdateOrderStatus',
      'gqlUpdateOrderStatusMutation',
      canceledByMerchantSettledMutatuin
    );
    cy.get('[data-cy=submit_send_btn]').click();

    cy.contains('مرسوله با موفقیت به مشتری تحویل داده شده است.');
  });
});
