import {
  invoiceStateTypes,
  GetInvoiceStateType,
  InvoiceActionTypes,
} from '../types/InvoiceTypes';

const initialStateGetInvoices = {
  invoices: [],
  loading: false,
};

export const getInvoiceReducer = (
  state = initialStateGetInvoices,
  action: InvoiceActionTypes
): GetInvoiceStateType => {
  switch (action.type) {
    case invoiceStateTypes.GET_INVOICES:
      return {
        ...state,
        invoices: action.invoicePayload
      };
    case invoiceStateTypes.LOADING: 
    return {
       ...state,
       loading: action.loadingPayload
    }
    default:
      return state;
  }
};