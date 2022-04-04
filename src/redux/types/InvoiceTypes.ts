import { InvoiceData, Inputs } from '../interfaces/invoice'

export const GET_INVOICES = 'GET_INVOICES';

export interface GetInvoiceStateType {
  invoices: Inputs[];
}

interface GetInvoiceActionType {
  type: typeof GET_INVOICES;
  payload: Inputs[];
}
export type InvoiceActionTypes = GetInvoiceActionType;