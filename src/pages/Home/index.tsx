import { useState, useEffect, useReducer } from 'react'
import classNames from 'classnames'
import plusIcon from '../../assets/images/icon-plus.svg'
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
import rightArrow from '../../assets/images/icon-arrow-right.svg'
import Filter from '../../components/Filter'
import './home.css'

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

type filterAction = {
  type: filterActionType
}

type filterState = {
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

const Home = ({ mode }: { mode: string }) => {
  const [invoiceData, setInvoiceData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [singleDetail, setSingleDetail] =
    useState<InvoiceData>(initialSingleDetail)
  const [showNewInvoice, setShowNewInvoice] = useState(false)
  const [showFilter, setShowfilter] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [width] = useState(window.innerWidth)

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

  const handleFilter = () => {
    setShowfilter(!showFilter)
  }

  const handleDraft = () => {
    filterDispatch({ type: filterActionType.draft })
  }

  const handlePending = () => {
    filterDispatch({ type: filterActionType.pending })
  }

  const handlePaid = () => {
    filterDispatch({ type: filterActionType.paid })
  }

  return (
    <>
      {showDetails ? (
        <InvoiceDetails
          details={singleDetail}
          goBack={() => {
            setShowDetails(false)
            dispatch(getInvoices())
          }}
          mode={mode}
        />
      ) : showNewInvoice && width < 700 ? (
        <NewInvoice goBack={handleGoBack} type='new' mode={mode} />
      ) : (
        <div
          className={classNames(
            'px-5 py-8 md:w-full md:my-[30px] md:mx-[100px]',
            {
              'bg-light-purple': mode === 'light',
              'bg-black': mode === 'dark',
            }
          )}
        >
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1
                className={classNames('font-bold text-2xl tracking-tighter', {
                  'text-semi-black': mode === 'light',
                  'text-white': mode === 'dark',
                })}
              >
                Invoices
              </h1>
              <p className='text-dark-grey tracking-tight text-xs font-medium'>
                {width > 700
                  ? invoiceData?.length === 1
                    ? 'There is 1 invoice'
                    : `There are ${invoiceData?.length} invoices`
                  : width < 700 && invoiceData?.length === 1
                  ? '1 invoice'
                  : `${invoiceData?.length} invoices`}
              </p>
            </div>
            <div className='flex items-center'>
              <Filter
                mode={mode}
                showFilter={showFilter}
                filterState={filterState}
                handleFilter={handleFilter}
                handleDraft={handleDraft}
                handlePending={handlePending}
                handlePaid={handlePaid}
              />

              <div
                className='w-[90px] md:w-[150px] h-10 rounded-3xl bg-purple flex items-center cursor-pointer'
                onClick={() => setShowNewInvoice(true)}
              >
                <div className='w-8 h-8 bg-white rounded-3xl ml-1.5 mr-1.5'>
                  <img
                    src={plusIcon}
                    className='p-2.5'
                    alt='add-new-invoice-icon'
                  />
                </div>
                <p className='text-white font-bold text-xs'>
                  {width > 700 ? `New invoice` : `New`}
                </p>
              </div>
            </div>
          </div>
          <>
            {isLoading ? (
              <Loading mode={mode} />
            ) : invoiceData?.length === 0 ? (
              <EmptyState mode={mode} />
            ) : (
              displayData?.map((invoice: InvoiceData, index) => {
                return (
                  <div
                    className={classNames(
                      'w-full h-36 md:h-[72px] rounded-lg  mt-4 p-4 py-6 md:py-0 md:px-6 cursor-pointer',
                      {
                        'bg-white': mode === 'light',
                        'bg-dark-purple': mode === 'dark',
                      }
                    )}
                    data-testid={`div-wrapper-${index}`}
                    key={invoice.id}
                    onClick={() => handleShowDetails(invoice)}
                  >
                    <div className='md:hidden'>
                      <div className='flex justify-between'>
                        <p
                          className={classNames('font-bold text-xs', {
                            'text-semi-black': mode === 'light',
                            'text-white': mode === 'dark',
                          })}
                        >
                          <span
                            className={classNames({
                              'text-dark-grey': mode === 'light',
                              'text-grey-purple': mode === 'dark',
                            })}
                          >
                            #
                          </span>
                          {invoice.id}
                        </p>

                        <p
                          className={classNames('font-bold text-xs', {
                            'text-dark-grey': mode === 'light',
                            'text-white': mode === 'dark',
                          })}
                        >
                          {invoice.clientName}
                        </p>
                      </div>
                      <div className='flex justify-between mt-5'>
                        <div>
                          <p
                            className={classNames('font-medium text-xs', {
                              'text-dark-grey': mode === 'light',
                              'text-light-grey': mode === 'dark',
                            })}
                          >
                            {`Due ${formatDate(invoice.paymentDue)}`}
                          </p>
                          <h2
                            className={classNames('font-bold text-base', {
                              'text-semi-black': mode === 'light',
                              'text-white': mode === 'dark',
                            })}
                          >
                            {formatAmount(invoice.total)}
                          </h2>
                        </div>
                        <Status status={invoice.status} mode={mode} />
                      </div>
                    </div>

                    <div className='hidden md:flex justify-between md:items-center md:h-full'>
                      <p
                        className={classNames('font-bold text-xs md:w-[10%]', {
                          'text-semi-black': mode === 'light',
                          'text-white': mode === 'dark',
                        })}
                      >
                        <span
                          className={classNames({
                            'text-dark-grey': mode === 'light',
                            'text-grey-purple': mode === 'dark',
                          })}
                        >
                          #
                        </span>
                        {invoice.id}
                      </p>
                      <p
                        className={classNames('font-medium text-xs md:w-1/5', {
                          'text-dark-grey': mode === 'light',
                          'text-light-grey': mode === 'dark',
                        })}
                      >
                        {`Due ${formatDate(invoice.paymentDue)}`}
                      </p>
                      <p
                        className={classNames('font-bold text-xs md:w-1/5', {
                          'text-dark-grey': mode === 'light',
                          'text-white': mode === 'dark',
                        })}
                      >
                        {invoice.clientName}
                      </p>
                      <h2
                        className={classNames(
                          'font-bold text-base md:w-[15%]',
                          {
                            'text-semi-black': mode === 'light',
                            'text-white': mode === 'dark',
                          }
                        )}
                      >
                        {formatAmount(invoice.total)}
                      </h2>
                      <div className='md:w-[10%]'>
                        <Status status={invoice.status} mode={mode} />
                      </div>

                      <img src={rightArrow} alt='right arrow' />
                    </div>
                  </div>
                )
              })
            )}
          </>
        </div>
      )}

      {showNewInvoice && width > 700 && (
        <div
          className='invoice-overlay'
          onClick={() => setShowNewInvoice(false)}
        >
          <NewInvoice goBack={handleGoBack} type='new' mode={mode} />
        </div>
      )}
    </>
  )
}

export default Home
