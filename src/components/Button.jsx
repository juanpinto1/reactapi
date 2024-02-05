import '../sass/Button.scss'
const Button = ({icon, handlerClick}) => {
  return (
    <div className='button__box'>
    <button 
    className="button" 
    onClick={handlerClick}>
        {icon}
        </button>
    <div className='button__shadow'></div>
    </div>
  )
}

export default Button