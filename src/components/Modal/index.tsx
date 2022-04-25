import React from 'react'
import './modal.css'

interface ModalProps {
  width?: string
  height?: string
  children: React.ReactNode
  handleClose?: () => void
}

const Modal: React.FC<ModalProps> = ({ handleClose, children }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <div className='overlay' onClick={handleClose}>
      <div
        className='w-11/12 md:w-[480px] h-60 md:h-[249px] bg-off-white flex flex-col justify-center items-center rounded-md'
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
