import { formatAmount } from '../../utils/index.js'
import deleteIcon from '../../assets/images/icon-delete.svg'
import leftArrow from '../../assets/images/icon-arrow-left.svg'

interface NewInvoiceProps {
  goBack: () => void
}

const NewInvoice: React.FC<NewInvoiceProps> = ({ goBack }) => {
  return (
    <div>
      <div className='flex px-5 pt-8'>
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
      <h1 className='font-bold text-2xl text-semi-black my-8 px-5'>
        New Invoice
      </h1>
      <form>
        <section className='px-5'>
          <p className='font-bold text-xs text-[#7C5DFA]'>Bill From</p>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='address'
              className='font-normal text-xs text-grey-purple'
            >
              Street Address
            </label>
            <input
              type='text'
              name='address'
              id='address'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
          <div className='mt-5 mb-2 flex justify-between'>
            <div className='flex flex-col'>
              <label
                htmlFor='city'
                className='font-normal text-xs text-grey-purple'
              >
                City
              </label>
              <input
                type='text'
                name='city'
                id='city'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='post-code'
                className='font-normal text-xs text-grey-purple'
              >
                Post Code
              </label>
              <input
                type='text'
                name='post-code'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
            </div>
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='country'
              className='font-normal text-xs text-grey-purple'
            >
              Country
            </label>
            <input
              type='text'
              name='country'
              id='country'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
        </section>

        <section className='mt-8 px-5'>
          <p className='font-bold text-xs text-[#7C5DFA] '>Bill To</p>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='client-name'
              className='font-normal text-xs text-grey-purple'
            >
              Client's Name
            </label>
            <input
              type='text'
              name='client-name'
              id='client-name'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='client-email'
              className='font-normal text-xs text-grey-purple'
            >
              Client's Email
            </label>
            <input
              type='text'
              name='client-email'
              id='client-email'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>

          <div className='mt-4 mb-2'>
            <label
              htmlFor='client-address'
              className='font-normal text-xs text-grey-purple'
            >
              Street Address
            </label>
            <input
              type='text'
              name='client-address'
              id='client-address'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
          <div className='mt-5 mb-2 flex justify-between'>
            <div className='flex flex-col'>
              <label
                htmlFor='client-city'
                className='font-normal text-xs text-grey-purple'
              >
                City
              </label>
              <input
                type='text'
                name='client-city'
                id='client-city'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='client-post-code'
                className='font-normal text-xs text-grey-purple'
              >
                Post Code
              </label>
              <input
                type='text'
                name='post-code'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
            </div>
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='invoice-date'
              className='font-normal text-xs text-grey-purple'
            >
              Invoice Date
            </label>
            <input
              type='date'
              name='invoice-date'
              id='invoice-date'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='payment-terms'
              className='font-normal text-xs text-grey-purple'
            >
              Payment terms
            </label>
            <select
              name='payment-terms'
              id='payment-terms'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4 font-bold text-xs'
            >
              <option value='1'>Net 1 Day</option>
              <option value='7'>Net 7 Days</option>
              <option value='14'>Net 14 Days</option>
              <option value='30' selected>
                Net 30 Days
              </option>
            </select>
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='project-desc'
              className='font-normal text-xs text-grey-purple'
            >
              Project Description
            </label>
            <input
              type='text'
              name='project-description'
              id='project-description'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
        </section>

        <section className='mt-10 px-5'>
          <p className='font-bold text-lg text-[#777F98]'>Item List</p>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='item-name'
              className='font-normal text-xs text-grey-purple'
            >
              Item Name
            </label>
            <input
              type='text'
              name='item-name'
              id='item-name'
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
          </div>
          <div className='mt-5 mb-2 flex justify-between'>
            <div className='flex flex-col'>
              <label
                htmlFor='quantity'
                className='font-normal text-xs text-grey-purple'
              >
                Qty.
              </label>
              <input
                type='text'
                name='quantity'
                id='quantity'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-16 mt-2 p-4'
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='price'
                className='font-normal text-xs text-grey-purple'
              >
                Price
              </label>
              <input
                type='text'
                name='price'
                id='price'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[100px] mt-2 p-4'
              />
            </div>

            <div className='flex flex-col'>
              <p className='font-normal text-xs text-grey-purple'>Total</p>
              <p className='font-bold text-xs text-dark-grey mt-6'>
                {formatAmount(156)}
              </p>
            </div>
            <div className='mt-10'>
              <img src={deleteIcon} alt='delete-item' />
            </div>
          </div>
        </section>

        <div className='px-5'>
          <button className='w-full h-12 font-bold text-xs text-grey-purple mt-8 bg-[#F9FAFE] rounded-3xl'>
            + Add New Item
          </button>
        </div>
        <footer className='flex justify-end items-center bg-[#F9FAFE] p-6 h-28 mt-10'>
          <button className='font-bold text-xs text-grey-purple bg-[#F9FAFE] rounded-3xl w-24 h-12 mr-2'>
            Cancel
          </button>

          <button className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[138px] h-12'>
            Save Changes
          </button>
        </footer>
      </form>
    </div>
  )
}

export default NewInvoice
