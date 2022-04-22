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
import Toast from '../Toast'

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
  const [width] = useState(window.innerWidth)
  const [showToast, setShowToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
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
      setShowToast(true)
      setSuccessMessage('Successful')
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
        setShowToast(true)
        setSuccessMessage('Deleted Successfully')
        setDeleteInvoice(false)
      }, 2000)

      const goHome = setTimeout(() => {
        goBack()
      }, 7000)

      return () => {
        clearTimeout(showAlert)
        clearTimeout(goHome)
      }
    }
  }

  return (
    <>
      {showEdit && width < 700 ? (
        <NewInvoice
          goBack={handleGoBack}
          type='edit'
          details={details}
          mode={mode}
        />
      ) : (
        <>
          <div
            className={classNames(
              'px-5 py-8 md:w-full md:my-[30px] md:mx-[100px]',
              {
                'bg-light-purple': mode === 'light',
                'bg-black': mode === 'dark',
              }
            )}
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
            {showToast && <Toast type='success' message={successMessage} />}

            <div
              className={classNames(
                'w-full h-24 rounded-lg mt-10 mb-4 p-6 flex justify-between items-center',
                {
                  'bg-white': mode === 'light',
                  'bg-dark-purple': mode === 'dark',
                }
              )}
            >
              <div className='md:hidden flex justify-between w-full items-center'>
                <p className='text-xs font-medium text-[#858BB2]'>Status</p>
                <Status status={invoiceDetails?.status} mode={mode} />
              </div>

              <div className='hidden md:flex justify-between items-center'>
                <p className='text-xs font-medium text-[#858BB2] md:mr-3'>
                  Status
                </p>
                <Status status={invoiceDetails?.status} mode={mode} />
              </div>
              {invoiceDetails?.status !== 'paid' && (
                <div
                  className={classNames(
                    'flex justify-between items-center p-6 hidden md:block',
                    {
                      'bg-white': mode === 'light',
                      'bg-dark-purple': mode === 'dark',
                    }
                  )}
                >
                  <button
                    onClick={() => setShowEdit(true)}
                    className={classNames(
                      'font-bold text-xs text-grey-purple rounded-3xl w-[73px] h-12 mr-3',
                      {
                        'bg-[#F9FAFE]': mode === 'light',
                        'bg-[#252945]': mode === 'dark',
                      }
                    )}
                  >
                    Edit
                  </button>
                  <button
                    className='font-bold text-xs text-white bg-[#EC5757] rounded-3xl w-[89px] h-12 mr-3'
                    onClick={() => setDeleteInvoice(true)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={handlePaid}
                    className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[149px] h-12'
                  >
                    {markAsPaid && isLoading ? (
                      <InlineLoader />
                    ) : (
                      'Mark as Paid'
                    )}
                  </button>
                </div>
              )}
            </div>

            <div
              className={classNames('w-full rounded-lg p-5 md:p-10 mb-10', {
                'bg-white': mode === 'light',
                'bg-dark-purple': mode === 'dark',
              })}
            >
              <div className='md:flex justify-between'>
                <div>
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
                </div>
                <section
                  className={classNames(
                    'font-medium text-xs my-10 md:my-0 md:text-right',
                    {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    }
                  )}
                >
                  <p>{invoiceDetails?.senderAddress.street}</p>
                  <p>{invoiceDetails?.senderAddress.city}</p>
                  <p>{invoiceDetails?.senderAddress.postCode}</p>
                  <p>{invoiceDetails?.senderAddress.country}</p>
                </section>
              </div>
              <div className='flex justify-between md:justify-evenly md:mt-4'>
                <section className='md:ml-[-128px]'>
                  <p
                    className={classNames('font-medium text-xs', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    Invoice Date
                  </p>
                  <p
                    className={classNames('font-bold text-sm pt-2', {
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
                    className={classNames('font-bold text-sm pt-2', {
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
                    className={classNames('font-bold text-sm pt-3 pb-2', {
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
                <section className='hidden md:block'>
                  <p
                    className={classNames('font-medium text-xs mt-8 md:mt-0', {
                      'text-grey-purple': mode === 'light',
                      'text-light-grey': mode === 'dark',
                    })}
                  >
                    Sent to
                  </p>
                  <p
                    className={classNames('font-bold text-sm pt-2', {
                      'text-semi-black': mode === 'light',
                      'text-white': mode === 'dark',
                    })}
                  >
                    {invoiceDetails?.clientEmail}
                  </p>
                </section>
              </div>
              <div className='md:hidden'>
                <p
                  className={classNames('font-medium text-xs mt-8', {
                    'text-grey-purple': mode === 'light',
                    'text-light-grey': mode === 'dark',
                  })}
                >
                  Sent to
                </p>
                <p
                  className={classNames('font-bold text-sm pt-2', {
                    'text-semi-black': mode === 'light',
                    'text-white': mode === 'dark',
                  })}
                >
                  {invoiceDetails?.clientEmail}
                </p>
              </div>
              <section
                className={classNames(
                  'w-72 md:w-full rounded-tr-lg rounded-tl-lg px-6 mt-10 pb-6 md:pt-6',
                  {
                    'bg-[#F9FAFE]': mode === 'light',
                    'bg-[#252945]': mode === 'dark',
                  }
                )}
              >
                <header className='hidden md:flex justify-between'>
                  <th className='font-medium text-xs text-grey-purple'>
                    Item Name
                  </th>
                  <th className='font-medium text-xs text-grey-purple'>QTY.</th>
                  <th className='font-medium text-xs text-grey-purple'>
                    Price
                  </th>
                  <th className='font-medium text-xs text-grey-purple'>
                    Total
                  </th>
                </header>
                {invoiceDetails?.items.map((item) => {
                  return (
                    <div
                      className='flex justify-between items-center pt-6'
                      key={item.id}
                    >
                      <div className='md:flex md:justify-between md:w-full'>
                        <p
                          className={classNames(
                            'font-bold text-xs md:w-[35%]',
                            {
                              'text-semi-black': mode === 'light',
                              'text-white': mode === 'dark',
                            }
                          )}
                        >
                          {item.name}
                        </p>
                        <p
                          className={classNames(
                            'hidden md:block font-bold text-xs md:w-[27%] md:text-grey-purple',
                            {
                              'text-semi-black': mode === 'light',
                              'text-white': mode === 'dark',
                            }
                          )}
                        >
                          {item.quantity}
                        </p>
                        <p
                          className={classNames(
                            'hidden md:block font-bold text-xs md:w-[25%] md:text-grey-purple',
                            {
                              'text-semi-black': mode === 'light',
                              'text-white': mode === 'dark',
                            }
                          )}
                        >
                          {formatAmount(item.price)}
                        </p>
                        <p
                          className={classNames(
                            'hidden md:block font-bold text-xs',
                            {
                              'text-semi-black': mode === 'light',
                              'text-white': mode === 'dark',
                            }
                          )}
                        >
                          {formatAmount(item.total)}
                        </p>
                        <p
                          className={classNames(
                            'font-bold text-xs text-grey-purple mt-2 md:hidden',
                            {
                              'text-grey-purple': mode === 'light',
                              'text-dark-grey': mode === 'dark',
                            }
                          )}
                        >{`${item.quantity} x ${formatAmount(item.price)}`}</p>
                      </div>
                      <p
                        className={classNames('font-bold text-xs md:hidden', {
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
                  'w-72 md:w-full h-20 rounded-bl-lg rounded-br-lg p-6 flex justify-between items-center',
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
              className={classNames(
                'flex justify-between items-center p-6 md:hidden',
                {
                  'bg-white': mode === 'light',
                  'bg-dark-purple': mode === 'dark',
                }
              )}
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

      {showEdit && width > 700 && (
        <div className='invoice-overlay' onClick={() => setShowEdit(false)}>
          <NewInvoice
            goBack={handleGoBack}
            type='edit'
            details={details}
            mode={mode}
          />
        </div>
      )}

      {deleteInvoice && (
        <Modal handleClose={() => setDeleteInvoice(false)}>
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
