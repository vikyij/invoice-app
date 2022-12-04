import classNames from 'classnames'
import { useContext } from 'react'
import './inlineloader.css'
import { ModeContext } from '../../App'

export const Loading = () => {
  const { mode } = useContext(ModeContext)
  return (
    <>
      {[...Array(4)].map((i, index) => {
        return (
          <div
            key={index + 1}
            className={classNames(
              'w-full h-36 rounded-lg  mt-4 p-4 py-6 cursor-pointer loading',
              {
                'bg-white': mode === 'light',
                'bg-dark-purple': mode === 'dark',
              }
            )}
          >
            <div className='flex justify-between'>
              <p
                className={classNames('bg-grey w-24 h-5 rounded', {
                  'bg-[#1F2C3F]': mode === 'dark',
                  'bg-grey': mode === 'light',
                })}
              ></p>
              <p
                className={classNames('bg-grey w-24 h-5 rounded', {
                  'bg-[#1F2C3F]': mode === 'dark',
                  'bg-grey': mode === 'light',
                })}
              ></p>
            </div>

            <div className='flex justify-between mt-8'>
              <div>
                <p
                  className={classNames('bg-grey w-24 h-5 rounded mb-2', {
                    'bg-[#1F2C3F]': mode === 'dark',
                    'bg-grey': mode === 'light',
                  })}
                ></p>
                <p
                  className={classNames('bg-grey w-32 h-5 rounded', {
                    'bg-[#1F2C3F]': mode === 'dark',
                    'bg-grey': mode === 'light',
                  })}
                ></p>
              </div>
              <p
                className={classNames('bg-grey w-24 h-5 rounded', {
                  'bg-[#1F2C3F]': mode === 'dark',
                  'bg-grey': mode === 'light',
                })}
              ></p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export const InlineLoader = () => {
  return (
    <div className='LoadingWrapper'>
      <div className='BtnLoading'></div>
    </div>
  )
}
