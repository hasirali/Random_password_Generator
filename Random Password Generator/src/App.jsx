import React, { useState, useCallback, useEffect } from 'react';
import './index.css';

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Password generator
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str += '0123456789';
    }
    if (charAllowed) {
      str += '!@#$%^&*()_+}{}:<>?';
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Handle copy button click
  const handleCopyClick = () => {
    // Implement your copy functionality here
    // For example, you can use the Clipboard API
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard');
    });
  };

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, setPassword])
  return (
    <>
      <div className="container">
        <div className="card">
          <h2>Password Generator</h2>
          <div className="input-group">
            <input type="text" value={password} placeholder="Password" readOnly />
            <button onClick={handleCopyClick}>Copy</button>
          </div>
          <div className="slider-group">
            <input type="range" min={6} max={50} value={length} onChange={(e) => setLength(e.target.value)} />
            <label>Length: {length}</label>
          </div>

          <div>
            <label>
              <input type="checkbox" checked={numberAllowed}
                onChange={() => { setNumberAllowed((prev) => !prev) }} />
              Include Numbers
            </label>
            <label>
              <input type="checkbox" asdasdchecked={charAllowed}
                onChange={() => { setCharAllowed((prev) => !prev) }} />
              Include Character
            </label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
