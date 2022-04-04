import { combineReducers } from 'redux';
import { getInvoiceReducer } from './InvoiceReducers';

const rootReducer = combineReducers({
  invoices: getInvoiceReducer
});

export default rootReducer;