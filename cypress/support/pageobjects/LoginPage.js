/// <reference types="Cypress" />

const url = Cypress.config('baseUrl');

class LoginPage {
  acessarSite() {
    cy.visit(url);
  }

  typeValidEmail() {
    cy.get('#mui-1').click();
    cy.get('#mui-1').type('admin@tasqcoin.com');
  }

  typeInvalidEmail() {
    cy.get('#mui-1').click();
    cy.get('#mui-1').type('admin@tasqcoin.comm');
  }

  typeValidPassword() {
    cy.get('#mui-2').click();
    cy.get('#mui-2').type('admin');
  }

  typeInvalidPassword() {
    cy.get('#mui-2').click();
    cy.get('#mui-2').type('adminn');
  }

  clickLoginButton() {
    cy.wait(1000);
    cy.get('.MuiButton-contained').click({ force: true });
  }

  clickRegisterButton() {
    cy.wait(1000);
    cy.get('.css-1ubh1z3-MuiStack-root > .MuiButton-root').click({
      force: true,
    });
  }

  viewLoginPage() {
    cy.get('h4').contains('Sign In').should('be.visible');
  }
}

export default LoginPage;
