import Status from '../Status'
import { formatDate, formatAmount } from '../../utils/index'
import leftArrow from '../../assets/images/icon-arrow-left.svg'

const InvoiceDetails = ({ details, goBack }) => {
  return (
    <>
      <div className='bg-light-purple px-5 py-8'>
        <div className='flex'>
          <img
            src={leftArrow}
            alt='back arrow icon'
            className='cursor-pointer'
            onClick={goBack}
          />
          <p
            className='font-bold text-xs text-semi-black ml-6 cursor-pointer'
            onClick={goBack}
          >
            Go Back
          </p>
        </div>
        <div className='w-full h-24 rounded-lg bg-white mt-10 mb-4 p-6 flex justify-between items-center'>
          <p className='text-xs font-medium text-[#858BB2]'>Status</p>
          <Status status={details.status} />
        </div>

        <div className='w-full rounded-lg bg-white p-6 mb-10'>
          <p className='font-bold text-xs text-semi-black'>
            <span className='text-dark-grey'>#</span>
            {details.id}
          </p>
          <p className='font-medium text-xs text-grey-purple'>
            {details.description}
          </p>

          <section className='font-medium text-xs text-grey-purple my-10'>
            <p>{details.senderAddress.street}</p>
            <p>{details.senderAddress.city}</p>
            <p>{details.senderAddress.postCode}</p>
            <p>{details.senderAddress.country}</p>
          </section>

          <div className='flex justify-between'>
            <section>
              <p className='font-medium text-xs text-grey-purple'>
                Invoice Date
              </p>
              <p className='font-bold text-sm text-semi-black'>
                {formatDate(details.createdAt)}
              </p>

              <p className='font-medium text-xs text-grey-purple mt-8'>
                Payment Due
              </p>
              <p className='font-bold text-sm text-semi-black'>
                {formatDate(details.paymentDue)}
              </p>
            </section>
            <section>
              <p className='font-medium text-xs text-grey-purple'>Bill To</p>
              <p className='font-bold text-sm text-semi-black'>
                {details.clientName}
              </p>
              <section className='font-medium text-xs text-grey-purple'>
                <p>{details.clientAddress.street}</p>
                <p>{details.clientAddress.city}</p>
                <p>{details.clientAddress.postCode}</p>
                <p>{details.clientAddress.country}</p>
              </section>
            </section>
          </div>
          <p className='font-medium text-xs text-grey-purple mt-8'>Sent to</p>
          <p className='font-bold text-sm text-semi-black'>
            {details.clientEmail}
          </p>

          <section className='w-72 bg-[#F9FAFE] rounded-tr-lg rounded-tl-lg px-6 mt-10 pb-6'>
            {details.items.map((item) => {
              return (
                <div className='flex justify-between items-center pt-6'>
                  <div>
                    <p className='font-bold text-xs text-semi-black'>
                      {item.name}
                    </p>
                    <p className='font-bold text-xs text-grey-purple mt-2'>{`${
                      item.quantity
                    } x ${formatAmount(item.price)}`}</p>
                  </div>
                  <p className='font-bold text-xs text-semi-black'>
                    {formatAmount(item.total)}
                  </p>
                </div>
              )
            })}
          </section>

          <div className='w-72 h-20 bg-dark-blue rounded-bl-lg rounded-br-lg p-6 flex justify-between items-center'>
            <p className='font-medium text-xs text-white'>Grand Total</p>
            <p className='font-bold text-xl text-white'>
              {formatAmount(details.total)}
            </p>
          </div>
        </div>
      </div>

      <footer className='flex justify-between items-center bg-white p-6'>
        <button className='font-bold text-xs text-grey-purple bg-[#F9FAFE] rounded-3xl w-[73px] h-12'>
          Edit
        </button>
        <button className='font-bold text-xs text-white bg-[#EC5757] rounded-3xl w-[89px] h-12'>
          Delete
        </button>
        <button className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[149px] h-12'>
          Mark as Paid
        </button>
      </footer>
    </>
  )
}

export default InvoiceDetails
