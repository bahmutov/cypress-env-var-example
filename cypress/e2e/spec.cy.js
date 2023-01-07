// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
// @ts-check

it('loads the page', () => {
  cy.visit('/')
  cy.contains('h1', 'Example')
})

it('makes the request without auth', () => {
  cy.request({
    url: '/protected/secret',
    failOnStatusCode: false,
  })
    .its('status')
    .should('equal', 404)
})

it.only('makes the request with hard-coded auth', () => {
  cy.request({
    url: '/protected/secret',
    auth: {
      bearer: 'XYZ123',
    },
  })
    .should('have.property', 'body')
    .should('deep.equal', { secret: 'abc909' })
})
