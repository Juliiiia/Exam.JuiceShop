import { search } from '../support/productHelper'
import { faker } from '@faker-js/faker'
import userIsReady from '../support/pages/UserIsReady';
import orderObject from '../support/pages/OrderObject';

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

describe('Order with helper', () => {
  it('OrderWithHelper', () => {
    userIsReady.visit();
    userIsReady.closeAllWindowsBeforeAuth();
    userIsReady.SignUp();
    userIsReady.SignIn();

    cy.log('Searh helper');
    search();

    cy.log('Open basket')
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').click().wait(1000);
    cy.get('.mat-focus-indicator.checkout-button.mat-raised-button.mat-button-base.mat-primary').click().wait(1000);

    cy.log('Add new address');
    orderObject.AddNewAddressToOrder();

    cy.log('Add payment card')
    orderObject.AddPaymentCard();

    cy.log('Check order is successful')
    orderObject.CheckOrderIsSuccessful();

  })
})