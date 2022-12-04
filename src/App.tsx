import { createContext, Dispatch, useState } from 'react'
import classNames from 'classnames'
import Home from './pages/Home'
import InvoiceDetails from './components/InvoiceDetails'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

type ContextType = {
  mode: string
  setMode: Dispatch<React.SetStateAction<string>>
}
export const ModeContext = createContext<ContextType>({
  mode: '',
  setMode: () => {},
})

const App = () => {
  let selectedMode = localStorage.getItem('mode')

  const [mode, setMode] = useState(
    selectedMode === null ? 'light' : selectedMode
  )

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'invoice/:invoiceId',
      element: <InvoiceDetails />,
    },
  ])
  return (
    <div
      className={classNames('h-screen md:h-full md:flex', {
        'bg-light-purple': mode === 'light',
        'bg-black': mode === 'dark',
      })}
    >
      <ModeContext.Provider value={{ mode, setMode }}>
        <RouterProvider router={router} />
      </ModeContext.Provider>
    </div>
  )
}

export default App
