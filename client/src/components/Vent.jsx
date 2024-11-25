import React from 'react';
import { RiBillLine } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
import axios from 'axios';
function Vent(props) {
  const vente = props.vente;
  console.log(vente.date_v)
  const [donnee, setDonnee] = React.useState(String(vente.prix_donnee));
  const [mod, setMod] = React.useState(false);
  async function updateGivenPrice() {
    setMod(false);
    setDonnee(eval(donnee));
    try {
      const { data } = await axios.put(
        import.meta.env.VITE_SERVER_ADRESS +
          `/api/ventes/modifyGivenPrice/${vente.id_v}`,
        {
          prix_donnee: eval(donnee),
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <tr className="border-b">
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.id_v}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {parseFloat(vente.prix_tot).toFixed(2)}TND
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        <input
          className='inpt  w-14  max-w-[70px]   '
          type='text'
          value={donnee}
          onChange={(e) => {
            setDonnee(e.target.value);

            setMod(true);
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
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.nomClient}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.nomUtilisateur}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.date_v.split('T')[0] +
          ' ' +
          vente.date_v.split('T')[1].substring(0, 5)}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {localStorage.getItem('role') === 'admin' && (
          <div
            className={`w-4 h-4 md:w-5 md:h-5 ${
              Number(vente.prix_donnee) == Number(vente.prix_tot)
                ? 'bg-signP'
                : 'bg-signM'
            } rounded-full cursor-pointer`}
          ></div>
        )}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4 flex justify-center items-center'>
        {' '}
        <RiBillLine
          className='cursor-pointer text-xl'
          onClick={() => props.prepareLabelPopup(props.vente)}
        />
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4 flex justify-center items-center'>
        {' '}
        {localStorage.getItem('role') === 'admin' && (
          <FaTrash
            className='cursor-pointer text-signM text-xl hover:opacity-80'
            onClick={() => props.deleteVente(vente.id_v)}
          />
        )}
      </td>
    </tr>
  );
}

export default Vent;
