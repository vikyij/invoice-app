import { useEffect, useState } from 'react'
import classNames from 'classnames'
import checkIcon from '../../assets/images/icon-check.svg'
import './toast.css'

type ToastType = {
  type: string
  message: string
}

const Toast = ({ type, message }: ToastType) => {
  const [clearToast, setClearToast] = useState('')

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setClearToast('toast-fade-out')
    }, 3000)
    return () => clearTimeout(toastTimeout)
  }, [])

  return (
    <div className={`flex justify-center items-center ${clearToast}`}>
      <div
        className={classNames(
          `w-[90%] md:w-[350px] h-[50px] flex justify-center items-center bg-[#F6FFED] fixed rounded border text-semi-black`,
          {
            'border-[red]': type === 'error',
            'border-[#52C41A]': type === 'success',
          }
        )}
      >
        <div
          className={classNames(
            'rounded-sm w-4 h-4 mr-3 cursor-pointer bg-[#52C41A]'
          )}
          data-id='draft'
        >
          <img
            src={checkIcon}
            className={classNames('my-[0px] mx-[auto] pt-[3px]')}
            alt='checked icon'
          />
        </div>
        <p className='text-semi-black'>{message}</p>
      </div>
    </div>
  )
}

export default Toast
