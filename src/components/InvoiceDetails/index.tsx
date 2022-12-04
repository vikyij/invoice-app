import { useState, useEffect } from 'react'
import Status from '../Status'
import Modal from '../Modal'
import {
  formatDate,
  formatAmount,
  formatStringDate,
} from '../../utils/index.js'
import leftArrow from '../../assets/images/icon-arrow-left.svg'
import { InvoiceData } from '../../utils/types'
import NewInvoice from '../NewInvoice'
import { InlineLoader } from '../Loading'
import classNames from 'classnames'
import Toast from '../Toast'
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import Header from '../../components/Header'

type InvoiceDetailsProps = {
  mode: string
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ mode }) => {
  const [deleteInvoice, setDeleteInvoice] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceData>()
  const [markAsPaid, setMarkAsPaid] = useState(false)
  const [width] = useState(window.innerWidth)
  const [showToast, setShowToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [editSuccessful, setEditSuccessful] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const { invoiceId } = useParams()

  const navigate = useNavigate()

  const handlePaid = async () => {
    setIsLoading(true)
    // @ts-ignore
    const taskDocRef = doc(db, 'invoice', invoiceId)
    try {
      await updateDoc(taskDocRef, {
        status: 'paid',
      })
      setShowToast(true)
      setSuccessMessage('Successful')
      setMarkAsPaid(false)
      setIsLoading(false)
      setEditSuccessful(true)
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }
  const handleDelete = async (id?: string) => {
    if (id) {
      setIsDeleteLoading(true)
      const taskDocRef = doc(db, 'invoice', id)
      try {
        await deleteDoc(taskDocRef)

        setShowToast(true)
        setSuccessMessage('Deleted Successfully')
        setDeleteInvoice(false)
        setIsLoading(false)
        //redirect to home page after succesfully deleting an invoice
        navigate('/')
      } catch (err) {
        alert(err)
        setIsDeleteLoading(false)
      }

    }
  }

  const getInvoiceDetails = async () => {
    setIsLoading(true)
    // @ts-ignore
    const docRef = doc(db, 'invoice', invoiceId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setInvoiceDetails({
        // @ts-ignore
        data: docSnap.data(),
        id: docSnap.id,
      })
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getInvoiceDetails()
  }, [invoiceId, editSuccessful])

  return (
    <>
      {showEdit && width < 700 ? (
        <NewInvoice
          goBack={() => setShowEdit(false)}
          type='edit'
          details={invoiceDetails}
          mode={mode}
          handleSuccess={() => setEditSuccessful(true)}
        />
      ) : (
        <>
          <Header mode={mode} handleMode={() => {}} />
          {isLoading ? (
            <div
              className={classNames(
                'px-5 py-8 md:w-full md:my-[30px] md:mx-[100px]'
              )}
            >
              <Loading mode={mode} />
            </div>
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
                <div
                  className='flex'
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  <img
                    src={leftArrow}
                    alt='back arrow icon'
                    className='cursor-pointer'
                  />
                  <p
                    className={classNames(
                      'font-bold text-xs ml-6 cursor-pointer',
                      {
                        'text-semi-black': mode === 'light',
                        'text-white': mode === 'dark',
                      }
                    )}
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
                    <Status status={invoiceDetails?.data?.status} mode={mode} />
                  </div>

                  <div className='hidden md:flex justify-between items-center'>
                    <p className='text-xs font-medium text-[#858BB2] md:mr-3'>
                      Status
                    </p>
                    <Status status={invoiceDetails?.data?.status} mode={mode} />
                  </div>
                  {invoiceDetails?.data?.status !== 'paid' && (
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
                        {invoiceDetails?.data?.id}
                      </p>
                      <p
                        className={classNames('font-medium text-xs ', {
                          'text-grey-purple': mode === 'light',
                          'text-light-grey': mode === 'dark',
                        })}
                      >
                        {invoiceDetails?.data?.description}
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
                      <p>{invoiceDetails?.data?.senderAddress.street}</p>
                      <p>{invoiceDetails?.data?.senderAddress.city}</p>
                      <p>{invoiceDetails?.data?.senderAddress.postCode}</p>
                      <p>{invoiceDetails?.data?.senderAddress.country}</p>
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
                        {invoiceDetails &&
                          formatStringDate(invoiceDetails?.data?.createdAt)}
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
                        {invoiceDetails &&
                          formatDate(invoiceDetails?.data?.paymentDue)}
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
                        {invoiceDetails?.data?.clientName}
                      </p>
                      <section
                        className={classNames('font-medium text-xs', {
                          'text-grey-purple': mode === 'light',
                          'text-light-grey': mode === 'dark',
                        })}
                      >
                        <p>{invoiceDetails?.data?.clientAddress.street}</p>
                        <p>{invoiceDetails?.data?.clientAddress.city}</p>
                        <p>{invoiceDetails?.data?.clientAddress.postCode}</p>
                        <p>{invoiceDetails?.data?.clientAddress.country}</p>
                      </section>
                    </section>
                    <section className='hidden md:block'>
                      <p
                        className={classNames(
                          'font-medium text-xs mt-8 md:mt-0',
                          {
                            'text-grey-purple': mode === 'light',
                            'text-light-grey': mode === 'dark',
                          }
                        )}
                      >
                        Sent to
                      </p>
                      <p
                        className={classNames('font-bold text-sm pt-2', {
                          'text-semi-black': mode === 'light',
                          'text-white': mode === 'dark',
                        })}
                      >
                        {invoiceDetails?.data?.clientEmail}
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
                      {invoiceDetails?.data?.clientEmail}
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
                    <div className='hidden md:flex justify-between'>
                      <p className='font-medium text-xs text-grey-purple'>
                        Item Name
                      </p>
                      <p className='font-medium text-xs text-grey-purple'>
                        QTY.
                      </p>
                      <p className='font-medium text-xs text-grey-purple'>
                        Price
                      </p>
                      <p className='font-medium text-xs text-grey-purple'>
                        Total
                      </p>
                    </div>
                    {invoiceDetails?.data?.items.map((item) => {
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
                            >{`${item.quantity} x ${formatAmount(
                              item.price
                            )}`}</p>
                          </div>
                          <p
                            className={classNames(
                              'font-bold text-xs md:hidden',
                              {
                                'text-semi-black': mode === 'light',
                                'text-white': mode === 'dark',
                              }
                            )}
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
                    <p className='font-medium text-xs text-white'>
                      Grand Total
                    </p>
                    <p className='font-bold text-xl text-white'>
                      {formatAmount(invoiceDetails?.data?.total)}
                    </p>
                  </div>
                </div>
              </div>

              {invoiceDetails?.data?.status !== 'paid' && (
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
                    {markAsPaid && isLoading ? (
                      <InlineLoader />
                    ) : (
                      'Mark as Paid'
                    )}
                  </button>
                </footer>
              )}
            </>
          )}
        </>
      )}

      {showEdit && width > 700 && (
        <div className='invoice-overlay' onClick={() => setShowEdit(false)}>
          <NewInvoice
            goBack={() => setShowEdit(false)}
            type='edit'
            details={invoiceDetails}
            mode={mode}
            handleSuccess={() => setEditSuccessful(true)}
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
            <p className='font-normal text-xs text-dark-grey mt-3'>{`Are you sure you want to delete invoice #${invoiceDetails?.data?.id}? This action cannot be undone.`}</p>
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
                {deleteInvoice && isDeleteLoading ? <InlineLoader /> : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default InvoiceDetails
