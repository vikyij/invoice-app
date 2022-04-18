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
    <header className='w-full h-20 bg-dark-blue flex justify-between'>
      <img src={ovalIcon} alt='left side header svg' />

      <div className='flex items-center'>
        {mode === 'light' ? (
          <img
            src={moonIcon}
            onClick={() => handleMode('dark')}
            className='w-5 h-5 mr-6'
            alt='moon icon'
          />
        ) : (
          <img
            src={sunIcon}
            onClick={() => handleMode('light')}
            className='w-5 h-5 mr-6'
            alt='sun icon'
          />
        )}

        <p className='h-20 w-px bg-dark-grey'></p>
        <img
          src={userAvatar}
          className='w-8 h-8 rounded-full mx-8'
          alt='user avatar'
        />
      </div>
    </header>
  )
}

export default Header
