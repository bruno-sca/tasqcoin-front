/// <reference types="Cypress" />

const url = Cypress.config('baseUrl');

class InitialPage {
  searchValidUser() {
    cy.get('#pesquisa').click();
    cy.get('#pesquisa').type('test');
    cy.contains('teste').click();
  }

  searchInvalidUser() {
    cy.get('#pesquisa').click();
    cy.get('#pesquisa').type('outro');
  }

  noUsersFound() {
    cy.get('.MuiAutocomplete-noOptions').contains(
      'Nenhum resultado encontrado'
    );
  }

  clickSearchButton() {
    cy.get('#pesquisa').click();
    cy.get('#pesquisa').type('test');
    cy.contains('teste').click();
  }

  clickCreateFeedbackButton() {
    cy.get('[data-testid="AddIcon"]').click();
  }

  viewSearchUserPage() {
    cy.get('h5').contains('teste');
  }

  viewFeedbackModal() {
    cy.get('h6').contains('Distribuir Pontos');
  }

  viewMonthFeedback() {
    cy.get('.css-8vsedl-MuiTypography-root').contains('Pontos de Feedback');
  }

  viewInitialPage() {
    cy.get('.css-79elbk > .MuiTypography-root').should('be.visible');
    cy.get('h5').contains('Olá admin');
  }
}

export default InitialPage;
