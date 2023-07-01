class UserIsReady {
    visit() {
        cy.log('Open website home page');
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
    }

    getLoginPage() {
        return cy.get('#newCustomerLink > .primary-link');
    }

    getEmailField() {
        return cy.get('#emailControl');
    }

    getPasswordField() {
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestion1() {
        return cy.get('.mat-select-arrow');
    }

    putSecurityQuestion() {
        return cy.get('#mat-option-3 > .mat-option-text');
    }

    typeSecurityAnswer() {
        return cy.get('#securityAnswerControl');
    }

    getSubmitButton() {
        return cy.get('#registerButton > .mat-button-wrapper');
    }

    goToLogin() {
        return cy.get('#email');
    }

    getPasswordLogin() {
        return cy.get('#password');
    }

    getCheckbox() {
        return cy.get('.mat-checkbox-inner-container');
    }

    getSubmitButtonLogin() {
        return cy.get('#loginButton > .mat-button-wrapper');
    }


    signUp(user) {
        this.getLoginPage().click();
        this.getEmailField().type(user.email);
        this.getPasswordField().type(user.password);
        this.getRepeatPasswordField().type(user.password);
        this.getSecurityQuestion1().click();
        this.putSecurityQuestion().click();
        this.typeSecurityAnswer().type('Test');
        this.getSubmitButton().click();
    }

    signIn(user) {
        this.goToLogin().type(user.email);
        this.getPasswordLogin().type(user.password);
        this.getCheckbox().click();
        this.getSubmitButton().click();
    }
}

export default new UserIsReady();