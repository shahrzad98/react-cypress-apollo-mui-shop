describe('Login Test', () => {
  it('SET LOGIN TYPE INPUTS', () => {
    //DATA IS NOT VALID
    cy.visit('/login');
    cy.get('#username').type('09120325541');
    cy.get('#password').type('nedaneda1 {enter}');
    cy.get('[data-error=loginError]').should(
      'contain',
      'اطلاعات کاربری اشتباه است'
    );
    cy.get('#username').type('091241859');
    cy.get('#username-helper-text').should(
      'contain',
      'شماره تلفن را به درستی وارد کنید'
    );
    cy.get('#username').clear();
    cy.get('#username-helper-text').should('contain', 'این فیلد الزامی است');
    cy.get('#password').clear();
    cy.get('#password-helper-text').should('contain', 'این فیلد الزامی است');
    cy.url().should('include', '/login');

    //USERNAME AND PASSWORD ARE EMPTY
    cy.get('#username').clear().focus();
    cy.get('#password').clear().type('{enter}');
    cy.get('#password-helper-text').should('contain', 'این فیلد الزامی است');
    cy.get('#username-helper-text').should('contain', 'این فیلد الزامی است');
    cy.url().should('include', '/login');
    //USERNAME IS  CORRECT BUT PASSWORD IS EMPTY
    cy.visit('/login');
    cy.get('#username').type('09120441859');
    cy.get('#password').focus();
    cy.get('#btnLogin').click();
    cy.get('#password-helper-text').should('contain', 'این فیلد الزامی است');
    cy.url().should('include', '/login');
    //USERNAME AND PASSWORD ARE NOT VALID
    cy.visit('/login');
    cy.get('#username').type('09120441859');
    cy.get('#password').type('_111{enter}');
    cy.get('#password-helper-text').should(
      'contain',
      'رمز عبور باید حداقل ۸ کاراکتر باشد'
    );

    //CHECK BTN SINGUP
    cy.visit('/login');
    cy.get('#btnSingup')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://register.digify.shop');
    //CHECK BTN FORGOT PASSWORD
    cy.visit('/login');
    cy.get('#btnForgotPassword  ').click();
    cy.url().should('include', '/forget-password');

    //LOGIN SUCCESSFULLY
    cy.visit('/login');
    cy.get('#username').type('09120441859');
    cy.get('#password').type('nedaneda1');
    cy.get('#btnLogin').click();
    cy.url().should('include', '/');
    cy.visit('/login');
    cy.get('#username').type('09120441859');
    cy.get('#password').type('nedaneda1 {enter}');
    cy.url().should('include', '/');
  });
});
