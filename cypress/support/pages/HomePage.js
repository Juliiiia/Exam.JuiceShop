class HomePage {
    visit() {
        cy.log('Open website home page');
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
    }
    closePopUps() {
        cy.log('Close all pop-ups on the home page');
        cy.get('.close-dialog > .mat-button-wrapper > span').click();
        cy.get('.cc-btn').click();
        cy.get('#navbarAccount > .mat-button-wrapper > span').click();
        cy.get('#navbarLoginButton > span').click();
    }
}
export default new HomePage();