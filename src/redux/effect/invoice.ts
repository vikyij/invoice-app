import { getInvoiceAction } from '../actions/InvoiceActions';
import { Dispatch } from 'redux';
import { InvoiceActionTypes } from '../types/InvoiceTypes';
import { InvoiceData } from '../interfaces/invoice'

export const getInvoices = () => {
  return function (dispatch: Dispatch<InvoiceActionTypes>) {
    fetch('http://localhost:3000/invoices')
      .then(res => res.json())
      .then(data => {
        dispatch(getInvoiceAction(data.reverse()));        
        return data;
      });
  };
};

export const addNewInvoice = (data: InvoiceData) => {
  return function () {
    fetch('http://localhost:3000/invoices', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      console.log(data);
    });
  }
}
