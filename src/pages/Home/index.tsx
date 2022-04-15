import React, { useState, useEffect, useReducer } from 'react'
import classNames from 'classnames'
import downArrow from '../../assets/images/icon-arrow-down.svg'
import plusIcon from '../../assets/images/icon-plus.svg'
import checkIcon from '../../assets/images/icon-check.svg'
import EmptyState from '../../components/EmptyState'
import Status from '../../components/Status'
import InvoiceDetails from '../../components/InvoiceDetails'
import NewInvoice from '../../components/NewInvoice'
import { formatAmount, formatDate } from '../../utils/index.js'
import { InvoiceData } from '../../redux/interfaces/invoice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/store'
import { getInvoices } from '../../redux/effect/invoice'
import { Loading } from '../../components/Loading'

const initialSingleDetail = {
  id: '',
  status: '',
  description: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  createdAt: '',
  paymentDue: new Date(),
  clientName: '',
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientEmail: '',
  items: [
    {
      id: '',
      name: '',
      quantity: '',
      price: '',
      total: 0,
    },
  ],
  total: 0,
  paymentTerms: '',
}

enum filterActionType {
  draft = 'DRAFT',
  pending = 'PENDING',
  paid = 'PAID',
}

interface filterAction {
  type: filterActionType
}

interface filterState {
  draft: boolean
  pending: boolean
  paid: boolean
}

const initialFilterState = {
  draft: false,
  pending: false,
  paid: false,
}

const filterReducer = (state: filterState, action: filterAction) => {
  switch (action.type) {
    case 'DRAFT':
      return { ...state, draft: !state.draft }

    case 'PENDING':
      return { ...state, pending: !state.pending }

    case 'PAID':
      return { ...state, paid: !state.paid }

    default:
      return state
  }
}

