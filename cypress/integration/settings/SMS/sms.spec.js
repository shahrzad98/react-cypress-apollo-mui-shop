import {
  getSmsDataAfterDisabelCustomer,
  getSmsDataAfterDisabelReport,
  getSmsDataLocal,
  patchSmsData,
  patchSmsDataCustomer
} from '../../../fixtures/sms';
import { login } from '../../../utils/login';
import { mockData } from '../../../utils/mockData';
import { formatNumber } from '../../../../src/utils/helpers';
import { smsChoices } from '../../../../src/routes/pages/store/settings/sms/charge/staticSmsChoies';

describe('Test the SMS page ', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy=settings]').click();
    cy.get('[data-cy=settingStore]').click();
    mockData('GetSmsData', 'gqlGetSmsDataQuery', getSmsDataLocal);
    cy.get('[data-cy=sms]').click();
    cy.wait('@gqlGetSmsDataQuery');
  });

  it("check ,unchcek report and panel  input's value", () => {
    //check and unchcek report input's value
    mockData('GetSmsData', 'gqlGetSmsDataQuery', getSmsDataAfterDisabelReport);
    mockData('PatchSmsData', 'gqlPatchSmsDataQuery', patchSmsData);
    cy.get('[data-cy=check_report] > input').uncheck();
    cy.wait('@gqlGetSmsDataQuery');
    cy.get('[data-cy=check_report] > input').should('have.value', 'false');
    cy.get('[data-cy=check_customer] > input').should('have.value', 'true');
    mockData('GetSmsData', 'gqlGetSmsDataQuery', getSmsDataLocal);
    cy.get('[data-cy=check_report] > input').check();
    cy.wait('@gqlGetSmsDataQuery');
    cy.get('[data-cy=check_report] > input').should('have.value', 'true');
    cy.get('[data-cy=check_customer] > input').should('have.value', 'true');

    //check and unchcek customer input's value
    mockData(
      'GetSmsData',
      'gqlGetSmsDataQuery',
      getSmsDataAfterDisabelCustomer
    );
    mockData('PatchSmsData', 'gqlPatchSmsDataQuery', patchSmsDataCustomer);
    cy.get('[data-cy=check_customer] > input').uncheck();
    cy.wait('@gqlGetSmsDataQuery');
    cy.get('[data-cy=check_report] > input').should('have.value', 'true');
    cy.get('[data-cy=check_customer] > input').should('have.value', 'false');
    mockData('GetSmsData', 'gqlGetSmsDataQuery', getSmsDataLocal);
    cy.get('[data-cy=check_customer] > input').check();
    cy.wait('@gqlGetSmsDataQuery');
    cy.get('[data-cy=check_report] > input').should('have.value', 'true');
    cy.get('[data-cy=check_customer] > input').should('have.value', 'true');
  });

  it('check sms cost and sms_count ', () => {
    cy.get('[data-cy=sms_cost]').click();
    for (let i in smsChoices) {
      cy.window().then(win => {
        const urlParams = new URLSearchParams(win.location.search);
        const smsCost = urlParams.get('sms_cost');
        cy.get('[data-cy=evryCard]')
          .eq(i)
          .should('contain', smsChoices[i].count)
          .should(
            'contain',
            `${formatNumber(smsChoices[i].count * smsCost)} تومان`
          );
        cy.get('[data-cy=evryCard]').eq(i).click();
        cy.get('[data-cy=accept]').click();
        cy.get('[data-cy=buyStaticModal]')
          .should('contain', smsCost)
          .should('contain', smsChoices[i].count)
          .should('contain', `${formatNumber(smsChoices[i].count * smsCost)}`);
        cy.get('[data-cy=closeModal]').click();
      });
    }
  });

  it('daynamic count', () => {
    cy.get('[data-cy=sms_cost]').click();
    cy.window().then(win => {
      cy.get('[data-cy=buyDynamicCreditModal]').click();
      cy.get('[data-cy=input_cost]').type(5);
      cy.get('[data-cy=sbmit_count]').click();
      cy.get('[data-cy=input_cost] > p').should(
        'contain',
        'حداقل مبلغ خرید، ۵۰۰۰ تومان میباشد'
      );
      const urlParams = new URLSearchParams(win.location.search);
      const smsCost = urlParams.get('sms_cost');
      const typeValue = '505050';
      cy.get('[data-cy=input_cost]').clear().type(typeValue);
      cy.get('[data-cy=result_count]').should(
        'contain',
        (+typeValue / +smsCost).toFixed()
      );
    });
  });
});
