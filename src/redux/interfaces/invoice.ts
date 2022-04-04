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
  createdAt: string
  paymentDue: string
  clientName: string
  clientAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientEmail: string
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  total: number
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