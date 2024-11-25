import React from 'react';
import Pop from './popup/Pop';
import axios from 'axios';
import uuid from 'react-uuid';

function AddProd({
  fournisseurs,
  setOriginalProducts,
  originalProducts,
  getAllProducts,
  setAddProdPopup,
  toast,
}) {
  const [ref, setRef] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [qte, setQte] = React.useState(0);
  const [fournisseur, setFournisseur] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [prix, setPrix] = React.useState(0);
  const [prixAchat, setPrixAchat] = React.useState(0);
  async function addProduct(prod) {
    event.preventDefault();
    const newProd = prod;
    const formData = new FormData();
    formData.append('img', img);
    formData.append('nom', nom);
    formData.append('ref', ref);
    formData.append('qte', qte);
    formData.append('fournisseur', fournisseur);
    formData.append('prix', prix);
    formData.append('prixAchat', prixAchat);
    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/produits/add',
        formData,
        { headers: { token: localStorage.getItem('token') } }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    if (data.status === 'ok') {
      getAllProducts();
      toast.success('produit a été ajouter avec succées', {
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
      toast.error("probleme d'ajout!", {
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
    //
  }
  React.useEffect(() => {
    setRef(uuid());
  }, []);
  return (
    <Pop closePop={() => setAddProdPopup(false)} title='Nouveaux produit'>
      <form className='form' action=''>
        <div className='field'>
          <label htmlFor=''>Ref</label>
          <input
            disabled
            type='text'
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Nom</label>
          <input
            type='text'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Qte</label>
          <input
            type='number'
            value={qte}
            onChange={(e) => setQte(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Prix de vente</label>
          <input
            type='number'
            value={prix}
            min={0}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Prix d'achat</label>
          <input
            type='number'
            value={prixAchat}
            min={0}
            onChange={(e) => setPrixAchat(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Fournisseur</label>
          <input
            list='fournisseur'
            type='text'
            value={fournisseur}
            onChange={(e) => setFournisseur(e.target.value)}
          />

          <datalist id='fournisseur'>
            {fournisseurs.map((four) => (
              <option key={four.id} value={four.id}>
                {four.nom + ' ' + four.pays}{' '}
              </option>
            ))}
          </datalist>
        </div>
        <div className='field'>
          <label htmlFor=''>Image</label>
          <input
            type='file'
            className='custom-file-input'
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        </div>
        <button
          onClick={() => addProduct({ nom, ref, qte, prix, fournisseur, img })}
        >
          Ajouter
        </button>
      </form>
    </Pop>
  );
}

export default AddProd;
