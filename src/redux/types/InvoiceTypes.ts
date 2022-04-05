import { InvoiceData, Inputs } from '../interfaces/invoice'

export const GET_INVOICES = 'GET_INVOICES';

export interface GetInvoiceStateType {
  invoices: InvoiceData[];
}

interface GetInvoiceActionType {
  type: typeof GET_INVOICES;
  payload: InvoiceData[];
}
export type InvoiceActionTypes = GetInvoiceActionType;