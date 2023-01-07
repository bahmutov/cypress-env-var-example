// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('loads the page', () => {
  cy.visit('/')
  cy.contains('h1', 'Example')
  cy.request('/protected/secret')
})
