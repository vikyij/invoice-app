import { GET_INVOICES,
  InvoiceActionTypes } from '../types/InvoiceTypes';
import { InvoiceData, Inputs } from '../interfaces/invoice';

export const getInvoiceAction = (invoices: InvoiceData[]): InvoiceActionTypes => {
  return {
    type: GET_INVOICES,
    payload: invoices
  };
};