const Home = () => {
  const [invoiceData, setInvoiceData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [singleDetail, setSingleDetail] =
    useState<InvoiceData>(initialSingleDetail)
  const [showNewInvoice, setShowNewInvoice] = useState(false)
  const [showFilter, setShowfilter] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInvoices())
  }, [dispatch])

  const { invoices, loading } = useSelector((state: AppState) => state.invoices)

  const handleShowDetails = (invoice: InvoiceData) => {
    setShowDetails(true)
    setSingleDetail(invoice)
  }

  useEffect(() => {
    setInvoiceData(invoices)
    setIsLoading(loading)
  }, [invoices, loading])

  const handleGoBack = () => {
    setShowNewInvoice(false)
    dispatch(getInvoices())
  }

  useEffect(() => {
    const filteredState = Object.entries(filterState)
      .filter(([key, value]) => value === true)
      .map((value) => value[0])

    const filteredInvoiceData = invoiceData?.filter((invoice: InvoiceData) =>
      filteredState.includes(invoice.status)
    )

    setFilteredData(filteredInvoiceData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState])

  const displayData = filteredData.length !== 0 ? filteredData : invoiceData

  return (
    <>
      {showDetails ? (
        <InvoiceDetails
          details={singleDetail}
          goBack={() => {
            setShowDetails(false)
            dispatch(getInvoices())
          }}
        />
      ) : showNewInvoice ? (
        <NewInvoice goBack={handleGoBack} type='new' />
      ) : (
        <div className='bg-light-purple px-5 py-8'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='font-bold text-2xl tracking-tighter text-semi-black'>
                Invoices
              </h1>
              <p className='text-dark-grey tracking-tight text-xs font-medium'>
                {invoiceData?.length} invoices
              </p>
            </div>
            <div className='flex items-center'>
              <div className='mr-4 flex flex-col items-center'>
                <div className='flex items-center'>
                  <p className='font-bold text-sm text-semi-black mr-2'>
                    Filter
                  </p>
                  <img
                    src={downArrow}
                    className='w-2 h-2'
                    alt='filter-dropdown-icon'
                    onClick={() => setShowfilter(!showFilter)}
                  />
                </div>

                <div
                  className={classNames(
                    'w-28 bg-white rounded-lg shadow-3xl absolute mt-10 transition-transform p-4 pt-5',
                    {
                      hidden: !showFilter,
                      block: showFilter,
                      'h-32': showFilter,
                    }
                  )}
                >
                  <div
                    className='flex mb-4'
                    onClick={() => {
                      filterDispatch({ type: filterActionType.draft })
                    }}
                  >
                    <div
                      className={classNames('rounded-sm w-4 h-4 mr-3', {
                        'bg-[#DFE3FA]': !filterState.draft,
                        'bg-purple': filterState.draft,
                      })}
                      data-id='draft'
                    >
                      <img
                        src={checkIcon}
                        className={classNames('my-[0px] mx-[auto] pt-[3px]', {
                          hidden: !filterState.draft,
                          block: filterState.draft,
                        })}
                        alt='checked icon'
                      />
                    </div>
                    <p className='text-xs font-bold text-semi-black'>Draft</p>
                  </div>
                  <div
                    className='flex mb-4'
                    onClick={() => {
                      filterDispatch({ type: filterActionType.pending })
                    }}
                  >
                    <div
                      className={classNames('rounded-sm w-4 h-4 mr-3', {
                        'bg-[#DFE3FA]': !filterState.pending,
                        'bg-purple': filterState.pending,
                      })}
                      data-id='pending'
                    >
                      <img
                        src={checkIcon}
                        className={classNames('my-[0px] mx-[auto] pt-[3px]', {
                          hidden: !filterState.pending,
                          block: filterState.pending,
                        })}
                        alt='checked icon'
                      />
                    </div>
                    <p className='text-xs font-bold text-semi-black'>Pending</p>
                  </div>
                  <div
                    className='flex'
                    onClick={() => {
                      filterDispatch({ type: filterActionType.paid })
                    }}
                  >
                    <div
                      className={classNames('rounded-sm w-4 h-4 mr-3', {
                        'bg-[#DFE3FA]': !filterState.paid,
                        'bg-purple': filterState.paid,
                      })}
                      data-id='paid'
                    >
                      <img
                        src={checkIcon}
                        className={classNames('my-[0px] mx-[auto] pt-[3px]', {
                          hidden: !filterState.paid,
                          block: filterState.paid,
                        })}
                        alt='checked icon'
                      />
                    </div>
                    <p className='text-xs font-bold text-semi-black'>Paid</p>
                  </div>
                </div>
              </div>
              <div
                className='w-[90px] h-10 rounded-3xl bg-purple flex items-center cursor-pointer'
                onClick={() => setShowNewInvoice(true)}
              >
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
          <>
            {isLoading ? (
              <Loading />
            ) : invoiceData?.length === 0 ? (
              <EmptyState />
            ) : (
              displayData?.map((invoice: InvoiceData) => {
                return (
                  <div
                    className='w-full h-36 rounded-lg bg-white mt-4 p-4 py-6 cursor-pointer'
                    key={invoice.id}
                    onClick={() => handleShowDetails(invoice)}
                  >
                    <div className='flex justify-between'>
                      <p className='font-bold text-xs text-semi-black'>
                        <span className='text-dark-grey'>#</span>
                        {invoice.id}
                      </p>
                      <p className='font-bold text-xs text-dark-grey'>
                        {invoice.clientName}
                      </p>
                    </div>
                    <div className='flex justify-between mt-5'>
                      <div>
                        <p className='font-medium text-xs text-dark-grey'>
                          {`Due ${formatDate(invoice.paymentDue)}`}
                        </p>
                        <h2 className='font-bold text-base text-semi-black'>
                          {formatAmount(invoice.total)}
                        </h2>
                      </div>
                      <Status status={invoice.status} />
                    </div>
                  </div>
                )
              })
            )}
          </>
        </div>
      )}
    </>
  )
}

export default Home
