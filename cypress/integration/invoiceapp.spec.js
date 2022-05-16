const { response } = require('msw')

describe('write test for invoice app', () => {
  it('display invoice on page load', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/invoices',
      },
      {
        statusCode: 200,
        fixture: 'invoice.json',
      }
    ).as('getInvoices')
    cy.visit('http://localhost:3001/')

    cy.wait('@getInvoices').then(({ response }) => {
      assert.isNotNull(response.body, 'Api call has data')
    })
  })
})
