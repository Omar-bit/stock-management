import React from 'react';
import Pop from './popup/Pop';
import { BsDownload } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
function Recette({ closePop, ventes }) {
  const componentRef = React.useRef();
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  let month = fullDate.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = fullDate.getDate();
  day = day < 10 ? '0' + day : day;

  let today = year + '-' + month + '-' + day;

  let currentVentes = ventes.filter(
    (vent) => vent.date_v.substring(0, 10) === today
  );
  currentVentes.reverse();
  const sumOfVentes = currentVentes.reduce(
    (sum, vent) => sum + parseFloat(vent.prix_tot),
    0
  );
  console.log(sumOfVentes);
  return (
    <Pop closePop={closePop} title={`Recette`}>
      <div className='w-full overflow-auto ' ref={componentRef}>
        <h5 className='text-center font-bold'>
          Recette {day}/{month}/{year}
        </h5>
        <table className='border text-center mx-auto mt-3 w-full'>
          <thead>
            <tr className=''>
              <th className='border p-1'>heure</th>
              <th className='border p-1'>vendeur</th>
              <th className='border p-1'>client</th>
              <th className='border p-1'>tot ventes TND</th>
              <th className='border p-1'>produits</th>
            </tr>
          </thead>
          <tbody className='text-[15px]'>
            {currentVentes.map((vent) => (
              <tr key={vent.id_v}>
                <td className='border'>
                  {vent.date_v.substring(11, vent.date_v.length - 5)}
                </td>
                <td className='border'>{vent.nomUtilisateur}</td>
                <td className='border'>{vent.nomClient}</td>
                <td className='border'>
                  {parseFloat(vent.prix_tot).toFixed(2)}
                </td>
                <td className='border'>
                  <table>
                    <thead>
                      <tr>
                        <th className='border'>nom</th>
                        <th className='border'>quantite</th>
                        <th className='border'>prix</th>
                      </tr>
                    </thead>

                    <tbody className='text-[14px]'>
                      {vent.produits.map((prod) => (
                        <tr key={prod.id_p}>
                          <td className='border'>{prod.nom}</td>
                          <td className='border'>{prod.quantiteVendu}</td>
                          <td className='border'>
                            {parseFloat(prod.prix).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
            <tr className=''>
              <td>Total</td>
              <td>{sumOfVentes}TND</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='w-10 p-[6px] border rounded-full flex justify-center items-center ml-auto mt-5 mr-5'>
        <ReactToPrint
          trigger={() => <BsDownload className='text-forth  cursor-pointer' />}
          content={() => componentRef.current}
        />
      </div>
    </Pop>
  );
}

export default Recette;
