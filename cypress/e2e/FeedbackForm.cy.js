import { faker } from '@faker-js/faker';

let author = {
    email: faker.internet.email(),
    comment: faker.word.adjective()
}

describe('Feedback Form', () => {
    it('passes', () => {
    cy.visit('http://juice-shop-sanitarskyi.herokuapp.com/#/contact');
    cy.get('.close-dialog > .mat-button-wrapper > span').click();
    cy.get('.cc-btn').click();
    cy.get('#mat-input-1').type(author.email, {force: true});
    cy.get('#comment').type(author.comment);
    cy.get('#captcha').invoke('text').then((expression) => {
        const mathExpression = expression.trim();
        const result = eval(mathExpression);
        cy.get('#captchaControl').type(result);
      });
    cy.get('#rating').then((slider) => {
        const sliderWidth = slider.width();
        const sliderOffsetLeft = slider.offset().left;
        const position = sliderOffsetLeft + sliderWidth * 0.75; 
        cy.get('#rating').click(position);
      });
      cy.get('#submitButton > .mat-button-wrapper').click();
      cy.get('.mat-simple-snack-bar-content').contains('Thank you for your feedback.');

   })
})