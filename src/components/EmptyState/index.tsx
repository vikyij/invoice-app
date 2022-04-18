import classNames from 'classnames'
import emptyStateImg from '../../assets/images/illustration-empty.svg'

const EmptyState = ({ mode }: { mode: string }) => {
  return (
    <div className='flex flex-col justify-center items-center h-[66.5vh]'>
      <img src={emptyStateImg} alt='empty-state-illustration' />
      <h2
        className={classNames('font-bold text-xl mt-6 mb-4', {
          'text-semi-black': mode === 'light',
          'text-white': mode === 'dark',
        })}
      >
        There is nothing here
      </h2>
      <p
        className={classNames('font-normal text-sm text-center w-60', {
          'text-dark-grey': mode === 'light',
          'text-light-grey': mode === 'dark',
        })}
      >
        Create an invoice by clicking the <span className='font-bold'>New</span>{' '}
        button and get started
      </p>
    </div>
  )
}

export default EmptyState
