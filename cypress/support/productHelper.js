export function search() {
    cy.log('Open website search page');
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/search');
    cy.get('.mat-search_icon-search').click({force: true});

    cy.log('Search goods');
    cy.get('#mat-input-0').type('Apple Juice{enter}');


    cy.log('Search is successful');
    cy.get('#searchValue').contains('Apple Juice');

    cy.log('Add goods to the basket')
    cy.get('.mat-focus-indicator.btn-basket.mat-button.mat-raised-button.mat-button-base.mat-primary.ng-star-inserted').click().wait(1000);


}