import React from 'react'

import { LuEdit3 } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { FaTrash } from 'react-icons/fa'
function Four({ four, deleteFour }) {
  return (
    <div className=' relative bg-forth p-2 rounded-md text-third text-sm  flex w-[100%]  gap-5 md:gap-0 md:justify-between   md:items-center md:text-lg lg:w-[90%]  '>
      <div className='flex flex-col md:items-center gap-2   md:flex-row lg:gap-5'>
        <p>{four.nom}</p>
      </div>
      <div className='flex  items-center justify-between  grow  md:justify-end   md:gap-2 lg:gap-5'>
        <div className='flex items-center gap-3 md:gap-2 lg:gap-5'>
          <p>Tel: {four.tel}</p>
          <p>Pays: {four.pays}</p>
        </div>

        <div className='flex items-center gap-5 md:gap-2 lg:gap-5'>
          {localStorage.getItem('role') === 'admin' && (
            <Link to={String(four.id)}>
              <LuEdit3 className='cursor-pointer hover:opacity-80' />
            </Link>
          )}
          {localStorage.getItem('role') === 'admin' && (
            <FaTrash
              className='cursor-pointer hover:opacity-80'
              onClick={() => deleteFour(four.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Four
