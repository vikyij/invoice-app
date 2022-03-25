import downArrow from '../../assets/images/icon-arrow-down.svg'
import plusIcon from '../../assets/images/icon-plus.svg'

const Home = () => {
  return (
    <div className='bg-light-purple px-5 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-2xl tracking-tighter text-semi-black'>
            Invoices
          </h1>
          <p className='text-dark-grey tracking-tight text-xs font-medium'>
            7 invoices
          </p>
        </div>
        <div className='flex'>
          <div className='mr-4 flex items-center'>
            <p className='font-bold text-sm text-semi-black mr-2'>Filter</p>
            <img
              src={downArrow}
              className='w-2 h-2'
              alt='filter-dropdown-icon'
            />
          </div>
          <div className='w-20 h-10 rounded-3xl bg-purple flex items-center'>
            <div className='w-8 h-8 bg-white rounded-3xl ml-1.5 mr-1.5'>
              <img
                src={plusIcon}
                className='p-2.5'
                alt='add-new-invoice-icon'
              />
            </div>
            <p className='text-white font-bold text-xs'>New</p>
          </div>
        </div>
      </div>
      {[...Array(5)].map((invoice) => {
        return (
          <div className='w-full h-32 rounded-lg bg-white mt-4 p-4 py-6'>
            <div className='flex justify-between'>
              <p className='font-bold text-sm text-semi-black'>
                <span className='text-dark-grey'>#</span>RT3080
              </p>
              <p className='font-bold text-sm text-dark-grey'>Jensen Huang</p>
            </div>
            <div className='flex justify-between mt-5'>
              <div>
                <p className='font-medium text-sm text-dark-grey'>
                  Due 19 Aug 2021
                </p>
                <h2 className='font-bold text-base text-semi-black'>
                  £ 1,800.90
                </h2>
              </div>
              <div className='w-24 h-10 rounded-md bg-light-green flex items-center justify-center'>
                <span className='bg-green w-2 h-2 rounded-3xl mr-2'></span>
                <p className='text-green font-bold text-md'>Paid</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
