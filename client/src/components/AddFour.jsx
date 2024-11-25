import React from 'react'
import Pop from './popup/Pop'
import axios from 'axios'
function AddFour({
  setAddFourPopup,
  getAllFounisseurs,

  toast,
}) {
  const [nom, setNom] = React.useState('')
  const [tel, setTel] = React.useState(0)
  const [pays, setPays] = React.useState('')
  async function addFour(four) {
    event.preventDefault()

    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/fournisseurs/add',
        {
          nom: four.nom,

          pays: four.pays,
          tel_four: four.tel,
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

    if (data.status === 'ok') {
      getAllFounisseurs()
      toast.success('fournisseur a été ajouter avec succées', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
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
      })
    }
    //
  }
  return (
    <Pop closePop={() => setAddFourPopup(false)} title='Nouveaux fournisseur'>
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
              if (e.target.value.length <= 8) setTel(e.target.value)
            }}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Pays</label>
          <input
            type='text'
            value={pays}
            onChange={(e) => setPays(e.target.value)}
          />
        </div>

        <button onClick={() => addFour({ nom, tel, pays })}>Ajouter</button>
      </form>
    </Pop>
  )
}

export default AddFour
