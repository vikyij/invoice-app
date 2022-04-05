export interface InvoiceData {
  status: string
  id: string
  description: string
  senderAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  createdAt: Date
  paymentDue: Date
  clientName: string
  clientAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientEmail: string
  items: {
    id: string
    name: string
    quantity: string
    price: string
    total: number
  }[]
  total: number
  paymentTerms: string
}

export type Inputs = {
  clientName: string
  clientCity: string
  address: string
  city: string
  postCode: string
  country: string
  clientEmail: string
  clientAddress: string
  clientPostCode: string
  paymentTerms: string
  projectDescription: string
  invoiceDate: Date
}