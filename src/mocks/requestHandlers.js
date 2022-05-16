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

  rest.post('http://localhost:3000/invoices', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([
        {
          id: 'EV8862',
          status: 'pending',
          description: 'development',
          senderAddress: {
            street: 'c28 MM2 Ikeja, Lagos',
            city: 'c28 MM2 Ikeja',
            postCode: '100212',
            country: 'Nigeria',
          },
          createdAt: '2022-04-25',
          paymentDue: '2022-05-02T00:00:00.000Z',
          clientName: 'Chinonso promise',
          clientAddress: {
            street: 'naze',
            city: 'owerri',
            postCode: '1002',
            country: 'Nigeria',
          },
          clientEmail: 'nonso@gmail.com',
          items: [
            {
              id: '99a4acfc-cfcf-4ec9-835f-647f16c562ae',
              name: 'UI book',
              quantity: '1',
              price: '5000',
              total: 5000,
            },
          ],
          total: 5000,
          paymentTerms: '7',
        },
      ]),
      ctx.delay(150)
    )
  }),
]
