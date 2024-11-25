import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaLessThan } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Pop from '../components/popup/Pop'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ModUser() {
  const navigate = useNavigate()

  const [nom, setNom] = React.useState('')
  const [mdp, setMdp] = React.useState('')
  const [tel, setTel] = React.useState(0)
  const [role, setRole] = React.useState('')
  const id = useParams().id
  async function modifierUser() {
    event.preventDefault()
    try {
      var { data } = await axios.put(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/modify/' + id,
        { nom, mdp, tel, role },
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
      navigate(`/utilisateur`)
    } else {
      toast.error('probleme de modification!', {
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
  }
  async function getUserData() {
    try {
      var { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/getUser/' + id,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      console.log(data)
      if (data.useState == 'ko') {
        navigate(`/`)
      } else {
        setNom(data.data.nom)

        setTel(data.data.tel_u)
        setRole(data.data.role)
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
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

      <form
        className='form absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-third rounded-md p-4'
        action=''
      >
        <header className='flex w-full justify-center items-center relative'>
          <Link to={'/utilisateur'}>
            {' '}
            <FaLessThan className='absolute -left-1 text-forth cursor-pointer' />
          </Link>

          <h1 className='text-forth font-bold text-lg'>Modifier utilisateur</h1>
        </header>
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
            type='text'
            value={tel}
            onChange={(e) => {
              if (e.target.value.length <= 8) setTel(e.target.value)
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

        <button onClick={modifierUser}>Modifier</button>
      </form>
    </>
  )
}

export default ModUser
