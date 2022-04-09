import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { formatAmount } from '../../utils/index.js'
import deleteIcon from '../../assets/images/icon-delete.svg'
import leftArrow from '../../assets/images/icon-arrow-left.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addNewInvoice } from '../../redux/effect/invoice'
import { AppState } from '../../redux/store'
import { InlineLoader } from '../Loading'
import { InputValidation } from '../../utils/validationSchema'

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

interface Inputs {
  senderStreet: string
  senderCity: string
  senderCountry: string
  senderPostCode: string
  clientName: string
  clientEmail: string
  clientStreet: string
  clientCity: string
  clientCountry: string
  clientPostCode: string
  createdAt: Date
  description: string
}

const NewInvoice: React.FC<NewInvoiceProps> = ({ goBack }) => {
  let initialInputState = {
    senderStreet: '',
    senderCity: '',
    senderCountry: '',
    senderPostCode: '',
    clientName: '',
    clientEmail: '',
    clientStreet: '',
    clientCity: '',
    clientCountry: '',
    clientPostCode: '',
    createdAt: new Date(),
    description: '',
  }
  const [itemList, setItemList] = useState<Items[]>([
    {
      id: uuidv4(),
      name: '',
      quantity: '',
      price: '',
      total: 0,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [inputs, setInputs] = useState<Inputs>(initialInputState)
  const [paymentTerms, setPaymentTerms] = useState('30')
  const [errors, setErrors] = useState<Inputs>(initialInputState)
  const [itemErrors, setItemErrors] = useState(false)
  const [submitType, setSubmitType] = useState('')

  const dispatch = useDispatch()
  const { loading } = useSelector((state: AppState) => state.invoices)

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentTerms(event.target.value)
  }

  const handleSubmit = (status: string) => {
    let total = itemList.reduce((total, item) => total + item.total, 0)

    let invoiceDate = new Date(inputs.createdAt)
    let length = parseInt(paymentTerms)
    let dueDate = new Date(invoiceDate.setDate(invoiceDate.getDate() + length))

    const invoicePayload = {
      id: generateId(),
      status: status,
      description: inputs.description,
      senderAddress: {
        street: inputs.senderStreet,
        city: inputs.senderCity,
        postCode: inputs.senderPostCode,
        country: inputs.senderCountry,
      },
      createdAt: inputs.createdAt,
      paymentDue: dueDate,
      clientName: inputs.clientName,
      clientAddress: {
        street: inputs.clientStreet,
        city: inputs.clientCity,
        postCode: inputs.clientPostCode,
        country: inputs.clientCountry,
      },
      clientEmail: inputs.clientEmail,
      items: itemList,
      total: total,
      paymentTerms: paymentTerms,
    }

    dispatch(addNewInvoice(invoicePayload))

    const clearInputs = setTimeout(() => {
      setInputs(initialInputState)
      setErrors(initialInputState)
      setItemList([
        {
          id: uuidv4(),
          name: '',
          quantity: '',
          price: '',
          total: 0,
        },
      ])
      setItemErrors(false)
      window.alert('Invoice Created Successfully')
    }, 3000)
    return () => clearTimeout(clearInputs)
  }

  const handleSend = () => {
    let isItemListEmpty = itemList.some(
      (item) => item.name === '' || item.quantity === '' || item.price === ''
    )
    InputValidation.validate(inputs, { abortEarly: false })
      .then(() => {
        if (isItemListEmpty) {
          setItemErrors(true)
        } else {
          handleSubmit('pending')
        }
      })
      .catch((err) => {
        let errList: Inputs = initialInputState
        err.inner.forEach((e: { path: any; message: any }) => {
          errList = { ...errList, [e.path]: e.message }
        })
        setErrors(errList)
      })
  }

  const generateId = () => {
    let randomNum = ''
    let alphabetArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i = 0; i < 2; i++) {
      randomNum = randomNum + alphabetArray[Math.floor(Math.random() * 26)]
    }
    for (let i = 0; i < 4; i++) {
      randomNum = randomNum + Math.floor(Math.random() * 10)
    }
    return randomNum
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
      <div>
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
              name='senderStreet'
              value={inputs.senderStreet}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />

            <span className='mt-5  text-xs text-[red]'>
              {errors?.senderStreet}
            </span>
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
                id='city'
                name='senderCity'
                value={inputs.senderCity}
                onChange={handleChange}
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />

              <span className='mt-5  text-xs text-[red]'>
                {errors?.senderCity}
              </span>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='post-code'
                className='font-normal text-xs text-grey-purple'
              >
                Post Code
              </label>
              <input
                type='number'
                id='post-code'
                name='senderPostCode'
                value={inputs.senderPostCode}
                onChange={handleChange}
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
              <span className='mt-5  text-xs text-[red]'>
                {errors?.senderPostCode}
              </span>
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
              name='senderCountry'
              value={inputs.senderCountry}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />

            <span className='mt-5  text-xs text-[red]'>
              {errors?.senderCountry}
            </span>
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
              name='clientName'
              value={inputs.clientName}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            <span className='mt-5  text-xs text-[red]'>
              {errors?.clientName}
            </span>
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
              name='clientEmail'
              value={inputs.clientEmail}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            <span className='mt-5  text-xs text-[red]'>
              {errors?.clientEmail}
            </span>
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
              name='clientStreet'
              value={inputs.clientStreet}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            <span className='mt-5  text-xs text-[red]'>
              {errors?.clientStreet}
            </span>
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
                name='clientCity'
                value={inputs.clientCity}
                onChange={handleChange}
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />
              <span className='mt-5  text-xs text-[red]'>
                {errors?.clientCity}
              </span>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='client-post-code'
                className='font-normal text-xs text-grey-purple'
              >
                Post Code
              </label>
              <input
                type='number'
                id='client-post-code'
                name='clientPostCode'
                value={inputs.clientPostCode}
                onChange={handleChange}
                className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-[152px] mt-2 p-4'
              />

              <span className='mt-5  text-xs text-[red]'>
                {errors?.clientPostCode}
              </span>
            </div>
          </div>
          <div className='mt-4 mb-2'>
            <label
              htmlFor='client-country'
              className='font-normal text-xs text-grey-purple'
            >
              Country
            </label>
            <input
              type='text'
              id='client-country'
              name='clientCountry'
              value={inputs.clientCountry}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />
            <span className='mt-5  text-xs text-[red]'>
              {errors?.clientCountry}
            </span>
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
              name='createdAt'
              onChange={handleChange}
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
              id='payment-terms'
              name='paymentTerms'
              value={paymentTerms}
              onChange={handleSelectChange}
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
              name='description'
              value={inputs.description}
              onChange={handleChange}
              className='rounded border-[1px] border-solid border-[#DFE3FA] h-12 w-full mt-2 p-4'
            />

            <span className='mt-5  text-xs text-[red]'>
              {errors?.description}
            </span>
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
                  <span className='mt-5  text-xs text-[red]'>
                    {itemErrors ? item.name === '' && 'Enter Item name' : ''}
                  </span>
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
                      type='number'
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
                    <span className='mt-5  text-xs text-[red]'>
                      {itemErrors
                        ? item.quantity === '' && 'Enter quantity'
                        : ''}
                    </span>
                  </div>

                  <div className='flex flex-col'>
                    <label
                      htmlFor='price'
                      className='font-normal text-xs text-grey-purple'
                    >
                      Price
                    </label>
                    <input
                      type='number'
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
                    <span className='mt-5  text-xs text-[red]'>
                      {itemErrors ? item.price === '' && 'Enter price' : ''}
                    </span>
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
          <button className='font-bold text-xs text-grey-purple bg-light-purple rounded-3xl w-24 h-12 mr-2'>
            Discard
          </button>

          <button
            type='submit'
            onClick={() => {handleSubmit('draft')
             setSubmitType('draft')}}
            className='font-bold text-xs text-dark-grey bg-dark-blue rounded-3xl w-[138px] h-12 mr-2'
          >
            {submitType === 'draft' && isLoading ? <InlineLoader /> : 'Save as Draft'}
          </button>

          <button
            type='submit'
            onClick={()=>{handleSend()
              setSubmitType('pending')}}
            className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[138px] h-12'
          >
            {submitType === 'pending' && isLoading ? <InlineLoader /> : 'Save & Send'}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default NewInvoice
