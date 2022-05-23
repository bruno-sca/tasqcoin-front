/// <reference types="Cypress" />

const url = Cypress.config('baseUrl');

class FeedbackModal {
  searchValidUserModal() {
    cy.get('.MuiInput-root > #pesquisa').click();
    cy.get('.MuiInput-root > #pesquisa').type('test');
    cy.contains('[role="option"]', 'teste').click();
  }

  searchInvalidUserModal() {
    cy.get('.MuiInput-root > #pesquisa').click();
    cy.get('.MuiInput-root > #pesquisa').type('invalidvalue');
  }

  givePoints() {
    cy.get('.MuiInput-root > #amount').click();
    cy.get('.MuiInput-root > #amount').type('99');
  }

  typeFeedbackDescription() {
    cy.get('#description').click();
    cy.get('#description').type('testando');
  }

  clickSendFeedbackButton() {
    cy.get('.MuiButton-containedPrimary').click();
  }

  closeModalButton() {
    cy.get('.MuiButton-containedError').click();
    cy.get('h6').contains('Distribuir Pontos').should('not.exist');
  }

  viewInitialPageWithFeedbackCreated() {
    cy.get('h5').contains('Olá admin');
    cy.get('.Toastify__toast-container').contains(
      'Feedback created successfully!'
    );
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root > .MuiTypography-body1'
    ).contains('teste');
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root > .css-1d9cypr-MuiStack-root > .MuiTypography-root'
    ).contains('99');
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root'
    ).trigger('mouseover');
    cy.get('.MuiTooltip-tooltip').should('be.visible');
  }

  viewInitialPageWithFeedbackCreatedWithoutHover() {
    cy.get('h5').contains('Olá admin');
    cy.get('.Toastify__toast-container').contains(
      'Feedback created successfully!'
    );
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root > .MuiTypography-body1'
    ).contains('teste');
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root > .css-1d9cypr-MuiStack-root > .MuiTypography-root'
    ).contains('99');
    cy.get(
      ':nth-child(1) > .MuiPaper-root > .css-v3lmqc-MuiStack-root'
    ).trigger('mouseover');
    cy.get('.MuiTooltip-tooltip').should('not.exist');
  }

  viewRequiredField() {
    cy.get('#pesquisa-helper-text').contains('Required Field');
  }
  viewRequiredPointsWarning() {
    cy.get('.MuiFormHelperText-root').contains('Minumum amount required is 1');
  }
}

export default FeedbackModal;
