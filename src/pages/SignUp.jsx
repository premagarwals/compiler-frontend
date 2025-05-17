import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogBox from '../comps/DialogBox'
import { API_ENDPOINTS, setAuthToken, getAuthToken } from '../config/api'
import './styles/Auth.css'

const SignUp = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (getAuthToken()) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2)
    } else {
      try {
        const response = await fetch(API_ENDPOINTS.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (response.ok && data.token) {
          setAuthToken(data.token)
          navigate('/')
        } else {
          setError(data.message || 'Signup failed')
        }
      } catch (err) {
        setError('Network error occurred')
      }
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
      {error && <p className='error'>{error}</p>}
      <DialogBox 
        {...dialogProps[step]}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default SignUp