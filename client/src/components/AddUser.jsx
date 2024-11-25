import React from 'react';
import Pop from './popup/Pop';
import axios from 'axios';
function AddUser({ getAllUsers, setUsers, users, setAddUserPopup, toast }) {
  const [nom, setNom] = React.useState('');
  const [mdp, setMdp] = React.useState('');
  const [tel, setTel] = React.useState(0);
  const [role, setRole] = React.useState('vendeur');
  async function addUser(user) {
    event.preventDefault();
    const newUser = user;

    try {
      var res = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/register',
        {
          nom: user.nom,
          role: user.role,
          mdp: user.mdp,
          tel: user.tel,
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

    if (res.data.data.affectedRows > 0) {
      getAllUsers();
      toast.success('utilisateur a été ajouter avec succées', {
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
    <Pop closePop={() => setAddUserPopup(false)} title='Nouveaux utilisateur'>
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
        <div className='field'>
          <label htmlFor=''>Mot de passe</label>
          <input
            type='password'
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </div>

        <div className='field'>
          <label htmlFor=''>Role</label>
          <select
            name=''
            id=''
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='admin'>admin</option>
            <option value='vendeur'>vendeur</option>
            <option value='comptable'>comptable</option>
          </select>
        </div>

        <button onClick={() => addUser({ nom, tel, mdp, role })}>
          Ajouter
        </button>
      </form>
    </Pop>
  );
}
export default AddUser;
