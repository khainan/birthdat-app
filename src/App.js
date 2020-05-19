import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './main.scss';

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}

function App() {

  const [open, setOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const refEnvelope = useRef()

  useOnClickOutside(refEnvelope, () => setOpen(false));

  const openMessage = () => {
    if(!open){
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setOpen(true)
      }, 1000)
    }
  }

  return (
    <div className="App">
      { open &&
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      }

      <div className="design">
        <div ref={refEnvelope} className={`envelope ${shake ? 'shake-slow' : ''} ${open ? 'open' : ''}`} onClick={() => openMessage()}>
          <div className="cover">
            <div className="bottom"> </div>
            <div className="left"></div>
            <div className="right"> </div>
            <div className="top"></div>
          </div>
          <div className="paper" onClick={() => {console.log("test")}}>
            <div className="message">Love Yourself...</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
