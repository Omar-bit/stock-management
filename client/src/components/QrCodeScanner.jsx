import React from 'react'
import { QrScanner } from '@yudiel/react-qr-scanner'
import { FaLessThan } from 'react-icons/fa'

function QrCodeScanner(props) {
  return (
    <div className='fixed top-0 bg-third w-full h-screen z-20 flex justify-center items-center'>
      <div className=' w-[70%]  lg:w-[30%]  p-5 shadow-2xl shadow-[gray]'>
        <header className='flex items-center justify-between'>
          <FaLessThan
            onClick={() => props.setQrPopup(false)}
            className='  left-0 text-forth cursor-pointer'
          />
          <h2 className=' place-self-center font-semibold text-xl text-primary'>
            {' '}
            Qr Scanner
          </h2>
        </header>
        <QrScanner
          onDecode={(result) => {
            props.setFilter(result)
            props.setQrPopup(false)
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  )
}

export default QrCodeScanner
