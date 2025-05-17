import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../comps/Navbar'
import './styles/AddProblem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { API_ENDPOINTS, getAuthToken } from '../config/api'

const AddProblem = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title || !description || !input || !output) {
      setError('All fields are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_ENDPOINTS.addProblem, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          title,
          description,
          input,
          output
        }),
      })

      const data = await response.json()

      if (response.ok && data.id) {
        // Optionally redirect to the problem page
        navigate(`/problem/${data.id}`)
      } else {
        setError(data.message || 'Failed to add problem')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='add-problem'>
      <Navbar />
      <h1>Add Problem</h1>
      {error && <p className="error">{error}</p>}
      <input 
        type='text' 
        placeholder='Problem Title' 
        className='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='container'>
        <textarea 
          placeholder='Problem Description' 
          className='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='test-cases'>
          <textarea 
            placeholder='Test Inputs' 
            className='input'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea 
            placeholder='Expected Outputs' 
            className='output'
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
        <button 
          className='submit' 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
          <FontAwesomeIcon icon={faCircleRight} className='arrow-icon' />
        </button>
      </div>
    </div>
  )
}

export default AddProblem