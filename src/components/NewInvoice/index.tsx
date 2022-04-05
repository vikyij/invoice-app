import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { formatAmount } from '../../utils/index.js'
import deleteIcon from '../../assets/images/icon-delete.svg'
import leftArrow from '../../assets/images/icon-arrow-left.svg'
import { useDispatch } from 'react-redux'
import { InvoiceData } from '../../redux/interfaces/invoice'
import { addNewInvoice,getInvoices } from '../../redux/effect/invoice'

interface NewInvoiceProps {
  goBack: () => void
}

interface Items {
  id: string
  name: string
  quantity: string
  price: string
  total: number
}

const NewInvoice: React.FC<NewInvoiceProps> = ({ goBack }) => {
  const [itemList, setItemList] = useState<Items[]>([
    {
      id: uuidv4(),
      name: '',
      quantity: '',
      price: '',
      total: 0,
    },
  ])

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceData>()

  const onSubmit: SubmitHandler<InvoiceData> = (data) => {
    let total = itemList.reduce((total, item) => total + item.total, 0)

    let invoiceDate = new Date(data.createdAt)
    let length = parseInt(data.paymentTerms)
    let dueDate = new Date(invoiceDate.setDate(invoiceDate.getDate() + length))

    data.items = itemList
    data.total = total
    data.paymentDue = dueDate
    data.status='pending'
    dispatch(addNewInvoice(data))
    dispatch(getInvoices())
  }

  const addNewItem = () => {
    setItemList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: '',
        quantity: '',
        price: '',
        total: 0,
      },
    ])
  }

  const handleDelete = (id: string) => {
    if (itemList.length > 1) {
      const filteredItems = itemList.filter((item) => item.id !== id)
      setItemList(filteredItems)
    }
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
              id='address'
              {...register('senderAddress.street', {
                required: 'Enter your address',
              })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.senderAddress?.street && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.senderAddress.street.message}
              </span>
            )}
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
                {...register('senderAddress.city', {
                  required: 'Enter your city',
                })}
                id='city'
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
              {errors?.senderAddress?.city && (
                <span className='mt-5  text-xs text-[red]'>
                  {errors.senderAddress.city.message}
                </span>
              )}
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
                id='post-code'
                {...register('senderAddress.postCode')}
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
              id='country'
              {...register('senderAddress.country', {
                required: 'Enter your country',
              })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.senderAddress?.country && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.senderAddress.country.message}
              </span>
            )}
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
              id='client-name'
              {...register('clientName', { required: "Enter Client's Name" })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.clientName && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.clientName.message}
              </span>
            )}
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='client-email'
              className='font-normal text-xs text-grey-purple'
            >
              Client's Email
            </label>
            <input
              type='email'
              id='client-email'
              {...register('clientEmail', {
                required: "Enter Client's email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Enter a valid e-mail address',
                },
              })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.clientEmail && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.clientEmail.message}
              </span>
            )}
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
              id='client-address'
              {...register('clientAddress.street', {
                required: "Enter Client's address",
              })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.clientAddress?.street && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.clientAddress.street.message}
              </span>
            )}
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
                id='client-city'
                {...register('clientAddress.city', {
                  required: "Enter Client's city",
                })}
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
              {errors.clientAddress?.city && (
                <span className='mt-5  text-xs text-[red]'>
                  {errors.clientAddress.city.message}
                </span>
              )}
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
                id='client-post-code'
                {...register('clientAddress.postCode')}
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
              id='invoice-date'
              {...register('createdAt', { required: 'Enter Invoice Date' })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            {errors.createdAt && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.createdAt.message}
              </span>
            )}
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='payment-terms'
              className='font-normal text-xs text-grey-purple'
            >
              Payment terms
            </label>
            <select
              id='payment-terms'
              defaultValue='30'
              {...register('paymentTerms', { required: true })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4 font-bold text-xs'
            >
              <option value='1'>Net 1 Day</option>
              <option value='7'>Net 7 Days</option>
              <option value='14'>Net 14 Days</option>
              <option value='30'>Net 30 Days</option>
            </select>
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='project-description'
              className='font-normal text-xs text-grey-purple'
            >
              Project Description
            </label>
            <input
              type='text'
              id='project-description'
              {...register('description', {
                required: 'Enter project description',
              })}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />

            {errors.description && (
              <span className='mt-5  text-xs text-[red]'>
                {errors.description.message}
              </span>
            )}
          </div>
        </section>

        <section className='mt-10 px-5'>
          <p className='font-bold text-lg text-[#777F98]'>Item List</p>
          {itemList.map((item, index) => {
            return (
              <div className='mb-8' key={index}>
                <div className='mt-4 mb-2'>
                  <label
                    htmlFor='item-name'
                    className='font-normal text-xs text-grey-purple'
                  >
                    Item Name
                  </label>
                  <input
                    type='text'
                    id='item-name'
                    name='itemName'
                    value={item.name}
                    onChange={(event) => {
                      item.name = event.target.value
                      setItemList([...itemList])
                    }}
                    className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
                    required
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
                      id='quantity'
                      name='quantity'
                      value={item.quantity}
                      onChange={(event) => {
                        item.quantity = event.target.value
                        item.total = +item.quantity * +item.price
                        setItemList([...itemList])
                      }}
                      className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-16 mt-2 p-4'
                      required
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
                      id='price'
                      name='price'
                      value={item.price}
                      onChange={(event) => {
                        item.price = event.target.value
                        item.total = +item.quantity * +item.price
                        setItemList([...itemList])
                      }}
                      className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[100px] mt-2 p-4'
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <p className='font-normal text-xs text-grey-purple'>
                      Total
                    </p>
                    <p className='font-bold text-xs text-dark-grey mt-6'>
                      {formatAmount(item.total)}
                    </p>
                  </div>
                  <div className='mt-10'>
                    <img
                      src={deleteIcon}
                      alt='delete-item'
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <div className='px-5'>
          <button
            type='button'
            className='w-full h-12 font-bold text-xs text-grey-purple mt-8 bg-[#F9FAFE] rounded-3xl'
            onClick={addNewItem}
          >
            + Add New Item
          </button>
        </div>
        <footer className='flex justify-end items-center bg-[#F9FAFE] p-6 h-28 mt-10'>
          <button className='font-bold text-xs text-grey-purple bg-[#F9FAFE] rounded-3xl w-24 h-12 mr-2'>
            Cancel
          </button>

          <button
            type='submit'
            className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[138px] h-12'
          >
            Save Changes
          </button>
        </footer>
      </form>
    </div>
  )
}

export default NewInvoice
