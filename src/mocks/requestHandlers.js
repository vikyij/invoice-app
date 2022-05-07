import { rest } from 'msw'

export const requestHandlers = [
  rest.get('http://localhost:3000/invoices', (req, res, ctx) => {
    //  return a mocked invoice details
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'RG0315',
          createdAt: '2021-09-24',
          paymentDue: '2021-10-01T00:00:00.000Z',
          description: 'Website Redesign',
          paymentTerms: 7,
          clientName: 'John Morrison',
          clientEmail: 'jm@myco.com',
          status: 'pending',
          senderAddress: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom',
          },
          clientAddress: {
            street: '79 Dover Road',
            city: 'Westhall',
            postCode: 'IP19 3PF',
            country: 'United Kingdom',
          },
          items: [
            {
              name: 'Website Redesign',
              quantity: 1,
              price: '200000',
              total: 200000,
            },
          ],
          total: 200000,
        },
      ])
    )
  }),
]
