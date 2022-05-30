describe('write test for invoice app', () => {
  it('display invoice on page load', () => {
    cy.getInvoiceApi('invoice.json')
  })

  // it('display invoice details when invoice is clicked', () => {
  //   cy.get('[data-testid="div-wrapper-0"]').click()
  //   cy.get('[alt="back arrow icon"]').should('be.visible')
  // })

  it('create a new invoice', () => {
    cy.get('[alt="add-new-invoice-icon"]').click()
    cy.get('input[name=senderStreet]').type('Banana Island, Ikoyi')
    cy.get('input[name=senderCity]').type('Lagos')
    cy.get('input[name=senderPostCode]').type('100200')
    cy.get('input[name=senderCountry]').first().type('Nigeria')
    cy.get('input[name=clientName]').type('Daniel Regha')
    cy.get('input[name=clientEmail]').type('dan@gmail.com')
    cy.get('input[name=clientStreet]').type('minnesota street')
    cy.get('input[name=clientCity]').type('London')
    cy.get('input[name=clientPostCode]').type('200100')
    cy.get('input[name=clientCountry]').first().type('United Kingdom')
    cy.get('input[name=createdAt]').type('2022-05-19')
    cy.get('select[name=paymentTerms]').select('1')
    cy.get('input[name=description]').type('Payment invoice for luxury')
    cy.get('input[name=itemName]').last().type('iPhone 13 pro max')
    cy.get('input[name=quantity]').type('1')
    cy.get('input[name=price]').type('500000')

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/invoices',
      },
      {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: 'AB8862',
          status: 'pending',
          description: 'Payment invoice for luxury',
          senderAddress: {
            street: 'Banana Island, Ikoyi',
            city: 'c28 MM2 Ikeja',
            postCode: '100200',
            country: 'Nigeria',
          },
          createdAt: '2022-05-19',
          paymentDue: '2022-05-20T00:00:00.000Z',
          clientName: 'Daniel Regha',
          clientAddress: {
            street: 'minnesota street',
            city: 'London',
            postCode: '200100',
            country: 'United Kingdom',
          },
          clientEmail: 'dan@gmail.com',
          items: [
            {
              id: '99a4acfc-cfcf-4ec9-835f-647f16c562ae',
              name: 'iPhone 13 pro max',
              quantity: '1',
              price: '500000',
              total: 500000,
            },
          ],
          total: 500000,
          paymentTerms: '1',
        },
      }
    ).as('createInvoice')
    cy.get('button').contains('Save & Send').click()
    cy.wait('@createInvoice').then(({ response }) => {
      expect(response.body).property('id').to.equal('AB8862')
      cy.readFile('cypress/fixtures/invoice.json').then((invoice) => {
        invoice.push(response.body)
        // write the merged array
        cy.writeFile('cypress/fixtures/invoice.json', invoice)
      })
    })

    cy.getInvoiceApi('invoice.json')
  })

  // it('mark as paid', () => {
  //   cy.intercept(
  //     {
  //       method: 'PATCH',
  //       url: 'http://localhost:3000/invoices/?*',
  //     },
  //     {
  //       statusCode: 200,
  //       fixture: 'paid.json',
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   ).as('markAsPaidInvoice')

  //   cy.get('button').contains('Mark as Paid').click()

  //   cy.wait('@markAsPaidInvoice').then(({ response }) => {
  //     cy.log(response)
  //     // expect(response.body.status).to.equal('paid')
  //     cy.writeFile('cypress/fixtures/invoice.json', response.body)
  //   })
  //   cy.get('p').contains('paid')
  // })

  // it('delete an invoice', () => {
  //   cy.get('button').contains('Delete').click()

  //   cy.intercept(
  //     {
  //       method: 'DELETE',
  //       url: 'http://localhost:3000/invoices/EV8862',
  //     },
  //     {
  //       statusCode: 200,
  //       fixture: 'invoice.json',
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   ).as('deleteInvoice')

  //   cy.get('.modal-delete').click()

  //   cy.wait('@deleteInvoice').then(({ response }) => {
  //     expect(response.statusCode).to.equal(200)
  //   })
  //   cy.getInvoiceApi('empty.json')
  //   cy.get('h2').should('have.text', 'There is nothing here')
  // })
})
