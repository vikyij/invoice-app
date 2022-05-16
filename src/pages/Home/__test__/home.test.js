import Home from '../index'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({ mode }) => {
  return (
    <Provider store={store}>
      <Home mode={mode} />
    </Provider>
  )
}

describe('write tests for homepage', () => {
  test('display invoice on page load', async () => {
    render(<ReduxProvider mode='dark' />)

    const divWrapper = await screen.findByTestId('div-wrapper-0')
    expect(divWrapper).toBeInTheDocument()
  })
})

test('invoice details page is displayed when an invoice is clicked', async () => {
  render(<ReduxProvider mode='dark' />)

  const divWrapper = await screen.findByTestId('div-wrapper-0')
  userEvent.click(divWrapper)
  const statusText = await screen.findByText(/grand total/i)
  expect(statusText).toBeInTheDocument()
})

test('new invoice is displayed when new invoice button is clicked', () => {
  render(<ReduxProvider mode='dark' />)

  const newInvoiceBtn = screen.getByAltText('add-new-invoice-icon')
  userEvent.click(newInvoiceBtn)
  const newInvoiceText = screen.getByText('New Invoice')
  expect(newInvoiceText).toBeInTheDocument()
})
