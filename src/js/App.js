import React, { useEffect, useState} from 'react'
import TitleBar from './components/TitleBar';

const App = () => {

  const [ms, setMs] = useState();
  const [show, setShow] = useState('none');
  useEffect(()=>{

    const secTimer = setInterval(()=>{
      api.send('ping');
      api.recieve('pingResponse', (e,message)=>{
        var processedMS = e.replace(/\s+/g, ''); // remove blank spaces from returned data (ms)
        setMs(processedMS)
        setShow('block')
        
      })
    }, 1000)
    return ()=> clearInterval(secTimer)
  })
  return (
    <div className='content' >
      <h1 className='ping' style={{display:show}}>{ms}</h1>
      <TitleBar/>
    </div>
  )
}

export default App;