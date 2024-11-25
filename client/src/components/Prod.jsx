import React from 'react';
import { LuEdit3 } from 'react-icons/lu';
import { FaTrash } from 'react-icons/fa';
import { BsQrCode } from 'react-icons/bs';

import { Link } from 'react-router-dom';
function Prod(props) {
  const prod = props.prod;
  const [refIsShown, setRefIsShown] = React.useState(false);

  if (props.view === 'list') {
    return (
      <div
        className=' relative bg-forth py-1 px-2 rounded-md text-third text-md flex w-[100%]  gap-5 md:gap-0 md:justify-between   md:items-center lg:w-[90%] hover:cursor-pointer  '
        onClick={() => (prod.qte > 0 ? props.handleWishlist(prod) : null)}
      >
        <div className='flex flex-col md:items-center gap-2   md:flex-row lg:gap-5'>
          <img
            src={import.meta.env.VITE_SERVER_ADRESS + '/uploads/' + prod.img}
            alt='prodimg'
            className=' w-32 h-20 border border-aux rounded-lg md:w-20 md:h-14 '
          />
          <p>{prod.nom}</p>{' '}
          <p onClick={() => setRefIsShown((prev) => !prev)}>
            Ref:{' '}
            {!refIsShown && prod.ref.length > 3
              ? prod.ref.substring(0, 3) + '..'
              : prod.ref}
          </p>
          <p>{prod.fournisseur}</p>
        </div>
        <div className='flex flex-col-reverse items-end justify-between  grow  md:justify-end   md:items-center md:flex-row md:gap-2 lg:gap-5'>
          <div className='flex items-center gap-3 md:gap-2 lg:gap-5'>
            <p>Qte: {prod.qte}</p>
            {(localStorage.getItem('role') === 'admin' ||
              localStorage.getItem('role') === 'comptable') && (
              <p>
                Prix: {prod.prix}({prod.prix_achat}) dt
              </p>
            )}
            {localStorage.getItem('role') === 'vendeur' && (
              <p>Prix: {prod.prix} dt</p>
            )}
          </div>
          {localStorage.getItem('role') === 'admin' && (
            <div className='flex items-center gap-5 md:gap-2 lg:gap-5'>
              <Link to={prod.ref}>
                <LuEdit3 className='cursor-pointer hover:opacity-80' />
              </Link>
              <FaTrash
                className='cursor-pointer hover:opacity-80'
                onClick={() => props.deleteProd(prod.ref)}
              />
              <BsQrCode
                className='cursor-pointer hover:opacity-80'
                onClick={() => props.prepareLabel(prod)}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className=' relative bg-forth py-2 px-2 rounded-md text-third text-lg flex flex-col   gap-3  hover:cursor-pointer  '
        onClick={() => (prod.qte > 0 ? props.handleWishlist(prod) : null)}
      >
        <img
          src={import.meta.env.VITE_SERVER_ADRESS + '/uploads/' + prod.img}
          alt='prodimg'
          className=' w-[full] h-28 border border-aux rounded-lg '
        />
        <h3 className='text-center'>{prod.nom}</h3>
        <div className='details flex items-center justify-between'>
          <p>Qte: {prod.qte}</p>{' '}
          <p onClick={() => setRefIsShown((prev) => !prev)}>
            Ref:{' '}
            {!refIsShown && prod.ref.length > 3
              ? prod.ref.substring(0, 3) + '..'
              : prod.ref}
          </p>
          {(localStorage.getItem('role') === 'admin' ||
            localStorage.getItem('role') === 'comptable') && (
            <p>
              Prix: {prod.prix}({prod.prix_achat}) dt
            </p>
          )}
          {localStorage.getItem('role') === 'vendeur' && (
            <p>Prix: {prod.prix} dt</p>
          )}
        </div>
        {localStorage.getItem('role') === 'admin' && (
          <>
            <div className='flex justify-around items-center gap-5 '>
              <Link to={prod.ref}>
                <LuEdit3 className='cursor-pointer hover:opacity-80' />
              </Link>
              <FaTrash
                className='cursor-pointer hover:opacity-80'
                onClick={() => props.deleteProd(prod.ref)}
              />
              <BsQrCode
                className='cursor-pointer hover:opacity-80'
                onClick={() => props.prepareLabel(prod)}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Prod;
