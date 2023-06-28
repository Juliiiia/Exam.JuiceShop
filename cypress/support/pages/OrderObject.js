import { faker } from '@faker-js/faker'

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

class OrderObject {
  visit() {
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
  }

  AddNewAddressToOrder() {
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
  }

  AddPaymentCard() {
    cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').click();
    cy.get('#mat-input-16').type(card.cardHolder);
    cy.get('#mat-input-17').type(card.cardNumber);
    cy.get('#mat-input-18').invoke('val', '3').trigger('change');
    cy.get('#mat-input-19').invoke('val', '2087').trigger('change');
    cy.get('#submitButton > .mat-button-wrapper').click().wait(2000);
    cy.get('.mat-radio-outer-circle').first().click({ force: true });
    cy.get('.nextButton > .mat-button-wrapper > span').click();
    cy.get('#checkoutButton').click();
  }

  CheckOrderIsSuccessful() {
    cy.get('.confirmation').contains('Thank you for your purchase!');
  }

}

export default new OrderObject();