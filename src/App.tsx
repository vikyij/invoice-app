import { useState } from 'react'
import classNames from 'classnames'
import Header from './components/Header'
import Home from './pages/Home'

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

  return (
    <div
      className={classNames('h-screen md:h-full md:flex', {
        'bg-light-purple': mode === 'light',
        'bg-black': mode === 'dark',
      })}
    >
      <Header mode={mode} handleMode={handleMode} />
      <Home mode={mode} />
    </div>
  )
}

export default App
