import React from 'react';
import Pop from './popup/Pop';
import { AiFillPlusCircle } from 'react-icons/ai';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddVente({ setAddVentePopup, toast, setCaisseStatus, getVentes }) {
  const navigate = useNavigate();

  const [clientList, setClientList] = React.useState([]);
  const [produits, setProduits] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [prod, setProd] = React.useState({
    qte: 1,
    nom: '',
    ref: '',
    prix: 0,
  });
  const [prixTot, setPrixTot] = React.useState(0);
  const [vente, setVente] = React.useState({
    client: 0,
    remise: 0,
    prixDonnee: 0,
    produits: [],
    tot: 0,
    status: 1,
  });
  function addProd() {
    const existProd = products.find((prr) => prr.ref === prod.ref);
    if (existProd) {
      setProducts((prev) =>
        prev.map((prr) => {
          if (prr.ref === prod.ref) {
            return { ...prr, qte: parseInt(prr.qte) + parseInt(prod.qte) };
          } else {
            return prr;
          }
        })
      );
    } else {
      setProducts((prev) => [...prev, prod]);
    }
  }

  React.useEffect(() => {
    let somme = 0;
    for (let prod of products) {
      somme += prod.qte * prod.prix;
    }
    vente.tot = somme;
    vente.produits = products;
    const newSommeAvecRemise = somme - (somme * vente.remise) / 100;
    setPrixTot(newSommeAvecRemise);
  }, [products, vente.remise]);

  React.useEffect(() => {
    async function getProduits() {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER_ADRESS + '/api/produits/getAll',
          {
            headers: { token: localStorage.getItem('token') },
          }
        );
        setProduits(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduits();

    async function getClients() {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER_ADRESS + '/api/clients/getAll',
          {
            headers: { token: localStorage.getItem('token') },
          }
        );
        setClientList(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, []);
  async function addVente() {
    let caisseStatus = 1;

    event.preventDefault();
    //add vente to database

    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/ventes/addVente',
        vente,
        {
          headers: { token: localStorage.getItem('token') },
        }
      );
      console.log(data);

      if (data.data === 'prob caisse') {
        toast({
          title: 'la caisse est actuellement fermer',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        alert('la caisse est actuellement fermer');
        caisseStatus = 0;
      }
    } catch (error) {
      console.log(error);
    }
    if (data.status === 'ok') {
      getVentes();
      navigate(`/vente`);
    } else {
      toast.error('probleme de ajouter cette vente!', {
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
    setCaisseStatus(caisseStatus);
  }
  return (
    <Pop closePop={() => setAddVentePopup(false)} title='Nouvelle vente'>
      <form className='form relative ' action=''>
        <h5>prixTot: {prixTot}TND</h5>
        <div className='field'>
          <label htmlFor=''>Client</label>

          <DatalistInput
            onSelect={(item) => {
              event.preventDefault();
              setVente((prev) => {
                return { ...prev, client: item.id };
              });
            }}
            items={clientList.map((clii) => {
              return { id: clii.id, value: clii.nom };
            })}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Prix Donnée</label>
          <input
            type='number'
            min={0}
            value={vente.prixDonnee}
            onChange={(e) =>
              setVente((prev) => {
                return { ...prev, prixDonnee: e.target.value };
              })
            }
          />
        </div>{' '}
        <div className='field'>
          <label htmlFor=''>Remise</label>
          <input
            type='number'
            min={0}
            max={100}
            value={vente.remise}
            onChange={(e) => {
              setVente((prev) => {
                return { ...prev, remise: e.target.value };
              });
            }}
          />
          <span>%</span>
        </div>
        <div className='bg-[#dadada] rounded-md w-full p-1 flex flex-col gap-2'>
          <div className='field'>
            <label htmlFor=''>Produit</label>
            <DatalistInput
              onSelect={(item) => {
                event.preventDefault();
                setProd((prev) => {
                  return {
                    ...prev,
                    nom: item.value,
                    ref: item.id,
                    prix: item.prix,
                  };
                });
              }}
              items={produits.map((prr) => {
                return { id: prr.ref, value: prr.nom, prix: prr.prix };
              })}
            />
          </div>
          <div className='field'>
            <label htmlFor=''>Qte</label>
            <input
              type='number'
              min={1}
              value={prod.qte}
              onChange={(e) =>
                setProd((prev) => {
                  return { ...prev, qte: e.target.value };
                })
              }
            />
          </div>
        </div>
        <div className='results  bg-[#d9d9d9] w-full rounded-lg flex flex-col gap-2 p-2 overflow-y-scroll max-h-[250px]'>
          <div className='bg-third rounded-lg p-1 flex items-center   justify-between  w-full '>
            <span className=' flex-1'>Ref</span>{' '}
            <span className=' flex-1'>Nom</span>
            <span className=' flex-1'>Prix</span>
            <span className='self-end	 flex-1'>Qte</span>
            <FaTrash className='text-signM cursor-pointer  ' />
          </div>
          {products.length > 0 &&
            products.map((prod, index) => (
              <div
                key={index}
                className='bg-third rounded-lg p-1 flex items-center justify-between  gap-5 w-full'
              >
                <span>{prod.ref}</span> <span>{prod.nom}</span>
                <span>{prod.prix}</span>
                <span className='self-end	'>{prod.qte}</span>
                <FaTrash
                  className='text-signM cursor-pointer'
                  onClick={() =>
                    setProducts((prev) => prev.filter((prr, i) => i !== index))
                  }
                />
              </div>
            ))}
        </div>
        <AiFillPlusCircle
          className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-2 bottom-10  md:block '
          onClick={addProd}
        />
        <button onClick={addVente}>Ajouter</button>
      </form>
    </Pop>
  );
}

export default AddVente;
