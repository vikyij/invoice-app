import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Status from '../Status'
import Modal from '../Modal'
import { formatDate, formatAmount } from '../../utils/index.js'
import leftArrow from '../../assets/images/icon-arrow-left.svg'
import { InvoiceData } from '../../redux/interfaces/invoice'
import NewInvoice from '../NewInvoice'
import { editInvoice, deleteInvoiceApi } from '../../redux/effect/invoice'
import { AppState } from '../../redux/store'
import { InlineLoader } from '../Loading'

interface InvoiceDetailsProps {
  details: InvoiceData
  goBack: () => void
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ details, goBack }) => {
  const [deleteInvoice, setDeleteInvoice] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceDetails, setInvoiceDetails] = useState(details)
  const [markAsPaid, setMarkAsPaid] = useState(false)

  const dispatch = useDispatch()
  const { loading, singleInvoice } = useSelector(
    (state: AppState) => state.invoices
  )

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    if (singleInvoice !== undefined) {
      setInvoiceDetails(singleInvoice)
    }
  }, [singleInvoice])

  const handlePaid = () => {
    setMarkAsPaid(true)
    const invoicePayload = {
      id: details?.id,
      status: 'paid',
      description: details?.description,
      senderAddress: {
        street: details?.senderAddress.street,
        city: details?.senderAddress.city,
        postCode: details?.senderAddress.postCode,
        country: details?.senderAddress.country,
      },
      createdAt: details?.createdAt,
      paymentDue: details?.paymentDue,
      clientName: details?.clientName,
      clientAddress: {
        street: details?.clientAddress.street,
        city: details?.clientAddress.city,
        postCode: details?.clientAddress.postCode,
        country: details?.clientAddress.country,
      },
      clientEmail: details?.clientEmail,
      items: details?.items,
      total: details?.total,
      paymentTerms: details?.paymentTerms,
    }

    dispatch(editInvoice(invoicePayload))

    const showAlert = setTimeout(() => {
      window.alert('Successful')
      setMarkAsPaid(false)
    }, 3000)

    return () => clearTimeout(showAlert)
  }

  const handleGoBack = (newDetails?: InvoiceData) => {
    setShowEdit(false)
    if (newDetails) {
      setInvoiceDetails(newDetails)
    }
  }

  const handleDelete = (id?: string) => {
    if (id) {
      dispatch(deleteInvoiceApi(id))
      const showAlert = setTimeout(() => {
        window.alert('Invoice deleted Successful')
        setDeleteInvoice(false)
        goBack()
      }, 3000)

      return () => clearTimeout(showAlert)
    }
  }

  return (
    <>
      {showEdit ? (
        <NewInvoice goBack={handleGoBack} type='edit' details={details} />
      ) : (
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
              <Status status={invoiceDetails?.status} />
            </div>

            <div className='w-full rounded-lg bg-white p-6 mb-10'>
              <p className='font-bold text-xs text-semi-black'>
                <span className='text-dark-grey'>#</span>
                {invoiceDetails?.id}
              </p>
              <p className='font-medium text-xs text-grey-purple'>
                {invoiceDetails?.description}
              </p>

              <section className='font-medium text-xs text-grey-purple my-10'>
                <p>{invoiceDetails?.senderAddress.street}</p>
                <p>{invoiceDetails?.senderAddress.city}</p>
                <p>{invoiceDetails?.senderAddress.postCode}</p>
                <p>{invoiceDetails?.senderAddress.country}</p>
              </section>

              <div className='flex justify-between'>
                <section>
                  <p className='font-medium text-xs text-grey-purple'>
                    Invoice Date
                  </p>
                  <p className='font-bold text-sm text-semi-black'>
                    {formatDate(invoiceDetails?.createdAt)}
                  </p>

                  <p className='font-medium text-xs text-grey-purple mt-8'>
                    Payment Due
                  </p>
                  <p className='font-bold text-sm text-semi-black'>
                    {formatDate(invoiceDetails?.paymentDue)}
                  </p>
                </section>
                <section>
                  <p className='font-medium text-xs text-grey-purple'>
                    Bill To
                  </p>
                  <p className='font-bold text-sm text-semi-black'>
                    {invoiceDetails?.clientName}
                  </p>
                  <section className='font-medium text-xs text-grey-purple'>
                    <p>{invoiceDetails?.clientAddress.street}</p>
                    <p>{invoiceDetails?.clientAddress.city}</p>
                    <p>{invoiceDetails?.clientAddress.postCode}</p>
                    <p>{invoiceDetails?.clientAddress.country}</p>
                  </section>
                </section>
              </div>
              <p className='font-medium text-xs text-grey-purple mt-8'>
                Sent to
              </p>
              <p className='font-bold text-sm text-semi-black'>
                {invoiceDetails?.clientEmail}
              </p>

              <section className='w-72 bg-[#F9FAFE] rounded-tr-lg rounded-tl-lg px-6 mt-10 pb-6'>
                {invoiceDetails?.items.map((item) => {
                  return (
                    <div
                      className='flex justify-between items-center pt-6'
                      key={item.id}
                    >
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
                  {formatAmount(invoiceDetails?.total)}
                </p>
              </div>
            </div>
          </div>

          {invoiceDetails?.status !== 'paid' && (
            <footer className='flex justify-between items-center bg-white p-6'>
              <button
                onClick={() => setShowEdit(true)}
                className='font-bold text-xs text-grey-purple bg-[#F9FAFE] rounded-3xl w-[73px] h-12'
              >
                Edit
              </button>
              <button
                className='font-bold text-xs text-white bg-[#EC5757] rounded-3xl w-[89px] h-12'
                onClick={() => setDeleteInvoice(true)}
              >
                Delete
              </button>
              <button
                onClick={handlePaid}
                className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[149px] h-12'
              >
                {markAsPaid && isLoading ? <InlineLoader /> : 'Mark as Paid'}
              </button>
            </footer>
          )}
        </>
      )}

      {deleteInvoice && (
        <Modal
          handleClose={() => setDeleteInvoice(false)}
          width='327px'
          height='220px'
        >
          <div className='bg-white p-6 rounded-md'>
            <p className='font-bold text-xl text-semi-black'>
              Confirm Deletion
            </p>
            <p className='font-normal text-xs text-dark-grey mt-3'>{`Are you sure you want to delete invoice #${invoiceDetails?.id}? This action cannot be undone.`}</p>
            <div className='mt-6 flex justify-end'>
              <button
                className='font-bold text-xs text-grey-purple bg-[#F9FAFE] rounded-3xl w-[91px] h-12 mr-2'
                onClick={() => setDeleteInvoice(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(invoiceDetails?.id)}
                className='font-bold text-xs text-white bg-[#EC5757] rounded-3xl w-[89px] h-12'
              >
                {deleteInvoice && isLoading ? <InlineLoader /> : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default InvoiceDetails
