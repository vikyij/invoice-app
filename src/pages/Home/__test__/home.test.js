import Home from '../index'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../redux/store'

const HomeProvider = ({ mode }) => {
  return (
    <Provider store={store}>
      <Home mode={mode} />
    </Provider>
  )
}

describe('write tests for homepage', () => {
  test('display invoice on page load', async () => {
    render(<HomeProvider mode='dark' />)

    const divWrapper = await screen.findByTestId('div-wrapper-0')
    expect(divWrapper).toBeInTheDocument()
  })
})
afterEach(() => jest.resetAllMocks())
