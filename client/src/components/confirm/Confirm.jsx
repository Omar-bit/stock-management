import React from 'react'
import './confirm.css'
function Confirm() {
  return (
    <div className='absolute w-full h-screen top-0 left-0 flex justify-center items-center bg-aux'>
      <div className='card'>
        <p className='cookieHeading'>Confirmation de ....</p>
        <p className='cookieDescription'>Sur de ...</p>

        <div className='buttonContainer'>
          <button className='acceptButton'>Confirmer</button>
          <button className='declineButton'>Annuler</button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
