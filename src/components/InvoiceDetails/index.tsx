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
import classNames from 'classnames'

interface InvoiceDetailsProps {
  details: InvoiceData
  goBack: () => void
  mode: string
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  details,
  goBack,
  mode,
}) => {
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
        <NewInvoice
          goBack={handleGoBack}
          type='edit'
          details={details}
          mode={mode}
        />
      ) : (
        <>
          <div
            className={classNames('px-5 py-8', {
              'bg-light-purple': mode === 'light',
              'bg-black': mode === 'dark',
            })}
          >
            <div className='flex'>
              <img
                src={leftArrow}
                alt='back arrow icon'
                className='cursor-pointer'
                onClick={goBack}
              />
              <p
                className={classNames('font-bold text-xs ml-6 cursor-pointer', {
                  'text-semi-black': mode === 'light',
                  'text-white': mode === 'dark',
                })}
                onClick={goBack}
              >
                Go Back
              </p>
            </div>
            <div
              className={classNames(
                'w-full h-24 rounded-lg mt-10 mb-4 p-6 flex justify-between items-center',
                {
                  'bg-white': mode === 'light',
                  'bg-dark-purple': mode === 'dark',
                }
              )}
            >
              <p className='text-xs font-medium text-[#858BB2]'>Status</p>
              <Status status={invoiceDetails?.status} mode={mode} />
            </div>

            <div
              className={classNames('w-full rounded-lg p-6 mb-10', {
                'bg-white': mode === 'light',
                'bg-dark-purple': mode === 'dark',
              })}
            >
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
                {invoiceDetails?.id}
              </p>
              <p
                className={classNames('font-medium text-xs ', {
                  'text-grey-purple': mode === 'light',
                  'text-light-grey': mode === 'dark',
                })}
              >
                {invoiceDetails?.description}
              </p>

              <section
                className={classNames('font-medium text-xs my-10', {
                  'text-grey-purple': mode === 'light',
                  'text-light-grey': mode === 'dark',
                })}
              >
                <p>{invoiceDetails?.senderAddress.street}</p>
                <p>{invoiceDetails?.senderAddress.city}</p>
                <p>{invoiceDetails?.senderAddress.postCode}</p>
                <p>{invoiceDetails?.senderAddress.country}</p>
              </section>

              <div className='flex justify-between'>
                <section>
                  <p
                    className={classNames('font-medium text-xs', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    Invoice Date
                  </p>
                  <p
                    className={classNames('font-bold text-sm', {
                      'text-semi-black': mode === 'light',
                      'text-white': mode === 'dark',
                    })}
                  >
                    {formatDate(invoiceDetails?.createdAt)}
                  </p>

                  <p
                    className={classNames('font-medium text-xs mt-8', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    Payment Due
                  </p>
                  <p
                    className={classNames('font-bold text-sm', {
                      'text-semi-black': mode === 'light',
                      'text-white': mode === 'dark',
                    })}
                  >
                    {formatDate(invoiceDetails?.paymentDue)}
                  </p>
                </section>
                <section>
                  <p
                    className={classNames('font-medium text-xs', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    Bill To
                  </p>
                  <p
                    className={classNames('font-bold text-sm', {
                      'text-semi-black': mode === 'light',
                      'text-white': mode === 'dark',
                    })}
                  >
                    {invoiceDetails?.clientName}
                  </p>
                  <section
                    className={classNames('font-medium text-xs', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    <p>{invoiceDetails?.clientAddress.street}</p>
                    <p>{invoiceDetails?.clientAddress.city}</p>
                    <p>{invoiceDetails?.clientAddress.postCode}</p>
                    <p>{invoiceDetails?.clientAddress.country}</p>
                  </section>
                </section>
              </div>
              <p
                className={classNames('font-medium text-xs mt-8', {
                  'text-grey-purple': mode === 'light',
                  'text-light-grey': mode === 'dark',
                })}
              >
                Sent to
              </p>
              <p
                className={classNames('font-bold text-sm', {
                  'text-semi-black': mode === 'light',
                  'text-white': mode === 'dark',
                })}
              >
                {invoiceDetails?.clientEmail}
              </p>

              <section
                className={classNames(
                  'w-72 rounded-tr-lg rounded-tl-lg px-6 mt-10 pb-6',
                  {
                    'bg-[#F9FAFE]': mode === 'light',
                    'bg-[#252945]': mode === 'dark',
                  }
                )}
              >
                {invoiceDetails?.items.map((item) => {
                  return (
                    <div
                      className='flex justify-between items-center pt-6'
                      key={item.id}
                    >
                      <div>
                        <p
                          className={classNames('font-bold text-xs', {
                            'text-semi-black': mode === 'light',
                            'text-white': mode === 'dark',
                          })}
                        >
                          {item.name}
                        </p>
                        <p
                          className={classNames(
                            'font-bold text-xs text-grey-purple mt-2',
                            {
                              'text-grey-purple': mode === 'light',
                              'text-dark-grey': mode === 'dark',
                            }
                          )}
                        >{`${item.quantity} x ${formatAmount(item.price)}`}</p>
                      </div>
                      <p
                        className={classNames('font-bold text-xs', {
                          'text-semi-black': mode === 'light',
                          'text-white': mode === 'dark',
                        })}
                      >
                        {formatAmount(item.total)}
                      </p>
                    </div>
                  )
                })}
              </section>

              <div
                className={classNames(
                  'w-72 h-20 rounded-bl-lg rounded-br-lg p-6 flex justify-between items-center',
                  {
                    'bg-dark-blue': mode === 'light',
                    'bg-black': mode === 'dark',
                  }
                )}
              >
                <p className='font-medium text-xs text-white'>Grand Total</p>
                <p className='font-bold text-xl text-white'>
                  {formatAmount(invoiceDetails?.total)}
                </p>
              </div>
            </div>
          </div>

          {invoiceDetails?.status !== 'paid' && (
            <footer
              className={classNames('flex justify-between items-center p-6', {
                'bg-white': mode === 'light',
                'bg-dark-purple': mode === 'dark',
              })}
            >
              <button
                onClick={() => setShowEdit(true)}
                className={classNames(
                  'font-bold text-xs text-grey-purple  rounded-3xl w-[73px] h-12',
                  {
                    'bg-[#F9FAFE]': mode === 'light',
                    'bg-[#252945]': mode === 'dark',
                  }
                )}
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
          <div
            className={classNames('p-6 rounded-md', {
              'bg-white': mode === 'light',
              'bg-dark-purple': mode === 'dark',
            })}
          >
            <p
              className={classNames('font-bold text-xl ', {
                'text-semi-black': mode === 'light',
                'text-white': mode === 'dark',
              })}
            >
              Confirm Deletion
            </p>
            <p className='font-normal text-xs text-dark-grey mt-3'>{`Are you sure you want to delete invoice #${invoiceDetails?.id}? This action cannot be undone.`}</p>
            <div className='mt-6 flex justify-end'>
              <button
                className={classNames(
                  'font-bold text-xs  rounded-3xl w-[91px] h-12 mr-2',
                  {
                    'bg-[#F9FAFE]': mode === 'light',
                    'bg-[#252945]': mode === 'dark',
                    'text-grey-purple': mode === 'light',
                    'text-[#DFE3FA]': mode === 'dark',
                  }
                )}
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
