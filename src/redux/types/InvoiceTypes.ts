import { InvoiceData } from '../interfaces/invoice'


export enum invoiceStateTypes {
  GET_INVOICES = 'GET_INVOICES',
  SINGLE_INVOICE = 'SINGLE_INVOICE',
   LOADING = 'LOADING'
}

export interface GetInvoiceStateType {
  invoices?: InvoiceData[];
  singleInvoice?: InvoiceData;
  loading?: boolean
}

interface GetInvoiceActionType {
  type:  invoiceStateTypes;
  invoicePayload?: InvoiceData[];
  singleInvoicePayload?: InvoiceData;
  loadingPayload?: boolean
}
export type InvoiceActionTypes = GetInvoiceActionType;
