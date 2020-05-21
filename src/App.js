import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './main.scss';
import box from './box.png';

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

  const text = {
    color: "#242423",
    transitionDuration: "0.3s", 
    marginTop: "-400px",
    fontSize: "36px"
  }

  return (
    <div className="message-app" style={ !open ? {background: "#242423", transitionDuration: "0.3s"} : {transitionDuration: "0.3s"}}>
      { open &&
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      }
      <h2 className="h2-message" style={ !open ? {fontSize: 0, marginBottom: 0} : {}}>
        Happy Birthday Talia!
      </h2>
      <div className="design">
        <div ref={refEnvelope} className={`envelope ${shake ? 'shake-slow' : ''} ${open ? 'open' : ''}`} onClick={() => openMessage()}>
          <div className="cover">
            <div className="bottom"> </div>
            <div className="left"></div>
            <div className="right"> </div>
            <div className="top"></div>
          </div>
          <div className="paper" onClick={() => {console.log("test")}}>
            <div className="message">Talia Yunita...</div>
          </div>
        </div>
      </div>
      { !shake && 
          <p className="p-message" style={ !open ? {color: "#eee4e1"} : {color: "#242423"}}>
              {!open ? "Tap the Message" : "Tap the Card"}
            </p>
      }
    </div>
  );
}

export default App;
