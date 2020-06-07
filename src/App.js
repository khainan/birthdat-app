import React, { useState, useEffect, useRef } from 'react';
import './main.scss';
import taliaImg from './talia.JPG'
import cake from './cake2.png'
import candy from './candy.png'
import confetti from './confetti.png'
import confetti2 from './confetti2.png'
import heart from './heart.png'
import hat from './hat.png'

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
  const [card, openCard] = useState(false)
  const refEnvelope = useRef()
  const refCard = useRef()

  useOnClickOutside(refEnvelope, () => card && setTimeout(() => setOpen(false),1000));
  useOnClickOutside(refCard, () => openCard(false));


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
    <div className="message-app" style={ !open ? {background: "#242423", transitionDuration: "0.3s"} : {transitionDuration: "0.3s"}}>
      <div className={`modal-background ${card ? 'show' : 'hide'}`}></div>
      <div id="modal-zoom-in" ref={refCard} className={`modal ${card ? 'show' : 'hide'} card-message`}>
        <div className="wrapper-img">
          <img className="talia" src={taliaImg}/>
          <img className="hat" src={hat}/>
        </div>
        <h3>It's your day! <img className="cake" src={cake}/> </h3>
        <p>
          Selamat ulang tahun ya tal <img style={{width: "24px"}} src={confetti}/> semoga diumur ke 21 ini kamu lebih dewasa lagi dari yang sekarang, 
          lancar rejekinya, sehat selalu, dan yang terpenting adalah lebih bermanfaat lagi bagi orang lain :). <br /> 
          tetap selalu menjadi talia yang periang <img style={{width: "12px"}} src={candy}/> ya sayang (meskipun kamu udah mulai beranjak tua sekarang wkwk). <br />
          I <img style={{width: "12px"}} src={heart}/> You so much tal.. semoga kita berdua bisa selalu merayakan ulang tahun bareng di tahun-tahun berikutnya.
        </p>
        <div className="wrapper-note">
          <h5>From:</h5>
          <p className="sign">Rachim</p>
        </div>
      </div>

      { open &&
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      }
      <img className={`confetti ${!shake ? '' : 'hide'}`} src={confetti2} style={!open ? {top: "-200px"} : {top: 0}}/>
      { !shake && <h2 className={`h2-message ${!shake ? '' : 'hide'}`} style={ !open ? {fontSize: 0, marginBottom: 0} : {marginBottom: 0, fontSize: "32px"}}>
        Cie.. Ulang tahun!
      </h2>}
      { !shake && <h2 className={`h2-message ${!shake ? '' : 'hide'}`} style={ !open ? {fontSize: 0, marginBottom: 0} : {fontSize: "32px", marginBottom: "130px"}}>
        Happy Birthday Talia
      </h2>}
      <div className="design">
        <div ref={refEnvelope} className={`envelope ${shake ? 'shake-slow' : ''} ${open ? 'open' : ''}`} onClick={() => openMessage()}>
          <div className="cover">
            <div className="bottom"> </div>
            <div className="left"></div>
            <div className="right"> </div>
            <div className="top"></div>
          </div>
          <div className="paper" onClick={() => openCard(!card)}>
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
