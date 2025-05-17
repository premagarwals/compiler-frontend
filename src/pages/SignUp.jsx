import React, { useState } from 'react'
import DialogBox from '../comps/DialogBox'
import './styles/Auth.css'

const SignUp = () => {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2)
    } else {
      console.log('Signup with:', { username, password })
    }
  }

  const dialogProps = {
    1: {
      title: 'Register',
      inputType: 'text',
      placeholder: 'Enter your username',
      description: 'By registering, you agree to our terms & conditions.',
      buttonText: 'Next',
      value: username,
      onChange: setUsername
    },
    2: {
      title: 'Register',
      inputType: 'password',
      placeholder: 'Enter password',
      description: 'By registering, you agree to our terms & conditions.',
      buttonText: 'Submit',
      value: password,
      onChange: setPassword
    }
  }

  return (
    <div className='signup'>
      <h1 className='greet'>Welcome to CodeIT!</h1>
      <DialogBox 
        {...dialogProps[step]}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default SignUp