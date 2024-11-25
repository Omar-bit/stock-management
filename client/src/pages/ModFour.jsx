import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaLessThan } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Pop from '../components/popup/Pop'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ModFour() {
  const navigate = useNavigate()

  const [nom, setNom] = React.useState('')

  const [tel, setTel] = React.useState(0)
  const [pays, setPays] = React.useState('')
  const id = useParams().id
  async function modifierFour() {
    event.preventDefault()
    try {
      var { data } = await axios.put(
        import.meta.env.VITE_SERVER_ADRESS + '/api/fournisseurs/modify/' + id,
        { nom, tel_four: tel, pays },
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
      navigate(`/fournisseur`)
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

  async function getFour() {
    try {
      var { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS +
          '/api/fournisseurs/getFournisseur/' +
          id,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (data.useState == 'ko') {
        navigate(`/`)
      } else {
        setNom(data.data.nom)

        setTel(data.data.tel_four)
        setPays(data.data.pays)
      }
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    getFour()
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
          <Link to={'/fournisseur'}>
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

        <button onClick={modifierFour}>Modifier</button>
      </form>
    </>
  )
}
export default ModFour
