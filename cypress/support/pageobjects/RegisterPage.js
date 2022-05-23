/// <reference types="Cypress" />

const url = Cypress.config('baseUrl');

class RegisterPage {
  acessarCadastro() {
    cy.visit(url);
    cy.get('p').contains("Don't have an account?").click();
    cy.get('h4').contains('Sign Up').should('be.visible');
  }

  typeValidName() {
    cy.get('#mui-3').click();
    cy.get('#mui-3').type('teste');
  }

  typeValidEmail() {
    cy.get('#mui-4').click();
    cy.get('#mui-4').type('teste@teste.com.br');
  }

  typeInvalidEmail() {
    cy.get('#mui-4').click();
    cy.get('#mui-4').type('admin@tasqcoin.com');
  }

  typeValidPassword() {
    cy.get('#mui-5').click();
    cy.get('#mui-5').type('teste');
  }

  typeValidPasswordConfirm() {
    cy.get('#mui-6').click();
    cy.get('#mui-6').type('teste');
  }

  typeInvalidPasswordConfirm() {
    cy.get('#mui-6').click();
    cy.get('#mui-6').type('teste1');
  }

  clickRegisterButton() {
    cy.wait(1000);
    cy.get('.MuiButton-root').click({ force: true });
  }

  viewRegisterPage() {
    cy.get('h4').contains('Sign Up').should('be.visible');
  }
}

export default RegisterPage;
