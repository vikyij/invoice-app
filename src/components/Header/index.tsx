import ovalIcon from '../../assets/images/oval.svg'
import moonIcon from '../../assets/images/icon-moon.svg'
import userAvatar from '../../assets/images/image-avatar.jpg'

const Header = () => {
  return (
    <div className='w-full h-20 bg-dark-blue flex justify-between'>
      <img src={ovalIcon} alt='left side header svg' />

      <div className='flex items-center'>
        <img src={moonIcon} className='w-5 h-5 mr-6' alt='moon icon' />
        <p className='h-20 w-px bg-dark-grey'></p>
        <img
          src={userAvatar}
          className='w-8 h-8 rounded-full mx-8'
          alt='user avatar'
        />
      </div>
    </div>
  )
}

export default Header
