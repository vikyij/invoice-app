import classNames from 'classnames'
import { useContext } from 'react'
import { ModeContext } from '../../App'

interface StatusProps {
  status?: string
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const { mode } = useContext(ModeContext)

  return (
    <div
      className={classNames(
        'w-24 h-10 rounded-md flex items-center justify-center',
        {
          'bg-[#F4FDFA]': status === 'paid' && mode !== 'dark',
          'bg-[#FFF9F0]': status === 'pending' && mode !== 'dark',
          'bg-[#F4F4F5]': status === 'draft' && mode !== 'dark',
          'bg-[#1F2C3F]': mode === 'dark',
        }
      )}
    >
      <span
        className={classNames('w-2 h-2 rounded-3xl mr-2', {
          'bg-green': status === 'paid',
          'bg-orange': status === 'pending',
          'bg-dark-blue': status === 'draft' && mode !== 'dark',
          'bg-white': mode === 'dark' && status === 'draft',
        })}
      ></span>
      <p
        className={classNames('font-bold text-xs', {
          'text-green': status === 'paid',
          'text-orange': status === 'pending',
          'text-dark-blue': status === 'draft' && mode !== 'dark',
          'text-white': mode === 'dark' && status === 'draft',
        })}
      >
        {status}
      </p>
    </div>
  )
}

export default Status
