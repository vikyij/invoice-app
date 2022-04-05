import { useState, useEffect } from 'react'
import downArrow from '../../assets/images/icon-arrow-down.svg'
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

const Home = () => {
  const [invoiceData, setInvoiceData] = useState({ invoices: [] })
  const [showDetails, setShowDetails] = useState(false)
  const [singleDetail, setSingleDetail] = useState<InvoiceData>()
  const [showNewInvoice, setShowNewInvoice] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInvoices())
  }, [dispatch])

  const invoices = useSelector((state: AppState) => state.invoices)

  const handleShowDetails = (invoice: InvoiceData) => {
    setShowDetails(true)
    setSingleDetail(invoice)
  }

  useEffect(() => setInvoiceData(invoices), [invoices])

  return (
    <>
      {showDetails ? (
        <InvoiceDetails
          details={singleDetail}
          goBack={() => setShowDetails(false)}
        />
      ) : showNewInvoice ? (
        <NewInvoice goBack={() => setShowNewInvoice(false)} />
      ) : (
        <div className='bg-light-purple px-5 py-8'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='font-bold text-2xl tracking-tighter text-semi-black'>
                Invoices
              </h1>
              <p className='text-dark-grey tracking-tight text-xs font-medium'>
                {invoiceData?.invoices?.length} invoices
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
            {invoiceData?.invoices.length === 0 ? (
              <EmptyState />
            ) : (
              invoiceData?.invoices?.map((invoice: InvoiceData) => {
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
