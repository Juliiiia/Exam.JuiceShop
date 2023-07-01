import { faker } from '@faker-js/faker';
import HomePage from '../support/pages/HomePage';
import userIsReady from '../support/pages/UserIsReady';

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  answer: faker.lorem.word()
}


describe('Sign Up', () => {

  beforeEach(() => {
    HomePage.visit();
    HomePage.closePopUps();

  })

  it('Authorization', () => {
    cy.log('Sign up check')
    userIsReady.getLoginPage().click();
    userIsReady.getEmailField().type(user.email);
    userIsReady.getPasswordField().type(user.password);
    userIsReady.getRepeatPasswordField().type(user.password);
    userIsReady.getSecurityQuestion1().click();
    userIsReady.putSecurityQuestion().click();
    userIsReady.typeSecurityAnswer().type('Test');
    userIsReady.getSubmitButton().click();
    
    cy.log('Registration is succesfull');
    cy.get('.mat-simple-snack-bar-content').should('exist');

  })


  describe('Sign In', () => {
    it('Login', () => {
      cy.log('Sign In');

      userIsReady.goToLogin().type(user.email);
      userIsReady.getPasswordLogin().type(user.password);
      userIsReady.getCheckbox().click();
      userIsReady.getSubmitButtonLogin().click();

      cy.log('Log In is succesfull');
      cy.get('#navbarAccount > .mat-button-wrapper > span').click();
      cy.get('#navbarLogoutButton > span').should('exist');

    })
  })

})