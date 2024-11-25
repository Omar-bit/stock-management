import React from 'react';
import Layout from './../Layout';
import { AiFillPlusCircle } from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Vent from '../components/Vent';
import AddVente from '../components/AddVente';
import VenteLabel from '../components/VenteLabel';
import Recette from '../components/Recette';
import axios from 'axios';
import { RiBillLine } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
function Vente() {
  const [caisseStatus, setCaisseStatus] = React.useState(1);
  const [addVentePopUp, setAddVentePopup] = React.useState(false);
  const [addLabelVentePopUp, setAddLabelVentePopup] = React.useState(false);
  const [labelVenteData, setLabelVenteData] = React.useState({});
  const [ventes, setVentes] = React.useState([]);

  const [recettePopup, setRecettePopup] = React.useState(false);
  const [filtringBy, setFiltringBy] = React.useState('tous');

  function prepareRecettePopup() {
    setAddVentePopup(true);
  }
  async function updateStatus() {
    if (localStorage.getItem('role') !== 'admin') return;
    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + `/api/ventes/updateCaisse`,
        {},
        { headers: { token: localStorage.getItem('token') } }
      );
      if (data.status === 'ok') {
        setCaisseStatus(parseInt(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getStatus() {
    if (localStorage.getItem('role') !== 'admin') return;
    try {
      var { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/ventes/getCaisse',

        { headers: { token: localStorage.getItem('token') } }
      );
      if (data.status === 'ok') {
        setCaisseStatus(parseInt(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteVente(mat) {
    try {
      var { data } = await axios.delete(
        import.meta.env.VITE_SERVER_ADRESS + `/api/ventes/delete/${mat}`,
        { headers: { token: localStorage.getItem('token') } }
      );
    } catch (err) {
      console.log(err);
    }

    if (data.status === 'ok') {
      const filteredVentes = ventes?.filter((vente) => mat !== vente.id_v);
      setVentes(filteredVentes);
      toast.success('vente a été retirer avec succées', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      toast.error('probleme de retirer cette vente!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }
  function prepareLabelPopup(data) {
    setLabelVenteData(data);
    setAddLabelVentePopup(true);
  }
  async function getVentes() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/ventes/getAll',
        { headers: { token: localStorage.getItem('token') } }
      );
      if (data.status === 'ok') {
        setVentes(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getStatus();
    getVentes();
  }, []);
  return (
    <Layout>
      <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-auto overflow-x-auto	shadow-xl'>
        {/*HEADER*/}
        <div className='w-full flex items-center justify-between mb-2'>
          <h2
            className={`status ${
              caisseStatus ? 'bg-[#36cd36]' : 'bg-[#dd4338]'
            }  text-third py-1 px-3 rounded-md cursor-pointer hover:opacity-80`}
            onClick={updateStatus}
          >
            {caisseStatus ? 'Active' : 'Fermer'}
          </h2>

          <h2 className=' text-2xl font-bold text-forth '>Ventes</h2>
          {(localStorage.getItem('role') === 'admin' ||
            localStorage.getItem('role') === 'vendeur') && (
            <AiFillPlusCircle
              className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md   md:block '
              onClick={prepareRecettePopup}
            />
          )}
        </div>
        {/*Ventes*/}
        <div className='flex items-center justify-between px-7'>
          <select onChange={(e) => setFiltringBy(e.target.value)}>
            <option value='tous'>tous</option>
            <option value='payée'>payée</option>
            <option value='non payée'>non payée</option>
          </select>
          <button
            className=' rounded-md bg-aux py-1 px-3 text-third hover:opacity-80'
            onClick={() => setRecettePopup(true)}
          >
            Recette
          </button>
        </div>
        <div className=' flex flex-col '>
          <div className=' 	  sm:-mx-6 lg:-mx-8'>
            <div className='    inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='   '>
                <table className='   min-w-full text-left text-sm md:text-md font-light'>
                  <thead className='   border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Ref
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Prix total(TND)
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Prix Donnée(TND)
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Client
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Vendeur
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Date
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Statue
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtringBy == 'tous' &&
                      ventes?.map((vente, index) => (
                        <Vent
                          key={index}
                          prepareLabelPopup={prepareLabelPopup}
                          vente={{ ...vente }}
                          deleteVente={deleteVente}
                        />
                      ))}
                    {filtringBy == 'payée' &&
                      ventes?.map((vente, index) =>
                        Number(vente.prix_tot) === Number(vente.prix_donnee) ? (
                          <Vent
                            key={index}
                            prepareLabelPopup={prepareLabelPopup}
                            vente={{ ...vente }}
                            deleteVente={deleteVente}
                          />
                        ) : null
                      )}
                    {filtringBy == 'non payée' &&
                      ventes?.map((vente, index) =>
                        Number(vente.prix_tot) !== Number(vente.prix_donnee) ? (
                          <Vent
                            key={index}
                            prepareLabelPopup={prepareLabelPopup}
                            vente={{ ...vente }}
                            deleteVente={deleteVente}
                          />
                        ) : null
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*NOTIFICATION*/}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {/* ADD Vente POP UP */}
      {addVentePopUp && (
        <AddVente
          setAddVentePopup={setAddVentePopup}
          getVentes={getVentes}
          toast={toast}
          setCaisseStatus={setCaisseStatus}
        />
      )}
      {addLabelVentePopUp && (
        <VenteLabel
          labelVenteData={labelVenteData}
          setAddLabelVentePopup={setAddLabelVentePopup}
        />
      )}
      {recettePopup && (
        <Recette ventes={ventes} closePop={() => setRecettePopup(false)} />
      )}
    </Layout>
  );
}
export default Vente;
