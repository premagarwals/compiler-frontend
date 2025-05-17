import React, { useState } from 'react'
import DialogBox from '../comps/DialogBox'
import './styles/Auth.css'

const Login = () => {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2)
    } else {
      console.log('Login with:', { username, password })
    }
  }

  const dialogProps = {
    1: {
      title: 'Login',
      inputType: 'text',
      placeholder: 'Enter your username',
      description: 'We are so glad to see you again!!.',
      buttonText: 'Next',
      value: username,
      onChange: setUsername
    },
    2: {
      title: 'Login',
      inputType: 'password',
      placeholder: 'Enter password',
      description: 'We are so glad to see you again!!',
      buttonText: 'Submit',
      value: password,
      onChange: setPassword
    }
  }

  return (
    <div className='login'>
      <h1 className='greet'>Welcome Back!</h1>
      <DialogBox 
        {...dialogProps[step]}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Login
