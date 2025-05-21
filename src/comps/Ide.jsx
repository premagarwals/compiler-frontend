import './styles/Ide.css'
import {React, useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import Editor from "@monaco-editor/react";
import {API_ENDPOINTS, getAuthToken} from '../config/api'

const languageModes = {
  'python': 'python',
  'c++': 'cpp',
  'java': 'text/x-java',
};

const defaultCode = {
  python: '# Python code\nprint("Hello, world!")',
  cpp: '// C++ code\n#include <iostream>\nusing namespace std;\n\nint main() { \n\tcout << "Hello"; \n}',
  java: '// Java code\npublic class Main { \n\tpublic static void main(String[] args) { \n\t\tSystem.out.println("Hello"); \n\t} \n}',
};

const Ide = ({ showSubmit = false, problemId = null }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(defaultCode[language]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('~@Output:');
  const [error, setError] = useState('');
  const [runtime, setRuntime] = useState('--');

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.id === 'python-button') {
        setOutput('~@Output:');
        setRuntime('--');
        document.getElementById('python-button').classList.add('active')
        setLanguage('python');
        setCode(defaultCode['python']);
        document.getElementById('c-button').classList.remove('active')
        document.getElementById('java-button').classList.remove('active')
      } else if (e.target.id === 'c-button') {
        setOutput('~@Output:');
        setRuntime('--');
        document.getElementById('python-button').classList.remove('active')
        document.getElementById('c-button').classList.add('active')
        setLanguage('c++');
        setCode(defaultCode['cpp']);
        document.getElementById('java-button').classList.remove('active')
      } else if (e.target.id === 'java-button') {
        setOutput('~@Output:');
        setRuntime('--');
        document.getElementById('python-button').classList.remove('active')
        document.getElementById('c-button').classList.remove('active')
        document.getElementById('java-button').classList.add('active')
        setLanguage('java');
        setCode(defaultCode['java']);
      }
    })
  }, [])

  const runCode = async () => {
    try {
      setOutput('~@Output:')
      setError('')
      setRuntime('--')

      const response = await fetch(API_ENDPOINTS.ide, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      })

      const data = await response.json()

      if (data.error && data.error.length > 0) {
        setOutput(`Error: ${data.error}`)
        setError(data.error)
      } else if (data.output) {
        setOutput(data.output)
        setRuntime(data.runtime ? data.runtime.replace('s', '') : '--')
      } else {
        setOutput('No output generated')
      }
    } catch (err) {
      setError(`Network error occurred ${err}`)
      setOutput(`Error: Failed to execute code ${err}`)
    }
  };

  const handleSubmit = async () => {
    try {
      setOutput('~@Output:')
      setError('')
      setRuntime('--')

      const response = await fetch(API_ENDPOINTS.solve(problemId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          language,
          code,
          input
        }),
      })

      const data = await response.json()

      if (response.ok && data.solved) {
        setOutput('Problem Solved! 🎉')
        setRuntime(data.runtime ? data.runtime.replace('s', '') : '--')
      } else if (data.error) {
        setOutput(`Error: ${data.error}`)
        setError(data.error)
      } else {
        setOutput(data.output || 'No output generated')
        setRuntime(data.runtime ? data.runtime.replace('s', '') : '--')
      }
    } catch (err) {
      setError('Network error occurred')
      setOutput(`Error: Failed to submit solution ${err}`)
    }
  }

  return (
    <div className="ide">
      <div className="header">
        <div id="python-button" className="python active">
          Python
        </div>
        <div id="c-button" className="c">
          C++
        </div>
        <div id="java-button" className="java">
          Java
        </div>
      </div>
      <div className="panel">
        <div id="runner" className="runner" onClick={runCode}>
          <FontAwesomeIcon icon={faPlay} style={{color: 'var(--primary-text)', fontSize: '2rem', cursor: 'pointer'}} />
        </div>
        <div className="runtime">
          <p>{runtime} s</p>
        </div>  
      </div>

      {showSubmit && (
          <button onClick={handleSubmit} className="submit-btn">
            Submit Solution
          </button>
      )}
      
      <div className="editor">
        <Editor
          value={code}
          language={languageModes[language]}
          onChange={(updatedCode) => setCode(updatedCode)}
          theme ="vs-dark"
        /> 
      </div>
      <div className="terminal">
        <div className="inputbox">
          <textarea onChange={(e) => setInput(e.target.value)}></textarea>
        </div>
        <div className="outputbox">
          <textarea value={output} onChange={(e) => setOutput(e.target.value)} readOnly></textarea>
          
        </div>
      </div>
    </div>
  )
}

export default Ide

