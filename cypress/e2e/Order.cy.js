import { faker } from '@faker-js/faker';
import userIsReady from '../support/pages/UserIsReady';


let address = {
  country: faker.location.country(),
  name: faker.person.fullName(),
  mobile: faker.number.bigInt({ min: 10000000, max: 99999999 }).toString(),
  zip: faker.number.bigInt({ min: 10000000, max: 99999999 }).toString(),
  address: faker.location.secondaryAddress(),
  city: faker.location.city(),
}

let card = {
  cardHolder: faker.finance.accountName(),
  cardNumber: faker.finance.creditCardNumber('Mastercard').replace(/-/g, ''),
}

describe('Full order process', () => {
  it('order', () => {
    cy.log('User login');
    userIsReady.visit();
    userIsReady.closeAllWindowsBeforeAuth();
    userIsReady.SignUp();
    userIsReady.SignIn();

    cy.log('Add order to the basket');
    cy.get('.mat-focus-indicator.btn-basket.mat-button.mat-raised-button.mat-button-base.mat-primary.ng-star-inserted').eq(1).click().wait(1000);
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').click().wait(1000);
    cy.get('.mat-focus-indicator.checkout-button.mat-raised-button.mat-button-base.mat-primary').click().wait(1000);


    cy.log('Add new address');
    cy.get('button.mat-raised-button[aria-label="Add a new address"][routerlink="/address/create"]').click();
    cy.get('#mat-input-9').type(address.country);
    cy.get('#mat-input-10').type(address.name);
    cy.get('#mat-input-11').type(address.mobile);
    cy.get('#mat-input-12').type(address.zip);
    cy.get('#address').type(address.address);
    cy.get('#mat-input-14').type(address.city);
    cy.get('#submitButton').click();
    cy.get('.mat-radio-outer-circle').first().click({ force: true });
    cy.get('.btn-next > .mat-button-wrapper > span').click();
    cy.get('.mat-radio-inner-circle').first().click();
    cy.get('.nextButton > .mat-button-wrapper > span').click();

    cy.log('Add payment card')
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click();
    cy.get('#mat-input-16').type(card.cardHolder);
    cy.get('#mat-input-17').type(card.cardNumber);
    cy.get('#mat-input-18').invoke('val', '3').trigger('change');
    cy.get('#mat-input-19').invoke('val', '2087').trigger('change');
    cy.get('#submitButton > .mat-button-wrapper').click().wait(2000);
    cy.get('.mat-radio-outer-circle').first().click({ force: true });
    cy.get('.nextButton > .mat-button-wrapper > span').click();
    cy.get('#checkoutButton').click();


    cy.log('Check order is successful')
    cy.get('.confirmation').contains('Thank you for your purchase!');




  })

})
