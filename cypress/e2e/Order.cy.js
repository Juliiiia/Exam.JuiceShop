import { faker } from '@faker-js/faker';
import userIsReady from '../support/pages/UserIsReady';
import HomePage from '../support/pages/HomePage';
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

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  answer: faker.lorem.word()
}


describe('Full order process', () => {
  it('order', () => {
    cy.log('Withit Home Page');
    HomePage.visit();
    HomePage.closePopUps();

    cy.log('User Sugn Up');
    userIsReady.getLoginPage().click();
    userIsReady.getEmailField().type(user.email);
    userIsReady.getPasswordField().type(user.password);
    userIsReady.getRepeatPasswordField().type(user.password);
    userIsReady.getSecurityQuestion1().click();
    userIsReady.putSecurityQuestion().click();
    userIsReady.typeSecurityAnswer().type('Test');
    userIsReady.getSubmitButton().click();

    cy.log('User Sign In');
    userIsReady.goToLogin().type(user.email);
    userIsReady.getPasswordLogin().type(user.password);
    userIsReady.getCheckbox().click();
    userIsReady.getSubmitButtonLogin().click();

    cy.log('Add order to the basket');
    cy.get('.mat-focus-indicator.btn-basket.mat-button.mat-raised-button.mat-button-base.mat-primary.ng-star-inserted').eq(1).click().wait(1000);
    cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').click().wait(1000);
    cy.get('.mat-focus-indicator.checkout-button.mat-raised-button.mat-button-base.mat-primary').click().wait(1000);


    cy.log('Add new address');
    orderObject.GetAddNewAddressButton().click();
    orderObject.TypeAddressCountry().type(address.country);
    orderObject.TypeAddressName().type(address.name);
    orderObject.TypeAddressMobile().type(address.mobile);
    orderObject.TypeAddressZip().type(address.zip);
    orderObject.TypeAddressAddress().type(address.address);
    orderObject.TypeAddressCity().type(address.city);
    orderObject.GetSubmitButtonOrder().click();
    orderObject.GetRadioButton().first().click({ force: true });
    orderObject.GetNextButton().click();
    orderObject.GetDeliveryButton().first().click();
    orderObject.GetNextFinalAddressButton().click();

    cy.log('Add payment card')
    orderObject.AddPaymentCard().click();
    orderObject.TypeCardHolder().type(card.cardHolder);
    orderObject.TypeCardNumber().type(card.cardNumber);
    orderObject.TypeCardDetail1().invoke('val', '3').trigger('change');
    orderObject.TypeCardDetail2().invoke('val', '2087').trigger('change');
    orderObject.GetSubmitCardButton().click().wait(2000);
    orderObject.GetRadioCardButton().first().click({ force: true });
    orderObject.GetNextCardButton().click();
    orderObject.GetCheckoutOrderButton().click();


    cy.log('Check order is successful')
    cy.get('.confirmation').contains('Thank you for your purchase!');

  })

})
