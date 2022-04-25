import classNames from 'classnames'
import { InlineLoader } from '../Loading'

type FooterType = {
  mode: string
  type: string
  submitType: string
  isLoading: boolean
  goBack: () => void
  handleSaveAsDraft: () => void
  handleReset: () => void
  handleSaveChanges: () => void
}

const Footer = ({
  mode,
  type,
  handleReset,
  handleSaveChanges,
  submitType,
  goBack,
  isLoading,
  handleSaveAsDraft,
}: FooterType) => {
  return (
    <footer
      className={classNames('flex justify-end items-center p-6 h-28 mt-10', {
        'bg-[#F9FAFE]': mode === 'light',
        'bg-dark-purple': mode === 'dark',
      })}
    >
      {type === 'edit' ? (
        <>
          <button
            onClick={handleReset}
            className={classNames(
              'font-bold text-xs text-grey-purple  rounded-3xl w-24 h-12 mr-2',
              {
                'bg-light-purple': mode === 'light',
                'bg-[#252945]': mode === 'dark',
              }
            )}
          >
            Cancel
          </button>

          <button
            type='submit'
            onClick={handleSaveChanges}
            className='font-bold text-xs text-white rounded-3xl w-[138px] h-12 bg-[#7C5DFA]'
          >
            {submitType === 'pending' && isLoading ? (
              <InlineLoader />
            ) : (
              'Save Changes'
            )}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => goBack()}
            className={classNames(
              'font-bold text-xs text-grey-purple rounded-3xl w-24 h-12 mr-2',
              {
                'bg-light-purple': mode === 'light',
                'bg-[#252945]': mode === 'dark',
              }
            )}
          >
            Discard
          </button>

          <button
            type='submit'
            onClick={handleSaveAsDraft}
            className='font-bold text-xs text-dark-grey bg-dark-blue rounded-3xl w-[138px] h-12 mr-2'
          >
            {submitType === 'draft' && isLoading ? (
              <InlineLoader />
            ) : (
              'Save as Draft'
            )}
          </button>

          <button
            type='submit'
            onClick={handleSaveChanges}
            className='font-bold text-xs text-white bg-[#7C5DFA] rounded-3xl w-[138px] h-12'
          >
            {submitType === 'pending' && isLoading ? (
              <InlineLoader />
            ) : (
              'Save & Send'
            )}
          </button>
        </>
      )}
    </footer>
  )
}

export default Footer
