import React from 'react';
import Pop from './popup/Pop';
import axios from 'axios';
function AddClient({ setClients, clients, setAddClientPopup, toast }) {
  const [nom, setNom] = React.useState('');
  const [tel, setTel] = React.useState(0);
  async function addClient(client) {
    event.preventDefault();
    const newClient = client;
    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/clients/add',
        {
          nom,
          tel,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    if (data.status === 'ok') {
      let newClients = clients;
      newClients.unshift(newClient);
      setClients(newClients);
      toast.success('client a été ajouter avec succées', {
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
  return (
    <Pop closePop={() => setAddClientPopup(false)} title='Nouveaux client'>
      <form className='form' action=''>
        <div className='field'>
          <label htmlFor=''>Nom</label>
          <input
            type='text'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Tel</label>
          <input
            type='number'
            value={tel}
            max={9999999}
            onChange={(e) => {
              if (e.target.value.length <= 8) setTel(e.target.value);
            }}
          />
        </div>
        <button onClick={() => addClient({ nom, tel })}>Ajouter</button>
      </form>
    </Pop>
  );
}

export default AddClient;
