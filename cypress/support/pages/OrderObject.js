class OrderObject {
  visit() {
    cy.log('Open website home page');
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
  }

  GetAddNewAddressButton() {
    return cy.get('button.mat-raised-button[aria-label="Add a new address"][routerlink="/address/create"]');
  }

  TypeAddressCountry() {
    return cy.get('#mat-input-9');
  }

  TypeAddressName() {
    return cy.get('#mat-input-10');
  }

  TypeAddressMobile() {
    return cy.get('#mat-input-11');
  }

  TypeAddressZip() {
    return cy.get('#mat-input-12');
  }

  TypeAddressAddress() {
    return cy.get('#address');
  }

  TypeAddressCity() {
    return cy.get('#mat-input-14');
  }

  GetSubmitButtonOrder() {
    return cy.get('#submitButton');
  }

  GetRadioButton() {
    return cy.get('.mat-radio-outer-circle');
  }

  GetNextButton() {
    return cy.get('.btn-next > .mat-button-wrapper > span');
  }

  GetDeliveryButton() {
    return cy.get('.mat-radio-inner-circle');
  }

  GetNextFinalAddressButton() {
    return cy.get('.nextButton > .mat-button-wrapper > span');
  }

  AddPaymentCard() {
    return cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator');
  }

  TypeCardHolder() {
    return cy.get('#mat-input-16');
  }

  TypeCardNumber() {
    return cy.get('#mat-input-17');
  }

  TypeCardDetail1() {
    return cy.get('#mat-input-18');
  }

  TypeCardDetail2() {
    return cy.get('#mat-input-19');
  }

  GetSubmitCardButton() {
    return cy.get('#submitButton > .mat-button-wrapper');
  }

  GetRadioCardButton() {
    return cy.get('.mat-radio-outer-circle');
  }

  GetNextCardButton() {
    return cy.get('.nextButton > .mat-button-wrapper > span');
  }

  GetCheckoutOrderButton() {
    return cy.get('#checkoutButton');
  }

  AddNewaddress(address) {
    this.GetAddNewAddressButton().click();
    this.TypeAddressCountry().type(address.country);
    this.TypeAddressName().type(address.name);
    this.TypeAddressMobile().type(address.mobile);
    this.TypeAddressZip().type(address.zip);
    this.TypeAddressAddress().type(address.address);
    this.TypeAddressCity().type(address.city);
    this.GetSubmitButtonOrder().click();
    this.GetRadioButton().first().click({ force: true });
    this.GetNextButton().click();
    this.GetDeliveryButton().first().click();
    this.GetNextFinalAddressButton().click();
  }


  AddNewCard(card) {
    this.AddPaymentCard().click();
    this.TypeCardHolder().type(card.cardHolder);
    this.TypeCardNumber().type(card.cardNumber);
    this.TypeCardDetail1().invoke('val', '3').trigger('change');
    this.TypeCardDetail2().invoke('val', '2087').trigger('change');
    this.GetSubmitCardButton().click().wait(2000);
    this.GetRadioCardButton().first().click({ force: true });
    this.GetNextCardButton().click();
    this.GetCheckoutOrderButton().click();
  }

}
export default new OrderObject();

