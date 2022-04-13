import { invoiceStateTypes,
  InvoiceActionTypes } from '../types/InvoiceTypes';
import { InvoiceData, } from '../interfaces/invoice';

export const getInvoiceAction = ( type: invoiceStateTypes, loading?: boolean,invoices?: InvoiceData[], singleInvoice?: InvoiceData): InvoiceActionTypes => {
  return {
    type: type,
    invoicePayload: invoices,
    singleInvoicePayload: singleInvoice,
    loadingPayload: loading,
  };
};
