import {
  GET_INVOICES,
  GetInvoiceStateType,
  InvoiceActionTypes
} from '../types/InvoiceTypes';

const initialStateGetInvoices = {
  invoices: []
};

export const getInvoiceReducer = (
  state = initialStateGetInvoices,
  action: InvoiceActionTypes
): GetInvoiceStateType => {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
    default:
      return state;
  }
};