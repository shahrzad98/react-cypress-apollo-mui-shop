import { brandStoreData, editStore } from '../../fixtures/settings';
import { login } from '../../utils/login';
import { mockData } from '../../utils/mockData';

describe('edit and show user info', () => {
  beforeEach(() => {
    login();
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="settingStore"]').click();
    mockData('My_brand', 'gqlMy_brand', brandStoreData);
    cy.get('[data-cy="user_info"]').click();
  });

  it('show user info page details', () => {
    cy.contains('اطلاعات شخصی');
  });

  it('show user info', () => {
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].first_name);
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].last_name);
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].email);
  });

  it('edit button works', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.url().should('contain', 'user_info?modal=edit');
  });

  it('back button in edit page works', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.url().should('contain', 'user_info?modal=edit');
    cy.get('h1:contains("ویرایش اطلاعات شخصی")').click();
    cy.url().should('not.contain', 'user_info?modal=edit');
  });

  it('edit page includes true value', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.get('[name="first_name"]').should(
      'contain.value',
      brandStoreData.data.user.getUserRead.my_store?.[0].first_name
    );
    cy.get('[name="last_name"]').should(
      'contain.value',
      brandStoreData.data.user.getUserRead.my_store?.[0].last_name
    );
    cy.get('[name="email"]').should(
      'contain.value',
      brandStoreData.data.user.getUserRead.my_store?.[0].email
    );
  });

  it('email input validation work', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.get('[name="email"]').clear().type('invalid email text');
    cy.get('button:contains("ثبت")').click();
    cy.contains('ایمیل را به درستی وارد کنید');
  });

  it('edit page form works that after submit close modal and change url', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.wait(100);

    cy.get('[name="first_name"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].first_name);
    cy.get('[name="last_name"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].last_name);
    cy.get('[name="email"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].email);
    mockData('EditStoreData', 'gqlEditStoreData', editStore);
    cy.get('button:contains("ثبت")').click();
    mockData('My_brand', 'gqlMy_brand', brandStoreData);
    cy.wait('@gqlEditStoreData');
    cy.wait('@gqlMy_brand');
    cy.url().should('not.contain', 'user_info?modal=edit');
  });

  it('edit page form works that after submit', () => {
    cy.get('button:contains("ویرایش")').click();
    cy.wait(100);
    cy.get('[name="first_name"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].first_name);
    cy.get('[name="last_name"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].last_name);
    cy.get('[name="email"]')
      .clear()
      .type(brandStoreData.data.user.getUserRead.my_store?.[0].email);
    mockData('EditStoreData', 'gqlEditStoreData', editStore);
    cy.get('button:contains("ثبت")').click();
    mockData('My_brand', 'gqlMy_brand', brandStoreData);
    cy.wait('@gqlEditStoreData');
    cy.wait('@gqlMy_brand');
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].first_name);
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].last_name);
    cy.contains(brandStoreData.data.user.getUserRead.my_store?.[0].email);
  });

  it('logout button works', () => {
    cy.get('button:contains("خروج از حساب")').click();
    cy.contains('آیا از خروج از حساب خود اطمینان دارید؟');
  });

  it('apply logout button works', () => {
    cy.get('button:contains("خروج از حساب")').click();
    cy.get('button:contains("خروج"):nth-child(2)').click();
    cy.url().should('contain', 'login');
  });
});
