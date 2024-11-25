import React from 'react'
import { FaLessThan } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
import QRCode from 'react-qr-code'
import ReactToPrint from 'react-to-print'

function Label({ labelData, setProdLabelPopup }) {
  const componentRef = React.useRef()

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-screen bg-third flex flex-col justify-center items-center z-30'>
        <div className=' w-[90%] lg:w-[40%] flex flex-col gap-8 py-5 px-4 items-center shadow-lg shadow-aux rounded-md'>
          <header className='flex justify-between items-center w-full'>
            <FaLessThan
              onClick={() => setProdLabelPopup(false)}
              className=' text-forth cursor-pointer'
            />
            <h3 className='text-forth font-bold text-xl'>Label</h3>

            <div className='p-[6px] border rounded-full'>
              <ReactToPrint
                trigger={() => (
                  <BsDownload className='text-forth  cursor-pointer' />
                )}
                content={() => componentRef.current}
              />
            </div>
          </header>
          <div
            className=' w-full mx-auto flex flex-row items-center justify-around'
            ref={componentRef}
          >
            <img
              src={labelData.img}
              alt=''
              className='flex-1   h-28 md:h-36 border border-slate-400 rounded-md'
            />
            <div className='flex-1 details  h-28 md:h-36 flex flex-col justify-between p-2 items-center'>
              <p className='text-lg font-semibold text-forth'>
                {labelData.nom}
              </p>
              <p className='text-lg font-semibold text-forth'>
                {labelData.fournisseur}
              </p>
            </div>
            <div className='flex-1 h-28 md:h-36 border hidden'></div>
            <QRCode className='w-1/3 h-28 md:h-36  ' value={labelData.ref} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Label
