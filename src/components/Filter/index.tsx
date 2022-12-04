import { useState, useContext } from 'react'
import classNames from 'classnames'
import downArrow from '../../assets/images/icon-arrow-down.svg'
import checkIcon from '../../assets/images/icon-check.svg'
import { ModeContext } from '../../App'

type FilterProps = {
  showFilter: boolean
  filterState: { draft: boolean; pending: boolean; paid: boolean }
  handleFilter: () => void
  handleDraft: () => void
  handlePending: () => void
  handlePaid: () => void
}

const Filter = ({
  showFilter,
  filterState,
  handleFilter,
  handleDraft,
  handlePending,
  handlePaid,
}: FilterProps) => {
  const [width] = useState(window.innerWidth)
  const { mode } = useContext(ModeContext)

  return (
    <div className='mr-4 md:mr-7 flex flex-col items-center'>
      <div className='flex items-center cursor-pointer' onClick={handleFilter}>
        <p
          className={classNames('font-bold text-sm mr-2', {
            'text-semi-black': mode === 'light',
            'text-white': mode === 'dark',
          })}
        >
          {width > 700 ? `Filter by status` : `Filter`}
        </p>
        <img src={downArrow} className='w-2 h-2' alt='filter-dropdown-icon' />
      </div>

      <div
        className={classNames(
          'w-28 md:w-48 rounded-lg shadow-3xl absolute mt-10 transition-transform p-4 pt-5 md:p-5',
          {
            hidden: !showFilter,
            block: showFilter,
            'h-32': showFilter,
            'bg-white': mode === 'light',
            'bg-dark-purple': mode === 'dark',
          }
        )}
      >
        <div className='flex mb-4' onClick={handleDraft}>
          <div
            className={classNames('rounded-sm w-4 h-4 mr-3 cursor-pointer', {
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
          <p
            className={classNames('text-xs font-bold cursor-pointer', {
              'text-semi-black': mode === 'light',
              'text-white': mode === 'dark',
            })}
          >
            Draft
          </p>
        </div>
        <div className='flex mb-4' onClick={handlePending}>
          <div
            className={classNames('rounded-sm w-4 h-4 mr-3 cursor-pointer', {
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
          <p
            className={classNames('text-xs font-bold cursor-pointer', {
              'text-semi-black': mode === 'light',
              'text-white': mode === 'dark',
            })}
          >
            Pending
          </p>
        </div>
        <div className='flex' onClick={handlePaid}>
          <div
            className={classNames('rounded-sm w-4 h-4 mr-3 cursor-pointer', {
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
          <p
            className={classNames('text-xs font-bold cursor-pointer', {
              'text-semi-black': mode === 'light',
              'text-white': mode === 'dark',
            })}
          >
            Paid
          </p>
        </div>
      </div>
    </div>
  )
}

export default Filter
