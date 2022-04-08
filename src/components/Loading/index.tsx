import './inlineloader.css'

export const Loading = () => {
  return (
    <>
      {[...Array(4)].map((i, index) => {
        return (
          <div
            key={index + 1}
            className='w-full h-36 rounded-lg bg-white mt-4 p-4 py-6 cursor-pointer'
          >
            <div className='flex justify-between'>
              <p className='bg-grey w-24 h-5 rounded'></p>
              <p className='bg-grey w-24 h-5 rounded'></p>
            </div>

            <div className='flex justify-between mt-8'>
              <div>
                <p className='bg-grey w-24 h-5 rounded mb-2'></p>
                <p className='bg-grey w-32 h-5 rounded'></p>
              </div>
              <p className='bg-grey w-24 h-5 rounded'></p>
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
