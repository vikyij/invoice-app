import { getInvoiceAction } from '../actions/InvoiceActions';
import { Dispatch } from 'redux';
import { InvoiceActionTypes, invoiceStateTypes } from '../types/InvoiceTypes';
import { InvoiceData } from '../interfaces/invoice'

export const getInvoices = () => {
  return function (dispatch: Dispatch<InvoiceActionTypes>) {
    dispatch(getInvoiceAction(invoiceStateTypes.LOADING,true))
    return fetch('http://localhost:3000/invoices')
      .then(res => res.json())
      .then(data => {
        dispatch(getInvoiceAction(invoiceStateTypes.LOADING, false))
        dispatch(getInvoiceAction(invoiceStateTypes.GET_INVOICES,false,data.reverse()))
        return data;
      });
  };
};

export const addNewInvoice = (data: InvoiceData) => {
  return function (dispatch: Dispatch<InvoiceActionTypes>) {
    dispatch(getInvoiceAction(invoiceStateTypes.LOADING, true))

    fetch('http://localhost:3000/invoices', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      const loadingTimeOut = setTimeout(() => dispatch(getInvoiceAction(invoiceStateTypes.LOADING, false)), 2000)
      return () => clearInterval(loadingTimeOut)
      
    });
  }
}

export const editInvoice = (data: InvoiceData) => {
  return function(dispatch: Dispatch<InvoiceActionTypes>) {
    dispatch(getInvoiceAction(invoiceStateTypes.LOADING, true))

    fetch(`http://localhost:3000/invoices/${data.data.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {              
        const loadingTimeOut = setTimeout(() => {
          dispatch(getInvoiceAction(invoiceStateTypes.LOADING, false))
          dispatch(getInvoiceAction(invoiceStateTypes.SINGLE_INVOICE,false,[], data))  
        }, 2000)
        return () => clearInterval(loadingTimeOut)
      })
  }
}

export const deleteInvoiceApi = (id?:string) => {
  return function(dispatch: Dispatch<InvoiceActionTypes>) {
    dispatch(getInvoiceAction(invoiceStateTypes.LOADING, true))

    fetch(`http://localhost:3000/invoices/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
      .then(data => {                      
        const loadingTimeOut = setTimeout(() => {
          dispatch(getInvoiceAction(invoiceStateTypes.LOADING, false))
        }, 2000)
        return () => clearInterval(loadingTimeOut)
      })
  }
}

