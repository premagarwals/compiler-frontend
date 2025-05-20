import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import ReactMarkdown from 'react-markdown'
import Navbar from '../comps/Navbar'
import Ide from '../comps/Ide'
import './styles/Problem.css'

const Problem = () => {
  const { id } = useParams()
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProblem()
  }, [id])

  const fetchProblem = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getProblem(id))
      const data = await response.json()

      if (response.ok && data.problem) {
        setProblem(data.problem) 
      } else {
        setError(data.message || 'Failed to fetch problem')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading problem...</div>
  if (error) return <div className="error">{error}</div>
  if (!problem) return <div className="error">Problem not found</div>

  return (
    <div className="problem-page">
      <Navbar />
      <div className="problem-container">
        <div className="problem-details">
          <h1>{problem.title}</h1>
          <div className="meta">
            <span className="creator">Created by: @{problem.creator}</span>
            <div className="stats">
              <span className="solved">✓ {problem.solved} solved</span>
              <span className="attempted">☆ {problem.tried} attempts</span>
            </div>
          </div>
          <div className="description-box">
            <ReactMarkdown>{problem.description}</ReactMarkdown>
          </div>
        </div>
        <div className="ide-container">
          <Ide />
        </div>
      </div>
    </div>
  )
}

export default Problem