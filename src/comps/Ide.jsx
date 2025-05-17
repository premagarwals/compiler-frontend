import './styles/Ide.css'
import CDNEditor from './CDNEditor'
import {React, useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

const languageModes = {
  python: 'python',
  cpp: 'text/x-c++src',
  java: 'text/x-java',
};

const defaultCode = {
  python: '# Python code\nprint("Hello, world!")',
  cpp: '// C++ code\n#include <iostream>\nint main() { std::cout << "Hello"; }',
  java: '// Java code\npublic class Main { public static void main(String[] args) { System.out.println("Hello"); } }',
};

const Ide = () => {
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
    setOutput('~@Output:');
    const response = await fetch('http://127.0.0.1:8080/ide/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        code,
        input,
      }),
    });
    const data = await response.json();
    setOutput(data.output);
    if(data.error){
      setOutput(data.error);
    }
    else{
      setRuntime(data.runtime.toFixed(3));
    }
  };

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
      
      <div className="editor">
        <CDNEditor
          value={code}
          language={languageModes[language]}
          onChange={(updatedCode) => setCode(updatedCode)}
        /> 
      </div>
      <div className="terminal">
        <div className="inputbox">
          <textarea onChange={(e) => setInput(e.target.value)}></textarea>
          <div className="tag"> Input Box </div>
        </div>
        <div className="outputbox">
          <textarea value={output} onChange={(e) => setOutput(e.target.value)} readOnly></textarea>
          
        </div>
      </div>
    </div>
  )
}

export default Ide