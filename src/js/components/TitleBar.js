import React from 'react'

 const TitleBar = () => {

    function close(){
        api.send('quit');
    }

    function minimize(){
        api.send('minimize');
    }
  return (
    <>
    <div className='drag'>
        <h1 className="label">latte</h1>
    </div>
    <div className='close' onClick={()=>close()}></div>
    <div className='min' onClick={()=>minimize()}></div>
    </>
  )
}
export default TitleBar;