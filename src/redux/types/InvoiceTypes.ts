import { InvoiceData } from '../interfaces/invoice'

// export const GET_INVOICES = 'GET_INVOICES';
// export const LOADING = 'LOADING'

export enum invoiceStateTypes {
  GET_INVOICES = 'GET_INVOICES',
   LOADING = 'LOADING'
}

export interface GetInvoiceStateType {
  invoices?: InvoiceData[];
  loading?: boolean
}

// export interface loadingStateType {
//   loading: boolean
// }

// interface GetLoadingType {
//   type: typeof LOADING;
//   invoicePayload: boolean,
// }

interface GetInvoiceActionType {
  type:  invoiceStateTypes;
  invoicePayload?: InvoiceData[];
  loadingPayload?: boolean
}
export type InvoiceActionTypes = GetInvoiceActionType;
// export type loadingType = GetLoadingType