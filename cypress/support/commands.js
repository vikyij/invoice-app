// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getInvoiceApi', (data) => {
  cy.intercept(
    {
      method: 'GET',
      url: 'http://localhost:3000/invoices',
    },
    {
      statusCode: 200,
      fixture: data,
    }
  ).as('getInvoices')
  cy.visit('http://localhost:3001/')

  cy.wait('@getInvoices').then(({ response }) => {
    assert.isNotNull(response.body, 'Api call has data')
  })
})
