import { useState } from 'react'
import classNames from 'classnames'
import Header from './components/Header'
import Home from './pages/Home'
import InvoiceDetails from './components/InvoiceDetails'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const App = () => {
  let selectedMode = localStorage.getItem('mode')

  const [mode, setMode] = useState(
    selectedMode === null ? 'light' : selectedMode
  )

  const handleMode = (mode: string) => {
    setMode(mode)
    if (mode === 'light') {
      localStorage.setItem('mode', 'light')
    } else {
      localStorage.setItem('mode', 'dark')
    }
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home mode={mode} />,
    },
    {
      path: 'invoice/:invoiceId',
      element: <InvoiceDetails mode={mode} />,
    },
  ])
  return (
    <div
      className={classNames('h-screen md:h-full md:flex', {
        'bg-light-purple': mode === 'light',
        'bg-black': mode === 'dark',
      })}
    >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
