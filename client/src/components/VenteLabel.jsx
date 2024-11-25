import React from 'react'
import { FaLessThan } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import { BsDownload } from 'react-icons/bs'
import ReactToPrint from 'react-to-print'

function VenteLabel({ setAddLabelVentePopup, labelVenteData }) {
  const componentRef = React.useRef()
  return (
    <div className='absolute top-0 left-0 w-full h-screen bg-third flex flex-col justify-center items-center z-10 text-sm'>
      <div
        className=' w-[90%]  lg:w-[60%] flex flex-col gap-8 py-5 px-4 items-center shadow-lg shadow-aux rounded-md '
        ref={componentRef}
      >
        <header className='flex justify-between items-center w-full'>
          <FaLessThan
            onClick={() => setAddLabelVentePopup(false)}
            className=' text-forth cursor-pointer'
          />
          <h3 className='text-forth font-bold text-xl'>Bon de Commande</h3>
        </header>
        <div className='details w-full flex  items-center justify-between flex-wrap text-forth font-semibold'>
          <p> Client : {labelVenteData.nomClient}</p>
          <p> Mat.Fiscale : {labelVenteData.id_v}</p>
          <p> Prix Total : {labelVenteData.prix_tot}TND</p>
          <p>
            Date:{' '}
            {labelVenteData.date_v.split('T')[0] +
              ' ' +
              labelVenteData.date_v.split('T')[1].substring(0, 5)}
          </p>
          <div className='p-[6px] border rounded-full'>
            <ReactToPrint
              trigger={() => (
                <BsDownload className='text-forth  cursor-pointer' />
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <div className='produits w-[90%] flex flex-col gap-4 items-center  overflow-y-scroll'>
          {labelVenteData.produits.map((produit, index) => {
            console.log(produit)
            return (
              <div
                className='produit flex items-center gap-2 w-full rounded-lg px-1 py-3 shadow-2xl shadow-[#bdbdbd] lg:w-[80%]'
                key={index}
              >
                <img
                  src={
                    /*produit.img*/ import.meta.env.VITE_SERVER_ADRESS +
                    '/uploads/' +
                    produit.img
                  }
                  alt=''
                  className='w-[30%] h-24  border-forth border-2 rounded-md '
                />

                <div className='h-24 text-primary flex-1 flex flex-col items-start justify-between '>
                  <span>Ref:{produit.id_prod}</span>
                  <span>{produit.nom}</span>
                  <span>QTE:{produit.quantiteVendu}</span>
                  <span>Prix:{produit.prix}</span>
                </div>
                <QRCode className='w-[20%] h-24 ' value={produit.id_prod} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VenteLabel
