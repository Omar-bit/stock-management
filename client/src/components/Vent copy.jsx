import React from 'react'
import { RiBillLine } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import { MdOutlineDone } from 'react-icons/md'
import axios from 'axios'
function Vent(props) {
  const vente = props.vente
  console.log(vente)
  const [status, setStatus] = React.useState(vente.statue)
  const [donnee, setDonnee] = React.useState(String(vente.prix_donnee))
  const [mod, setMod] = React.useState(false)
  async function updateGivenPrice() {
    setMod(false)
    setDonnee(eval(donnee))
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/ventes/modifyGivenPrice/${vente.id_v}`,
        {
          prix_donnee: eval(donnee),
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  async function changeStatus() {
    const newStatus = status === 0 ? 1 : 0
    setStatus(newStatus)
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/ventes/modifyStatus/${vente.id_v}`,
        {
          status: newStatus,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className=' relative bg-forth p-2 rounded-md text-third text-md  flex w-[100%]  gap-5 md:gap-0 md:justify-between   md:items-str md:text-[11px] lg:w-[95%]  '>
      <div className='flex flex-col md:items-center gap-2   md:flex-row lg:gap-5'>
        <p>Ref:{vente.id_v}</p>
        <p>Prix total: {vente.prix_tot}TND</p>
        <p>
          Prix Donnée:
          <input
            className='inpt  w-14  max-w-[70px]  bg-forth '
            type='text'
            value={donnee}
            onChange={(e) => {
              setDonnee(e.target.value)

              setMod(true)
            }}
          />
          {mod && (
            <button
              className='bg-forth  text-third ml-2 border rounded-md  px-2'
              onClick={updateGivenPrice}
            >
              <MdOutlineDone />
            </button>
          )}
          {!mod && 'TND'}
        </p>
      </div>
      <div className='flex  items-center justify-end gap-3  grow  md:justify-end   md:gap-2 lg:gap-5'>
        <div className='flex items-center gap-3 md:gap-2 lg:gap-5'>
          <p>Client: {vente.nomClient}</p>
          <p>Vendeur: {vente.nomUtilisateur}</p>
          <p>
            Date:{' '}
            {vente.date_v.split('T')[0] +
              ' ' +
              vente.date_v.split('T')[1].substring(0, 5)}
          </p>
          {localStorage.getItem('role') === 'admin' && (
            <div
              className={`w-4 h-4 md:w-5 md:h-5 ${
                status === 0 ? 'bg-signM' : 'bg-signP'
              } rounded-full cursor-pointer`}
              onClick={changeStatus}
            ></div>
          )}
        </div>

        <div className='flex items-center gap-5 md:gap-2 lg:gap-5'>
          <RiBillLine
            className='cursor-pointer text-xl'
            onClick={() => props.prepareLabelPopup(props.vente)}
          />
          {localStorage.getItem('role') === 'admin' && (
            <FaTrash
              className='cursor-pointer hover:opacity-80'
              onClick={() => props.deleteVente(vente.id_v)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Vent
