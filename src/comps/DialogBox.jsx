import React from 'react'
import './styles/DialogBox.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleRight} from '@fortawesome/free-solid-svg-icons'

const DialogBox = ({ 
  title, 
  inputType, 
  placeholder, 
  description, 
  buttonText, 
  onSubmit,
  value,
  onChange 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className='dialog-box'>
        <h2>{title}</h2>
        <input 
          type={inputType} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <p>{description}</p>
        <button onClick={handleSubmit}>
          {buttonText}
          <FontAwesomeIcon icon={faCircleRight} className='arrow-icon' />
        </button>
    </div>
  )
}

export default DialogBox