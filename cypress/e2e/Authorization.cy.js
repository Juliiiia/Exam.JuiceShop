import { faker } from '@faker-js/faker';

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  answer: faker.lorem.word()
}


describe('Sign Up', () => {

  beforeEach(() => {
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
    cy.get('.close-dialog > .mat-button-wrapper > span').click();
    cy.get('.cc-btn').click();
    cy.get('#navbarAccount > .mat-button-wrapper > span').click();
    cy.get('#navbarLoginButton > span').click();
  })

  it('Authorization', () => {
    cy.log('Sign up check')
    cy.get('#newCustomerLink > .primary-link').click();
    cy.get('#emailControl').type(user.email);
    cy.get('#passwordControl').type(user.password);
    cy.get('#repeatPasswordControl').type(user.password);
    cy.get('.mat-select-arrow').click()
    cy.get('#mat-option-3 > .mat-option-text').click();
    cy.get('#securityAnswerControl').type('Test');
    cy.get('#registerButton > .mat-button-wrapper').click();

    cy.log('Registration is succesfull');
    cy.get('.mat-simple-snack-bar-content').should('exist');

  })


  describe('Sign In', () => {
    it('Login', () => {
      cy.log('Sign In');
      cy.get('#email').type(user.email);
      cy.get('#password').type(user.password);
      cy.get('.mat-checkbox-inner-container').click();
      cy.get('#loginButton > .mat-button-wrapper').click();

      cy.log('Log In is succesfull');
      cy.get('#navbarAccount > .mat-button-wrapper > span').click();
      cy.get('#navbarLogoutButton > span').should('exist');

    })
  })

})