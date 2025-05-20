import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import './styles/AllProblems.css'
import Navbar from '../comps/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'

const calculateRate = (solved, tried) => {
  if (tried === 0) return { rate: 'N/A', color: 'var(--secondary-text)' }
  
  const percentage = Math.round((solved / tried) * 100)
  const hue = (percentage * 1.2)
  const color = `hsl(${hue}, 80%, 60%)`
  
  return { rate: `${percentage}%`, color }
}

const AllProblems = () => {
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getProblems)
      const data = await response.json()

      if (response.ok && data.problems) {
        setProblems(data.problems)
      } else {
        setError(data.message || 'Failed to fetch problems')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading problems...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="problems-container">
      <Navbar/>
      <h1>Practice Problems</h1>
      <div className="problems-list">
        {problems.map(problem => {
          return (
            <div 
              key={problem.id} 
              className="problem-card"
            >
              <div className='important'>
                <h2>{problem.title}</h2>
                <span className="creator">by <span>@{problem.creator}</span></span>
              </div>
              
              <div className="problem-meta">
                <div>
                  <p> Trials </p>
                  <span className="attempted"> {problem.tried}</span>
                </div>
                <div>
                  <p>Solves</p>
                  <span className="solved"> {problem.solved}</span>
                </div>
                <div>
                  <p>Rate</p>
                  {(() => {
                    const { rate, color } = calculateRate(problem.solved, problem.tried)
                    return <span className='rate' style={{ color }}>{rate}</span>
                  })()}
                </div>
              </div>
              <div className='solve' onClick={() => navigate(`/problem/${problem.id}`)}> Solve Now! <FontAwesomeIcon icon={faCircleRight} /> </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllProblems