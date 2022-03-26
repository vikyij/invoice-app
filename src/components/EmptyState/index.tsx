import emptyStateImg from '../../assets/images/illustration-empty.svg'

const EmptyState = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[66.5vh]'>
      <img src={emptyStateImg} alt='empty-state-illustration' />
      <h2 className='font-bold text-xl text-semi-black mt-6 mb-4'>
        There is nothing here
      </h2>
      <p className='font-normal text-sm text-dark-grey text-center w-60'>
        Create an invoice by clicking the <span className='font-bold'>New</span>{' '}
        button and get started
      </p>
    </div>
  )
}

export default EmptyState
