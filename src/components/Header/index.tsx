import React from 'react'
import ovalIcon from '../../assets/images/oval.svg'
import moonIcon from '../../assets/images/icon-moon.svg'
import userAvatar from '../../assets/images/image-avatar.jpg'
import sunIcon from '../../assets/images/icon-sun.svg'

interface HeaderProps {
  mode: string
  handleMode: (mode: string) => void
}

const Header: React.FC<HeaderProps> = ({ mode, handleMode }) => {
  return (
    <header className='w-full md:w-20 md:h-auto md:min-h-screen h-20 bg-dark-blue flex md:flex-col justify-between md:rounded-tr-3xl md:rounded-br-3xl'>
      <img src={ovalIcon} alt='left side header svg' />

      <div className='flex md:flex-col items-center md:justify-between'>
        {mode === 'light' ? (
          <img
            src={moonIcon}
            onClick={() => handleMode('dark')}
            className='w-5 h-5 mr-6 md:mr-0 cursor-pointer'
            alt='moon icon'
          />
        ) : (
          <img
            src={sunIcon}
            onClick={() => handleMode('light')}
            className='w-5 h-5 mr-6 md:mr-0 cursor-pointer'
            alt='sun icon'
          />
        )}

        <p className='h-20 md:h-px w-px md:w-20 bg-dark-grey md:my-6'></p>
        <img
          src={userAvatar}
          className='w-8 h-8 rounded-full mx-8 md:mb-4'
          alt='user avatar'
        />
      </div>
    </header>
  )
}

export default Header
